import { useEffect, useState } from 'react'

export function getBasePath() {
  const base = import.meta.env.BASE_URL || '/'
  if (base === '/') return ''
  return base.endsWith('/') ? base.slice(0, -1) : base
}

export function getAppPath() {
  if (typeof window === 'undefined') return '/'
  const base = getBasePath()
  let path = window.location.pathname || '/'
  if (base && path.toLowerCase().startsWith(base.toLowerCase())) {
    path = path.slice(base.length) || '/'
  }
  if (!path.startsWith('/')) path = `/${path}`
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  return path
}

export function toHref(appPath) {
  const base = import.meta.env.BASE_URL || '/'
  const normalized = appPath.startsWith('/') ? appPath : `/${appPath}`
  if (normalized === '/') return base
  return `${base}${normalized.slice(1)}`
}

export function navigate(appPath) {
  const href = toHref(appPath)
  window.history.pushState({}, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function onNavigate(event, appPath) {
  if (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  ) {
    return
  }
  event.preventDefault()
  navigate(appPath)
}

export function goToSection(event, sectionId) {
  if (event) event.preventDefault()
  if (getAppPath() !== '/') {
    try {
      sessionStorage.setItem('portfolio:scroll', sectionId)
    } catch {
      /* ignore */
    }
    navigate('/')
    return
  }
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
}

export function useAppPath() {
  const [path, setPath] = useState(() => getAppPath())

  useEffect(() => {
    const sync = () => setPath(getAppPath())
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  return path
}
