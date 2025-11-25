import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Typed from 'typed.js'
import './About.css'

const About = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const typedRef = useRef(null)
  const typedInstance = useRef(null)

  useEffect(() => {
    const strings = language === 'pt' 
      ? ["Desenvolvedor Fullstack", "Web Developer", "Software Developer", "Frontend Developer"]
      : ["Web Designer", "Programmer", "Game Developer", "Software Developer"]

    if (typedRef.current && !typedInstance.current) {
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
    <section className="about" id="about">
      <div className="max-width">
        <h2 className="title">{t.about.title}</h2>
        <div className="about-content">
          <div className="column left">
            <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Programming" />
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

