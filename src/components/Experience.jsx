import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../context/LanguageContext'
import SkillIcon from './SkillIcon'
import './Experience.css'

const Experience = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const { ref, inView } = useInView({
    threshold: 0.15,
    triggerOnce: true
  })

  const experiences = [
    {
      year: '2022 - 2023',
      title: language === 'pt' ? 'Engenharia da Computação' : language === 'es' ? 'Ingeniería de Computación' : 'Computer Engineering',
      company: 'FAMETRO · Samsung Ocean',
      description: language === 'pt'
        ? 'Projetos acadêmicos e programas Samsung Ocean em React, JavaScript, Unity e Python durante a graduação.'
        : language === 'es'
        ? 'Proyectos académicos y programas Samsung Ocean en React, JavaScript, Unity y Python durante la carrera.'
        : 'Academic projects and Samsung Ocean programs in React, JavaScript, Unity and Python during the degree.',
      technologies: ['JavaScript', 'React', 'Python', 'HTML/CSS', 'Unity', 'Git']
    },
    {
      year: language === 'pt' ? 'Jan 2023 - Jun 2023' : language === 'es' ? 'Ene 2023 - Jun 2023' : 'Jan 2023 - Jun 2023',
      title: language === 'pt' ? 'Engenheiro de Software' : language === 'es' ? 'Ingeniero de Software' : 'Software Engineer',
      company: 'VIA CERTA',
      description: language === 'pt'
        ? 'Sistemas internos de gestão logística e administrativa. SQL Server, suporte a aplicações e melhoria contínua.'
        : language === 'es'
        ? 'Sistemas internos de gestión logística y administrativa. SQL Server, soporte a aplicaciones y mejora continua.'
        : 'Internal logistics and business systems. SQL Server, application support and continuous process improvement.',
      technologies: ['SQL Server', 'SQL', 'Windows Server', 'Database Management', 'Git']
    },
    {
      year: '2024',
      title: 'Full Stack Software Engineer',
      company: language === 'pt' ? 'Projetos Pessoais e Freelancer' : language === 'es' ? 'Proyectos Personales y Freelancer' : 'Personal Projects & Freelancer',
      description: language === 'pt'
        ? 'Aplicações web completas com React, Node.js e APIs REST. Portfólios, sistemas de gestão e integrações modernas.'
        : language === 'es'
        ? 'Aplicaciones web completas con React, Node.js y APIs REST. Portafolios, sistemas de gestión e integraciones modernas.'
        : 'Full web apps with React, Node.js and REST APIs. Portfolios, management systems and modern service integrations.',
      technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express', 'Git']
    },
    {
      year: language === 'pt' ? '2025 - 2026' : '2025 - 2026',
      current: true,
      title: 'Full Stack Software Engineer',
      company: 'ITEGAM',
      description: language === 'pt'
        ? 'Projetos de PD&I para Indústria 4.0: aplicações web, APIs, monitoramento industrial em tempo real, dashboards (OEE, FPY) e integrações IoT.'
        : language === 'es'
        ? 'Proyectos de I+D para Industria 4.0: aplicaciones web, APIs, monitoreo industrial en tiempo real, dashboards (OEE, FPY) e integraciones IoT.'
        : 'R&D projects for Industry 4.0: web apps, APIs, real-time industrial monitoring, dashboards (OEE, FPY) and IoT integrations.',
      results: language === 'pt'
        ? 'Resultados: dashboards de OEE, FPY, produtividade e qualidade; dados em tempo real e integração IoT no chão de fábrica.'
        : language === 'es'
        ? 'Resultados: dashboards de OEE, FPY, productividad y calidad; datos en tiempo real e IoT en planta.'
        : 'Results: OEE, FPY, productivity and quality dashboards; real-time data and IoT on the shop floor.',
      technologies: ['React', 'Vue.js', 'TypeScript', 'Node.js', 'Python', 'Java', 'PostgreSQL', 'Redis', 'Docker']
    }
  ]

  return (
    <section className="experience" id="experience" data-lang={language} ref={ref}>
      <div className="max-width">
        <h2 className="title">{t.experience?.title || 'Experiência'}</h2>
        <ol className={`experience-timeline ${inView ? 'animate' : ''}`}>
          {experiences.map((exp, index) => (
            <li
              key={`${exp.company}-${index}`}
              className={`experience-step${exp.current ? ' current' : ''}`}
              style={{ animationDelay: `${index * 0.16}s` }}
            >
              <time className="experience-year">{exp.year}</time>
              <div className="experience-axis">
                <span className="experience-dot" aria-hidden="true" />
              </div>
              <article className="experience-panel">
                <h3 className="experience-role">{exp.title}</h3>
                <h4 className="experience-company">{exp.company}</h4>
                <p className="experience-description">{exp.description}</p>
                {exp.results && <p className="experience-results">{exp.results}</p>}
                <div className="experience-technologies">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      <SkillIcon name={tech} />
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Experience
