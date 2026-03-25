import { useEffect, useState } from 'react'
import { NavLink, Outlet, ScrollRestoration } from 'react-router-dom'
import brandLogo from '../assets/Logo.png'
import { footerGroups, navLinks } from '../data/siteData.js'

function Layout() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="site-shell">
      <header className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
        <NavLink to="/" className="nav-logo">
          <img className="nav-logo-image" src={brandLogo} alt="Logo Việt Mã" />
          <span>Việt Mã</span>
        </NavLink>

        <nav className="nav-links" aria-label="Điều hướng chính">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`.trim()
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/contact" className="nav-cta">
          Tư Vấn Ngay
        </NavLink>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <img className="footer-brand-mark" src={brandLogo} alt="Dấu ấn Việt Mã" />
              <div className="footer-brand-name">Việt Mã</div>
              <div className="footer-brand-sub">Vàng Mã Mini · Nhóm khởi nghiệp</div>
              <p className="footer-desc">
                Chúng tôi là nhóm khởi nghiệp tập trung dòng vàng mã mini,
                ưu tiên thiết kế chỉn chu, dễ chọn và phù hợp nếp lễ của gia đình Việt.
              </p>
            </div>

            {footerGroups.map((group) => (
              <div key={group.title}>
                <div className="footer-col-title">{group.title}</div>
                <ul className="footer-links">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <NavLink to={link.to} className="footer-nav-link">
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="footer-contact">
              <div className="footer-col-title">Liên Hệ</div>
              <p>
                <strong>Showroom:</strong>
                <br />
                Làng nghề Đông Hồ, Thuận Thành, Bắc Ninh
              </p>
              <p>
                <strong>Hotline:</strong>
                <br />
                0901 234 567
              </p>
              <p>
                <strong>Giờ mở cửa:</strong>
                <br />
                7:00 - 19:00 (Thứ 2 - CN)
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Việt Mã. Kính thiên - Lễ tổ - Tâm thành.</p>
            <span className="footer-hanzi">Việt Mã</span>
          </div>
        </div>
      </footer>

      <ScrollRestoration />
    </div>
  )
}

export default Layout