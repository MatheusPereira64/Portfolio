import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import emailjs from '@emailjs/browser'
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

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

  const handleSubmit = async (e) => {
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
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Configurar EmailJS (você precisará criar uma conta em emailjs.com e obter as credenciais)
      // Por enquanto, vamos usar um fallback para mailto
      const serviceId = 'YOUR_SERVICE_ID'
      const templateId = 'YOUR_TEMPLATE_ID'
      const publicKey = 'YOUR_PUBLIC_KEY'

      // Se EmailJS estiver configurado, use-o
      if (serviceId !== 'YOUR_SERVICE_ID') {
        await emailjs.send(serviceId, templateId, {
          from_name: formData.from_name,
          from_email: formData.from_email,
          subject: formData.subject,
          message: formData.message,
        }, publicKey)
      } else {
        // Fallback para mailto
        const emailBody = `${formData.message}\n\n---\nInformações do contato:\nNome: ${formData.from_name}\nEmail: ${formData.from_email}\n\nEnviado através do portfolio: https://matheuspereira64.github.io/Portfolio/`
        const mailtoLink = `mailto:matheuspereira6464@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`
        window.location.href = mailtoLink
      }

      setFormData({
        from_name: '',
        from_email: '',
        subject: '',
        message: ''
      })
      setErrors({})
      setSubmitStatus('success')
      
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    } catch (error) {
      setSubmitStatus('error')
      console.error('Error sending email:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDownloadCV = () => {
    // Link para o CV (você precisará adicionar o arquivo PDF na pasta public)
    const cvLinks = {
      pt: '/cv-matheus-pereira-pt.pdf',
      en: '/cv-matheus-pereira-en.pdf',
      es: '/cv-matheus-pereira-es.pdf'
    }
    const link = document.createElement('a')
    link.href = cvLinks[language] || cvLinks.pt
    link.download = `CV-Matheus-Pereira-${language.toUpperCase()}.pdf`
    link.click()
  }

  return (
    <section className="contact" id="contact" data-lang={language}>
      <div className="max-width">
        <h2 className="title">{t.contact.title}</h2>
        <div className="contact-content">
          <div className="column left">
            <div className="text">{t.contact.text}</div>
            <p>{t.contact.description}</p>
            <button 
              className="cv-download-btn"
              onClick={handleDownloadCV}
              aria-label="Download CV"
            >
              <i className="fas fa-download"></i>
              {language === 'pt' ? 'Baixar CV' : language === 'es' ? 'Descargar CV' : 'Download CV'}
            </button>
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
              {submitStatus === 'success' && (
                <div className="form-message success">
                  <i className="fas fa-check-circle"></i>
                  {language === 'pt' 
                    ? 'Mensagem enviada com sucesso!' 
                    : language === 'es'
                    ? '¡Mensaje enviado con éxito!'
                    : 'Message sent successfully!'}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="form-message error">
                  <i className="fas fa-exclamation-circle"></i>
                  {language === 'pt'
                    ? 'Erro ao enviar mensagem. Tente novamente.'
                    : language === 'es'
                    ? 'Error al enviar mensaje. Inténtalo de nuevo.'
                    : 'Error sending message. Please try again.'}
                </div>
              )}
              <div className="button">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting 
                    ? (language === 'pt' ? 'Enviando...' : language === 'es' ? 'Enviando...' : 'Sending...')
                    : t.contact.send}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

