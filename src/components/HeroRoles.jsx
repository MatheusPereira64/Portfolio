import { useEffect, useState } from 'react'
import { TYPED_ROLES } from '../constants/typedRoles'

const TYPE_MS = 85
const DELETE_MS = 45
const HOLD_MS = 1600
const GAP_MS = 350

/**
 * "Eu sou <título>": digita e apaga os títulos em sequência.
 * Leitores de tela recebem a lista completa uma vez, sem anunciar cada letra.
 * Com prefers-reduced-motion, mostra só o primeiro título, parado.
 */
const HeroRoles = ({ prefix, language, startDelay = 0 }) => {
  const roles = TYPED_ROLES[language] || TYPED_ROLES.en
  const [state, setState] = useState({ index: 0, length: 0, deleting: false })
  const [reduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    setState({ index: 0, length: 0, deleting: false })
  }, [language])

  useEffect(() => {
    if (reduced) return undefined
    const role = roles[state.index]
    let delay = state.deleting ? DELETE_MS : TYPE_MS
    let next
    if (!state.deleting && state.length < role.length) {
      next = { ...state, length: state.length + 1 }
      if (state.index === 0 && state.length === 0) delay = startDelay * 1000
    } else if (!state.deleting) {
      next = { ...state, deleting: true }
      delay = HOLD_MS
    } else if (state.length > 0) {
      next = { ...state, length: state.length - 1 }
    } else {
      next = { index: (state.index + 1) % roles.length, length: 0, deleting: false }
      delay = GAP_MS
    }
    const id = window.setTimeout(() => setState(next), delay)
    return () => window.clearTimeout(id)
  }, [state, roles, reduced, startDelay])

  const shown = reduced ? roles[0] : roles[state.index].slice(0, state.length)

  return (
    <p className="hero-roles">
      <span className="sr-only">{`${prefix} ${roles.join(', ')}`}</span>
      <span aria-hidden="true">
        {prefix}{' '}
        <span className="hero-roles-word">{shown}</span>
        <span className="hero-roles-caret" />
      </span>
    </p>
  )
}

export default HeroRoles
