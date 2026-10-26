import { useLanguage } from '../context/LanguageContext'
import { profileImageProps } from '../constants/siteProfile'
import { goToSection } from '../utils/routes'
import Skills from './Skills'
import './About.css'

const About = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]

  return (
    <section className="about" id="about" data-lang={language}>
      <div className="max-width">
        <h2 className="title">{t.about.title}</h2>
        <div className="about-content">
          <div className="column left">
            <div className="profile-photo-frame">
              <img
                {...profileImageProps()}
                sizes="(max-width: 947px) 80vw, 400px"
                alt=""
                loading="lazy"
                decoding="async"
                width={400}
                height={400}
              />
            </div>
          </div>
          <div className="column right">
            <div className="text">{t.about.text}</div>
            <p>{t.about.description}</p>
            <a href="#contact" onClick={(event) => goToSection(event, 'contact')}>{t.about.button}</a>
          </div>
        </div>
        <Skills />
      </div>
    </section>
  )
}

export default About
