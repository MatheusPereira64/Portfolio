import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Contact.css'
import { SITE_PROFILE, triggerCvDownload } from '../constants/siteProfile'
import { isEmailJsConfigured, sendContactEmail } from '../utils/sendContactEmail'

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

  useEffect(() => {
    const onPrefill = (e) => {
      const { subject = '', message = '' } = e.detail || {}
      setFormData((prev) => ({
        ...prev,
        ...(subject && { subject }),
        ...(message && { message }),
      }))
      setTimeout(() => {
        document.querySelector('#contact input[name="subject"]')?.focus()
      }, 400)
    }
    window.addEventListener('portfolio:prefill-contact', onPrefill)
    return () => window.removeEventListener('portfolio:prefill-contact', onPrefill)
  }, [])

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
      const { method } = await sendContactEmail(formData)

      setFormData({
        from_name: '',
        from_email: '',
        subject: '',
        message: ''
      })
      setErrors({})
      setSubmitStatus(method === 'emailjs' ? 'success' : 'mailto')
      
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

  const cvLabels = {
    pt: { heading: 'Baixar currículo', en: 'English', pt: 'Português' },
    en: { heading: 'Download résumé', en: 'English', pt: 'Portuguese' },
    es: { heading: 'Descargar currículum', en: 'English', pt: 'Portugués' },
  }
  const cv = cvLabels[language] || cvLabels.en

  return (
    <section className="contact" id="contact" data-lang={language}>
      <div className="max-width">
        <h2 className="title">{t.contact.title}</h2>
        <div className="contact-content">
          <div className="column left">
            <div className="text">{t.contact.text}</div>
            <p>{t.contact.description}</p>
            <div className="cv-download-group">
              <p className="cv-download-label">{cv.heading}</p>
              <div className="cv-download-actions">
                <button
                  type="button"
                  className="cv-download-btn"
                  onClick={() => triggerCvDownload('en')}
                  aria-label={`${cv.heading} — ${cv.en}`}
                >
                  <i className="fas fa-download"></i>
                  {cv.en}
                </button>
                <button
                  type="button"
                  className="cv-download-btn"
                  onClick={() => triggerCvDownload('pt')}
                  aria-label={`${cv.heading} — ${cv.pt}`}
                >
                  <i className="fas fa-download"></i>
                  {cv.pt}
                </button>
              </div>
            </div>
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
                  <div className="sub-title">{SITE_PROFILE.email}</div>
                </div>
              </div>
              <div className="row">
                <i className="fab fa-linkedin"></i>
                <div className="info">
                  <div className="head">LinkedIn</div>
                  <div className="sub-title">{SITE_PROFILE.linkedin.replace(/^https:\/\//, '')}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="column right">
            <div className="text">{t.contact.formTitle}</div>
            <p className="form-instruction">
              {isEmailJsConfigured()
                ? (language === 'pt'
                  ? 'Preencha o formulário abaixo. A mensagem será enviada diretamente para o meu email.'
                  : language === 'es'
                  ? 'Completa el formulario. El mensaje se enviará directamente a mi correo.'
                  : 'Fill in the form below. Your message will be sent directly to my email.')
                : t.contact.formInstruction}
            </p>
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
              {submitStatus === 'mailto' && (
                <div className="form-message success">
                  <i className="fas fa-check-circle"></i>
                  {language === 'pt'
                    ? 'O seu cliente de email foi aberto. Confirme o envio para concluir.'
                    : language === 'es'
                    ? 'Se abrió tu cliente de correo. Confirma el envío para completar.'
                    : 'Your email client was opened. Confirm sending to complete.'}
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

