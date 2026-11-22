/**
 * Analytics sem cookies (Plausible): visitas e alguns eventos de contato.
 * Para os eventos aparecerem no painel, crie no Plausible as metas
 * (Goals → Custom event) "Download CV" e "Clique de contato".
 */

const PLAUSIBLE_SRC = 'https://plausible.io/js/script.js'

/** Canal de contato pelo endereço do link; null quando não é um link que interessa. */
export function classifyLink(href) {
  if (!href) return null
  const url = href.toLowerCase()
  if (url.includes('/curriculo/')) {
    return { event: 'Download CV', props: { idioma: url.includes('english') ? 'en' : 'pt' } }
  }
  if (url.startsWith('mailto:')) return { event: 'Clique de contato', props: { canal: 'email' } }
  if (url.includes('wa.me/') || url.includes('whatsapp.com')) {
    return { event: 'Clique de contato', props: { canal: 'whatsapp' } }
  }
  if (url.includes('linkedin.com')) return { event: 'Clique de contato', props: { canal: 'linkedin' } }
  if (url.includes('github.com')) return { event: 'Clique de contato', props: { canal: 'github' } }
  return null
}

/** Onde o clique aconteceu: id da seção, rodapé, menu ou chatbot. */
function originOf(element) {
  if (element.closest('.chatbot-container')) return 'chatbot'
  if (element.closest('footer')) return 'rodape'
  if (element.closest('nav, header')) return 'menu'
  return element.closest('section[id]')?.id || 'outro'
}

export function track(event, props) {
  if (typeof window.plausible === 'function') window.plausible(event, { props })
}

/** Carrega o Plausible (fora do localhost) e passa a registrar os cliques de contato. */
export function initAnalytics(domain) {
  if (!domain || typeof document === 'undefined') return
  const host = window.location.hostname
  if (host === 'localhost' || host === '127.0.0.1') return

  // Fila oficial do Plausible: eventos disparados antes do script carregar não se perdem.
  window.plausible =
    window.plausible ||
    function plausibleQueue(...args) {
      ;(window.plausible.q = window.plausible.q || []).push(args)
    }

  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = domain
  script.src = PLAUSIBLE_SRC
  document.head.appendChild(script)

  document.addEventListener(
    'click',
    (event) => {
      const link = event.target.closest?.('a[href]')
      if (!link) return
      const match = classifyLink(link.getAttribute('href'))
      if (match) track(match.event, { ...match.props, origem: originOf(link) })
    },
    { capture: true }
  )
}
