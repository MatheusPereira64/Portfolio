import { useLanguage } from '../context/LanguageContext'
import { getCertificateAssetHref } from '../data/certifications'
import Reveal from './Reveal'
import TimelineCard from './TimelineCard'
import './Education.css'

/**
 * Dados do currículo, com os períodos conferidos no LinkedIn.
 * Logo da FAMETRO: ícone oficial do site fametro.edu.br. Logo do ICBEU: imagem enviada pelo Matheus.
 */
const EDUCATION = [
  {
    id: 'fametro',
    mark: 'FA',
    logo: 'images/logos/fametro.webp',
    start: '2019',
    period: '2019 – 2024',
    org: 'FAMETRO',
    place: { pt: 'Brasil · Concluído', en: 'Brazil · Completed', es: 'Brasil · Concluido' },
    title: {
      pt: 'Bacharelado em Engenharia da Computação',
      en: 'Bachelor of Computer Engineering',
      es: 'Licenciatura en Ingeniería de Computación',
    },
    points: {
      pt: [
        'Projetos acadêmicos e programas Samsung Ocean com React, JavaScript, Unity e Python.',
      ],
      en: [
        'Academic projects and Samsung Ocean programs with React, JavaScript, Unity and Python.',
      ],
      es: [
        'Proyectos académicos y programas Samsung Ocean con React, JavaScript, Unity y Python.',
      ],
    },
    technologies: ['React', 'JavaScript', 'Python', 'Unity'],
    link: {
      href: getCertificateAssetHref('diploma-fametro-engenharia.jpg'),
      label: { pt: 'Ver diploma', en: 'View diploma', es: 'Ver diploma' },
    },
  },
  {
    id: 'icbeu',
    mark: 'IC',
    logo: 'images/logos/icbeu.webp',
    start: '2014',
    period: '2014 – 2018',
    org: 'ICBEU',
    place: { pt: 'Brasil · Concluído', en: 'Brazil · Completed', es: 'Brasil · Concluido' },
    title: {
      pt: 'Programa Avançado de Inglês',
      en: 'Advanced English Program',
      es: 'Programa Avanzado de Inglés',
    },
    points: {
      pt: ['Inglês com proficiência profissional completa.'],
      en: ['Full professional proficiency in English.'],
      es: ['Inglés con competencia profesional completa.'],
    },
    link: {
      href: getCertificateAssetHref('certificado-icbeu-ingles.jpg'),
      label: { pt: 'Ver certificado', en: 'View certificate', es: 'Ver certificado' },
    },
  },
]

const Education = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]

  return (
    <section className="education" id="education" data-lang={language}>
      <div className="max-width">
        <Reveal as="h2" className="section-heading">{t.education.title}</Reveal>
        <Reveal as="p" className="section-intro">{t.education.intro}</Reveal>
        <ol className="timeline-list">
          {EDUCATION.map((item, index) => (
            <TimelineCard
              key={item.id}
              item={item}
              index={index}
              language={language}
              kindLabel={item.id === 'icbeu' ? t.education.course : t.education.degree}
              tagsLabel={t.projects.technologies}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Education
