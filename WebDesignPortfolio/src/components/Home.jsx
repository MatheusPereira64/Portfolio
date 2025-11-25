import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Typed from 'typed.js'
import './Home.css'

const Home = () => {
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

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="home" id="home">
      <div className="max-width">
        <div className="home-content">
          <div className="text-1">{t.home.greeting}</div>
          <div className="text-2">{t.home.name}</div>
          <div className="text-3">
            {t.home.subtitle} <span className="typing" ref={typedRef}></span>
          </div>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')}>{t.home.button}</a>
        </div>
      </div>
    </section>
  )
}

export default Home

