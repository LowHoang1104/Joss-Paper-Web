import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AuthButton from '../components/AuthButton.jsx'
import { getAuthRedirectTo, useAuth } from '../hooks/useAuth.js'
import { useCart } from '../hooks/useCart.js'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js'
import { calculateOrderPricing } from '../utils/orderPricing.js'

function getDisplayName(user) {
  return (
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    ''
  )
}

function CartNotice({ notice, onDismiss }) {
  if (!notice) return null

  const toneLabels = {
    success: 'Thành công',
    warning: 'Cần xử lý',
    error: 'Có lỗi',
    info: 'Thông tin',
  }

  return (
    <div className={`cart-notice cart-notice-${notice.type || 'info'}`} role="alert">
      <div className="cart-notice-mark" aria-hidden="true">
        {notice.type === 'success' ? '✓' : notice.type === 'error' ? '!' : 'i'}
      </div>

      <div className="cart-notice-content">
        <span>{toneLabels[notice.type] || toneLabels.info}</span>
        <strong>{notice.title}</strong>
        <p>{notice.message}</p>

        <div className="cart-notice-actions">
          {notice.action === 'login' ? <AuthButton /> : null}
          {notice.action === 'products' ? (
            <Link to="/products" className="cart-notice-action">
              Chọn sản phẩm ngay
            </Link>
          ) : null}
          {notice.action === 'history' ? (
            <a href="#order-history" className="cart-notice-action">
              Xem lịch sử đơn hàng
            </a>
          ) : null}
          {notice.action === 'retry' ? (
            <button type="submit" className="cart-notice-action">
              Thử thanh toán lại
            </button>
          ) : null}
          <button type="button" className="cart-notice-close" onClick={onDismiss}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

async function findCustomer(user) {
  const byAuthId = await supabase
    .from('Users')
    .select('Id,Name,Email,Phone,Address,auth_user_id')
    .eq('auth_user_id', user.id)
    .maybeSingle()

  if (!byAuthId.error && byAuthId.data) {
    return { data: byAuthId.data, hasAuthUserId: true }
  }

  const byEmail = await supabase
    .from('Users')
    .select('Id,Name,Email,Phone,Address')
    .eq('Email', user.email)
    .maybeSingle()

  if (byEmail.error) {
    throw byEmail.error
  }

  return { data: byEmail.data, hasAuthUserId: !byAuthId.error }
}

function CartPage() {
  const {
    clearCart,
    formatCurrency,
    items,
    parsePrice,
    removeItem,
    subtotal,
    updateQuantity,
  } = useCart()
  const { isLoading: isAuthLoading, user } = useAuth()
  const location = useLocation()
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
  })
  const [orders, setOrders] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isHistoryLoading, setIsHistoryLoading] = useState(false)
  const [notice, setNotice] = useState(null)

  const pricing = useMemo(
    () =>
      calculateOrderPricing({
        itemCount: items.reduce((total, item) => total + item.quantity, 0),
        subtotal,
      }),
    [items, subtotal],
  )
  const formattedTotal = useMemo(
    () => formatCurrency(pricing.total),
    [formatCurrency, pricing.total],
  )
  const formattedDeposit = useMemo(
    () => formatCurrency(pricing.depositDue),
    [formatCurrency, pricing.depositDue],
  )

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paymentStatus = params.get('payment')

    if (paymentStatus === 'success') {
      clearCart()
      setNotice({
        type: 'success',
        title: 'Thanh toán thành công',
        message: 'Đơn hàng của bạn đã được ghi nhận. Bấm bên dưới để kiểm tra trạng thái trong lịch sử mua hàng.',
        action: 'history',
      })
    } else if (paymentStatus === 'cancel') {
      setNotice({
        type: 'warning',
        title: 'Bạn đã hủy thanh toán',
        message: 'Giỏ hàng vẫn được giữ nguyên. Nếu bạn vẫn muốn mua, hãy bấm thử thanh toán lại.',
        action: 'retry',
      })
    }
  }, [clearCart, location.key])

  useEffect(() => {
    if (user) {
      setFormValues((current) => ({
        ...current,
        name: current.name || getDisplayName(user),
      }))
    }
  }, [user])

  useEffect(() => {
    if (!user || !isSupabaseConfigured) {
      setOrders([])
      return undefined
    }

    let isMounted = true

    const loadOrders = async () => {
      setIsHistoryLoading(true)

      try {
        const { data: customer } = await findCustomer(user)

        if (!customer) {
          if (isMounted) setOrders([])
          return
        }

        const { data, error } = await supabase
          .from('Invoices')
          .select('id,created_at,PruductName,amount,status,checkout_url')
          .eq('UserId', customer.Id)
          .order('created_at', { ascending: false })

        if (error) {
          throw error
        }

        if (isMounted) {
          setOrders(data || [])
        }
      } catch (error) {
        if (isMounted) {
          setNotice({
            type: 'error',
            title: 'Không tải được lịch sử mua hàng',
            message: error.message || 'Vui lòng thử lại sau ít phút.',
          })
        }
      } finally {
        if (isMounted) {
          setIsHistoryLoading(false)
        }
      }
    }

    loadOrders()

    return () => {
      isMounted = false
    }
  }, [user])

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({ ...current, [name]: value }))
  }

  const handleCheckout = async (event) => {
    event.preventDefault()

    if (!user) {
      if (isSupabaseConfigured) {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: getAuthRedirectTo(),
          },
        })
      } else {
        setNotice({
          type: 'warning',
          title: 'Bạn cần đăng nhập để thanh toán',
          message: 'Chưa cấu hình đăng nhập Supabase.',
          action: null,
        })
      }
      return
    }

    if (items.length === 0) {
      setNotice({
        type: 'info',
        title: 'Giỏ hàng đang trống',
        message: 'Bạn cần chọn ít nhất một sản phẩm trước khi thanh toán.',
        action: 'products',
      })
      return
    }

    setIsSubmitting(true)
    setNotice(null)

    try {
      const { data, error } = await supabase
        .functions
        .invoke('create-payos-payment', {
          body: {
            customer: formValues,
            items,
            orderType: 'online',
            returnUrl: `${window.location.origin}${window.location.pathname}?payment=success#/cart`,
            cancelUrl: `${window.location.origin}${window.location.pathname}?payment=cancel#/cart`,
          },
        })

      if (error) {
        throw error
      }

      if (!data?.checkoutUrl) {
        throw new Error('Không nhận được link thanh toán payOS.')
      }

      setNotice({
        type: 'info',
        title: 'Đang chuyển sang payOS',
        message: 'Trang thanh toán đang được mở. Vui lòng không đóng trình duyệt trong lúc xử lý.',
      })
      window.location.href = data.checkoutUrl
    } catch (error) {
      setNotice({
        type: 'error',
        title: 'Không tạo được link thanh toán',
        message: error.message || 'Vui lòng kiểm tra kết nối và thử thanh toán lại.',
        action: 'retry',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="page-shell">
      <section className="page-hero cart-page-hero">
        <div className="container page-hero-content">
          <span className="section-tag">Giỏ hàng</span>
          <h1 className="page-hero-title">
            Đơn Hàng <em>Của Bạn</em>
          </h1>
          <div className="page-hero-meta">
            <span className="page-chip">{items.length} sản phẩm</span>
            <span className="page-chip">{formattedTotal}</span>
          </div>
        </div>
      </section>

      <section className="section cart-section">
        <div className="container cart-grid">
          <div className="cart-panel">
            <div className="cart-panel-header">
              <h2>Giỏ hàng</h2>
              <Link to="/products" className="cart-inline-link">
                Mua thêm
              </Link>
            </div>

            {items.length === 0 ? (
              <div className="cart-empty">
                <p>Giỏ hàng đang trống.</p>
                <Link to="/products" className="btn-primary">
                  Chọn sản phẩm
                </Link>
              </div>
            ) : (
              <div className="cart-items">
                {items.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <div>
                      <p className="cart-item-category">{item.category}</p>
                      <h3>{item.name}</h3>
                      <p>{item.price}</p>
                    </div>
                    <div className="cart-item-controls">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Giam ${item.name}`}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(event) =>
                          updateQuantity(item.id, event.target.value)
                        }
                      />
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Tang ${item.name}`}
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item-total">
                      {formatCurrency(parsePrice(item.price) * item.quantity)}
                    </div>
                    <button
                      type="button"
                      className="cart-remove"
                      onClick={() => removeItem(item.id)}
                    >
                      Xóa
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="cart-panel cart-checkout">
            <h2>Thông tin đặt hàng</h2>

            {!user && !isAuthLoading ? (
              <div className="cart-login-box">
                <p>Đăng nhập Google để đặt hàng và xem lịch sử mua hàng.</p>
                <AuthButton />
              </div>
            ) : null}

            <form className="cart-form" onSubmit={handleCheckout}>
              <label>
                Họ tên
                <input
                  name="name"
                  type="text"
                  value={formValues.name}
                  onChange={handleFieldChange}
                  required
                />
              </label>

              <label>
                Số điện thoại
                <input
                  name="phone"
                  type="tel"
                  value={formValues.phone}
                  onChange={handleFieldChange}
                  required
                />
              </label>

              <label>
                Địa chỉ giao hàng
                <input
                  name="address"
                  type="text"
                  value={formValues.address}
                  onChange={handleFieldChange}
                  required
                />
              </label>

              <label>
                Ghi chú
                <textarea
                  name="note"
                  rows="3"
                  value={formValues.note}
                  onChange={handleFieldChange}
                />
              </label>

              <div className="cart-price-breakdown">
                <div className="cart-total-row cart-total-row--sub">
                  <span>Tạm tính</span>
                  <span>{formatCurrency(pricing.subtotal)}</span>
                </div>
                {pricing.discount > 0 && (
                  <div className="cart-total-row cart-total-row--discount">
                    <span>Ưu đãi — {pricing.discountLabel}</span>
                    <span>−{formatCurrency(pricing.discount)}</span>
                  </div>
                )}
                {pricing.discount === 0 && (
                  <div className="cart-total-row cart-total-row--note">
                    <span>{pricing.discountLabel}</span>
                  </div>
                )}
                <div className="cart-total-row cart-total-row--total">
                  <span>Tổng đơn hàng</span>
                  <strong>{formattedTotal}</strong>
                </div>

                {pricing.remainingDue > 0 ? (
                  <div className="cart-payment-schedule">
                    <p className="cart-payment-schedule-label">Lịch thanh toán</p>
                    <div className="cart-payment-schedule-row cart-payment-schedule-row--now">
                      <div>
                        <span className="cart-payment-step">Bước 1 · Thanh toán qua payOS</span>
                        <span className="cart-payment-hint">80% — trước khi giao hàng</span>
                      </div>
                      <strong>{formattedDeposit}</strong>
                    </div>
                    <div className="cart-payment-schedule-row cart-payment-schedule-row--later">
                      <div>
                        <span className="cart-payment-step">Bước 2 · Khi nhận hàng</span>
                        <span className="cart-payment-hint">20% còn lại — trả khi nhận</span>
                      </div>
                      <span>{formatCurrency(pricing.remainingDue)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="cart-payment-full">
                    <span>Thanh toán một lần</span>
                    <strong>{formattedDeposit}</strong>
                  </div>
                )}
              </div>

              <p className="cart-policy-note">
                Khi thanh toán, bạn đồng ý với{' '}
                <Link to="/policy">chính sách mua hàng của Việt Mã</Link>.
              </p>

              <button
                type="submit"
                className="contact-submit"
                disabled={isSubmitting || items.length === 0}
              >
                {isSubmitting
                  ? 'Đang tạo link...'
                  : pricing.remainingDue > 0
                    ? `Thanh toán trước ${formattedDeposit} qua payOS`
                    : `Thanh toán ${formattedDeposit} qua payOS`
                }
              </button>

              <CartNotice notice={notice} onDismiss={() => setNotice(null)} />
            </form>
          </aside>

          <div className="cart-panel order-history-panel" id="order-history">
            <h2>Lịch sử mua hàng</h2>

            {!user ? (
              <p>Đăng nhập Google để xem lịch sử mua hàng của bạn.</p>
            ) : isHistoryLoading ? (
              <p>Đang tải lịch sử...</p>
            ) : orders.length === 0 ? (
              <p>Chưa có đơn hàng nào.</p>
            ) : (
              <div className="order-history-list">
                {orders.map((order) => (
                  <article className="order-history-item" key={order.id}>
                    <div>
                      <span>Don #{order.id}</span>
                      <time dateTime={order.created_at}>
                        {new Date(order.created_at).toLocaleString('vi-VN')}
                      </time>
                    </div>
                    {order.status ? (
                      <span className={`order-status order-status-${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    ) : null}
                    {order.amount ? <strong>{formatCurrency(order.amount)}</strong> : null}
                    <p>{order.PruductName}</p>
                    {order.checkout_url && order.status === 'PENDING' ? (
                      <a href={order.checkout_url} className="cart-inline-link">
                        Tiếp tục thanh toán
                      </a>
                    ) : null}
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default CartPage
