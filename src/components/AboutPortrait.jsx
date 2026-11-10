import { useInView } from 'react-intersection-observer'
import './AboutPortrait.css'

/**
 * Foto em duotone vermelho com textura pontilhada e luz animada (só CSS).
 * A animação pausa fora da tela e some com prefers-reduced-motion.
 */
const AboutPortrait = ({ alt }) => {
  const base = import.meta.env.BASE_URL
  const { ref, inView } = useInView({ rootMargin: '120px 0px' })

  return (
    <figure ref={ref} className={`about-portrait${inView ? '' : ' is-paused'}`}>
      <div className="about-portrait-stage">
        <img
          src={`${base}images/matheus-workspace-900.webp`}
          srcSet={`${base}images/matheus-workspace-520.webp 520w, ${base}images/matheus-workspace-900.webp 900w`}
          sizes="(max-width: 947px) 90vw, 440px"
          alt={alt}
          width={900}
          height={900}
          loading="lazy"
          decoding="async"
        />
        <span className="about-portrait-tint" aria-hidden="true" />
        <span className="about-portrait-screen" aria-hidden="true" />
        <span className="about-portrait-dots" aria-hidden="true" />
        <span className="about-portrait-scan" aria-hidden="true" />
      </div>
    </figure>
  )
}

export default AboutPortrait
