import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { SITE_PROFILE, triggerCvDownload } from '../constants/siteProfile'
import FlagIcon from './FlagIcon'
import './Navbar.css'

const COMPACT_BREAKPOINT = 1200

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
  const [isCompact, setIsCompact] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(`(max-width: ${COMPACT_BREAKPOINT}px)`).matches
  )
  const { language, setLanguage, translations } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const t = translations[language]
  const langRef = useRef(null)
  const menuBtnRef = useRef(null)
  const shellRef = useRef(null)
  const measureRef = useRef(null)

  useLayoutEffect(() => {
    const shell = shellRef.current
    const measure = measureRef.current
    if (!shell || !measure) return undefined

    const mediaQuery = window.matchMedia(`(max-width: ${COMPACT_BREAKPOINT}px)`)

    const updateCompact = () => {
      const tooNarrow = mediaQuery.matches
      const overflows = measure.scrollWidth > shell.clientWidth - 16
      setIsCompact(tooNarrow || overflows)
    }

    updateCompact()
    const observer = new ResizeObserver(updateCompact)
    observer.observe(shell)
    observer.observe(measure)
    mediaQuery.addEventListener('change', updateCompact)
    return () => {
      observer.disconnect()
      mediaQuery.removeEventListener('change', updateCompact)
    }
  }, [language])

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
    if (!isCompact) {
      setIsMenuOpen(false)
    }
  }, [isCompact])

  useEffect(() => {
    if (isMenuOpen) {
      setIsLangOpen(false)
    }
  }, [isMenuOpen])

  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsLangOpen(false)
    requestAnimationFrame(() => {
      menuBtnRef.current?.focus()
    })
  }

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
      element.scrollIntoView({ behavior: 'smooth' })
      closeMenu()
    }
  }

  const handleLangToggle = () => setIsLangOpen((open) => !open)

  const handleLangSelect = (langCode) => {
    setLanguage(langCode)
    setIsLangOpen(false)
  }

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'skills', label: t.nav.skills },
    { id: 'experience', label: t.nav.experience || 'Experiência' },
    { id: 'teams', label: t.nav.projects },
    { id: 'stats', label: t.nav.stats || 'Estatísticas' },
    { id: 'blog', label: t.nav.blog || 'Blog' },
    { id: 'contact', label: t.nav.contact },
  ]

  const renderNavLinks = () =>
    navItems.map((item) => (
      <li key={item.id}>
        <a href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)} aria-label={item.label}>
          {item.label}
        </a>
      </li>
    ))

  const renderThemeButton = () => (
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

  const cvDownloadLabel = t.nav.downloadCv || 'Download résumé'
  const renderCvButton = () => (
    <button
      type="button"
      onClick={() => {
        triggerCvDownload(language)
        closeMenu()
      }}
      className="theme-button cv-nav-button"
      aria-label={cvDownloadLabel}
      title={cvDownloadLabel}
    >
      <i className="fas fa-file-download" aria-hidden="true"></i>
    </button>
  )

  const mobileMenuPortal = isCompact && createPortal(
    <>
      <button
        type="button"
        className={`menu-backdrop ${isMenuOpen ? 'active' : ''}`}
        aria-label={language === 'pt' ? 'Fechar menu' : 'Close menu'}
        onClick={closeMenu}
      />
      <ul
        className={`menu-mobile${isMenuOpen ? ' active' : ''}`}
        aria-hidden={isMenuOpen ? undefined : true}
        {...(isMenuOpen ? {} : { inert: '' })}
      >
        {renderNavLinks()}
        <li className="theme-toggle">{renderCvButton()}</li>
        <li className="theme-toggle">{renderThemeButton()}</li>
      </ul>
    </>,
    document.body
  )

  return (
    <nav className={`navbar ${isSticky ? 'sticky' : ''} ${isCompact ? 'is-compact' : ''} ${isMenuOpen && isCompact ? 'menu-open' : ''}`}>
      <div className="navbar-measure" ref={measureRef} aria-hidden="true" inert="">
        <div className="logo">
          <a tabIndex={-1}>
            <span>Portfolio</span>
          </a>
        </div>
        <ul className="menu menu-desktop">{renderNavLinks()}</ul>
        <div className="navbar-actions">
          <div className="theme-toggle">{renderCvButton()}</div>
          <div className="theme-toggle">{renderThemeButton()}</div>
          <LanguageSelector isOpen={false} onToggle={() => {}} onSelect={() => {}} language={language} />
        </div>
      </div>

      <div className="max-width" ref={shellRef}>
        <div className="logo">
          <a href={SITE_PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
            <span>Portfolio</span>
          </a>
        </div>

        {!isCompact && (
          <ul className="menu menu-desktop">
            {renderNavLinks()}
          </ul>
        )}

        <div className="navbar-actions" ref={langRef}>
          {!isCompact && (
            <>
              <div className="theme-toggle">{renderCvButton()}</div>
              <div className="theme-toggle">{renderThemeButton()}</div>
            </>
          )}
          <LanguageSelector
            isOpen={isLangOpen}
            onToggle={handleLangToggle}
            onSelect={handleLangSelect}
            language={language}
          />
          {isCompact && (
            <button
              type="button"
              ref={menuBtnRef}
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
