import { useState } from 'react'
import { useInView } from 'react-intersection-observer'

export default function Reveal({
  as: Component = 'div',
  className = '',
  index = 0,
  children,
  style,
  onAnimationEnd,
  ...props
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px -24px 0px',
  })
  const [settled, setSettled] = useState(false)
  const classes = [className, 'reveal', inView ? 'in' : '', settled ? 'settled' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <Component
      {...props}
      ref={ref}
      className={classes}
      style={{ ...style, '--i': index }}
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget && event.animationName === 'block-in') {
          setSettled(true)
        }
        onAnimationEnd?.(event)
      }}
    >
      {children}
    </Component>
  )
}
