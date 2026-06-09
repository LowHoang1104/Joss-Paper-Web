import { useState } from 'react'
import Reveal from '../components/Reveal.jsx'
import { products } from '../data/siteData.js'

const googleSheetUrl = 'https://script.google.com/macros/s/AKfycbx7eoRUN8z4O4KWbyAkTPHh8XuH7G_Y2W-RIp2iz4RXTGWyzvHELJWW0UtnbC1SH1Y0vg/exec?key=123123'

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
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    occasion: '',
    message: '',
  })
  const [submitStatus, setSubmitStatus] = useState('')

  const openBuyForm = (product) => {
    setSelectedProduct(product)
    setFormValues({
      name: '',
      phone: '',
      occasion: '',
      message: `Tôi muốn mua sản phẩm: ${product.name}`,
    })
    setSubmitStatus('')
  }

  const closeBuyForm = () => {
    setSelectedProduct(null)
    setSubmitStatus('')
  }

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!selectedProduct) return

    const payload = {
      product: selectedProduct.name,
      name: formValues.name,
      phone: formValues.phone,
      occasion: formValues.occasion,
      message: formValues.message,
    }

    try {
      const urlWithParams = `${googleSheetUrl}&${new URLSearchParams(payload).toString()}`
      await fetch(urlWithParams)
      setSubmitStatus('Gửi thành công! Chúng tôi sẽ liên hệ bạn sớm.')
    } catch (error) {
      setSubmitStatus('Không gửi được. Vui lòng thử lại hoặc liên hệ qua zalo.')
    }
  }

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="section-tag">✦ Sản phẩm ✦</span>
          <h1 className="page-hero-title">
            Danh Mục <em>Vàng Mã</em>
          </h1>
          <p className="page-hero-copy">
          </p>
          <div className="page-hero-meta">
            <span className="page-chip">19 sản phẩm</span>
            <span className="page-chip">3 nhóm chính</span>
            <span className="page-chip">Tư vấn theo dịp lễ</span>
            <span className="page-chip">Giao hàng toàn quốc</span>
          </div>
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <Reveal className="section-header">
            <span className="section-tag">✦ Chọn nhanh ✦</span>
            <h2 className="section-title">
              Bộ Sưu Tập <em>Tâm Thành</em>
            </h2>
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
                      <button
                        type="button"
                        className="card-btn"
                        onClick={() => openBuyForm(product)}
                      >
                        Mua
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct ? (
        <div className="product-modal-overlay" onClick={closeBuyForm}>
          <div className="product-modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="product-modal-close" onClick={closeBuyForm}>
              ×
            </button>
            <h2 className="section-title">Mua sản phẩm <em>{selectedProduct.name}</em></h2>
            <p className="contact-copy">Điền thông tin và chúng tôi sẽ liên hệ sớm nhất.</p>
            <form className="contact-form-grid" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="buy-name">Họ tên</label>
                <input
                  id="buy-name"
                  name="name"
                  type="text"
                  value={formValues.name}
                  onChange={handleFieldChange}
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="buy-phone">Số điện thoại</label>
                <input
                  id="buy-phone"
                  name="phone"
                  type="tel"
                  value={formValues.phone}
                  onChange={handleFieldChange}
                  placeholder="0901 234 567"
                  required
                />
              </div>
              <div className="field-full">
                <label htmlFor="buy-occasion">Dịp lễ cần chuẩn bị</label>
                <input
                  id="buy-occasion"
                  name="occasion"
                  type="text"
                  value={formValues.occasion}
                  onChange={handleFieldChange}
                  placeholder="Ví dụ: Thanh Minh, giỗ đầu, Rằm tháng 7"
                />
              </div>
              <div className="field-full">
                <label htmlFor="buy-message">Nhu cầu cụ thể</label>
                <textarea
                  id="buy-message"
                  name="message"
                  rows="5"
                  value={formValues.message}
                  onChange={handleFieldChange}
                  placeholder="Ví dụ: muốn gói combo, cần thêm nhang và vàng miếng"
                />
              </div>
              <div className="field-full">
                <button type="submit" className="contact-submit">
                  Gửi thông tin mua hàng
                </button>
              </div>
              {submitStatus ? <p className="submit-status">{submitStatus}</p> : null}
            </form>
            <p className="contact-copy" style={{ marginTop: '18px' }}>
              Dữ liệu đơn hàng sẽ gửi trực tiếp tới Google Sheets qua webhook Google Apps Script đã cài sẵn.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ProductsPage