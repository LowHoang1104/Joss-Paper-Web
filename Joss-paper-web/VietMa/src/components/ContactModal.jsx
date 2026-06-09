import { useEffect, useState } from 'react'

const googleSheetUrl = 'https://script.google.com/macros/s/AKfycbx7eoRUN8z4O4KWbyAkTPHh8XuH7G_Y2W-RIp2iz4RXTGWyzvHELJWW0UtnbC1SH1Y0vg/exec?key=123123'

function ContactModal({ isOpen, onClose }) {
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    occasion: '',
    message: '',
  })
  const [submitStatus, setSubmitStatus] = useState('')

  useEffect(() => {
    if (isOpen) {
      setSubmitStatus('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const payload = {
      name: formValues.name,
      phone: formValues.phone,
      occasion: formValues.occasion,
      message: formValues.message,
      source: 'Tư vấn ngay',
    }

    try {
      const urlWithParams = `${googleSheetUrl}&${new URLSearchParams(payload).toString()}`
      const response = await fetch(urlWithParams)

      if (!response.ok) {
        throw new Error('Không gửi được')
      }

      setSubmitStatus('Gửi thành công! Chúng tôi sẽ liên hệ lại bạn sớm.')
      setFormValues({ name: '', phone: '', occasion: '', message: '' })
    } catch (error) {
      setSubmitStatus('Không gửi được. Vui lòng thử lại hoặc liên hệ qua hotline.')
    }
  }

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="contact-modal-close" onClick={onClose}>
          ×
        </button>
        <h2 className="section-title">Tư vấn ngay</h2>
        <p className="contact-copy">Điền nhanh thông tin, chúng tôi sẽ gọi lại sớm nhất.</p>

        <form className="contact-form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="modal-name">Họ tên</label>
            <input
              id="modal-name"
              name="name"
              type="text"
              value={formValues.name}
              onChange={handleFieldChange}
              placeholder="Nguyễn Văn A"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="modal-phone">Số điện thoại</label>
            <input
              id="modal-phone"
              name="phone"
              type="tel"
              value={formValues.phone}
              onChange={handleFieldChange}
              placeholder="0901 234 567"
              required
            />
          </div>

          <div className="field-full">
            <label htmlFor="modal-occasion">Dịp lễ cần chuẩn bị</label>
            <input
              id="modal-occasion"
              name="occasion"
              type="text"
              value={formValues.occasion}
              onChange={handleFieldChange}
              placeholder="Ví dụ: Thanh Minh, giỗ đầu, Rằm tháng 7"
            />
          </div>

          <div className="field-full">
            <label htmlFor="modal-message">Nhu cầu cụ thể</label>
            <textarea
              id="modal-message"
              name="message"
              rows="5"
              value={formValues.message}
              onChange={handleFieldChange}
              placeholder="Cần tư vấn số lượng, ngân sách, combo phù hợp"
            />
          </div>

          <div className="field-full">
            <button type="submit" className="contact-submit">
              Gửi yêu cầu tư vấn
            </button>
          </div>

          {submitStatus ? <p className="submit-status">{submitStatus}</p> : null}
        </form>
      </div>
    </div>
  )
}

export default ContactModal
