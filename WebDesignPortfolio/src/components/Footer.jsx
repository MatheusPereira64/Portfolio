import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

const Footer = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const nav = translations[language].nav

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer>
      <div className="max-width">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')}>
                <span>Portfolio</span>
              </a>
            </div>
            <p>{language === 'pt' 
              ? 'Desenvolvedor apaixonado por criar soluções inovadoras e eficientes através da tecnologia.' 
              : 'Developer passionate about creating innovative and efficient solutions through technology.'}
            </p>
          </div>
          
          <div className="footer-section">
            <h3>{language === 'pt' ? 'Links Rápidos' : 'Quick Links'}</h3>
            <ul className="footer-menu">
              <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')}>{nav.home}</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>{nav.about}</a></li>
              <li><a href="#services" onClick={(e) => scrollToSection(e, 'services')}>{nav.services}</a></li>
              <li><a href="#skills" onClick={(e) => scrollToSection(e, 'skills')}>{nav.skills}</a></li>
              <li><a href="#teams" onClick={(e) => scrollToSection(e, 'teams')}>{nav.projects}</a></li>
              <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>{nav.contact}</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>{language === 'pt' ? 'Tecnologias' : 'Technologies'}</h3>
            <div className="tech-icons">
              <i className="fab fa-html5" title="HTML5"></i>
              <i className="fab fa-css3-alt" title="CSS3"></i>
              <i className="fab fa-js-square" title="JavaScript"></i>
              <i className="fab fa-react" title="React"></i>
              <i className="fab fa-python" title="Python"></i>
              <i className="fab fa-node-js" title="Node.js"></i>
              <i className="fab fa-git-alt" title="Git"></i>
              <i className="fab fa-github" title="GitHub"></i>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>{t.contact.title}</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-phone" title="Telefone"></i>
                <span>+55 (92) 99213-8870</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope" title="Email"></i>
                <span>matheuspereira6464@gmail.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt" title="Localização"></i>
                <span>{language === 'pt' ? 'Manaus, Amazonas - Brasil' : 'Manaus, Amazonas - Brazil'}</span>
              </div>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>{language === 'pt' ? 'Conecte-se' : 'Connect'}</h3>
            <div className="socials">
              <a href="https://www.linkedin.com/in/matheus-pereira-836033243/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="https://github.com/MatheusPereira64" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>{language === 'pt' ? '© 2025 Matheus Pereira. Todos os direitos reservados.' : '© 2025 Matheus Pereira. All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

