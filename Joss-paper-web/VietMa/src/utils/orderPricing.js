/**
 * Chính sách giá bán hàng online (ship hàng) của Việt Mã.
 * Nguồn: trang Chính sách mua hàng — mục "Khách mua online".
 *
 *  1 sản phẩm  → nguyên giá
 *  2 sản phẩm  → giảm 20.000đ
 *  3 sản phẩm  → giảm 35.000đ
 *  4 sản phẩm  → giảm 50.000đ
 * ≥5 sản phẩm  → giảm 80.000đ
 * ≥20 sản phẩm → giảm 350.000đ
 *
 * Thanh toán:
 *  - Tổng < 500.000đ  → thanh toán 100% trước khi giao
 *  - Tổng ≥ 500.000đ  → thanh toán trước tối thiểu 80%, 20% còn lại khi nhận hàng
 */

export function getOnlineDiscount(itemCount) {
  if (itemCount >= 20) return 350_000
  if (itemCount >= 5) return 80_000
  if (itemCount === 4) return 50_000
  if (itemCount === 3) return 35_000
  if (itemCount === 2) return 20_000
  return 0
}

export function getOnlineDiscountLabel(itemCount) {
  if (itemCount >= 20) return 'Mua từ 20 sản phẩm — giảm 350.000đ'
  if (itemCount >= 5) return 'Mua từ 5 sản phẩm — giảm 80.000đ'
  if (itemCount === 4) return 'Mua 4 sản phẩm — giảm 50.000đ'
  if (itemCount === 3) return 'Mua 3 sản phẩm — giảm 35.000đ'
  if (itemCount === 2) return 'Mua 2 sản phẩm — giảm 20.000đ'
  return 'Mua 1 sản phẩm — nguyên giá'
}

/**
 * Tính toán giá đơn hàng online.
 *
 * @param {{ itemCount: number, subtotal: number }} params
 * @returns {{
 *   subtotal: number,
 *   discount: number,
 *   discountLabel: string,
 *   total: number,
 *   depositDue: number,
 *   remainingDue: number,
 *   paymentLabel: string,
 * }}
 */
export function calculateOrderPricing({ itemCount, subtotal }) {
  const count = Math.max(0, Number(itemCount) || 0)
  const base = Math.max(0, Number(subtotal) || 0)

  const discount = Math.min(getOnlineDiscount(count), base)
  const discountLabel = getOnlineDiscountLabel(count)
  const total = Math.max(0, base - discount)

  // Quy định thanh toán online (ship hàng)
  const depositDue = total >= 500_000 ? Math.ceil(total * 0.8) : total
  const remainingDue = Math.max(0, total - depositDue)
  const paymentLabel =
    total >= 500_000
      ? 'Thanh toán trước tối thiểu 80%, phần còn lại thanh toán khi nhận hàng'
      : 'Thanh toán trước 100% trước khi giao hàng'

  return {
    depositDue,
    discount,
    discountLabel,
    paymentLabel,
    remainingDue,
    subtotal: base,
    total,
  }
}
