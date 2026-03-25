import Reveal from '../components/Reveal.jsx'
import { contactCards } from '../data/siteData.js'

const highlights = [
  {
    title: 'Đóng gói theo mâm lễ',
    copy: 'Tách từng bộ theo gia tiên, nhà thờ họ hoặc từng mộ phần để tránh nhầm lẫn.',
  },
  {
    title: 'Tư vấn đúng dịp',
    copy: 'Từ giỗ chạp, Thanh Minh đến Rằm tháng 7, mỗi dịp đều có gợi ý vật phẩm riêng.',
  },
  {
    title: 'Giao nhanh toàn quốc',
    copy: 'Phù hợp cho khách cần đặt trọn bộ lễ vật từ xa mà vẫn muốn được hướng dẫn cẩn thận.',
  },
]

function ContactPage() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="section-tag">✦ Liên hệ ✦</span>
          <h1 className="page-hero-title">
            Nhận Tư Vấn <em>Theo Từng Dịp Lễ</em>
          </h1>
          <p className="page-hero-copy">
            Trang liên hệ độc lập giúp gom thông tin showroom, hotline, email và form tư vấn vào một nơi,
            thay vì để rải rác cuối landing page.
          </p>
        </div>
      </section>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <Reveal className="section-header" delay={0.05}>
                <span className="section-tag">✦ Kênh hỗ trợ ✦</span>
                <h2 className="section-title">
                  Nói Chuyện Với <em>Người Có Nghề</em>
                </h2>
                <p className="section-copy">
                  Bạn có thể dùng trang này như điểm chốt CTA chính cho toàn bộ website.
                </p>
              </Reveal>

              <div className="contact-grid" style={{ gridTemplateColumns: '1fr', gap: '20px' }}>
                {contactCards.map((card, index) => (
                  <Reveal key={card.title} delay={index * 0.12}>
                    <article className="contact-card">
                      <div className="contact-card-body">
                        <div className="contact-kicker">{card.kicker}</div>
                        <h3 className="contact-card-title">{card.title}</h3>
                        <div className="contact-card-value">{card.value}</div>
                        <p className="contact-card-copy">{card.copy}</p>
                        <span className="contact-link">{card.action}</span>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.12}>
              <div className="contact-form">
                <h2 className="section-title">
                  Gửi Yêu Cầu <em>Tư Vấn</em>
                </h2>
                <p className="contact-copy">
                  Form hiện là giao diện tĩnh. Nếu muốn, bước tiếp theo có thể nối sang email,
                  Google Sheets hoặc backend nhận đơn thật.
                </p>

                <form className="contact-form-grid">
                  <div className="field">
                    <label htmlFor="name">Họ tên</label>
                    <input id="name" name="name" type="text" placeholder="Nguyễn Văn A" />
                  </div>
                  <div className="field">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input id="phone" name="phone" type="tel" placeholder="0901 234 567" />
                  </div>
                  <div className="field-full">
                    <label htmlFor="occasion">Dịp lễ cần chuẩn bị</label>
                    <input
                      id="occasion"
                      name="occasion"
                      type="text"
                      placeholder="Ví dụ: Thanh Minh, giỗ đầu, Rằm tháng 7"
                    />
                  </div>
                  <div className="field-full">
                    <label htmlFor="message">Nhu cầu cụ thể</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      placeholder="Cần tư vấn số lượng, ngân sách và danh sách vật phẩm"
                    />
                  </div>
                  <div className="field-full">
                    <button type="submit" className="contact-submit">
                      Gửi yêu cầu
                    </button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>

          <div className="contact-highlights">
            {highlights.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.1}>
                <article className="highlight-card">
                  <h3 className="highlight-title">{item.title}</h3>
                  <p className="highlight-copy">{item.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage