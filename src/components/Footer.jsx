import { useLanguage } from '../context/LanguageContext'
import { SITE_PROFILE } from '../constants/siteProfile'
import Icon from './Icon'
import './Footer.css'

const EMAIL = 'matheuspereira6464@gmail.com'

const RIGHTS = {
  pt: 'Todos os direitos reservados.',
  en: 'All rights reserved.',
  es: 'Todos los derechos reservados.',
}

/** Rodapé mínimo: navegação e contato completos já estão no menu e na seção de contato. */
const Footer = () => {
  const { language } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="max-width footer-row">
        <p className="footer-rights">© {year} Matheus Pereira. {RIGHTS[language] || RIGHTS.en}</p>
        <div className="footer-socials">
          <a href={SITE_PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Icon name="linkedin" />
          </a>
          <a href="https://github.com/MatheusPereira64" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Icon name="github" />
          </a>
          <a href={`mailto:${EMAIL}`} aria-label="Email">
            <Icon name="envelope" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
