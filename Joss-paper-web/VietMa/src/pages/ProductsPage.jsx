import Reveal from '../components/Reveal.jsx'
import { products } from '../data/siteData.js'

const resolveProductImage = (image) => {
  if (!image) return null
  if (image.startsWith('http') || image.startsWith('/')) return image
  return new URL(image, import.meta.url).href
}

function ProductsPage() {
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
            <span className="page-chip">18 sản phẩm</span>
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
                      <span className="card-btn">Xem thêm</span>
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