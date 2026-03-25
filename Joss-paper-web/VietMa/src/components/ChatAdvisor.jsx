import { useMemo, useState } from 'react'
import { advisorBootstrap, advisorSystemPrompt, generateAdvisorReply } from '../data/chatAdvisor.js'

function ChatAdvisor() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 'bot-welcome',
      role: 'bot',
      text: advisorBootstrap.welcome,
    },
  ])

  const quickReplies = useMemo(() => advisorBootstrap.quickReplies, [])

  const sendMessage = (rawText) => {
    const text = rawText.trim()
    if (!text) return

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    window.setTimeout(() => {
      const answer = generateAdvisorReply(text)
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'bot',
          text: answer,
        },
      ])
      setIsTyping(false)
    }, 450)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      <button
        type="button"
        className="chat-advisor-fab"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Đóng tư vấn viên Việt Mã' : 'Mở tư vấn viên Việt Mã'}
      >
        {isOpen ? 'Đóng tư vấn' : 'Tư vấn nhanh'}
      </button>

      {isOpen ? (
        <section className="chat-advisor" aria-label="Tư vấn viên Việt Mã">
          <header className="chat-advisor-header">
            <div>
              <p className="chat-advisor-title">Tư vấn viên Việt Mã</p>
              <p className="chat-advisor-subtitle">Theo prompt thương hiệu, hỗ trợ 24/7</p>
            </div>
            <button
              type="button"
              className="chat-advisor-close"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng cửa sổ chat"
            >
              ×
            </button>
          </header>

          <div className="chat-advisor-messages">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`chat-bubble chat-bubble-${message.role}`}
              >
                {message.text}
              </article>
            ))}
            {isTyping ? <p className="chat-typing">Tư vấn viên đang soạn...</p> : null}
          </div>

          <div className="chat-quick-replies">
            {quickReplies.map((item) => (
              <button
                key={item}
                type="button"
                className="chat-chip"
                onClick={() => sendMessage(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <form className="chat-advisor-form" onSubmit={onSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Nhập nhu cầu của bạn..."
            />
            <button type="submit">Gửi</button>
          </form>
        </section>
      ) : null}
    </>
  )
}

export default ChatAdvisor