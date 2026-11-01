import { useEffect, useLayoutEffect, useRef } from 'react'
import MpMark from './MpMark'
import './OpeningMark.css'

export default function OpeningMark({ onFinish }) {
  const rootRef = useRef(null)

  // Mede o logo do header para a marca "pousar" nele; só transform e cor, sem layout.
  useLayoutEffect(() => {
    const root = rootRef.current
    const mark = root?.querySelector('svg')
    const target = document.querySelector('.navbar .max-width .logo .mp-mark')
    if (!mark || !target) return
    const from = mark.getBoundingClientRect()
    const to = target.getBoundingClientRect()
    if (!from.width || !to.width) return
    root.style.setProperty('--land-x', `${to.left + to.width / 2 - (from.left + from.width / 2)}px`)
    root.style.setProperty('--land-y', `${to.top + to.height / 2 - (from.top + from.height / 2)}px`)
    root.style.setProperty('--land-scale', String(to.width / from.width))
    root.style.setProperty('--land-color', getComputedStyle(target).color)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      onFinish('skip')
      return undefined
    }

    const finish = () => onFinish('end')
    const skip = () => onFinish('skip')
    const timeoutId = window.setTimeout(finish, 3000)
    window.addEventListener('keydown', skip)
    return () => {
      window.clearTimeout(timeoutId)
      window.removeEventListener('keydown', skip)
    }
  }, [onFinish])

  return (
    <div
      ref={rootRef}
      className="opening"
      aria-hidden="true"
      onClick={() => onFinish('skip')}
      onAnimationEnd={(event) => {
        if (event.target !== event.currentTarget) return
        if (event.animationName === 'opening-out') onFinish('end')
      }}
    >
      <MpMark />
    </div>
  )
}
