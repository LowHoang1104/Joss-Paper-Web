import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

const onlineDiscounts = [
  'Mua 1 sản phẩm/đơn hàng: nguyên giá.',
  'Mua 2 sản phẩm/đơn hàng: giảm 20.000đ trên tổng giá trị đơn hàng.',
  'Mua 3 sản phẩm/đơn hàng: giảm 35.000đ trên tổng giá trị đơn hàng.',
  'Mua 4 sản phẩm/đơn hàng: giảm 50.000đ trên tổng giá trị đơn hàng.',
  'Mua từ 5 sản phẩm trở lên/đơn hàng: giảm 80.000đ trên tổng giá trị đơn hàng.',
  'Mua từ 20 sản phẩm trở lên/đơn hàng: giảm 350.000đ trên tổng giá trị đơn hàng.',
]

const pickupDiscounts = [
  'Mua dưới 5 sản phẩm/đơn hàng: giảm 20.000đ/sản phẩm.',
  'Mua từ 5 sản phẩm trở lên/đơn hàng: giảm 120.000đ trên tổng giá trị đơn hàng.',
  'Mua từ 20 sản phẩm trở lên/đơn hàng: giảm 450.000đ trên tổng giá trị đơn hàng.',
]

const partnerDiscounts = [
  'Mua dưới 50 sản phẩm/đơn hàng: tính như khách lẻ.',
  'Mua từ 50 sản phẩm trở lên/đơn hàng: giảm 800.000đ trên tổng giá trị đơn hàng.',
  'Mua từ 100 sản phẩm trở lên/đơn hàng: giảm 1.700.000đ trên tổng giá trị đơn hàng.',
  'Nếu tự đến lấy hàng trực tiếp, giảm thêm 100.000đ trên tổng giá trị đơn hàng.',
]

const paymentRules = [
  {
    title: 'Đơn hàng online phải ship hàng',
    items: [
      'Đơn hàng có tổng giá trị nhỏ hơn 500.000đ: thanh toán trước 100% trước khi giao.',
      'Đơn hàng có tổng giá trị từ 500.000đ trở lên: thanh toán trước tối thiểu 80% trước khi giao, 20% còn lại thanh toán khi nhận hàng.',
    ],
  },
  {
    title: 'Đơn hàng mua trực tiếp',
    items: ['Khách tự đến lấy hàng và thanh toán trực tiếp 100% khi mua hàng.'],
  },
  {
    title: 'Đơn đặt trước, giao sau hoặc giữ hàng',
    items: [
      'Đơn hàng nhỏ hơn 500.000đ: ngày đặt cọc tối thiểu 50% tổng giá trị đơn hàng; trước ngày giao 1 ngày thanh toán nốt phần còn lại.',
      'Đơn hàng từ 500.000đ trở lên: ngày đặt cọc tối thiểu 40%; trước ngày giao 1 ngày thanh toán ít nhất 40%; khi nhận hàng thanh toán nốt phần còn lại.',
      'Không nhận đặt trước hoặc giữ hàng quá 20 ngày.',
      'Đơn hàng chỉ được xác nhận khi đã cọc tiền và chỉ được giao khi đã hoàn tất khoản thanh toán trước ngày giao 1 ngày.',
      'Nếu khách hàng không hoàn thành khoản thanh toán trước ngày giao 1 ngày, Việt Mã sẽ không giao hàng và không hoàn tiền cọc.',
      'Nếu quá ngày giao hàng khách mới thanh toán hoặc mới phản hồi, Việt Mã sẽ tự động hủy đơn, hoàn trả khoản thanh toán trước ngày giao 1 ngày nhưng không hoàn tiền cọc.',
      'Nếu khách hàng hủy đơn sau khi đã cọc tiền, Việt Mã sẽ không hoàn tiền cọc với mọi lý do.',
    ],
  },
]

const afterSaleRules = [
  'Freeship với mọi đơn hàng.',
  'Không hỗ trợ trả hàng hoặc hoàn hàng với mọi lý do.',
  'Chỉ hỗ trợ đổi hàng với lỗi từ phía Việt Mã, gồm: giao sai loại sản phẩm, sản phẩm bị rách quá lớn hoặc bị ướt.',
  'Yêu cầu đổi hàng cần có video unbox chứng minh lỗi đến từ phía người bán.',
  'Nếu sản phẩm hỏng quá nhiều, trên 80% kích thước sản phẩm, Việt Mã hỗ trợ hoàn tiền sản phẩm bị lỗi theo giá trị sản phẩm tại thời điểm mua.',
  'Nếu đơn hàng có nhiều hơn 1 sản phẩm, Việt Mã chỉ hoàn tiền những sản phẩm lỗi trên 80%, không hoàn tiền toàn bộ đơn hàng.',
  'Với bất kỳ vấn đề, feedback hoặc khiếu nại nào, khách hàng vui lòng liên hệ Việt Mã để được hỗ trợ kịp thời và thỏa đáng.',
  'Nếu khách hàng chưa liên hệ Việt Mã nhưng đã tung tin sai khi chưa có minh chứng rõ ràng, Việt Mã xin từ chối hỗ trợ giải quyết sau đó.',
  'Việt Mã có hỗ trợ thiết kế một số mẫu mã hoặc đặt làm combo theo yêu cầu với mức phí thỏa thuận.',
]

function PolicyList({ items }) {
  return (
    <ul className="policy-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

function PolicyPage() {
  return (
    <div className="page-shell">
      <section className="page-hero policy-hero">
        <div className="container page-hero-content">
          <span className="section-tag">Chính sách mua hàng</span>
          <h1 className="page-hero-title">
            Điều Khoản <em>Đặt Hàng</em>
          </h1>
          <p className="page-hero-copy">
            Thông tin về ưu đãi, thanh toán, đặt trước, giao hàng và quy định đổi hàng tại Việt Mã.
          </p>
          <div className="page-hero-meta">
            <span className="page-chip">Freeship mọi đơn</span>
            <span className="page-chip">Thanh toán rõ ràng</span>
            <span className="page-chip">Đổi hàng theo điều kiện</span>
          </div>
        </div>
      </section>

      <section className="section policy-section">
        <div className="container">
          <Reveal className="section-header section-header-left">
            <span className="section-tag">Ưu đãi theo nhóm khách</span>
            <h2 className="section-title">
              Chính Sách <em>Giảm Giá</em>
            </h2>
          </Reveal>

          <div className="policy-card-grid">
            <article className="policy-card">
              <span className="policy-kicker">Online</span>
              <h3>Khách mua online</h3>
              <p>Áp dụng cho đơn hàng phải ship hàng.</p>
              <PolicyList items={onlineDiscounts} />
            </article>

            <article className="policy-card">
              <span className="policy-kicker">Tại xưởng</span>
              <h3>Khách mua trực tiếp</h3>
              <p>Áp dụng cho khách tự đến lấy hàng.</p>
              <PolicyList items={pickupDiscounts} />
            </article>

            <article className="policy-card">
              <span className="policy-kicker">Đối tác</span>
              <h3>Đại lý / CTV</h3>
              <p>Áp dụng cho đơn số lượng lớn hoặc hợp tác bán hàng.</p>
              <PolicyList items={partnerDiscounts} />
            </article>
          </div>

          <div className="policy-content-grid">
            <div className="policy-main">
              <Reveal className="policy-block">
                <span className="policy-kicker">Thanh toán</span>
                <h2>Quy định thanh toán</h2>
                <div className="policy-rule-stack">
                  {paymentRules.map((group) => (
                    <article className="policy-rule" key={group.title}>
                      <h3>{group.title}</h3>
                      <PolicyList items={group.items} />
                    </article>
                  ))}
                </div>
              </Reveal>

              <Reveal className="policy-block">
                <span className="policy-kicker">Sau bán hàng</span>
                <h2>Giao hàng, đổi hàng và hỗ trợ</h2>
                <PolicyList items={afterSaleRules} />
              </Reveal>
            </div>

            <aside className="policy-summary">
              <h2>Lưu ý nhanh</h2>
              <p>Đơn đặt trước chỉ được xác nhận khi đã cọc tiền theo đúng quy định.</p>
              <p>Việt Mã miễn phí vận chuyển cho mọi đơn hàng.</p>
              <p>Không hỗ trợ trả hàng/hoàn hàng, chỉ hỗ trợ đổi hàng khi lỗi đến từ Việt Mã và có video unbox.</p>
              <Link to="/products" className="btn-primary">
                Chọn sản phẩm
              </Link>
              <Link to="/cart" className="btn-ghost policy-secondary-action">
                Xem giỏ hàng
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PolicyPage
