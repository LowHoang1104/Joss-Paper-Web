import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import heroLotus from '../assets/Gemini_Generated_Image_ubb6dqubb6dqubb6-Photoroom.png'
import { blogPosts, pillars, products } from '../data/siteData.js'

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
            <p className="hero-eyebrow">Kính thiên - Lễ tổ - Tâm thành</p>
            <h1 className="hero-title">
              Tâm Thành
              <br />
              <em>Lễ Vật</em>
              <span className="hanzi-title">Tâm Thành Tỏa Sáng</span>
            </h1>
            <p className="hero-sub">
              Mỗi lễ vật được chọn lọc kỳ công, gửi gắm lòng thành kính đến đấng sinh
              thành và tổ tiên, nhưng trình bày theo ngôn ngữ thị giác đậm chất xưởng
              nghề hơn thay vì một landing page quá gọn gàng.
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
              <div className="ritual-note-kicker">Từ xưởng Đông Hồ</div>
              <h2 className="ritual-note-title">Không bán sự phô trương, chỉ giữ đúng khí chất lễ.</h2>
              <p className="ritual-note-copy">
                Giấy dó, mực in, sắc đỏ son và nhịp điệu khói hương được xử lý như chất liệu
                thị giác chính để giao diện bớt cảm giác dựng theo công thức.
              </p>
              <div className="ritual-note-meta">
                <span>Nhóm khởi nghiệp 2026</span>
                <span>Tập trung dòng mini</span>
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
              <p className="section-copy section-copy-left">
                Trang chủ không còn dàn mọi thứ đều nhau. Tôi đẩy nó về hướng giống một
                trang giới thiệu thương hiệu thủ công, nơi từng block có trọng lượng thị giác riêng.
              </p>
              <div className="ornament ornament-left">
                <div className="ornament-line" />
                <span className="ornament-sym">✦</span>
                <div className="ornament-line" />
              </div>
            </Reveal>

            <Reveal className="section-marginalia" delay={0.12}>
              <span className="section-marginalia-label">Ghi chú xưởng</span>
              <p>
                Sản phẩm chính được đặt như một “tấm áp phích” lớn, còn hai món còn lại đóng vai
                trò vệ tinh để giao diện có nhịp lên xuống thay vì lưới 3 cột quá quen tay.
              </p>
            </Reveal>
          </div>

          <div className="products-grid products-grid-featured">
            <Reveal className="product-spotlight-shell" delay={0.04}>
              <article className="product-card product-card-spotlight">
                <div className={`card-img card-img-tall ${spotlightProduct.imageClass}`}>
                  {spotlightProduct.image ? (
                    <img
                      src={spotlightProduct.image}
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
                    <Link to="/products" className="card-btn">
                      Xem bộ sưu tập
                    </Link>
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
                        src={product.image}
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
                      <Link to="/products" className="card-btn">
                        Xem thêm
                      </Link>
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

      <section className="section about-section">
        <div className="container story-grid">
          <Reveal>
            <div className="about-panel">
              <div className="about-frame">
                <div className="about-frame-symbol">Vàng Mã Mini</div>
                <div className="about-frame-glow" />
              </div>
            </div>
          </Reveal>

          <Reveal className="about-content" delay={0.15}>
            <span className="section-tag">✦ Câu Chuyện Thương Hiệu ✦</span>
            <h2 className="section-title">
              Giữ Nghề Tổ,
              <br />
              <em>Nhưng Điều Hướng Rõ Ràng Hơn</em>
            </h2>
            <p className="about-lead">
              "Một nén nhang thơm, một tờ vàng mã là cầu nối giữa hai thế giới; còn
              một website nhiều trang là cầu nối rõ ràng hơn giữa nội dung và người xem."
            </p>
            <p className="about-body">
              Tôi đã tách phần giới thiệu, sản phẩm, bài viết và liên hệ thành các route
              riêng để thay cho kiểu cuộn một trang và nhảy bằng anchor. Điều đó giúp mở
              rộng nội dung sau này dễ hơn, đồng thời điều hướng cũng tự nhiên hơn trên di động.
            </p>
            <div className="about-pillars">
              {pillars.map((pillar) => (
                <div key={pillar.title} className="pillar">
                  <div className="pillar-title">{pillar.title}</div>
                  <p className="pillar-text">{pillar.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section quote-ribbon-section">
        <div className="container">
          <Reveal className="quote-ribbon">
            <div className="quote-ribbon-mark">Lễ</div>
            <p>
              “Đẹp” ở đây không đến từ việc thêm nhiều hiệu ứng, mà từ cảm giác có bàn tay người,
              có nhịp điệu bố cục và có chỗ thở giữa các mảng nội dung.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section blog-section">
        <div className="container">
          <div className="section-lead-grid section-lead-grid-blog">
            <Reveal className="section-header section-header-left">
              <span className="section-tag">✦ Kiến Thức & Văn Hóa ✦</span>
              <h2 className="section-title">
                Tâm Linh <em>Đời Sống</em>
              </h2>
            </Reveal>

            <Reveal className="section-marginalia section-marginalia-blog" delay={0.1}>
              <span className="section-marginalia-label">Biên tập</span>
              <p>
                Bố cục blog được giữ chất trang trọng, nhưng có thêm cảm giác tạp chí văn hóa thay vì khối thẻ lặp lại.
              </p>
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