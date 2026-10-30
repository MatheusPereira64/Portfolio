import { useLanguage } from '../context/LanguageContext'
import { SITE_PROFILE } from '../constants/siteProfile'
import { getPublishedPosts } from '../data/linkedinPosts'
import { goToSection, toHref } from '../utils/routes'
import Icon from './Icon'
import './Footer.css'

const Footer = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const nav = translations[language].nav
  const year = new Date().getFullYear()
  const showBlog = getPublishedPosts().length > 0

  const scrollToSection = (e, sectionId) => {
    goToSection(e, sectionId)
  }

  const blurb = language === 'pt'
    ? 'Desenvolvedor apaixonado por criar soluções inovadoras e eficientes através da tecnologia.'
    : language === 'es'
      ? 'Desarrollador apasionado por crear soluciones innovadoras y eficientes a través de la tecnología.'
      : 'Developer passionate about creating innovative and efficient solutions through technology.'

  const rights = language === 'pt'
    ? `© ${year} Matheus Pereira. Todos os direitos reservados.`
    : language === 'es'
      ? `© ${year} Matheus Pereira. Todos los derechos reservados.`
      : `© ${year} Matheus Pereira. All rights reserved.`

  const location = language === 'pt'
    ? 'Manaus, Amazonas - Brasil'
    : language === 'es'
      ? 'Manaus, Amazonas - Brasil'
      : 'Manaus, Amazonas - Brazil'

  return (
    <footer>
      <div className="max-width">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              <a href={`${toHref('/')}#home`} onClick={(e) => scrollToSection(e, 'home')}>
                <span>Matheus Pereira</span>
              </a>
            </div>
            <p>{blurb}</p>
          </div>

          <div className="footer-section">
            <h3>{language === 'pt' ? 'Links Rápidos' : language === 'es' ? 'Enlaces rápidos' : 'Quick Links'}</h3>
            <ul className="footer-menu">
              <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')}>{nav.home}</a></li>
              <li><a href="#teams" onClick={(e) => scrollToSection(e, 'teams')}>{nav.projects}</a></li>
              <li><a href="#experience" onClick={(e) => scrollToSection(e, 'experience')}>{nav.experience}</a></li>
              <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>{nav.about}</a></li>
              {showBlog && <li><a href="#blog" onClick={(e) => scrollToSection(e, 'blog')}>{nav.blog}</a></li>}
              <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>{nav.contact}</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>{language === 'pt' ? 'Tecnologias' : language === 'es' ? 'Tecnologías' : 'Technologies'}</h3>
            <div className="tech-icons">
              <Icon name="html5" title="HTML5" />
              <Icon name="css3-alt" title="CSS3" />
              <Icon name="js-square" title="JavaScript" />
              <Icon name="react" title="React" />
              <Icon name="python" title="Python" />
              <Icon name="node-js" title="Node.js" />
              <Icon name="git-alt" title="Git" />
              <Icon name="github" title="GitHub" />
            </div>
          </div>

          <div className="footer-section">
            <h3>{t.contact.title}</h3>
            <div className="contact-info">
              <div className="contact-item">
                <Icon name="phone" title="Telefone" />
                <span>+55 (92) 99213-8870</span>
              </div>
              <div className="contact-item">
                <Icon name="envelope" title="Email" />
                <span>matheuspereira6464@gmail.com</span>
              </div>
              <div className="contact-item">
                <Icon name="map-marker-alt" title="Localização" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3>{language === 'pt' ? 'Conecte-se' : language === 'es' ? 'Conecta' : 'Connect'}</h3>
            <div className="socials">
              <a href={SITE_PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Icon name="linkedin" />
              </a>
              <a href="https://github.com/MatheusPereira64" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Icon name="github" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{rights}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
