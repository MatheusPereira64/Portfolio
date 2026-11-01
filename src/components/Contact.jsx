import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Contact.css'
import { SITE_PROFILE, getCvFilename, getCvHref } from '../constants/siteProfile'
import { getWhatsAppUrl } from '../data/assistantKnowledge'
import Icon from './Icon'
import Reveal from './Reveal'
import { isEmailJsConfigured, sendContactEmail } from '../utils/sendContactEmail'

const EMPTY_FORM = {
  from_name: '',
  from_email: '',
  subject: '',
  message: ''
}

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

const Contact = () => {
  const { translations, language } = useLanguage()
  const t = translations[language].contact
  const [formData, setFormData] = useState(EMPTY_FORM)
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
      setErrors(prev => ({ ...prev, [name]: false }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.from_name.trim()) {
      newErrors.from_name = true
    }
    if (!validateEmail(formData.from_email.trim())) {
      newErrors.from_email = true
    }
    if (!formData.subject.trim()) {
      newErrors.subject = true
    }
    if (!formData.message.trim()) {
      newErrors.message = true
    }

    const invalid = Object.keys(newErrors)
    if (invalid.length > 0) {
      setErrors(newErrors)
      setSubmitStatus('invalid')
      e.currentTarget.elements[invalid[0]]?.focus()
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const { method } = await sendContactEmail(formData)

      setFormData(EMPTY_FORM)
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

  const channels = [
    {
      id: 'email',
      icon: 'envelope',
      label: 'Email',
      value: SITE_PROFILE.email,
      href: `mailto:${SITE_PROFILE.email}`,
    },
    {
      id: 'whatsapp',
      icon: 'whatsapp',
      label: 'WhatsApp',
      value: SITE_PROFILE.phoneDisplayPt,
      href: getWhatsAppUrl(),
    },
    {
      id: 'linkedin',
      icon: 'linkedin',
      label: 'LinkedIn',
      value: SITE_PROFILE.linkedin.replace(/^https:\/\/www\.|\/$/g, ''),
      href: SITE_PROFILE.linkedin,
    },
    {
      id: 'github',
      icon: 'github',
      label: 'GitHub',
      value: SITE_PROFILE.github.replace(/^https:\/\//, ''),
      href: SITE_PROFILE.github,
    },
  ]

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: formData[name],
    onChange: handleChange,
    required: true,
    'aria-invalid': errors[name] ? true : undefined,
    className: errors[name] ? 'error' : undefined,
  })

  const statusMessage = {
    success: t.sent,
    mailto: t.mailtoOpened,
    invalid: t.invalid,
    error: t.sendError,
  }[submitStatus]
  const statusOk = submitStatus === 'success' || submitStatus === 'mailto'

  return (
    <section className="contact" id="contact" data-lang={language}>
      <div className="max-width">
        <Reveal as="h2" className="section-heading">{t.title}</Reveal>
        <Reveal as="p" className="section-intro">{t.description}</Reveal>
        <div className="contact-content">
          <Reveal className="contact-direct">
            <ul className="contact-channels">
              {channels.map((channel) => {
                const external = channel.href.startsWith('http')
                return (
                  <li key={channel.id}>
                    <a
                      className="contact-channel"
                      href={channel.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                    >
                      <span className="contact-channel-icon"><Icon name={channel.icon} /></span>
                      <span className="contact-channel-text">
                        <strong>{channel.label}</strong>
                        <span>{channel.value}</span>
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul>
            <p className="contact-location">
              <Icon name="map-marker-alt" />
              {t.location}
            </p>
            <div className="contact-cv">
              <p>{t.cvHeading}</p>
              <div>
                <a className="contact-cv-link" href={getCvHref('pt')} download={getCvFilename('pt')} lang="pt-BR">
                  <Icon name="download" />
                  {t.cvPortuguese}
                </a>
                <a className="contact-cv-link" href={getCvHref('en')} download={getCvFilename('en')} lang="en">
                  <Icon name="download" />
                  English
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal className="contact-form-wrap" index={1}>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-field">
                <label htmlFor="contact-from_name">{t.name}</label>
                <input type="text" autoComplete="name" {...fieldProps('from_name')} />
              </div>
              <div className="contact-field">
                <label htmlFor="contact-from_email">{t.email}</label>
                <input type="email" autoComplete="email" {...fieldProps('from_email')} />
              </div>
              <div className="contact-field contact-field--wide">
                <label htmlFor="contact-subject">{t.subject}</label>
                <input type="text" {...fieldProps('subject')} />
              </div>
              <div className="contact-field contact-field--wide">
                <label htmlFor="contact-message">{t.message}</label>
                <textarea rows="5" {...fieldProps('message')}></textarea>
              </div>
              <div className="contact-form-footer">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? t.sending : t.send}
                </button>
                {!isEmailJsConfigured() && <p className="contact-form-hint">{t.mailtoHint}</p>}
              </div>
              <div role="status" aria-live="polite">
                {statusMessage && (
                  <p className={`form-message ${statusOk ? 'success' : 'error'}`}>
                    <Icon name={statusOk ? 'check-circle' : 'exclamation-circle'} />
                    {statusMessage}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
