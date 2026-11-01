import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { profileImageProps } from '../constants/siteProfile'
import { TYPED_ROLES } from '../constants/typedRoles'
import { getLocalizedField } from '../data/projects'
import { goToSection } from '../utils/routes'
import Typed from 'typed.js'
import Reveal from './Reveal'
import Skills from './Skills'
import './About.css'

const EDUCATION = [
  {
    id: 'fametro',
    title: {
      pt: 'Graduado em Engenharia da Computação',
      en: 'Graduated in Computer Engineering',
      es: 'Graduado en Ingeniería de Computación',
    },
    institution: 'FAMETRO',
    period: '2019 – 2024',
  },
  {
    id: 'samsung-ocean',
    title: {
      pt: 'Projetos acadêmicos e programas Samsung Ocean',
      en: 'Academic projects and Samsung Ocean programs',
      es: 'Proyectos académicos y programas Samsung Ocean',
    },
    institution: 'FAMETRO · Samsung Ocean',
    period: '2022 – 2023',
  },
  {
    id: 'flexpeak',
    title: {
      pt: 'Lógica e Programação WEB - Full Stack',
      en: 'WEB Logic and Programming - Full Stack',
      es: 'Lógica y Programación WEB - Full Stack',
    },
    institution: 'Flexpeak',
    period: '2023',
  },
  {
    id: 'icbeu',
    title: { pt: 'Inglês Fluente - C1', en: 'Fluent English - C1', es: 'Inglés fluido - C1' },
    institution: 'ICBEU',
    period: '2019',
  },
]

const About = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const typedRef = useRef(null)
  const typedInstance = useRef(null)

  useEffect(() => {
    const strings = TYPED_ROLES[language] || TYPED_ROLES.en

    if (typedRef.current) {
      if (typedInstance.current) {
        typedInstance.current.destroy()
      }
      typedInstance.current = new Typed(typedRef.current, {
        strings,
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
      })
    }

    return () => {
      if (typedInstance.current) {
        typedInstance.current.destroy()
        typedInstance.current = null
      }
    }
  }, [language])

  return (
    <section className="about" id="about" data-lang={language}>
      <div className="max-width">
        <Reveal as="h2" className="section-heading">{t.about.title}</Reveal>
        <div className="about-content">
          <Reveal className="about-photo">
            <img
              {...profileImageProps()}
              sizes="(max-width: 947px) 280px, 400px"
              alt=""
              loading="lazy"
              decoding="async"
              width={400}
              height={400}
            />
          </Reveal>
          <Reveal className="about-main" index={1}>
            <p className="about-lead">
              {t.about.text} <span className="typing-2" ref={typedRef}></span>
            </p>
            <p className="about-description">{t.about.description}</p>
            <a
              className="about-cta"
              href="#contact"
              onClick={(event) => goToSection(event, 'contact')}
            >
              {t.about.button}
            </a>

            <div className="about-education" id="education">
              <h3 className="about-subheading">{t.skills.education}</h3>
              <ul className="education-list">
                {EDUCATION.map((item) => (
                  <li key={item.id} className="education-row">
                    <div>
                      <strong>{getLocalizedField(item.title, language)}</strong>
                      <span>{item.institution}</span>
                    </div>
                    <span className="education-period">{item.period}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <Skills />
      </div>
    </section>
  )
}

export default About
