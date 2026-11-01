import { useLanguage } from '../context/LanguageContext'
import { getLocalizedField } from '../data/projects'
import Reveal from './Reveal'
import SkillIcon from './SkillIcon'
import './Experience.css'

/** Mais recente primeiro. A parte acadêmica fica em Formação, na seção Sobre mim. */
const EXPERIENCES = [
  {
    id: 'itegam',
    period: '2025 – 2026',
    start: '2025',
    current: true,
    title: 'Full Stack Software Engineer',
    company: 'ITEGAM',
    description: {
      pt: 'Projetos de PD&I para Indústria 4.0: aplicações web, APIs, monitoramento industrial em tempo real, dashboards (OEE, FPY) e integrações IoT.',
      en: 'R&D projects for Industry 4.0: web apps, APIs, real-time industrial monitoring, dashboards (OEE, FPY) and IoT integrations.',
      es: 'Proyectos de I+D para Industria 4.0: aplicaciones web, APIs, monitoreo industrial en tiempo real, dashboards (OEE, FPY) e integraciones IoT.',
    },
    results: {
      pt: 'Dashboards de OEE, FPY, produtividade e qualidade; dados em tempo real e integração IoT no chão de fábrica.',
      en: 'OEE, FPY, productivity and quality dashboards; real-time data and IoT on the shop floor.',
      es: 'Dashboards de OEE, FPY, productividad y calidad; datos en tiempo real e IoT en planta.',
    },
    technologies: ['React', 'Vue.js', 'TypeScript', 'Node.js', 'Python', 'Java', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    id: 'freelancer',
    period: '2024',
    start: '2024',
    title: 'Full Stack Software Engineer',
    company: {
      pt: 'Projetos Pessoais e Freelancer',
      en: 'Personal Projects & Freelancer',
      es: 'Proyectos Personales y Freelancer',
    },
    description: {
      pt: 'Aplicações web completas com React, Node.js e APIs REST. Portfólios, sistemas de gestão e integrações modernas.',
      en: 'Full web apps with React, Node.js and REST APIs. Portfolios, management systems and modern service integrations.',
      es: 'Aplicaciones web completas con React, Node.js y APIs REST. Portafolios, sistemas de gestión e integraciones modernas.',
    },
    technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express', 'Git'],
  },
  {
    id: 'via-certa',
    period: { pt: 'Jan – Jun 2023', en: 'Jan – Jun 2023', es: 'Ene – Jun 2023' },
    start: '2023-01',
    title: { pt: 'Engenheiro de Software', en: 'Software Engineer', es: 'Ingeniero de Software' },
    company: 'VIA CERTA',
    description: {
      pt: 'Sistemas internos de gestão logística e administrativa. SQL Server, suporte a aplicações e melhoria contínua.',
      en: 'Internal logistics and business systems. SQL Server, application support and continuous process improvement.',
      es: 'Sistemas internos de gestión logística y administrativa. SQL Server, soporte a aplicaciones y mejora continua.',
    },
    technologies: ['SQL Server', 'SQL', 'Windows Server', 'Database Management', 'Git'],
  },
]

const Experience = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]

  return (
    <section className="experience" id="experience" data-lang={language}>
      <div className="max-width">
        <Reveal as="h2" className="section-heading">{t.experience.title}</Reveal>
        <Reveal as="p" className="section-intro">{t.experience.intro}</Reveal>
        <ol className="experience-list">
          {EXPERIENCES.map((exp, index) => (
            <Reveal
              as="li"
              key={exp.id}
              className={`experience-item${exp.current ? ' is-current' : ''}`}
              index={index}
            >
              <time className="experience-period" dateTime={exp.start}>
                {getLocalizedField(exp.period, language)}
              </time>
              <article className="experience-body">
                <div className="experience-head">
                  <h3 className="experience-role">{getLocalizedField(exp.title, language)}</h3>
                  {exp.current && <span className="experience-badge">{t.experience.current}</span>}
                </div>
                <p className="experience-company">{getLocalizedField(exp.company, language)}</p>
                <p className="experience-description">{getLocalizedField(exp.description, language)}</p>
                {exp.results && (
                  <p className="experience-results">
                    <strong>{t.experience.results}</strong> {getLocalizedField(exp.results, language)}
                  </p>
                )}
                <ul className="experience-tags" aria-label={t.projects.technologies}>
                  {exp.technologies.map((tech) => (
                    <li key={tech} className="experience-tag"><SkillIcon name={tech} />{tech}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Experience
