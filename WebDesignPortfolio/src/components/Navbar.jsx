import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { SITE_PROFILE } from '../constants/siteProfile'
import './Navbar.css'

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { language, setLanguage, translations } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const t = translations[language]
  const langRef = useRef(null)

  const languages = [
    { code: 'pt', flag: '🇧🇷', name: 'PT' },
    { code: 'en', flag: '🇺🇸', name: 'EN' },
    { code: 'es', flag: '🇪🇸', name: 'ES' }
  ]

  const currentLang = languages.find(lang => lang.code === language) || languages[0]

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMenuClick = () => {
    setIsMenuOpen(false)
  }

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const handleLangSelect = (langCode) => {
    setLanguage(langCode)
    setIsLangOpen(false)
  }

  return (
    <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="max-width">
        <div className="logo">
          <a href={SITE_PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
            <span>Portfolio</span>
          </a>
        </div>
        <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')}>{t.nav.home}</a></li>
          <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>{t.nav.about}</a></li>
          <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} aria-label={t.nav.services}>{t.nav.services}</a></li>
          <li><a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} aria-label={t.nav.skills}>{t.nav.skills}</a></li>
          <li><a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} aria-label={t.nav.experience || 'Experiência'}>{(t.nav.experience || 'Experiência')}</a></li>
          <li><a href="#teams" onClick={(e) => scrollToSection(e, 'teams')} aria-label={t.nav.projects}>{t.nav.projects}</a></li>
          <li><a href="#stats" onClick={(e) => scrollToSection(e, 'stats')} aria-label={t.nav.stats || 'Estatísticas'}>{(t.nav.stats || 'Estatísticas')}</a></li>
          <li><a href="#blog" onClick={(e) => scrollToSection(e, 'blog')} aria-label={t.nav.blog || 'Blog'}>{(t.nav.blog || 'Blog')}</a></li>
          <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} aria-label={t.nav.contact}>{t.nav.contact}</a></li>
          <li className="theme-toggle">
            <button 
              onClick={toggleTheme}
              className="theme-button"
              aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
              title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
            >
              <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>
          </li>
          <li className="language-selector" ref={langRef}>
            <div 
              className="language-button"
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <span className="lang-flag">{currentLang.flag}</span>
              <span className="lang-code">{currentLang.name}</span>
              <i className={`fas fa-chevron-${isLangOpen ? 'up' : 'down'}`}></i>
            </div>
            {isLangOpen && (
              <div className="language-dropdown">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`language-option ${language === lang.code ? 'active' : ''}`}
                    onClick={() => handleLangSelect(lang.code)}
                  >
                    <span className="lang-flag">{lang.flag}</span>
                    <span className="lang-code">{lang.name}</span>
                    {language === lang.code && <i className="fas fa-check"></i>}
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>
        <div className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

