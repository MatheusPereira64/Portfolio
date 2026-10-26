import { useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import {
  PROJECTS,
  PROJECT_PLACEHOLDER,
  getLocalizedField,
  getProjectGithubRepos,
  getProjectImageSrc,
} from '../data/projects'
import { onNavigate, toHref } from '../utils/routes'
import GitHubRepos from './GitHubRepos'
import Icon from './Icon'
import './Projects.css'

const Projects = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]

  const projects = useMemo(
    () =>
      PROJECTS.map((project) => ({
        ...project,
        title: getLocalizedField(project.title, language),
        description: getLocalizedField(project.description, language),
      })),
    [language]
  )

  return (
    <section className="teams" id="teams" data-lang={language}>
      <div className="max-width">
        <h2 className="title">{t.projects.title}</h2>
        <div className="project-grid">
          {projects.map((project) => {
            const href = toHref(`/projetos/${project.slug}`)
            const github = getProjectGithubRepos(project)[0]
            return (
              <article key={project.id} className="card">
                <a
                  className="box project-card-link"
                  href={href}
                  onClick={(event) => onNavigate(event, `/projetos/${project.slug}`)}
                >
                  <img
                    src={getProjectImageSrc(project.image)}
                    alt=""
                    width={120}
                    height={120}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.onerror = null
                      event.currentTarget.src = getProjectImageSrc(PROJECT_PLACEHOLDER)
                    }}
                  />
                  <h3 className="text">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-tech-list" aria-label={t.projects?.technologies || 'Tecnologias'}>
                    {project.technologies.map((tech) => (
                      <li key={tech} className="project-tech-tag">{tech}</li>
                    ))}
                  </ul>
                  {project.certificate && (
                    <span className="project-inpi">{t.projects?.registeredInpi}</span>
                  )}
                  <span className="project-open-hint">
                    {t.projects?.openDetails || 'Ver detalhes'}
                  </span>
                </a>
                {github && (
                  <a
                    className="project-github-link"
                    href={github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="github" />
                    {t.projects?.viewOnGithub || 'GitHub'}
                  </a>
                )}
              </article>
            )
          })}
        </div>
        <GitHubRepos variant="section" />
      </div>
    </section>
  )
}

export default Projects
