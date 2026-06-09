import { useEffect, useState } from 'react'
import { NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import brandLogo from '../assets/Logo.png'
import ChatAdvisor from './ChatAdvisor.jsx'
import ContactModal from './ContactModal.jsx'
import { footerGroups, navLinks } from '../data/siteData.js'

function Layout() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <header className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
        <NavLink to="/" className="nav-logo">
          <img className="nav-logo-image" src={brandLogo} alt="Logo Việt Mã" />
          <span>Việt Mã</span>
        </NavLink>

        <button
          type="button"
          className="nav-menu-toggle"
          aria-label="Mở menu điều hướng"
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? 'Đóng' : 'Menu'}
        </button>

        <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`} aria-label="Điều hướng chính">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`.trim()
              }
            >
              {link.label}
            </NavLink>
          ))}

          <button
            type="button"
            className="nav-link nav-link-mobile-cta nav-link-button"
            onClick={() => {
              setIsContactModalOpen(true)
              closeMobileMenu()
            }}
          >
            Tư Vấn Ngay
          </button>
        </nav>

        <button
          type="button"
          className="nav-cta nav-cta-desktop nav-link-button"
          onClick={() => setIsContactModalOpen(true)}
        >
          Tư Vấn Ngay
        </button>
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
                Hòa lạc, Thạch thất, Hà Nội
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

      <ChatAdvisor />

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      <ScrollRestoration />
    </div>
  )
}

export default Layout