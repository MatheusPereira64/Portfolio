import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import {
  getLocalizedField,
  getProjectCertificateHref,
  getProjectGithubRepos,
  getProjectImageSrc,
  PROJECT_PLACEHOLDER,
} from '../data/projects'
import { onNavigate, toHref } from '../utils/routes'
import Icon from './Icon'
import SkillIcon from './SkillIcon'
import './ProjectCaseStudy.css'

const ProjectCaseStudy = ({ project }) => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const copy = t.projects || {}

  useEffect(() => {
    const previous = document.title
    const title = project ? getLocalizedField(project.title, language) : copy.notFound
    document.title = `${title || 'Matheus Pereira'} | Matheus Pereira`
    return () => {
      document.title = previous
    }
  }, [project, language, copy.notFound])

  if (!project) {
    return (
      <article className="case-study">
        <div className="max-width">
          <h1>{copy.notFound || 'Projeto não encontrado'}</h1>
          <a className="case-study-back" href={toHref('/')} onClick={(event) => onNavigate(event, '/')}>
            {copy.backToProjects || 'Voltar aos projetos'}
          </a>
        </div>
      </article>
    )
  }

  const title = getLocalizedField(project.title, language)
  const certificateHref = getProjectCertificateHref(project.certificate)
  const githubRepos = getProjectGithubRepos(project)
  const period = getLocalizedField(project.period, language)
  const decisions = getLocalizedField(project.decisions, language)
  const homeHref = `${toHref('/')}#teams`

  return (
    <article className="case-study">
      <div className="max-width">
        <a
          className="case-study-back"
          href={homeHref}
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
            event.preventDefault()
            try {
              sessionStorage.setItem('portfolio:scroll', 'teams')
            } catch {
              /* ignore */
            }
            onNavigate(event, '/')
          }}
        >
          {copy.backToProjects || 'Voltar aos projetos'}
        </a>

        {project.certificate && (
          <p className="case-study-seal">{copy.registeredInpi}</p>
        )}
        <h1>{title}</h1>
        <p className="case-study-lead">{getLocalizedField(project.description, language)}</p>

        <img
          className="case-study-cover"
          src={getProjectImageSrc(project.image)}
          alt=""
          width={960}
          height={540}
          decoding="async"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = getProjectImageSrc(PROJECT_PLACEHOLDER)
          }}
        />

        {project.screenshots?.length > 0 && (
          <section className="case-study-shots">
            <h2>{copy.screenshots || 'Prévia'}</h2>
            <div>
              {project.screenshots.map((src) => (
                <img key={src} src={getProjectImageSrc(src)} alt="" loading="lazy" />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2>{copy.problem}</h2>
          <p>{getLocalizedField(project.problem, language)}</p>
        </section>
        <section>
          <h2>{copy.role}</h2>
          <p>{getLocalizedField(project.contribution, language)}</p>
        </section>
        {period && (
          <section>
            <h2>{copy.period}</h2>
            <p>{period}</p>
          </section>
        )}
        {decisions && (
          <section>
            <h2>{copy.decisions}</h2>
            <p>{decisions}</p>
          </section>
        )}
        <section>
          <h2>{copy.results}</h2>
          <p>{getLocalizedField(project.results, language)}</p>
        </section>

        <section>
          <h2>{copy.technologies}</h2>
          <ul className="case-study-tech">
            {project.technologies.map((tech) => (
              <li key={tech}><SkillIcon name={tech} />{tech}</li>
            ))}
          </ul>
        </section>

        <div className="case-study-links">
          {certificateHref && (
            <a href={certificateHref} target="_blank" rel="noopener noreferrer">
              <Icon name="award" />
              {copy.viewCertificate}
            </a>
          )}
          {githubRepos.map((repo) => (
            <a key={repo.url} href={repo.url} target="_blank" rel="noopener noreferrer">
              <Icon name="github" />
              {repo.name}
            </a>
          ))}
        </div>
      </div>
    </article>
  )
}

export default ProjectCaseStudy
