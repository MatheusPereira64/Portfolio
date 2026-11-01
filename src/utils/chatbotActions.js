import { getAppPath, goToSection, navigate } from './routes'

export function openContactForm({ subject = '', message = '' } = {}) {
  const wasHome = getAppPath() === '/'
  goToSection(null, 'contact')
  const prefill = () =>
    window.dispatchEvent(
      new CustomEvent('portfolio:prefill-contact', {
        detail: { subject, message },
      })
    )
  // Fora da home o formulário só existe depois da navegação.
  if (wasHome) prefill()
  else window.setTimeout(prefill, 300)
}

export function handleChatAction(action) {
  if (!action) return
  if (action.type === 'scroll') {
    goToSection(null, action.section)
  } else if (action.type === 'contact') {
    openContactForm({ subject: action.subject, message: action.message })
  } else if (action.type === 'route') {
    navigate(action.path)
  }
}
