import { Link } from 'react-router-dom'
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
            Góc nhìn về văn hoá thờ cúng, nếp nhà và nghi lễ truyền thống Việt
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
              <Link to={`/blog/${featuredPost.id}`} className="post-card featured post-card--link post-card--noimg">
                <div className="post-body">
                  <div className="post-meta">
                    <span className="cat">{featuredPost.category}</span>
                    <span>·</span>
                    <span>{featuredPost.date}</span>
                  </div>
                  <h3 className="post-title">{featuredPost.title}</h3>
                  <p className="post-excerpt">{featuredPost.excerpt}</p>
                  <span className="post-link">Đọc bài viết →</span>
                </div>
              </Link>
            </Reveal>

            {otherPosts.map((post, index) => (
              <Reveal key={post.id} delay={index * 0.12}>
                <Link to={`/blog/${post.id}`} className="post-card post-card--link post-card--noimg">
                  <div className="post-body">
                    <div className="post-meta">
                      <span className="cat">{post.category}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <span className="post-link">Đọc thêm →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage