import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { profileImageProps, SITE_PROFILE } from '../constants/siteProfile'
import { TYPED_ROLES } from '../constants/typedRoles'
import { goToSection } from '../utils/routes'
import Typed from 'typed.js'
import './Home.css'

const Home = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const typedRef = useRef(null)
  const typedInstance = useRef(null)
  const homeRef = useRef(null)

  useEffect(() => {
    const strings = TYPED_ROLES[language] || TYPED_ROLES.en

    if (typedRef.current) {
      if (typedInstance.current) {
        typedInstance.current.destroy()
      }
      typedInstance.current = new Typed(typedRef.current, {
        strings,
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
      })
    }

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy()
        typedInstance.current = null
      }
    }
  }, [language])

  useEffect(() => {
    const createParticle = () => {
      if (!homeRef.current) return

      const particle = document.createElement('div')
      particle.className = 'particle'
      homeRef.current.appendChild(particle)

      const size = Math.random() * 5 + 2
      const startX = Math.random() * window.innerWidth
      const duration = Math.random() * 3000 + 2000

      particle.style.left = `${startX}px`
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.animationDuration = `${duration}ms`

      setTimeout(() => {
        particle.remove()
      }, duration)
    }

    const interval = setInterval(createParticle, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="home" id="home" ref={homeRef}>
      <div className="max-width">
        <div className="home-inner">
          <div className="home-content">
            <div className="text-1">{t.home.greeting}</div>
            <div className="text-2">{t.home.name}</div>
            <div className="text-3">
              {t.home.subtitle} <span className="typing" ref={typedRef}></span>
            </div>
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
