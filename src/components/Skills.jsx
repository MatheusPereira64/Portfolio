import { useLanguage } from '../context/LanguageContext'
import { CERTIFICATIONS, getCertificateHref, getCertificatePreviewSrc, getLocalizedField } from '../data/certifications'
import { SKILL_GROUPS, projectsUsing } from '../data/skillGroups'
import { getLocalizedField as getProjectField } from '../data/projects'
import { onNavigate, toHref } from '../utils/routes'
import CertificatePreview from './CertificatePreview'
import './Skills.css'

const Skills = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]

  const education = language === 'pt' ? [
    { title: 'Graduado em Engenharia da Computação', institution: 'FAMETRO', period: '2019 - 2024' },
    { title: 'Inglês Fluente - C1', institution: 'ICBEU', period: '2019' },
    { title: 'Lógica e Programação WEB - Full Stack', institution: 'Flexpeak', period: '2023' }
  ] : language === 'es' ? [
    { title: 'Graduado en Ingeniería de Computación', institution: 'FAMETRO', period: '2019 - 2024' },
    { title: 'Inglés fluido - C1', institution: 'ICBEU', period: '2019' },
    { title: 'Lógica y Programación WEB - Full Stack', institution: 'Flexpeak', period: '2023' }
  ] : [
    { title: 'Graduated in Computer Engineering', institution: 'FAMETRO', period: '2019 - 2024' },
    { title: 'Fluent English - C1', institution: 'ICBEU', period: '2019' },
    { title: 'WEB Logic and Programming - Full Stack', institution: 'Flexpeak', period: '2023' }
  ]

  return (
    <div className="about-details">
      <div className="skill-groups" id="skills">
        <h3>{t.skills?.text || 'Tecnologias'}</h3>
        {SKILL_GROUPS.map((group) => (
          <div key={group.id} className="skill-group">
            <h4>{getLocalizedField(group.label, language)}</h4>
            <ul>
              {group.items.map((tech) => {
                const related = projectsUsing(tech)
                if (related.length === 1) {
                  const project = related[0]
                  return (
                    <li key={tech}>
                      <a
                        href={toHref(`/projetos/${project.slug}`)}
                        onClick={(event) => onNavigate(event, `/projetos/${project.slug}`)}
                      >
                        {tech}
                      </a>
                    </li>
                  )
                }
                if (related.length > 1) {
                  const names = related.map((project) => getProjectField(project.title, language)).join(', ')
                  return (
                    <li key={tech}>
                      <a href="#teams" title={names} onClick={(event) => {
                        event.preventDefault()
                        document.getElementById('teams')?.scrollIntoView({ behavior: 'smooth' })
                      }}>
                        {tech}
                      </a>
                    </li>
                  )
                }
                return <li key={tech}><span>{tech}</span></li>
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="education-info">
        <h4>{t.skills.education}</h4>
        {education.map((edu) => (
          <div key={edu.title} className="education-item">
            <p>
              <strong>{edu.title}</strong><br />
              {edu.institution}<br />
              {edu.period}
            </p>
          </div>
        ))}
      </div>

      <div className="certifications-strip" id="certifications">
        <h3>{t.skills.certifications || 'Certificações'}</h3>
        <ul className="certifications-grid">
          {CERTIFICATIONS.map((cert) => {
            const href = getCertificateHref(cert)
            const previewSrc = getCertificatePreviewSrc(cert)
            const title = getLocalizedField(cert.title, language)
            const content = (
              <>
                <CertificatePreview src={previewSrc} />
                <span className="cert-card-meta">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <strong>{title}</strong>
                  <span className="cert-year">{cert.year}</span>
                </span>
              </>
            )
            return (
              <li key={cert.id} className="cert-card">
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <div>{content}</div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Skills
