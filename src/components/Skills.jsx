import { useLanguage } from '../context/LanguageContext'
import { CERTIFICATIONS, getCertificateHref, getCertificatePreviewSrc, getLocalizedField } from '../data/certifications'
import { SKILL_GROUPS, projectsUsing } from '../data/skillGroups'
import { getLocalizedField as getProjectField } from '../data/projects'
import { onNavigate, toHref } from '../utils/routes'
import CertificatePreview from './CertificatePreview'
import Reveal from './Reveal'
import SkillIcon from './SkillIcon'
import './Skills.css'

const Skills = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]

  return (
    <div className="about-details">
      <div className="skill-groups" id="skills">
        <h3>{t.projects.technologies}</h3>
        {SKILL_GROUPS.map((group, index) => (
          <Reveal key={group.id} className="skill-group" index={index}>
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
                        <SkillIcon name={tech} />
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
                        <SkillIcon name={tech} />
                        {tech}
                      </a>
                    </li>
                  )
                }
                return <li key={tech}><span><SkillIcon name={tech} />{tech}</span></li>
              })}
            </ul>
          </Reveal>
        ))}
      </div>

      <div className="certifications-strip" id="certifications">
        <h3>{t.skills.certifications || 'Certificações'}</h3>
        <ul className="certifications-grid">
          {CERTIFICATIONS.map((cert, index) => {
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
              <Reveal as="li" key={cert.id} className="cert-card" index={index}>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <div>{content}</div>
                )}
              </Reveal>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Skills
