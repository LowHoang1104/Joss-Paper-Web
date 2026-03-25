import Reveal from '../components/Reveal.jsx'
import { blogPosts } from '../data/siteData.js'

function BlogPage() {
  const [featuredPost, ...otherPosts] = blogPosts

  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="section-tag">✦ Kiến thức ✦</span>
          <h1 className="page-hero-title">
            Tâm Linh <em>Đời Sống</em>
          </h1>
          <p className="page-hero-copy">
            Thay vì nằm cuối landing page, toàn bộ phần bài viết giờ đã có trang riêng để bạn
            phát triển thành thư viện nội dung, lịch lễ và hướng dẫn nghi thức theo mùa vụ.
          </p>
        </div>
      </section>

      <section className="section blog-section">
        <div className="container">
          <Reveal className="section-header">
            <span className="section-tag">✦ Bài viết chọn lọc ✦</span>
            <h2 className="section-title">
              Góc Nhìn <em>Văn Hóa Việt</em>
            </h2>
          </Reveal>

          <div className="blog-grid">
            <Reveal>
              <article className="post-card featured">
                <div className="post-img" style={{ background: featuredPost.imageStyle }}>
                  <div className="post-img-label">{featuredPost.label}</div>
                </div>
                <div className="post-body">
                  <div className="post-meta">
                    <span className="cat">{featuredPost.category}</span>
                    <span>·</span>
                    <span>{featuredPost.date}</span>
                  </div>
                  <h3 className="post-title">{featuredPost.title}</h3>
                  <p className="post-excerpt">{featuredPost.excerpt}</p>
                  <span className="post-link">Bài nổi bật</span>
                </div>
              </article>
            </Reveal>

            {otherPosts.map((post, index) => (
              <Reveal key={post.id} delay={index * 0.12}>
                <article className="post-card">
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
                    <span className="post-link">Đọc sau</span>
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

export default BlogPage