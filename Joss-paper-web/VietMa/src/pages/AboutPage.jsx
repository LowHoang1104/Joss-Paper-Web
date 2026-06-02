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
            <em>Giữa truyền thống và đời sống hiện đại</em>
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
              <article className="about-story-block">
                <div className="story-block-label">Tên thương hiệu</div>
                <p className="story-block-copy">
                  <strong>Việt</strong> đại diện cho văn hóa, truyền thống và bản sắc người Việt.
                  <br />
                  <strong>Mã</strong> là biểu tượng của vàng mã, tín ngưỡng tâm linh và sự kết nối
                  giữa người sống với tổ tiên.
                </p>
                <p className="story-block-copy story-block-emphasis">
                  Việt Mã không chỉ đại diện cho sản phẩm vàng mã. Thương hiệu được định vị như
                  một giải pháp tâm linh hiện đại, giúp người Việt duy trì nghi lễ truyền thống theo
                  cách phù hợp hơn với cuộc sống đô thị ngày nay.
                </p>
              </article>

              <article className="about-story-block">
                <div className="story-block-label">Brand story</div>
                <p className="story-block-copy">
                  Trong nhiều thế hệ, đốt vàng mã là một phần trong đời sống tín ngưỡng của người Việt.
                  Đó không chỉ là một nghi thức, mà là sự tưởng nhớ, lòng hiếu kính, cảm giác kết nối với
                  tổ tiên và niềm tin về sự bình an, đủ đầy.
                </p>
                <p className="story-block-copy">
                  Nhưng cuộc sống hiện đại đang thay đổi cách con người sinh hoạt: căn hộ nhỏ hơn,
                  quy định an toàn nghiêm ngặt hơn, con người bận rộn hơn và không gian sống đô thị
                  ngày càng hạn chế.
                </p>
                <p className="story-block-copy">
                  Người Việt không muốn từ bỏ tín ngưỡng. Họ chỉ không còn phù hợp với cách thực hành cũ.
                  Việt Mã ra đời để giải quyết khoảng cách đó: không thay đổi giá trị truyền thống, mà tái
                  thiết kế trải nghiệm nghi lễ gọn hơn, an toàn hơn, tinh tế hơn, nhưng vẫn giữ trọn giá trị
                  tinh thần.
                </p>
                <p className="story-block-copy story-block-emphasis">
                  Việt Mã tin rằng: lộc không nằm ở số lượng vàng mã được đốt, mà nằm ở sự chỉn chu,
                  thành tâm và cảm giác đủ đầy trong nghi lễ.
                </p>
              </article>

              <article className="about-story-block">
                <div className="story-block-label">Vision</div>
                <p className="story-block-copy story-block-emphasis">
                  Trở thành thương hiệu tiên phong trong lĩnh vực lối sống tinh thần tại Việt Nam, giúp
                  thế hệ hiện đại duy trì kết nối văn hóa và tín ngưỡng theo cách văn minh, tinh tế và
                  bền vững hơn.
                </p>
              </article>

              <article className="about-story-block">
                <div className="story-block-label">Mission</div>
                <p className="story-block-copy">Giúp người Việt:</p>
                <ul className="story-block-list">
                  <li>duy trì nghi lễ truyền thống</li>
                  <li>cảm thấy an tâm khi thực hành tín ngưỡng</li>
                  <li>cân bằng giữa đời sống hiện đại và giá trị văn hóa</li>
                </ul>
                <p className="story-block-copy">
                  Thông qua sản phẩm ritual hiện đại, trải nghiệm tâm linh tinh gọn và giải pháp phù hợp
                  không gian sống đô thị.
                </p>
              </article>

              <article className="about-story-block">
                <div className="story-block-label">Core Values</div>
                <ul className="story-block-list">
                  <li>Tôn trọng giá trị tín ngưỡng Việt</li>
                  <li>Thích nghi với đời sống hiện đại</li>
                  <li>Mang lại cảm giác an tâm trong nghi lễ</li>
                  <li>Đơn giản, gọn gàng, an toàn</li>
                  <li>Kết nối gia đình và giá trị tinh thần</li>
                  <li>Hướng tới trải nghiệm tâm linh văn minh hơn</li>
                </ul>
              </article>
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
