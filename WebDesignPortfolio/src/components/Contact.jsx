import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Contact.css'

const Contact = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.from_name.trim()) {
      newErrors.from_name = true
    }
    if (!formData.from_email.trim() || !validateEmail(formData.from_email)) {
      newErrors.from_email = true
    }
    if (!formData.subject.trim()) {
      newErrors.subject = true
    }
    if (!formData.message.trim()) {
      newErrors.message = true
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      const errorMsg = language === 'en' 
        ? 'Please fill in all fields correctly.' 
        : 'Por favor, preencha todos os campos corretamente.'
      alert(errorMsg)
      return
    }

    const emailBody = `${formData.message}

---
Informações do contato:
Nome: ${formData.from_name}
Email: ${formData.from_email}

Enviado através do portfolio: https://matheuspereira64.github.io/Portfolio/`

    const mailtoLink = `mailto:matheuspereira6464@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`
    
    try {
      const tempLink = document.createElement('a')
      tempLink.href = mailtoLink
      tempLink.style.display = 'none'
      document.body.appendChild(tempLink)
      tempLink.click()
      document.body.removeChild(tempLink)
      
      setFormData({
        from_name: '',
        from_email: '',
        subject: '',
        message: ''
      })
      setErrors({})
      
      const successMsg = language === 'en' 
        ? 'Your email client has been opened with the message filled in! If it didn\'t open automatically, please check if you have a default email client configured.' 
        : 'Seu cliente de email foi aberto com a mensagem preenchida! Se não abriu automaticamente, verifique se você tem um cliente de email padrão configurado.'
      
      setTimeout(() => {
        alert(successMsg)
      }, 1000)
    } catch (error) {
      const fallbackMsg = language === 'en' 
        ? 'Unable to open email client automatically. Please send an email to: matheuspereira6464@gmail.com' 
        : 'Não foi possível abrir o cliente de email automaticamente. Por favor, envie um email para: matheuspereira6464@gmail.com'
      alert(fallbackMsg)
    }
  }

  return (
    <section className="contact" id="contact">
      <div className="max-width">
        <h2 className="title">{t.contact.title}</h2>
        <div className="contact-content">
          <div className="column left">
            <div className="text">{t.contact.text}</div>
            <p>{t.contact.description}</p>
            <div className="icons">
              <div className="row">
                <i className="fas fa-user"></i>
                <div className="info">
                  <div className="head">{t.contact.name}</div>
                  <div className="sub-title">Matheus Pereira de Souza</div>
                </div>
              </div>
              <div className="row">
                <i className="fas fa-map-marker-alt"></i>
                <div className="info">
                  <div className="head">{language === 'pt' ? 'Localização' : 'Location'}</div>
                  <div className="sub-title">{language === 'pt' ? 'Manaus, Amazonas - Brasil' : 'Manaus, Amazonas - Brazil'}</div>
                </div>
              </div>
              <div className="row">
                <i className="fas fa-phone"></i>
                <div className="info">
                  <div className="head">{language === 'pt' ? 'Telefone' : 'Phone'}</div>
                  <div className="sub-title">+55 (92) 99213-8870</div>
                </div>
              </div>
              <div className="row">
                <i className="fas fa-envelope"></i>
                <div className="info">
                  <div className="head">Email</div>
                  <div className="sub-title">matheuspereira6464@gmail.com</div>
                </div>
              </div>
              <div className="row">
                <i className="fab fa-linkedin"></i>
                <div className="info">
                  <div className="head">LinkedIn</div>
                  <div className="sub-title">https://www.linkedin.com/in/matheus-pereira-836033243</div>
                </div>
              </div>
            </div>
          </div>
          <div className="column right">
            <div className="text">{t.contact.formTitle}</div>
            <p className="form-instruction">{t.contact.formInstruction}</p>
            <form onSubmit={handleSubmit}>
              <div className="fields">
                <div className="field name">
                  <input
                    type="text"
                    name="from_name"
                    placeholder={t.contact.namePlaceholder}
                    value={formData.from_name}
                    onChange={handleChange}
                    className={errors.from_name ? 'error' : formData.from_name ? 'success' : ''}
                    required
                  />
                </div>
                <div className="field email">
                  <input
                    type="email"
                    name="from_email"
                    placeholder={t.contact.emailPlaceholder}
                    value={formData.from_email}
                    onChange={handleChange}
                    className={errors.from_email ? 'error' : formData.from_email && validateEmail(formData.from_email) ? 'success' : ''}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <input
                  type="text"
                  name="subject"
                  placeholder={t.contact.subjectPlaceholder}
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : formData.subject ? 'success' : ''}
                  required
                />
              </div>
              <div className="field textarea">
                <textarea
                  cols="30"
                  rows="10"
                  name="message"
                  placeholder={t.contact.messagePlaceholder}
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : formData.message ? 'success' : ''}
                  required
                ></textarea>
              </div>
              <div className="button">
                <button type="submit">{t.contact.send}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

