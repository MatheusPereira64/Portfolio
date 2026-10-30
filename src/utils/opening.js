const STORAGE_KEY = 'mp-opening-seen'

let cached = null

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function markNoOpening() {
  document.documentElement.classList.add('no-opening')
}

/**
 * Decide uma vez por carregamento se a abertura `<MP/>` roda.
 * O cache evita que o StrictMode grave a sessão e cancele a animação na segunda chamada.
 * Retorna `play`, `skip` ou `deferred` (rota que não é a home).
 */
export function openingDecision(isHome) {
  if (!isHome) return 'deferred'
  if (cached) return cached

  if (prefersReducedMotion()) {
    markNoOpening()
    cached = 'skip'
    return cached
  }

  try {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      markNoOpening()
      cached = 'skip'
      return cached
    }
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    markNoOpening()
    cached = 'skip'
    return cached
  }

  cached = 'play'
  return cached
}
