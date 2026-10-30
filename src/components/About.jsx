import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { profileImageProps } from '../constants/siteProfile'
import { TYPED_ROLES } from '../constants/typedRoles'
import { goToSection } from '../utils/routes'
import Typed from 'typed.js'
import Reveal from './Reveal'
import Skills from './Skills'
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
        strings,
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1000,
        startDelay: 1000,
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

  return (
    <section className="about" id="about" data-lang={language}>
      <div className="max-width">
        <Reveal as="h2" className="title">{t.about.title}</Reveal>
        <div className="about-content">
          <Reveal className="column left">
            <div className="profile-photo-frame">
              <img
                {...profileImageProps()}
                sizes="(max-width: 947px) 80vw, 400px"
                alt=""
                loading="lazy"
                decoding="async"
                width={400}
                height={400}
              />
            </div>
          </Reveal>
          <Reveal className="column right" index={1}>
            <div className="text">
              {t.about.text} <span className="typing-2" ref={typedRef}></span>
            </div>
            <p>{t.about.description}</p>
            <a href="#contact" onClick={(event) => goToSection(event, 'contact')}>
              {t.about.button}
            </a>
          </Reveal>
        </div>
        <Skills />
      </div>
    </section>
  )
}

export default About
