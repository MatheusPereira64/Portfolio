import emailjs from '@emailjs/browser'
import { SITE_PROFILE } from '../constants/siteProfile'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? ''
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? ''
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? ''

const PLACEHOLDER = /^YOUR_|^sua_/i

export function isEmailJsConfigured() {
  return (
    SERVICE_ID &&
    TEMPLATE_ID &&
    PUBLIC_KEY &&
    !PLACEHOLDER.test(SERVICE_ID) &&
    !PLACEHOLDER.test(TEMPLATE_ID) &&
    !PLACEHOLDER.test(PUBLIC_KEY)
  )
}

/** Envia o formulário de contacto para SITE_PROFILE.email (EmailJS ou mailto). */
export async function sendContactEmail(formData) {
  const toEmail = SITE_PROFILE.email

  if (isEmailJsConfigured()) {
    emailjs.init(PUBLIC_KEY)
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name: formData.from_name,
      from_email: formData.from_email,
      reply_to: formData.from_email,
      subject: formData.subject,
      message: formData.message,
      to_email: toEmail,
    })
    return { method: 'emailjs' }
  }

  const emailBody = `${formData.message}

---
Nome: ${formData.from_name}
Email: ${formData.from_email}

Enviado via portfólio: ${SITE_PROFILE.portfolioUrl}`

  const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`
  window.location.href = mailtoLink
  return { method: 'mailto' }
}
