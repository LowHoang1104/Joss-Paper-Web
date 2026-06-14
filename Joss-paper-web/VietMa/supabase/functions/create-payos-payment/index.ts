import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.108.1'
import { corsHeaders, jsonResponse } from '../_shared/cors.ts'

type CartItem = {
  id: string
  name: string
  category?: string
  price: string | number
  quantity: number
}

type CheckoutRequest = {
  customer: {
    name: string
    phone: string
    address: string
    note?: string
  }
  items: CartItem[]
  returnUrl: string
  cancelUrl: string
}

const encoder = new TextEncoder()

function requiredEnv(name: string) {
  const value = Deno.env.get(name)

  if (!value) {
    throw new Error(`Missing ${name}`)
  }

  return value
}

function parsePrice(price: string | number) {
  return Number(String(price || '').replace(/[^\d]/g, '') || 0)
}

async function createSignature(data: string, checksumKey: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(checksumKey),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data))

  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

function buildOrderSummary(items: CartItem[], customer: CheckoutRequest['customer'], amount: number) {
  const productText = items
    .map((item) => `${item.name} x${item.quantity}`)
    .join('; ')

  return [
    `San pham: ${productText}`,
    `Tong tien: ${amount.toLocaleString('vi-VN')} VND`,
    customer.address ? `Dia chi: ${customer.address}` : '',
    customer.phone ? `SDT: ${customer.phone}` : '',
    customer.note ? `Ghi chu: ${customer.note}` : '',
  ].filter(Boolean).join(' | ')
}

async function getAuthedUser(req: Request, supabaseUrl: string, anonKey: string) {
  const authorization = req.headers.get('Authorization') || ''
  const token = authorization.replace('Bearer ', '')

  if (!token) {
    throw new Error('Missing authorization token')
  }

  const authClient = createClient(supabaseUrl, anonKey, {
    global: {
      headers: { Authorization: authorization },
    },
  })
  const { data, error } = await authClient.auth.getUser(token)

  if (error || !data.user) {
    throw new Error('Invalid user session')
  }

  return data.user
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405)
  }

  try {
    const supabaseUrl = requiredEnv('SUPABASE_URL')
    const anonKey = requiredEnv('SUPABASE_ANON_KEY')
    const serviceRoleKey = requiredEnv('SUPABASE_SERVICE_ROLE_KEY')
    const payosClientId = requiredEnv('PAYOS_CLIENT_ID')
    const payosApiKey = requiredEnv('PAYOS_API_KEY')
    const payosChecksumKey = requiredEnv('PAYOS_CHECKSUM_KEY')
    const payload = await req.json() as CheckoutRequest

    if (!payload.items?.length) {
      return jsonResponse({ error: 'Cart is empty' }, 400)
    }

    const user = await getAuthedUser(req, supabaseUrl, anonKey)
    const adminClient = createClient(supabaseUrl, serviceRoleKey)
    const amount = payload.items.reduce(
      (total, item) => total + parsePrice(item.price) * Number(item.quantity || 1),
      0,
    )

    if (!Number.isInteger(amount) || amount < 1000) {
      return jsonResponse({ error: 'Payment amount must be at least 1,000 VND' }, 400)
    }

    const { data: existingCustomer } = await adminClient
      .from('Users')
      .select('Id')
      .eq('auth_user_id', user.id)
      .maybeSingle()

    let customerId = existingCustomer?.Id
    const customerPayload = {
      auth_user_id: user.id,
      Name: payload.customer.name || user.user_metadata?.full_name || user.email,
      Email: user.email,
      Phone: payload.customer.phone || null,
      Address: payload.customer.address || null,
    }

    if (customerId) {
      const { error } = await adminClient
        .from('Users')
        .update(customerPayload)
        .eq('Id', customerId)

      if (error) throw error
    } else {
      const { data, error } = await adminClient
        .from('Users')
        .upsert(customerPayload, { onConflict: 'auth_user_id' })
        .select('Id')
        .single()

      if (error) throw error
      customerId = data.Id
    }

    const orderCode = Number(`${Date.now()}${Math.floor(Math.random() * 90 + 10)}`.slice(-12))
    const description = `VM${String(orderCode).slice(-7)}`
    const orderSummary = buildOrderSummary(payload.items, payload.customer, amount)
    const { data: invoice, error: invoiceError } = await adminClient
      .from('Invoices')
      .insert({
        UserId: customerId,
        PruductName: orderSummary,
        amount,
        status: 'PENDING',
        payment_provider: 'payOS',
        payment_order_code: orderCode,
      })
      .select('id')
      .single()

    if (invoiceError) throw invoiceError

    const payosItems = payload.items.map((item) => ({
      name: item.name.slice(0, 128),
      quantity: Number(item.quantity || 1),
      price: parsePrice(item.price),
    }))
    const signatureData = `amount=${amount}&cancelUrl=${payload.cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${payload.returnUrl}`
    const signature = await createSignature(signatureData, payosChecksumKey)
    const paymentBody = {
      orderCode,
      amount,
      description,
      buyerName: payload.customer.name,
      buyerEmail: user.email,
      buyerPhone: payload.customer.phone,
      buyerAddress: payload.customer.address,
      items: payosItems,
      cancelUrl: payload.cancelUrl,
      returnUrl: payload.returnUrl,
      signature,
    }
    const payosResponse = await fetch('https://api-merchant.payos.vn/v2/payment-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': payosClientId,
        'x-api-key': payosApiKey,
      },
      body: JSON.stringify(paymentBody),
    })
    const payosResult = await payosResponse.json()

    if (!payosResponse.ok || payosResult.code !== '00') {
      await adminClient
        .from('Invoices')
        .update({ status: 'PAYMENT_LINK_FAILED' })
        .eq('id', invoice.id)

      return jsonResponse({
        error: payosResult.desc || 'Could not create payOS payment link',
        details: payosResult,
      }, 400)
    }

    await adminClient
      .from('Invoices')
      .update({
        payment_link_id: payosResult.data.paymentLinkId,
        checkout_url: payosResult.data.checkoutUrl,
      })
      .eq('id', invoice.id)

    return jsonResponse({
      invoiceId: invoice.id,
      orderCode,
      checkoutUrl: payosResult.data.checkoutUrl,
    })
  } catch (error) {
    return jsonResponse({ error: error.message || 'Unexpected error' }, 500)
  }
})
