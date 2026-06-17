import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { profileImageUrl, SITE_PROFILE } from '../constants/siteProfile'
import { TYPED_ROLES } from '../constants/typedRoles'
import Typed from 'typed.js'
import './About.css'

const About = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const typedRef = useRef(null)
  const typedInstance = useRef(null)

  useEffect(() => {
    const strings = TYPED_ROLES[language] || TYPED_ROLES.en

    if (typedRef.current) {
      if (typedInstance.current) {
        typedInstance.current.destroy()
      }
      typedInstance.current = new Typed(typedRef.current, {
        strings: strings,
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1000,
        startDelay: 1000,
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

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="about" id="about" data-lang={language}>
      <div className="max-width">
        <h2 className="title">{t.about.title}</h2>
        <div className="about-content">
          <div className="column left">
            <div className="profile-photo-frame">
              <img
                src={profileImageUrl()}
                alt={SITE_PROFILE.fullName}
                loading="lazy"
                width={400}
                height={400}
              />
            </div>
          </div>
          <div className="column right">
            <div className="text">{t.about.text} <span className="typing-2" ref={typedRef}></span></div>
            <p>{t.about.description}</p>
            <a href="#services" onClick={(e) => scrollToSection(e, 'services')}>{t.about.button}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

