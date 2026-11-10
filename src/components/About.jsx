import { useLanguage } from '../context/LanguageContext'
import { goToSection } from '../utils/routes'
import { countInpiRegistrations } from '../data/certifications'
import { PROJECTS } from '../data/projects'
import AboutPortrait from './AboutPortrait'
import Reveal from './Reveal'
import Skills from './Skills'
import './About.css'

/** Primeiro emprego (Via Certa) em jan/2023: base dos anos de experiência. */
const CAREER_START_YEAR = 2023

/** Marcos da trajetória, na ordem em que aconteceram. Rótulos vêm das traduções. */
const MILESTONE_YEARS = ['2022', '2023', '2025', null]

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
    { value: `${new Date().getFullYear() - CAREER_START_YEAR}+`, label: t.stats.years },
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

            <Reveal as="ol" className="about-path" index={4} aria-label={t.timelineLabel}>
              {t.timeline.map((label, index) => {
                const isNow = MILESTONE_YEARS[index] === null
                return (
                  <li key={label} className={isNow ? 'is-now' : undefined}>
                    <span className="about-path-year">{MILESTONE_YEARS[index] ?? t.today}</span>
                    <span className="about-path-dot" aria-hidden="true" />
                    <span className="about-path-label">{label}</span>
                  </li>
                )
              })}
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
