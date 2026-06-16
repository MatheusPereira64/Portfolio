import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { profileImageUrl, SITE_PROFILE } from '../constants/siteProfile'
import Typed from 'typed.js'
import './Home.css'

const Home = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const typedRef = useRef(null)
  const typedInstance = useRef(null)
  const homeRef = useRef(null)

  useEffect(() => {
    let strings
    if (language === 'pt') {
      strings = ["Desenvolvedor Fullstack", "Web Developer", "Software Developer", "Frontend Developer"]
    } else if (language === 'es') {
      strings = ["Desarrollador Fullstack", "Desarrollador Web", "Desarrollador de Software", "Desarrollador Frontend"]
    } else {
      strings = ["Web Designer", "Programmer", "Game Developer", "Software Developer"]
    }

    if (typedRef.current) {
      if (typedInstance.current) {
        typedInstance.current.destroy()
      }
      typedInstance.current = new Typed(typedRef.current, {
        strings: strings,
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
      })
    }

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy()
        typedInstance.current = null
      }
    }
  }, [language])

  // Particle effect
  useEffect(() => {
    const createParticle = () => {
      if (!homeRef.current) return
      
      const particle = document.createElement('div')
      particle.className = 'particle'
      homeRef.current.appendChild(particle)
      
      const size = Math.random() * 5 + 2
      const startX = Math.random() * window.innerWidth
      const duration = Math.random() * 3000 + 2000
      
      particle.style.left = startX + 'px'
      particle.style.width = size + 'px'
      particle.style.height = size + 'px'
      particle.style.animationDuration = duration + 'ms'
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.remove()
        }
      }, duration)
    }

    const interval = setInterval(createParticle, 300)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>{t.home.button}</a>
          </div>
          <div className="home-profile">
            <div className="home-profile-ring">
              <img
                src={profileImageUrl()}
                alt={SITE_PROFILE.fullName}
                width={280}
                height={280}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home

