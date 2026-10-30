import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../context/LanguageContext'
import { profileImageProps, SITE_PROFILE } from '../constants/siteProfile'
import { goToSection } from '../utils/routes'
import CodeWindow from './CodeWindow'
import './Home.css'

const DOTS_A = [
  [90, 70, 2],
  [210, 160, 1.4],
  [340, 40, 1.8],
  [480, 210, 1.2],
  [620, 90, 2.2],
  [760, 180, 1.5],
  [900, 50, 1.7],
  [1040, 150, 1.3],
  [150, 320, 1.6],
  [400, 360, 2],
  [680, 300, 1.4],
  [980, 340, 1.8],
]

const DOTS_B = [
  [40, 140, 1.5],
  [180, 240, 2.1],
  [300, 110, 1.2],
  [520, 40, 1.6],
  [700, 220, 1.3],
  [860, 120, 2],
  [1100, 80, 1.4],
  [260, 420, 1.7],
  [560, 380, 1.2],
  [820, 400, 1.9],
  [1080, 280, 1.5],
]

function ParticleLayer({ dots, className }) {
  return (
    <svg className={className} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {dots.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
      ))}
    </svg>
  )
}

const Home = ({ typingDelay = 0.3 }) => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const { ref, inView } = useInView({ threshold: 0 })
  const [motionPaused, setMotionPaused] = useState(false)

  useEffect(() => {
    const sync = () => {
      document.documentElement.classList.toggle('tab-hidden', document.hidden)
    }
    sync()
    document.addEventListener('visibilitychange', sync)
    return () => document.removeEventListener('visibilitychange', sync)
  }, [])

  const particlesPaused = motionPaused || !inView

  return (
    <section className="home" id="home" ref={ref}>
      <div className={`hero-particles${particlesPaused ? ' is-paused' : ''}`} aria-hidden="true">
        <ParticleLayer dots={DOTS_A} className="hero-particles-layer hero-particles-layer-a" />
        <ParticleLayer dots={DOTS_B} className="hero-particles-layer hero-particles-layer-b" />
      </div>
      <button
        type="button"
        className="hero-motion-toggle"
        aria-pressed={motionPaused}
        onClick={() => setMotionPaused((paused) => !paused)}
      >
        {motionPaused ? t.home.playMotion : t.home.pauseMotion}
      </button>
      <div className="max-width">
        <div className="home-inner">
          <div className="home-content">
            <p className="text-1">{t.home.greeting}</p>
            <h1 className="text-2">{t.home.name}</h1>
            <CodeWindow delay={typingDelay} />
            <a href="#about" onClick={(event) => goToSection(event, 'about')}>
              {t.home.button}
            </a>
          </div>
          <div className="home-profile">
            <div className="home-profile-ring">
              <img
                {...profileImageProps()}
                alt={SITE_PROFILE.fullName}
                width={280}
                height={280}
                fetchpriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
