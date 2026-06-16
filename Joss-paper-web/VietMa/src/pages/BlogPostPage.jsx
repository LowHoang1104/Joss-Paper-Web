import { Link, useParams } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import { blogPosts } from '../data/siteData.js'

function renderBlock(block, idx) {
  switch (block.type) {
    case 'heading':
      return <h2 key={idx} className="bpp-heading">{block.text}</h2>
    case 'subheading':
      return <h3 key={idx} className="bpp-subheading">{block.text}</h3>
    case 'paragraph':
      return <p key={idx} className="bpp-para">{block.text}</p>
    case 'list':
      return (
        <ul key={idx} className="bpp-list">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )
    default:
      return null
  }
}

function BlogPostPage() {
  const { id } = useParams()
  const post = blogPosts.find((p) => p.id === id)
  const related = blogPosts.filter((p) => p.id !== id).slice(0, 3)

  if (!post) {
    return (
      <div className="page-shell">
        <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
          <h1>Bài viết không tồn tại</h1>
          <Link to="/blog" className="bpp-back">← Quay lại Kiến Thức</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-shell">
      {/* Hero banner */}
      <div className="bpp-hero" style={{ background: post.imageStyle }}>
        <div className="container bpp-hero-inner">
          <Link to="/blog" className="bpp-back-hero">← Kiến Thức</Link>
          <span className="bpp-cat-badge">{post.category}</span>
          <h1 className="bpp-hero-title">{post.title}</h1>
          <div className="bpp-hero-meta">
            <span>{post.label}</span>
            <span>·</span>
            <span>{post.date}</span>
          </div>
        </div>
      </div>

      <div className="container bpp-layout">
        {/* Article body */}
        <article className="bpp-article">
          <p className="bpp-lead">{post.excerpt}</p>
          <hr className="bpp-divider" />
          {post.content
            ? post.content.map((block, idx) => renderBlock(block, idx))
            : <p className="bpp-para">Nội dung đang được cập nhật.</p>
          }
        </article>

        {/* Sidebar — related posts */}
        <aside className="bpp-sidebar">
          <Reveal>
            <p className="bpp-sidebar-label">✦ Bài viết khác</p>
            <nav className="bpp-related">
              {related.map((r) => (
                <Link key={r.id} to={`/blog/${r.id}`} className="bpp-related-item">
                  <div>
                    <span className="bpp-related-cat">{r.category}</span>
                    <p className="bpp-related-title">{r.title}</p>
                    <span className="bpp-related-date">{r.date}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </Reveal>
        </aside>
      </div>
    </div>
  )
}

export default BlogPostPage
