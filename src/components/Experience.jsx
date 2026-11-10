import { useLanguage } from '../context/LanguageContext'
import Reveal from './Reveal'
import TimelineCard from './TimelineCard'
import './Experience.css'

/**
 * Mais recente primeiro. Os textos vêm do site e do currículo; nada além disso.
 * Logo do ITEGAM: símbolo recortado de itegam.org.br/Logo_ITEGAM.svg.
 * Logo da Via Certa: imagem enviada pelo Matheus.
 */
const EXPERIENCES = [
  {
    id: 'itegam',
    mark: 'IT',
    logo: 'images/logos/itegam.webp',
    current: true,
    start: '2025',
    period: '2025 – 2026',
    org: 'ITEGAM',
    place: { pt: 'Manaus · Presencial', en: 'Manaus, Brazil · On-site', es: 'Manaus · Presencial' },
    title: 'Full Stack Software Engineer',
    points: {
      pt: [
        'Projetos de PD&I para Indústria 4.0: aplicações web, APIs e monitoramento industrial em tempo real.',
        'Dashboards de OEE, FPY, produtividade e qualidade, com dados em tempo real.',
        'Integrações IoT no chão de fábrica.',
        'Três softwares registrados no INPI a partir desses projetos.',
      ],
      en: [
        'R&D projects for Industry 4.0: web apps, APIs and real-time industrial monitoring.',
        'OEE, FPY, productivity and quality dashboards with real-time data.',
        'IoT integrations on the shop floor.',
        'Three software registrations at INPI from these projects.',
      ],
      es: [
        'Proyectos de I+D para Industria 4.0: aplicaciones web, APIs y monitoreo industrial en tiempo real.',
        'Dashboards de OEE, FPY, productividad y calidad, con datos en tiempo real.',
        'Integraciones IoT en planta.',
        'Tres softwares registrados en el INPI a partir de estos proyectos.',
      ],
    },
    technologies: ['React', 'Vue.js', 'TypeScript', 'Node.js', 'Python', 'Java', 'PostgreSQL', 'Redis', 'Docker'],
  },
  {
    id: 'freelancer',
    mark: 'FL',
    icon: 'code',
    start: '2024',
    period: '2024',
    org: { pt: 'Projetos Pessoais e Freelancer', en: 'Personal Projects & Freelancer', es: 'Proyectos Personales y Freelancer' },
    title: 'Full Stack Software Engineer',
    points: {
      pt: [
        'Aplicações web completas com React, Node.js e APIs REST.',
        'Portfólios, sistemas de gestão e integrações modernas.',
      ],
      en: [
        'Full web apps with React, Node.js and REST APIs.',
        'Portfolios, management systems and modern service integrations.',
      ],
      es: [
        'Aplicaciones web completas con React, Node.js y APIs REST.',
        'Portafolios, sistemas de gestión e integraciones modernas.',
      ],
    },
    technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express', 'Git'],
  },
  {
    id: 'via-certa',
    mark: 'VC',
    logo: 'images/logos/via-certa.webp',
    start: '2023-01',
    period: { pt: 'Jan – Jun 2023', en: 'Jan – Jun 2023', es: 'Ene – Jun 2023' },
    org: 'VIA CERTA',
    place: { pt: 'Manaus · Presencial', en: 'Manaus, Brazil · On-site', es: 'Manaus · Presencial' },
    title: { pt: 'Engenheiro de Software', en: 'Software Engineer', es: 'Ingeniero de Software' },
    points: {
      pt: [
        'Sistemas internos de gestão logística e administrativa.',
        'SQL Server, suporte a aplicações e melhoria contínua.',
      ],
      en: [
        'Internal logistics and business systems.',
        'SQL Server, application support and continuous process improvement.',
      ],
      es: [
        'Sistemas internos de gestión logística y administrativa.',
        'SQL Server, soporte a aplicaciones y mejora continua.',
      ],
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
        <ol className="timeline-list">
          {EXPERIENCES.map((item, index) => (
            <TimelineCard
              key={item.id}
              item={item}
              index={index}
              language={language}
              kindLabel={t.experience.role}
              tagsLabel={t.projects.technologies}
              current={t.experience.current}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Experience
