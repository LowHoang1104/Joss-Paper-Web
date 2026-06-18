import { useState } from 'react'
import AuthButton from '../components/AuthButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { products } from '../data/siteData.js'
import { getAuthRedirectTo, useAuth } from '../hooks/useAuth.js'
import { useCart } from '../hooks/useCart.js'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient.js'

const productImages = import.meta.glob('../assets/product/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
})

const resolveProductImage = (image) => {
  if (!image) return null
  if (image.startsWith('http') || image.startsWith('/')) return image
  const fileName = image.split('/').pop()
  const fileKey = `../assets/product/${fileName}`
  return productImages[fileKey] || null
}

function ProductsPage() {
  const { addItem } = useCart()
  const { isLoading: isAuthLoading, user } = useAuth()
  const [notice, setNotice] = useState(null)

  const handleAddToCart = (product) => {
    if (isAuthLoading) {
      setNotice({
        type: 'info',
        title: 'Đang kiểm tra đăng nhập',
        message: 'Vui lòng đợi trong giây lát rồi thử thêm sản phẩm lại.',
        action: null,
      })
      return
    }

    if (!user) {
      if (isSupabaseConfigured) {
        supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: getAuthRedirectTo(),
          },
        })
      } else {
        setNotice({
          type: 'warning',
          title: 'Bạn cần đăng nhập trước',
          message: 'Chưa cấu hình đăng nhập. Vui lòng thử lại sau.',
          action: null,
        })
      }
      return
    }

    addItem(product)
    setNotice({
      type: 'success',
      title: 'Đã thêm vào giỏ hàng',
      message: `${product.name} đã được thêm vào giỏ hàng của bạn.`,
      action: null,
    })
  }

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="section-tag">Sản phẩm</span>
          <h1 className="page-hero-title">
            Danh Mục <em>Vàng Mã</em>
          </h1>
          <div className="page-hero-meta">
            <span className="page-chip">{products.length} sản phẩm</span>
            <span className="page-chip">3 nhóm chính</span>
            <span className="page-chip">Tư vấn theo dịp lễ</span>
            <span className="page-chip">Giao hàng toàn quốc</span>
          </div>
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <Reveal className="section-header">
            <span className="section-tag">Chọn nhanh</span>
            <h2 className="section-title">
              Bộ Sưu Tập <em>Tâm Thành</em>
            </h2>
            {notice ? (
              <div className={`cart-notice product-auth-notice cart-notice-${notice.type}`} role="alert">
                <div className="cart-notice-mark" aria-hidden="true">
                  {notice.type === 'success' ? '✓' : notice.type === 'warning' ? '!' : 'i'}
                </div>
                <div className="cart-notice-content">
                  <span>{notice.type === 'success' ? 'Thành công' : notice.type === 'warning' ? 'Cần đăng nhập' : 'Thông tin'}</span>
                  <strong>{notice.title}</strong>
                  <p>{notice.message}</p>
                  <div className="cart-notice-actions">
                    {notice.action === 'login' ? <AuthButton /> : null}
                    <button type="button" className="cart-notice-close" onClick={() => setNotice(null)}>
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </Reveal>

          <div className="products-grid">
            {products.map((product, index) => (
              <Reveal key={product.id} delay={(index % 3) * 0.1}>
                <article className="product-card">
                  <div className={`card-img ${product.imageClass}`}>
                    {product.image ? (
                      <img
                        src={resolveProductImage(product.image)}
                        alt={product.name}
                        className="card-product-image"
                        loading="lazy"
                      />
                    ) : (
                      <div className="card-img-inner">{product.icon}</div>
                    )}
                    {product.badge ? <span className="card-badge">{product.badge}</span> : null}
                  </div>
                  <div className="card-body">
                    <p className="card-cat">{product.category}</p>
                    <h3 className="card-name">{product.name}</h3>
                    <p className="card-desc">{product.description}</p>
                    <div className="card-footer">
                      <div className="card-price">
                        {product.price} <span>{product.unit}</span>
                      </div>
                      {product.isSoldOut ? (
                        <button
                          type="button"
                          className="card-btn"
                          disabled
                          style={{ opacity: 0.5, cursor: 'not-allowed' }}
                        >
                          Hết hàng
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="card-btn"
                          onClick={() => handleAddToCart(product)}
                        >
                          Thêm vào giỏ
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductsPage
