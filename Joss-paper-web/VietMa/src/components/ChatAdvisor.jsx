import { useState } from 'react'
import advisorMascot from '../assets/Screenshot 2026-03-26 005530.png'
import zaloLogo from '../assets/zalo-logo.svg'
import messengerLogo from '../assets/messenger-logo.svg'
import tiktokLogo from '../assets/tiktok-logo.svg'

function ChatAdvisor() {
  const [isOpen, setIsOpen] = useState(false)

  const quickContacts = [
    {
      id: 'zalo',
      label: 'Zalo',
      href: 'https://zalo.me/0901234567',
      logo: zaloLogo,
      className: 'chat-contact-zalo',
    },
    {
      id: 'messenger',
      label: 'Messenger',
      href: 'https://m.me/vietma.vn',
      logo: messengerLogo,
      className: 'chat-contact-messenger',
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      href: 'https://www.tiktok.com/@vietma.vn',
      logo: tiktokLogo,
      className: 'chat-contact-tiktok',
    },
  ]

  return (
    <div className="chat-advisor-wrap">
      <div className={`chat-advisor-actions ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        {quickContacts.map((item) => (
          <a
            key={item.id}
            className={`chat-contact-item ${item.className}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Liên hệ qua ${item.label}`}
          >
            <img src={item.logo} alt="" className="chat-contact-badge" aria-hidden="true" />
            <span className="chat-contact-label">{item.label}</span>
          </a>
        ))}
      </div>

      <button
        type="button"
        className={`chat-advisor-fab ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Đóng menu liên hệ nhanh' : 'Mở menu liên hệ nhanh'}
      >
        <img src={advisorMascot} alt="" className="chat-advisor-fab-avatar" />
      </button>
    </div>
  )
}

export default ChatAdvisor