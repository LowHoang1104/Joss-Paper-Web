import { products } from './siteData.js'

export const advisorSystemPrompt = `
Bạn là "Tư vấn viên Việt Mã", đại diện thương hiệu Việt Mã.
Mục tiêu:
- Tư vấn sản phẩm vàng mã mini theo dịp lễ và nhu cầu ngân sách.
- Giữ giọng điệu lịch sự, ấm áp, ngắn gọn, thực tế.
- Luôn ưu tiên tinh thần "đúng nếp lễ, không phô trương".

Quy tắc trả lời:
- Trả lời tiếng Việt tự nhiên, không dùng từ quá kỹ thuật.
- Nếu khách hỏi giá hoặc sản phẩm, nêu 2-3 gợi ý cụ thể.
- Nếu khách chưa rõ nhu cầu, hỏi lại 1-2 câu để chốt dịp lễ, số bộ, ngân sách.
- Khi cần chốt đơn hoặc tư vấn sâu, nhắc hotline 0901 234 567 hoặc showroom Đông Hồ.
- Không bịa chính sách ngoài dữ liệu có sẵn.
`.trim()

const welcome =
  'Việt Mã xin chào. Mình có thể tư vấn nhanh theo dịp lễ, ngân sách và số bộ cần chuẩn bị. Bạn đang chuẩn bị cho dịp nào ạ?'

const quickReplies = [
  'Gợi ý cho Thanh Minh',
  'Cho mình xem sản phẩm bán chạy',
  'Ngân sách khoảng 200k nên chọn gì?',
]

const keywordMap = {
  greeting: ['xin chao', 'chao', 'hello', 'hi', 'alo'],
  pricing: ['gia', 'bao nhieu', 'ngan sach', 'chi phi'],
  products: ['san pham', 'goi y', 'ban chay', 'danh muc', 'hang nao'],
  occasion: ['thanh minh', 'vu lan', 'ram', 'gio', 'ta', 'tet'],
  contact: ['lien he', 'hotline', 'so dien thoai', 'email', 'dia chi', 'showroom'],
  shipping: ['giao', 'ship', 'van chuyen', 'toan quoc'],
}

const formatProduct = (product) => `${product.name} (${product.price}${product.unit})`

const normalize = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim()

const includesAny = (message, phrases) => phrases.some((phrase) => message.includes(phrase))

const getTopProducts = () => products.slice(0, 3)

const productCatalogText = () => {
  const list = getTopProducts().map((item) => `- ${formatProduct(item)}`).join('\n')
  return `Một số mẫu khách hay chọn:\n${list}`
}

const contactText =
  'Bạn có thể liên hệ hotline 0901 234 567 (7:00 - 19:00) hoặc ghé showroom tại làng nghề Đông Hồ, Thuận Thành, Bắc Ninh.'

const occasionAdvice = {
  'thanh minh':
    'Với Thanh Minh, mình thường gợi ý bộ gọn mà trang nghiêm: Lễ Tiến Vàng + 1 mẫu Thần Linh. Nếu bạn đi tảo mộ nhiều phần, mình có thể tách bộ theo từng mộ để dễ chuẩn bị.',
  'ram thang 7':
    'Rằm tháng 7 nên ưu tiên bộ lễ đủ ý nghĩa nhưng tiết chế: 1 bộ Lễ Tiến Vàng và bổ sung theo số ban thờ. Nếu bạn cho mình số lượng ban thờ, mình sẽ chốt danh sách cụ thể.',
  'vu lan':
    'Dịp Vu Lan nên chọn hướng trang nghiêm, tránh quá nhiều vật phẩm. Bạn có thể bắt đầu với Lễ Tiến Vàng và cân nhắc thêm Thần Linh theo ngân sách.',
  gio:
    'Giỗ chạp gia tiên thường cần bộ lễ cân đối, không cần dàn trải. Mình gợi ý chốt theo số mâm cúng và ngân sách mỗi mâm để tối ưu hơn.',
}

const getOccasionReply = (message) => {
  if (message.includes('thanh minh')) return occasionAdvice['thanh minh']
  if (message.includes('ram thang 7') || (message.includes('ram') && message.includes('7'))) {
    return occasionAdvice['ram thang 7']
  }
  if (message.includes('vu lan')) return occasionAdvice['vu lan']
  if (message.includes('gio')) return occasionAdvice.gio
  return 'Bạn đang chuẩn bị cho dịp nào (Thanh Minh, Vu Lan, giỗ chạp, Rằm tháng 7)? Mình sẽ lên gợi ý sát nhu cầu hơn.'
}

const getProductSpecificReply = (message) => {
  const exact = products.find((product) => message.includes(normalize(product.name)))
  if (!exact) return null

  return `${exact.name} thuộc nhóm ${exact.category.toLowerCase()}, mức ${exact.price}${exact.unit}. ${exact.description}`
}

export const advisorBootstrap = {
  welcome,
  quickReplies,
}

export function generateAdvisorReply(rawMessage) {
  const message = normalize(rawMessage || '')

  if (!message) {
    return 'Bạn gửi giúp mình dịp lễ hoặc ngân sách dự kiến, mình tư vấn ngay gói phù hợp.'
  }

  if (includesAny(message, keywordMap.greeting)) {
    return `${welcome} ${productCatalogText()}`
  }

  const productSpecific = getProductSpecificReply(message)
  if (productSpecific) {
    return `${productSpecific} Nếu cần, mình gợi ý thêm mẫu đi kèm để thành bộ lễ trọn vẹn.`
  }

  if (includesAny(message, keywordMap.pricing)) {
    const top = getTopProducts().map(formatProduct).join(', ')
    return `Mức phổ biến bên mình hiện từ 65.000đ đến 150.000đ mỗi sản phẩm. Gợi ý nhanh: ${top}. Bạn muốn mình chốt theo ngân sách tổng bao nhiêu để lên combo sát hơn?`
  }

  if (includesAny(message, keywordMap.products)) {
    return `${productCatalogText()}\nNếu bạn nói rõ dịp lễ và ngân sách, mình sẽ gợi ý luôn bộ phù hợp.`
  }

  if (includesAny(message, keywordMap.occasion)) {
    return `${getOccasionReply(message)} ${contactText}`
  }

  if (includesAny(message, keywordMap.shipping)) {
    return 'Việt Mã có hỗ trợ giao hàng toàn quốc. Bạn cho mình khu vực nhận hàng và thời gian cần, mình sẽ tư vấn phương án phù hợp nhất.'
  }

  if (includesAny(message, keywordMap.contact)) {
    return contactText
  }

  return `Mình đã ghi nhận nhu cầu của bạn. Để tư vấn chính xác hơn, bạn cho mình 3 thông tin: dịp lễ, số bộ cần chuẩn bị và ngân sách dự kiến. ${contactText}`
}