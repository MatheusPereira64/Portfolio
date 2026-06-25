import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { SITE_PROFILE } from '../constants/siteProfile'
import FlagIcon from './FlagIcon'
import './Navbar.css'

const MOBILE_BREAKPOINT = 1400

const LANGUAGES = [
  { code: 'pt', country: 'br', name: 'PT' },
  { code: 'en', country: 'us', name: 'EN' },
  { code: 'es', country: 'es', name: 'ES' },
]

const LanguageSelector = ({ isOpen, onToggle, onSelect, language }) => {
  const currentLang = LANGUAGES.find((lang) => lang.code === language) || LANGUAGES[0]

  return (
    <div className="language-selector">
      <button
        type="button"
        className="language-button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Language: ${currentLang.name}`}
      >
        <FlagIcon country={currentLang.country} />
        <span className="lang-code">{currentLang.name}</span>
        <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`} aria-hidden="true"></i>
      </button>
      {isOpen && (
        <div className="language-dropdown" role="listbox">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => onSelect(lang.code)}
              role="option"
              aria-selected={language === lang.code}
            >
              <FlagIcon country={lang.country} />
              <span className="lang-code">{lang.name}</span>
              {language === lang.code && <i className="fas fa-check" aria-hidden="true"></i>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

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

  useEffect(() => {
    if (isMenuOpen) {
      setIsLangOpen(false)
    }
  }, [isMenuOpen])

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

  const handleLangToggle = () => setIsLangOpen((open) => !open)

  const handleLangSelect = (langCode) => {
    setLanguage(langCode)
    setIsLangOpen(false)
  }

  const navLinks = (
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
    </>
  )

  const themeToggleButton = (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-button"
      aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
      title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
    >
      <i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
    </button>
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
        className={`menu-mobile${isMenuOpen ? ' active' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        {navLinks}
        <li className="theme-toggle">{themeToggleButton}</li>
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
            {navLinks}
          </ul>
        )}

        <div className="navbar-actions" ref={langRef}>
          {!isMobile && (
            <div className="theme-toggle">{themeToggleButton}</div>
          )}
          <LanguageSelector
            isOpen={isLangOpen}
            onToggle={handleLangToggle}
            onSelect={handleLangSelect}
            language={language}
          />
          {isMobile && (
            <button
              type="button"
              className="menu-btn"
              aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          )}
        </div>
      </div>
      {mobileMenuPortal}
    </nav>
  )
}

export default Navbar
