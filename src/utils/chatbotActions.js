export function scrollToSection(sectionId) {
  const id = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function openContactForm({ subject = '', message = '' } = {}) {
  scrollToSection('contact')
  window.dispatchEvent(
    new CustomEvent('portfolio:prefill-contact', {
      detail: { subject, message },
    })
  )
}

export function handleChatAction(action) {
  if (!action) return
  if (action.type === 'scroll') {
    scrollToSection(action.section)
  } else if (action.type === 'contact') {
    openContactForm({ subject: action.subject, message: action.message })
  }
}
