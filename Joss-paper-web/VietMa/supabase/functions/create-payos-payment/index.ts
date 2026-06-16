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
  orderType?: string   // kept for backwards-compat; always treated as 'online'
  returnUrl: string
  cancelUrl: string
}

// ── Chính sách giá bán hàng online ────────────────────────────
// Nguồn: PolicyPage.jsx — mục "Khách mua online"
function getOnlineDiscount(itemCount: number): number {
  if (itemCount >= 20) return 350_000
  if (itemCount >= 5)  return 80_000
  if (itemCount === 4) return 50_000
  if (itemCount === 3) return 35_000
  if (itemCount === 2) return 20_000
  return 0
}

/**
 * Tính giá đơn hàng online:
 * - subtotal: tổng giá gốc
 * - discount: giảm theo mốc số lượng sản phẩm
 * - total: subtotal - discount
 * - depositDue: số tiền cần thanh toán qua PayOS
 *     · Tổng < 500.000đ  → 100%
 *     · Tổng ≥ 500.000đ  → 80% (làm tròn lên, đơn vị đồng nguyên)
 */
function calculateOnlinePricing(items: CartItem[]) {
  const itemCount = items.reduce((s, i) => s + Number(i.quantity || 1), 0)
  const subtotal  = items.reduce((s, i) => s + parsePrice(i.price) * Number(i.quantity || 1), 0)
  const discount  = Math.min(getOnlineDiscount(itemCount), subtotal)
  const total     = Math.max(0, subtotal - discount)
  const depositDue = total >= 500_000 ? Math.ceil(total * 0.8) : total
  const remainingDue = Math.max(0, total - depositDue)
  return { subtotal, discount, total, depositDue, remainingDue }
}
// ──────────────────────────────────────────────────────────────

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

    // ── Tính giá theo chính sách online ──────────────────────
    const pricing = calculateOnlinePricing(payload.items)
    const { depositDue, discount, total, remainingDue } = pricing

    // depositDue là số tiền thực tế gửi lên PayOS:
    //   · tổng < 500.000đ  → 100% tổng sau giảm
    //   · tổng ≥ 500.000đ  → 80% tổng sau giảm (làm tròn lên)
    if (!Number.isInteger(depositDue) || depositDue < 1000) {
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
    const orderSummary = buildOrderSummary(payload.items, payload.customer, total)
    const { data: invoice, error: invoiceError } = await adminClient
      .from('Invoices')
      .insert({
        UserId: customerId,
        PruductName: orderSummary,
        amount: total,           // tổng sau giảm giá (100%) — lưu để đối chiếu
        status: 'PENDING',
        payment_provider: 'payOS',
        payment_order_code: orderCode,
      })
      .select('id')
      .single()

    if (invoiceError) throw invoiceError

    // PayOS yêu cầu tổng items === amount, nên scale giá mỗi item
    // theo tỉ lệ depositDue / total để đảm bảo signature hợp lệ.
    // Nếu depositDue === total (< 500k) thì scale = 1, không ảnh hưởng gì.
    const scale = total > 0 ? depositDue / total : 1
    const payosItems = payload.items.map((item, idx, arr) => {
      const unitPrice = Math.round(parsePrice(item.price) * scale)
      return {
        name: item.name.slice(0, 128),
        quantity: Number(item.quantity || 1),
        price: unitPrice,
      }
    })
    // Điều chỉnh item cuối để tổng = depositDue chính xác (tránh lỗi làm tròn)
    const payosSum = payosItems.reduce((s, i) => s + i.price * i.quantity, 0)
    if (payosItems.length > 0 && payosSum !== depositDue) {
      payosItems[payosItems.length - 1].price += depositDue - payosSum
    }

    const signatureData = `amount=${depositDue}&cancelUrl=${payload.cancelUrl}&description=${description}&orderCode=${orderCode}&returnUrl=${payload.returnUrl}`
    const signature = await createSignature(signatureData, payosChecksumKey)
    const paymentBody = {
      orderCode,
      amount: depositDue,
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
