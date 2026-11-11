import { useLanguage } from '../context/LanguageContext'
import { goToSection } from '../utils/routes'
import { countInpiRegistrations } from '../data/certifications'
import { PROJECTS } from '../data/projects'
import AboutPortrait from './AboutPortrait'
import Reveal from './Reveal'
import Skills from './Skills'
import './About.css'

/** Anos de experiência declarados por Matheus (o mesmo número do texto da bio). */
const YEARS_OF_EXPERIENCE = '5+'
/** Repositórios no GitHub, públicos e privados, informados por Matheus. */
const GITHUB_REPOSITORIES = '20+'

/** Transforma **trecho** em <strong>, para destacar fatos na bio sem HTML nas traduções. */
const withEmphasis = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part
  )

const About = () => {
  const { translations, language } = useLanguage()
  const t = translations[language].about

  const stats = [
    { value: countInpiRegistrations(), label: t.stats.inpi },
    { value: PROJECTS.length, label: t.stats.projects },
    { value: YEARS_OF_EXPERIENCE, label: t.stats.years },
    { value: GITHUB_REPOSITORIES, label: t.stats.repos },
  ]

  return (
    <section className="about" id="about" data-lang={language}>
      <div className="max-width">
        <div className="about-content">
          <div className="about-main">
            <Reveal as="h2" className="about-label">{t.title}</Reveal>
            <Reveal as="p" className="about-headline" index={1}>
              {t.headline} <span className="about-headline-accent">{t.headlineAccent}</span>
            </Reveal>

            <Reveal className="about-bio" index={2}>
              {t.bio.map((paragraph) => <p key={paragraph}>{withEmphasis(paragraph)}</p>)}
            </Reveal>

            <Reveal as="dl" className="about-stats" index={3}>
              {stats.map((stat) => (
                <div key={stat.label} className="about-stat">
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </Reveal>

            <a
              className="about-cta"
              href="#contact"
              onClick={(event) => goToSection(event, 'contact')}
            >
              {t.button}
            </a>
          </div>

          <Reveal className="about-photo" index={1}>
            <AboutPortrait alt={t.portraitAlt} />
          </Reveal>
        </div>
        <Skills />
      </div>
    </section>
  )
}

export default About
