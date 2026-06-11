import Reveal from '../components/Reveal.jsx'
import { rituals } from '../data/siteData.js'
import dongSonDrumImage from '../assets/( Anhpng.com ) - TRỐNG ĐỒNG 06 (Custom).webp'

function AboutPage() {
  return (
    <div className="page-shell">
      <section className="page-hero">
        <div className="container page-hero-content">
          <span className="section-tag">✦ Về chúng tôi ✦</span>
          <h1 className="page-hero-title">
            Việt Mã
            <br />
            <em>Giữa truyền thống</em>
            <br />
            <em>và</em>
            <br />            <em>đời sống đô thị</em>
            
          </h1>
          <p className="page-hero-copy">
            Một thương hiệu lối sống tinh thần giúp người Việt duy trì nghi lễ truyền thống theo
            cách phù hợp hơn với nhịp sống đô thị: tinh tế, an toàn và vẫn giữ trọn giá trị tinh thần.
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
              <div className="about-frame">
                <div className="about-frame-glow" />
              </div>
            </div>
          </Reveal>

          <Reveal className="about-content" delay={0.12}>
            <span className="section-tag">✦ Thương hiệu ✦</span>
            <h2 className="section-title">
              Tên Thương Hiệu
              <br />
              <em>Việt Mã</em>
            </h2>

            <div className="about-story-stack">
              <article className="about-story-block about-summary-card">
                <div className="story-block-label">Cốt lõi thương hiệu</div>
                <h3 className="story-summary-title">Việt Mã giúp nghi thức tâm linh trở nên vừa trang trọng, vừa phù hợp với đời sống đô thị.</h3>
                <p className="story-block-copy">
                  Chúng tôi kết hợp giá trị truyền thống với trải nghiệm lễ nghi gọn gàng, an toàn và dễ áp dụng.
                </p>
                <ul className="story-block-list story-block-list-compact">
                  <li>Giữ gìn tín ngưỡng Việt Nam</li>
                  <li>Thực hành nghi lễ an toàn trong đô thị</li>
                  <li>Trải nghiệm nhẹ nhàng, vẫn đủ trang nghiêm</li>
                </ul>
              </article>

              <article className="about-story-block about-grid-block">
                <div className="story-block-label">Ý nghĩa tên gọi</div>
                <p className="story-block-copy">
                  <strong>Việt</strong> là văn hoá, là tâm thức và bản sắc người Việt.
                </p>
                <p className="story-block-copy">
                  <strong>Mã</strong> là nghi lễ vàng mã, là kết nối giữa người sống và tổ tiên.
                </p>
                <p className="story-block-copy story-block-emphasis">
                  Việt Mã chính là điểm gặp gỡ giữa truyền thống và giải pháp lễ nghi hiện đại.
                </p>
              </article>

              <article className="about-story-block about-grid-block">
                <div className="story-block-label">Câu chuyện thương hiệu</div>
                <p className="story-block-copy">
                  Khi đô thị thay đổi, nghi lễ truyền thống vẫn cần được giữ gìn. Nhưng không gian nhỏ, thời gian hạn chế
                  và an toàn bắt buộc khiến cách thực hành cũ không còn phù hợp.
                </p>
                <p className="story-block-copy story-block-emphasis">
                  Việt Mã ra đời để giữ trọn niềm tin, đồng thời làm cho nghi lễ trở nên gọn gàng, dễ nhớ và đầy ý nghĩa.
                </p>
              </article>

              <div className="about-card-grid">
                <article className="story-card">
                  <div className="story-card-label">Tầm nhìn</div>
                  <p className="story-card-copy">
                    Xây dựng một lối sống tâm linh hiện đại, nơi nghi lễ truyền thống được gìn giữ bằng cách sống văn minh và an toàn.
                  </p>
                </article>

                <article className="story-card">
                  <div className="story-card-label">Sứ mệnh</div>
                  <p className="story-card-copy">
                    Giúp người Việt duy trì nghi lễ truyền thống theo cách phù hợp với đời sống đô thị: trọn tâm, trang nghiêm và tinh gọn.
                  </p>
                  <ul className="story-block-list story-block-list-compact">
                    <li>Giữ gìn nghi lễ</li>
                    <li>An toàn và văn minh</li>
                    <li>Phù hợp không gian nhỏ</li>
                  </ul>
                </article>

                <article className="story-card">
                  <div className="story-card-label">Giá trị cốt lõi</div>
                  <ul className="story-block-list story-block-list-compact">
                    <li>Tôn trọng tín ngưỡng</li>
                    <li>Thực hành văn minh</li>
                    <li>Đơn giản nhưng trang trọng</li>
                    <li>Kết nối gia đình</li>
                  </ul>
                </article>
              </div>
            </div>
          </Reveal>
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
