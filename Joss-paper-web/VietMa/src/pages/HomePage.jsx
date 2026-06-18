import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import heroLotus from '../assets/Gemini_Generated_Image_ubb6dqubb6dqubb6-Photoroom.png'
import { blogPosts, products } from '../data/siteData.js'

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

const embers = Array.from({ length: 28 }, (_, index) => {
  const size = 2 + ((index * 17) % 4)

  return {
    id: `ember-${index}`,
    left: `${(index * 13.7) % 100}%`,
    size,
    opacity: 0.24 + (index % 6) * 0.1,
    duration: `${5 + (index % 8)}s`,
    delay: `${(index % 7) * 0.9}s`,
    background: index % 2 === 0 ? '#e8c76a' : '#c9972b',
  }
})

const floatingOrnaments = Array.from({ length: 24 }, (_, index) => {
  const isLotus = index % 7 === 0 || index % 11 === 0

  return {
    id: `ornament-${index}`,
    type: isLotus ? 'lotus' : 'dust',
    left: `${(index * 11.3 + (isLotus ? 7 : 0)) % 100}%`,
    size: isLotus ? 40 + (index % 4) * 14 : 4 + (index % 5) * 2,
    opacity: isLotus ? 0.2 + (index % 3) * 0.08 : 0.16 + (index % 6) * 0.07,
    duration: `${12 + (index % 6) * 2}s`,
    delay: `${(index % 8) * 1.15}s`,
    driftX: `${-32 + (index % 7) * 11}px`,
    spin: `${-24 + (index % 6) * 9}deg`,
  }
})

function HomePage() {
  const featuredProducts = products.slice(0, 3)
  const featuredPosts = blogPosts.slice(0, 3)
  const spotlightProduct = featuredProducts[0]
  const supportingProducts = featuredProducts.slice(1)

  return (
    <div className="page-shell">
      <section className="hero">
        <div className="embers" aria-hidden="true">
          {embers.map((ember) => (
            <span
              key={ember.id}
              className="ember"
              style={{
                left: ember.left,
                width: `${ember.size}px`,
                height: `${ember.size}px`,
                opacity: ember.opacity,
                animationDuration: ember.duration,
                animationDelay: ember.delay,
                background: ember.background,
              }}
            />
          ))}
        </div>

        <div className="hero-particle-field" aria-hidden="true">
          {floatingOrnaments.map((particle) => (
            <span
              key={particle.id}
              className={`hero-particle hero-particle-${particle.type}`}
              style={{
                left: particle.left,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                animationDuration: particle.duration,
                animationDelay: particle.delay,
                backgroundImage: particle.type === 'lotus' ? `url(${heroLotus})` : undefined,
                '--drift-x': particle.driftX,
                '--particle-spin': particle.spin,
              }}
            />
          ))}
        </div>

        <div className="hero-inner hero-editorial">
          <div className="hero-main">
            <p className="hero-eyebrow">Việt Mã</p>
            <h1 className="hero-title">
              Việt Mã
              <br />
              <em>Giữ trọn lòng thành</em>
              <span className="hanzi-title">Sự an tâm trong nghi lễ hiện đại</span>
            </h1>
            <p className="hero-sub">
              Việt Mã là giải pháp giúp người Việt duy trì nghi lễ truyền thống theo cách
              phù hợp với cuộc sống đô thị: gọn gàng, an toàn và vẫn giữ trọn giá trị tâm linh.
            </p>
            <div className="hero-actions hero-actions-left">
              <Link to="/products" className="btn-primary">
                Khám Phá Sản Phẩm
              </Link>
              <Link to="/about" className="btn-ghost">
                Câu Chuyện Của Chúng Tôi
              </Link>
            </div>
          </div>

          <Reveal className="hero-side" delay={0.25}>
            <div className="ritual-note">
              <div className="ritual-note-kicker">Giải pháp ritual cho đô thị</div>
              <h2 className="ritual-note-title">Chúng tôi không chỉ bán vàng mã mà còn bán sự an tâm.</h2>
              <p className="ritual-note-copy">
                Việt Mã thiết kế sản phẩm và trải nghiệm để bạn thực hành nghi lễ đầy đủ
                và an tâm trong không gian nhỏ: ít khói, an toàn và thẩm mỹ.
              </p>
              <div className="ritual-note-meta">
                <span>Combo chuẩn nghi lễ</span>
                <span>Hướng dẫn & tư vấn</span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="hero-caption-band" aria-hidden="true">
          <span>Việt</span>
          <span>Mã</span>
          <span>Tâm Thành</span>
          <span>Gia Lễ</span>
          <span>Đông Hồ</span>
          <span>Lễ Nghi</span>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span>Khám phá</span>
          <div className="scroll-line" />
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <div className="section-lead-grid">
            <Reveal className="section-header section-header-left">
              <span className="section-tag">✦ Lễ Vật Tinh Tuyển ✦</span>
              <h2 className="section-title">
                Danh Mục <em>Nổi Bật</em>
              </h2>
              
              <div className="ornament ornament-left">
                <div className="ornament-line" />
                <span className="ornament-sym">✦</span>
                <div className="ornament-line" />
              </div>
            </Reveal>

    
          </div>

          <div className="products-grid products-grid-featured">
            <Reveal className="product-spotlight-shell" delay={0.04}>
              <article className="product-card product-card-spotlight">
                <div className={`card-img card-img-tall ${spotlightProduct.imageClass}`}>
                  {spotlightProduct.image ? (
                    <img
                      src={resolveProductImage(spotlightProduct.image)}
                      alt={spotlightProduct.name}
                      className="card-product-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="card-img-inner">{spotlightProduct.icon}</div>
                  )}
                  {spotlightProduct.badge ? (
                    <span className="card-badge">{spotlightProduct.badge}</span>
                  ) : null}
                  <div className="card-watermark">Việt Mã</div>
                </div>
                <div className="card-body card-body-spotlight">
                  <div>
                    <p className="card-cat">{spotlightProduct.category}</p>
                    <h3 className="card-name card-name-large">{spotlightProduct.name}</h3>
                    <p className="card-desc card-desc-large">{spotlightProduct.description}</p>
                  </div>
                  <div className="card-footer card-footer-stack">
                    <div className="card-price card-price-large">
                      {spotlightProduct.price} <span>{spotlightProduct.unit}</span>
                    </div>
                    {spotlightProduct.isSoldOut ? (
                      <button
                        type="button"
                        className="card-btn"
                        disabled
                        style={{ opacity: 0.5, cursor: 'not-allowed' }}
                      >
                        Hết hàng
                      </button>
                    ) : (
                      <Link to="/products" className="card-btn">
                        Xem bộ sưu tập
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>

            {supportingProducts.map((product, index) => (
              <Reveal
                key={product.id}
                className={`product-support-shell product-support-shell-${index + 1}`}
                delay={(index + 1) * 0.12}
              >
                <article className="product-card product-card-supporting">
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
                        <Link to="/products" className="card-btn">
                          Xem thêm
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="section-actions">
            <Link to="/products" className="btn-primary">
              Vào Trang Sản Phẩm
            </Link>
          </div>
        </div>
      </section>

      {/* Brand story moved to About page */}

      

      <section className="section blog-section">
        <div className="container">
          <div className="section-lead-grid section-lead-grid-blog">
            <Reveal className="section-header section-header-left">
              <span className="section-tag">✦ Kiến Thức & Văn Hóa ✦</span>
              <h2 className="section-title">
                Tâm Linh <em>Đời Sống</em>
              </h2>
            </Reveal>

            
          </div>

          <div className="blog-grid">
            {featuredPosts.map((post, index) => (
              <Reveal
                key={post.id}
                delay={index * 0.12}
                className={post.featured ? 'featured-post' : ''}
              >
                <article className={`post-card ${post.featured ? 'featured' : ''}`}>
                  <div className="post-img" style={{ background: post.imageStyle }}>
                    <div className="post-img-label">{post.label}</div>
                  </div>
                  <div className="post-body">
                    <div className="post-meta">
                      <span className="cat">{post.category}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <Link to="/blog" className="post-link">
                      Đọc trong trang kiến thức
                    </Link>
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

export default HomePage