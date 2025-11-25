import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Navbar.css'

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, translations } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
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

  return (
    <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
      <div className="max-width">
        <div className="logo">
          <a href="https://www.linkedin.com/in/matheus-pereira-836033243/" target="_blank" rel="noopener noreferrer">
            <span>Portfolio</span>
          </a>
        </div>
        <ul className={`menu ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')}>{t.nav.home}</a></li>
          <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>{t.nav.about}</a></li>
          <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')}>{t.nav.services}</a></li>
          <li><a href="#skills" onClick={(e) => scrollToSection(e, 'skills')}>{t.nav.skills}</a></li>
          <li><a href="#teams" onClick={(e) => scrollToSection(e, 'teams')}>{t.nav.projects}</a></li>
          <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>{t.nav.contact}</a></li>
          <li className="language-selector">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="pt">🇧🇷 PT</option>
              <option value="en">🇺🇸 EN</option>
            </select>
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

