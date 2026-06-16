import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { SITE_PROFILE } from '../constants/siteProfile'
import './Navbar.css'

const MOBILE_BREAKPOINT = 947

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
  )
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
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const updateMobile = () => setIsMobile(mediaQuery.matches)
    updateMobile()
    mediaQuery.addEventListener('change', updateMobile)
    return () => mediaQuery.removeEventListener('change', updateMobile)
  }, [])

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

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        setIsLangOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false)
    }
  }, [isMobile])

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsLangOpen(false)
  }

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      closeMenu()
    }
  }

  const handleLangSelect = (langCode) => {
    setLanguage(langCode)
    setIsLangOpen(false)
  }

  const menuItems = (
    <>
      <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')}>{t.nav.home}</a></li>
      <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>{t.nav.about}</a></li>
      <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')} aria-label={t.nav.services}>{t.nav.services}</a></li>
      <li><a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} aria-label={t.nav.skills}>{t.nav.skills}</a></li>
      <li><a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} aria-label={t.nav.experience || 'Experiência'}>{t.nav.experience || 'Experiência'}</a></li>
      <li><a href="#teams" onClick={(e) => scrollToSection(e, 'teams')} aria-label={t.nav.projects}>{t.nav.projects}</a></li>
      <li><a href="#stats" onClick={(e) => scrollToSection(e, 'stats')} aria-label={t.nav.stats || 'Estatísticas'}>{t.nav.stats || 'Estatísticas'}</a></li>
      <li><a href="#blog" onClick={(e) => scrollToSection(e, 'blog')} aria-label={t.nav.blog || 'Blog'}>{t.nav.blog || 'Blog'}</a></li>
      <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} aria-label={t.nav.contact}>{t.nav.contact}</a></li>
      <li className="theme-toggle">
        <button
          type="button"
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
          onKeyDown={(e) => e.key === 'Enter' && setIsLangOpen(!isLangOpen)}
          role="button"
          tabIndex={0}
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
                onKeyDown={(e) => e.key === 'Enter' && handleLangSelect(lang.code)}
                role="button"
                tabIndex={0}
              >
                <span className="lang-flag">{lang.flag}</span>
                <span className="lang-code">{lang.name}</span>
                {language === lang.code && <i className="fas fa-check"></i>}
              </div>
            ))}
          </div>
        )}
      </li>
    </>
  )

  const mobileMenuPortal = isMobile && createPortal(
    <>
      <button
        type="button"
        className={`menu-backdrop ${isMenuOpen ? 'active' : ''}`}
        aria-label={language === 'pt' ? 'Fechar menu' : 'Close menu'}
        onClick={closeMenu}
      />
      <ul
        className={`menu menu-mobile ${isMenuOpen ? 'active' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        {menuItems}
      </ul>
    </>,
    document.body
  )

  return (
    <nav className={`navbar ${isSticky ? 'sticky' : ''} ${isMenuOpen && isMobile ? 'menu-open' : ''}`}>
      <div className="max-width">
        <div className="logo">
          <a href={SITE_PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
            <span>Portfolio</span>
          </a>
        </div>
        {!isMobile && (
          <ul className="menu menu-desktop">
            {menuItems}
          </ul>
        )}
        <button
          type="button"
          className="menu-btn"
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
      {mobileMenuPortal}
    </nav>
  )
}

export default Navbar
