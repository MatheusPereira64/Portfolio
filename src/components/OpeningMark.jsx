import { useEffect } from 'react'
import './OpeningMark.css'

export default function OpeningMark({ onFinish }) {
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
      className="opening"
      aria-hidden="true"
      onClick={() => onFinish('skip')}
      onAnimationEnd={(event) => {
        if (event.target !== event.currentTarget) return
        if (event.animationName === 'opening-out') onFinish('end')
      }}
    >
      <svg viewBox="0 0 150 44" role="presentation">
        <g>
          <path className="br-open" d="M24 12 10 22 24 32" />
          <g className="mp">
            <path d="M40 36V8L56 26 72 8V36" />
            <path d="M86 36V8H99Q109 8 109 17T99 26H86" />
          </g>
          <path className="br-close" d="M117 36 127 8" />
          <path className="br-close" d="M133 12 147 22 133 32" />
        </g>
      </svg>
    </div>
  )
}
