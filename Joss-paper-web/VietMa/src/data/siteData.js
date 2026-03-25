import leTienVangImage from '../assets/Product/LeTienVang.png'
import nguaMiniImage from '../assets/Product/NguaMini.jpg'
import thanLinhDoImage from '../assets/Product/ThanLinhDo.png'
import thanLinhXanhImage from '../assets/Product/ThanLinhXanh.png'
import defaultModelUrl from '../assets/model.glb?url'
import nguaMiniModelUrl from '../assets/NguaMini3d.glb?url'

export const navLinks = [
  { to: '/', label: 'Trang Chủ' },
  { to: '/products', label: 'Sản Phẩm' },
  { to: '/about', label: 'Về Chúng Tôi' },
  { to: '/blog', label: 'Kiến Thức' },
  { to: '/contact', label: 'Liên Hệ' },
]

export const products = [
  {
    id: 'le-tien-vang',
    category: 'Lễ phục vàng mã',
    name: 'Lễ Tiến Vàng',
    description:
      'Bộ lễ phục vàng mã truyền thống, hoa văn chỉn chu, phù hợp dâng cúng trong các dịp quan trọng.',
    price: '85.000',
    unit: 'đ / bộ',
    badge: 'Bán chạy',
    icon: '🎋',
    image: leTienVangImage,
    modelUrl: defaultModelUrl,
    imageClass: 'card-img-bg-1',
  },
  {
    id: 'ngua-mini',
    category: 'Mô hình vàng mã',
    name: 'Ngựa Mini',
    description:
      'Mô hình ngựa mini sắc màu dân gian, thường đi kèm trong bộ lễ mã cao cấp.',
    price: '120.000',
    unit: 'đ / hộp',
    badge: 'Mới về',
    icon: '🐎',
    image: nguaMiniImage,
    modelUrl: nguaMiniModelUrl,
    imageClass: 'card-img-bg-2',
  },
  {
    id: 'than-linh-do',
    category: 'Lễ phục thần linh',
    name: 'Thần Linh Đỏ',
    description:
      'Lễ phục thần linh tông đỏ, chi tiết hoa văn nổi bật, dùng trong bộ cúng trang trọng.',
    price: '65.000',
    unit: 'đ / bộ',
    badge: '',
    icon: '🔥',
    image: thanLinhDoImage,
    modelUrl: defaultModelUrl,
    imageClass: 'card-img-bg-3',
  },
  {
    id: 'than-linh-xanh',
    category: 'Lễ phục thần linh',
    name: 'Thần Linh Xanh',
    description:
      'Biến thể tông xanh của bộ thần linh, phù hợp phối theo từng ban lễ và nghi thức.',
    price: '150.000',
    unit: 'đ / cái',
    badge: '',
    icon: '🧿',
    image: thanLinhXanhImage,
    modelUrl: defaultModelUrl,
    imageClass: 'card-img-bg-4',
  },
]

export const blogPosts = [
  {
    id: 'y-nghia-dot-vang-ma',
    category: 'Văn hóa',
    date: '10 tháng 3, 2025',
    title: 'Ý Nghĩa Sâu Xa Của Tục Đốt Vàng Mã Trong Văn Hóa Việt',
    excerpt:
      'Tục đốt vàng mã không chỉ đơn thuần là đốt đồ vật, mà là nghi thức giao tiếp thiêng liêng giữa cõi dương và cõi âm, mang triết lý sâu sắc về sự hiếu đạo.',
    label: 'Nghi lễ & Phong tục',
    icon: '🕯️',
    imageStyle: 'linear-gradient(135deg,#2a1209,#6e1f15)',
    featured: true,
  },
  {
    id: 'lich-cac-ngay-le-2025',
    category: 'Lịch lễ',
    date: '5 tháng 3, 2025',
    title: 'Lịch Các Ngày Lễ Cần Sắm Vàng Mã Trong Năm 2025',
    excerpt:
      'Từ Tết Nguyên Đán đến Thanh Minh, Rằm tháng 7, đây là danh sách đầy đủ các dịp cần chuẩn bị lễ vật cho cả năm.',
    label: 'Lịch lễ 2025',
    icon: '🎋',
    imageStyle: 'linear-gradient(135deg,#1a2d10,#2d5a00)',
    featured: false,
  },
  {
    id: 'chon-vang-ma-dung-dip',
    category: 'Hướng dẫn',
    date: '1 tháng 3, 2025',
    title: 'Cách Chọn Vàng Mã Phù Hợp Với Từng Dịp Lễ Khác Nhau',
    excerpt:
      'Mỗi dịp lễ có những vật phẩm riêng phù hợp. Bài viết hướng dẫn chi tiết để tránh sai lệch lễ nghi theo từng vùng miền.',
    label: 'Hướng dẫn',
    icon: '📜',
    imageStyle: 'linear-gradient(135deg,#3a2318,#89726d)',
    featured: false,
  },
  {
    id: 'nghi-thuc-thanh-minh',
    category: 'Nghi thức',
    date: '25 tháng 2, 2025',
    title: 'Soạn Mâm Lễ Thanh Minh Đúng Nghi Thức Và Tiết Chế',
    excerpt:
      'Danh sách lễ vật thiết yếu, trình tự khấn vái và cách chuẩn bị sao cho đủ nghi lễ mà vẫn trang trọng, tinh gọn.',
    label: 'Thanh Minh',
    icon: '🌾',
    imageStyle: 'linear-gradient(135deg,#4f2b11,#8f2d21)',
    featured: false,
  },
]

export const pillars = [
  {
    icon: '🤝',
    title: 'Giữ Nghề Thủ Công',
    text: 'Làm tay theo cảm hứng làng nghề, giữ tiêu chí chỉn chu trên từng mẫu vàng mã mini.',
  },
  {
    icon: '🌿',
    title: 'Vật Liệu Gần Gũi',
    text: 'Ưu tiên giấy dó và vật liệu thân thiện để lễ phẩm chỉn chu mà vẫn mộc mạc, thuần Việt.',
  },
  {
    icon: '🙏',
    title: 'Nếp Lễ Thuần Việt',
    text: 'Tư vấn theo phong tục từng vùng, từ giỗ chạp gia tiên đến các dịp lễ lớn trong năm.',
  },
  {
    icon: '🚚',
    title: 'Phục Vụ Khắp Ba Miền',
    text: 'Đóng gói kỹ từng bộ lễ, giao đúng hẹn để gia đình chuẩn bị cúng lễ thuận tiện.',
  },
]

export const timeline = [
  {
    year: '2024',
    title: 'Lên ý tưởng dự án',
    text: 'Nhóm bắt đầu nghiên cứu nhu cầu vàng mã mini để phục vụ mâm lễ gọn gàng trong không gian hiện đại.',
  },
  {
    year: '2025',
    title: 'Ra mắt bộ mẫu đầu tiên',
    text: 'Hoàn thiện những mẫu thử đầu tiên, tối ưu kích thước và chất liệu để dễ trưng bày và đóng gói.',
  },
  {
    year: '2026',
    title: 'Mở website chính thức',
    text: 'Đưa sản phẩm lên nền tảng số để khách dễ xem mẫu 2D, 3D và nhận tư vấn theo từng dịp lễ.',
  },
]

export const rituals = [
  {
    title: 'Tư vấn theo dịp lễ',
    text: 'Gợi ý vật phẩm phù hợp cho Thanh Minh, Vu Lan, giỗ chạp và lễ tạ cuối năm.',
  },
  {
    title: 'Soạn mâm lễ gọn mà đúng',
    text: 'Ưu tiên sự thành kính, cân đối ngân sách và hạn chế sắm thừa vật phẩm không cần thiết.',
  },
  {
    title: 'Đóng bộ lễ theo nhu cầu',
    text: 'Tách riêng bộ cho nhà riêng, nhà thờ họ hoặc mộ phần để việc chuẩn bị lễ thuận tiện hơn.',
  },
]

export const contactCards = [
  {
    kicker: 'Showroom',
    title: 'Làng nghề Đông Hồ',
    value: 'Thuận Thành, Bắc Ninh',
    copy: 'Tham quan xưởng, xem mẫu thủ công và nhận tư vấn trực tiếp theo từng dịp lễ.',
    action: 'Xem đường đi',
  },
  {
    kicker: 'Hotline',
    title: '0901 234 567',
    value: '7:00 - 19:00, Thứ 2 - CN',
    copy: 'Hỗ trợ đặt hàng nhanh, báo giá sỉ lẻ và gợi ý trọn bộ lễ vật phù hợp.',
    action: 'Gọi ngay',
  },
  {
    kicker: 'Tư vấn online',
    title: 'hello@vietma.vn',
    value: 'Phản hồi trong ngày',
    copy: 'Phù hợp khi cần gửi danh sách sản phẩm, hình mẫu hoặc trao đổi đơn hàng đường xa.',
    action: 'Gửi email',
  },
]

export const footerGroups = [
  {
    title: 'Danh Mục',
    links: [
      { to: '/products', label: 'Đèn lồng & Nến' },
      { to: '/products', label: 'Nhang & Trầm hương' },
      { to: '/products', label: 'Trang sức vàng mã' },
      { to: '/products', label: 'Nhà cửa & Xe cộ' },
      { to: '/products', label: 'Combo trọn bộ' },
    ],
  },
  {
    title: 'Hỗ Trợ',
    links: [
      { to: '/contact', label: 'Hướng dẫn mua hàng' },
      { to: '/contact', label: 'Chính sách đổi trả' },
      { to: '/blog', label: 'Tra cứu nghi thức' },
      { to: '/blog', label: 'Câu hỏi thường gặp' },
      { to: '/contact', label: 'Liên hệ tư vấn' },
    ],
  },
]