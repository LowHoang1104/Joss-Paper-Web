import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.108.1'
import { corsHeaders, jsonResponse } from '../_shared/cors.ts'

const encoder = new TextEncoder()

function requiredEnv(name: string) {
  const value = Deno.env.get(name)

  if (!value) {
    throw new Error(`Missing ${name}`)
  }

  return value
}

function optionalEnv(name: string) {
  return Deno.env.get(name) || ''
}

function sortObject(value: Record<string, unknown>) {
  return Object.keys(value)
    .sort()
    .reduce<Record<string, unknown>>((result, key) => {
      const item = value[key]
      result[key] =
        item && typeof item === 'object' && !Array.isArray(item)
          ? sortObject(item as Record<string, unknown>)
          : item
      return result
    }, {})
}

function stringifyValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'object') return JSON.stringify(sortObject(value as Record<string, unknown>))
  return String(value)
}

async function createSignature(data: Record<string, unknown>, checksumKey: string) {
  const sortedData = sortObject(data)
  const signatureData = Object.entries(sortedData)
    .map(([key, value]) => `${key}=${stringifyValue(value)}`)
    .join('&')
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(checksumKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(signatureData))

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function appendPaidOrderToSheet(
  sheetUrl: string,
  invoice: { id: number; UserId: number; PruductName: string | null; amount: number | null; payment_order_code: number | null },
  customer: { Name: string | null; Email: string | null; Phone: string | null; Address: string | null } | null,
) {
  if (!sheetUrl) return

  const amountText = invoice.amount
    ? `${invoice.amount.toLocaleString('vi-VN')}đ`
    : ''

  const payload = {
    source: 'payOS - Đã thanh toán',
    product: invoice.PruductName || '',
    name: customer?.Name || '',
    phone: customer?.Phone || '',
    occasion: `Mã đơn: ${invoice.id}`,
    message: [
      customer?.Email ? `Email: ${customer.Email}` : '',
      customer?.Address ? `Địa chỉ: ${customer.Address}` : '',
      amountText ? `Tổng tiền: ${amountText}` : '',
      invoice.payment_order_code ? `Mã thanh toán payOS: ${invoice.payment_order_code}` : '',
    ].filter(Boolean).join(' | '),
  }

  try {
    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      console.warn('Google Sheet append failed', await response.text())
    }
  } catch (error) {
    console.warn('Google Sheet append error', error)
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  try {
    const checksumKey = requiredEnv('PAYOS_CHECKSUM_KEY')
    const supabaseUrl = requiredEnv('SUPABASE_URL')
    const serviceRoleKey = requiredEnv('SUPABASE_SERVICE_ROLE_KEY')
    const googleSheetUrl = optionalEnv('GOOGLE_SHEET_URL')
    const payload = await req.json()
    const expectedSignature = await createSignature(payload.data || {}, checksumKey)

    if (payload.signature !== expectedSignature) {
      return jsonResponse({ error: 'Invalid signature' }, 401)
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey)
    const isPaid = payload.success === true && payload.code === '00'
    const updatePayload = {
      status: isPaid ? 'PAID' : 'PAYMENT_FAILED',
      paid_at: isPaid ? new Date().toISOString() : null,
    }
    const { error } = await adminClient
      .from('Invoices')
      .update(updatePayload)
      .eq('payment_order_code', payload.data.orderCode)

    if (error) throw error

    if (isPaid) {
      const { data: invoice, error: invoiceError } = await adminClient
        .from('Invoices')
        .select('id,UserId,PruductName,amount,payment_order_code')
        .eq('payment_order_code', payload.data.orderCode)
        .maybeSingle()

      if (invoiceError) throw invoiceError

      if (invoice) {
        const { data: customer } = await adminClient
          .from('Users')
          .select('Name,Email,Phone,Address')
          .eq('Id', invoice.UserId)
          .maybeSingle()

        await appendPaidOrderToSheet(googleSheetUrl, invoice, customer)
      }
    }

    return jsonResponse({ ok: true })
  } catch (error) {
    return jsonResponse({ error: error.message || 'Unexpected error' }, 500)
  }
})
