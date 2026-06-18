import { useEffect, useState } from 'react'
import { NavLink, Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import brandLogo from '../assets/Logo.png'
import AuthButton from './AuthButton.jsx'
import CartLink from './CartLink.jsx'
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

          <AuthButton mobile onAuthAction={closeMobileMenu} />
          <CartLink mobile onClick={closeMobileMenu} />
        </nav>

        <div className="nav-actions">
          <CartLink />
          <AuthButton />

          <button
            type="button"
            className="nav-cta nav-cta-desktop nav-link-button"
            onClick={() => setIsContactModalOpen(true)}
          >
            Tư Vấn Ngay
          </button>
        </div>
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
                <br />
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
                Hòa Lạc, Thạch Thất, Hà Nội
              </p>
             
              <p>
                <strong>Giờ mở cửa:</strong>
                <br />
                7:00 - 19:00 (Thứ 2 - CN)
              </p>

              <a
                href="https://www.facebook.com/profile.php?id=61590306604248"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-facebook-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'inherit', textDecoration: 'none', marginTop: '8px' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
                Facebook Việt Mã
              </a>
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
