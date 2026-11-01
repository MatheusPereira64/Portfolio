import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { getPublishedPosts } from '../data/linkedinPosts'
import { goToSection, toHref } from '../utils/routes'
import MpMark from './MpMark'
import './Navbar.css'

// Acima disto a navegação cabe inteira no header, então o hambúrguer sai:
// no desktop ele só repetiria links que já estão visíveis.
const COMPACT_BREAKPOINT = 960

const LANGUAGES = [
  { code: 'pt', name: 'PT', label: 'Português' },
  { code: 'en', name: 'EN', label: 'English' },
  { code: 'es', name: 'ES', label: 'Español' },
]

const ThemeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
    <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" />
  </svg>
)

const MenuIcon = ({ open }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </g>
  </svg>
)

const LanguageSelector = ({ isOpen, onToggle, onOpen, onClose, onSelect, language, copy }) => {
  const currentLang = LANGUAGES.find((lang) => lang.code === language) || LANGUAGES[0]
  const buttonRef = useRef(null)
  const optionsRef = useRef([])

  useEffect(() => {
    if (!isOpen) return
    const current = LANGUAGES.findIndex((lang) => lang.code === language)
    optionsRef.current[Math.max(current, 0)]?.focus()
    // Só ao abrir: trocar de idioma já fecha o seletor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const closeAndRestoreFocus = () => {
    onClose()
    buttonRef.current?.focus()
  }

  const handleButtonKeyDown = (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      onOpen()
    }
  }

  const handleMenuKeyDown = (event) => {
    const count = LANGUAGES.length
    const index = optionsRef.current.indexOf(document.activeElement)
    const moves = {
      ArrowDown: (index + 1) % count,
      ArrowUp: (index - 1 + count) % count,
      Home: 0,
      End: count - 1,
    }
    if (event.key in moves) {
      event.preventDefault()
      optionsRef.current[moves[event.key]]?.focus()
    } else if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      closeAndRestoreFocus()
    } else if (event.key === 'Tab') {
      onClose()
    }
  }

  return (
    <div className="language-selector">
      <button
        type="button"
        ref={buttonRef}
        className="nav-circle nav-circle-lang"
        onClick={onToggle}
        onKeyDown={handleButtonKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={copy.languageButton.replace('{language}', currentLang.label)}
      >
        {currentLang.name}
      </button>
      {isOpen && (
        <div className="language-dropdown" role="menu" aria-label={copy.languageMenu} onKeyDown={handleMenuKeyDown}>
          {LANGUAGES.map((lang, index) => (
            <button
              key={lang.code}
              type="button"
              ref={(node) => {
                optionsRef.current[index] = node
              }}
              lang={lang.code}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => {
                onSelect(lang.code)
                buttonRef.current?.focus()
              }}
              role="menuitemradio"
              aria-checked={language === lang.code}
              tabIndex={-1}
            >
              <span className="lang-code">{lang.name}</span>
              <span>{lang.label}</span>
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
  const mobileMenuRef = useRef(null)
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

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false)
    setIsLangOpen(false)
    requestAnimationFrame(() => {
      menuBtnRef.current?.focus()
    })
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    mobileMenuRef.current?.querySelector('a')?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu()
        return
      }
      if (event.key !== 'Tab') return
      // O painel está num portal no fim do body: o foco circula entre o botão e os links.
      const links = mobileMenuRef.current ? [...mobileMenuRef.current.querySelectorAll('a')] : []
      const focusable = [menuBtnRef.current, ...links].filter(Boolean)
      if (!focusable.length) return
      const index = focusable.indexOf(document.activeElement)
      const step = event.shiftKey ? -1 : 1
      event.preventDefault()
      focusable[(index + step + focusable.length) % focusable.length].focus()
    }
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen, closeMenu])

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

  const scrollToSection = (e, sectionId) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    goToSection(e, sectionId)
    if (isMenuOpen) closeMenu()
  }

  const handleLangToggle = () => {
    setIsMenuOpen(false)
    setIsLangOpen((open) => !open)
  }

  const handleLangOpen = () => {
    setIsMenuOpen(false)
    setIsLangOpen(true)
  }

  const handleLangSelect = (langCode) => {
    setLanguage(langCode)
    setIsLangOpen(false)
  }

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'teams', label: t.nav.projects },
    { id: 'experience', label: t.nav.experience || 'Experiência' },
    { id: 'about', label: t.nav.about },
    ...(getPublishedPosts().length ? [{ id: 'blog', label: t.nav.blog || 'Blog' }] : []),
    { id: 'contact', label: t.nav.contact },
  ]

  const renderNavLinks = () =>
    navItems.map((item) => (
      <li key={item.id}>
        <a href={`#${item.id}`} onClick={(e) => scrollToSection(e, item.id)}>
          {item.label}
        </a>
      </li>
    ))

  const themeLabel = theme === 'light' ? t.nav.themeToDark : t.nav.themeToLight
  const renderThemeButton = () => (
    <button
      type="button"
      onClick={toggleTheme}
      className="nav-circle"
      aria-label={themeLabel}
      title={themeLabel}
    >
      <ThemeIcon />
    </button>
  )

  const mobileMenuPortal = isCompact && createPortal(
    <>
      <button
        type="button"
        className={`menu-backdrop ${isMenuOpen ? 'active' : ''}`}
        aria-label={t.nav.closeMenu}
        tabIndex={-1}
        onClick={closeMenu}
      />
      <ul
        id="mobile-menu"
        ref={mobileMenuRef}
        className={`menu-mobile${isMenuOpen ? ' active' : ''}`}
        aria-hidden={isMenuOpen ? undefined : true}
        {...(isMenuOpen ? {} : { inert: '' })}
      >
        {renderNavLinks()}
      </ul>
    </>,
    document.body
  )

  return (
    <nav
      className={`navbar ${isSticky ? 'sticky' : ''} ${isCompact ? 'is-compact' : ''} ${isMenuOpen && isCompact ? 'menu-open' : ''}`}
      aria-label={t.nav.mainNavigation}
    >
      <div className="navbar-measure" ref={measureRef} aria-hidden="true" inert="">
        <div className="logo">
          <MpMark />
        </div>
        <ul className="menu menu-desktop">{renderNavLinks()}</ul>
        <div className="navbar-actions">
          <span className="nav-circle" />
          <span className="nav-circle" />
        </div>
      </div>

      <div className="max-width" ref={shellRef}>
        <div className="logo">
          <a
            href={`${toHref('/')}#home`}
            aria-label={t.nav.logoLabel}
            onClick={(event) => scrollToSection(event, 'home')}
          >
            <MpMark />
          </a>
        </div>

        {!isCompact && (
          <ul className="menu menu-desktop">
            {renderNavLinks()}
          </ul>
        )}

        <div className="navbar-actions" ref={langRef}>
          <LanguageSelector
            isOpen={isLangOpen}
            onToggle={handleLangToggle}
            onOpen={handleLangOpen}
            onClose={() => setIsLangOpen(false)}
            onSelect={handleLangSelect}
            language={language}
            copy={t.nav}
          />
          {renderThemeButton()}
          {isCompact && (
            <button
              type="button"
              ref={menuBtnRef}
              className="nav-circle"
              aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => (isMenuOpen ? closeMenu() : setIsMenuOpen(true))}
            >
              <MenuIcon open={isMenuOpen} />
            </button>
          )}
        </div>
      </div>
      {mobileMenuPortal}
    </nav>
  )
}

export default Navbar
