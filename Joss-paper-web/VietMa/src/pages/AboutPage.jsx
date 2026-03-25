import Reveal from '../components/Reveal.jsx'
import { pillars, rituals, timeline } from '../data/siteData.js'
import dongSonDrumImage from '../assets/( Anhpng.com ) - TRỐNG ĐỒNG 06 (Custom).webp'

function AboutPage() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="section-tag">✦ Về chúng tôi ✦</span>
          <h1 className="page-hero-title">
            Hồn Việt Trong Từng <em>Nếp Giấy</em>
          </h1>
          <p className="page-hero-copy">
            Việt Mã sinh ra từ nhịp sống làng nghề Bắc Bộ, lớn lên cùng mùi giấy dó, mực in
            và nếp cúng gia tiên của người Việt. Chúng tôi làm vàng mã bằng sự chỉn chu của
            nghề thủ công, và bằng lòng kính trọng dành cho mỗi mâm lễ trong từng mái nhà.
          </p>
        </div>
      </section>

      <section className="section deep-about-section">
        <div className="container about-grid">
          <Reveal>
            <div className="about-panel">
              <div
                className="dong-son-drum"
                style={{ '--drum-image': `url("${dongSonDrumImage}")` }}
                role="img"
                aria-label="Hoa van trong dong Dong Son"
              >
                <span className="drum-ring drum-ring-1" aria-hidden="true" />
                <span className="drum-ring drum-ring-2" aria-hidden="true" />
                <span className="drum-ring drum-ring-3" aria-hidden="true" />
                <span className="drum-ring drum-ring-4" aria-hidden="true" />
              </div>
            </div>
          </Reveal>

          <Reveal className="about-content" delay={0.12}>
            <span className="section-tag">✦ Di sản ✦</span>
            <h2 className="section-title">
              Giữ Nét Làng,
              <br />
              <em>Giữ Nếp Nhà</em>
            </h2>
            <p className="about-lead">
              "Giấy là vật, lễ là tâm. Tâm còn, nếp Việt còn."
            </p>
            <p className="about-body">
              Việt Mã là nhóm khởi nghiệp vàng mã mini lấy cảm hứng từ biểu tượng trống đồng Đông Sơn
              và tinh thần nghề thủ công Việt.
              Chúng tôi học từ tinh thần chỉn chu của thợ thủ công để tạo ra các mẫu nhỏ gọn, dễ bày lễ
              mà vẫn giữ được nét trang trọng và lòng thành kính.
            </p>
            <p className="about-body">
              Dù ở Bắc, Trung hay Nam, mỗi vùng có cách bày lễ khác nhau. Chúng tôi tư vấn theo
              phong tục từng miền để mâm cúng vẫn gọn gàng, đúng nếp và đúng lòng thành của gia chủ.
            </p>
            <div className="about-region-list">
              <span>Bắc Bộ: nền nếp, tinh tế, trọng lễ gia tiên</span>
              <span>Trung Bộ: trang nghiêm, tiết chế, coi trọng gia phong</span>
              <span>Nam Bộ: ấm cúng, tròn đầy, chuộng tình gắn kết</span>
            </div>
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

      <section className="section about-section">
        <div className="container">
          <Reveal className="section-header about-content">
            <span className="section-tag">✦ Hành trình ✦</span>
            <h2 className="section-title">
              Những Cột Mốc <em>Đáng Nhớ</em>
            </h2>
          </Reveal>
          <div className="timeline-grid">
            {timeline.map((item, index) => (
              <Reveal key={item.year} delay={index * 0.12}>
                <article className="timeline-card">
                  <div className="timeline-body">
                    <div className="timeline-kicker">{item.year}</div>
                    <h3 className="timeline-title">{item.title}</h3>
                    <p className="timeline-copy">{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section deep-about-section">
        <div className="container">
          <Reveal className="section-header about-content">
            <span className="section-tag">✦ Dịch vụ ✦</span>
            <h2 className="section-title">
              Đồng Hành Cùng <em>Nếp Lễ Việt</em>
            </h2>
          </Reveal>
          <div className="ritual-grid">
            {rituals.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.12}>
                <article className="ritual-card">
                  <div className="ritual-body">
                    <h3 className="ritual-title">{item.title}</h3>
                    <p className="ritual-copy">{item.text}</p>
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

export default AboutPage