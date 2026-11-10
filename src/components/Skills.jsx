import { useLanguage } from '../context/LanguageContext'
import { getLocalizedField } from '../data/certifications'
import { SKILL_GROUPS, projectsUsing } from '../data/skillGroups'
import { getLocalizedField as getProjectField } from '../data/projects'
import { onNavigate, toHref } from '../utils/routes'
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
    </div>
  )
}

export default Skills
