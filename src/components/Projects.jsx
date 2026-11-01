import { useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { SITE_PROFILE } from '../constants/siteProfile'
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
import Reveal from './Reveal'
import SkillIcon from './SkillIcon'
import './Projects.css'

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
    <path
      d="M6.5 3H3v10h10V9.5M9 3h4v4M13 3 7.5 8.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Projects = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]

  const projects = useMemo(
    () =>
      PROJECTS.map((project) => ({
        ...project,
        title: getLocalizedField(project.title, language),
        category: getLocalizedField(project.category, language),
        description: getLocalizedField(project.description, language),
      })),
    [language]
  )

  return (
    <section className="teams" id="teams" data-lang={language}>
      <div className="max-width">
        <Reveal as="h2" className="title">{t.projects.title}</Reveal>
        <div className="project-grid">
          {projects.map((project, index) => {
            const repo = getProjectGithubRepos(project)[0]
            const newTab = `${t.projects.viewProject}: ${project.title} (${t.projects.opensInNewTab})`
            return (
              <Reveal as="article" key={project.id} className="card" index={index}>
                <img
                  className="project-card-media"
                  src={getProjectImageSrc(project.image || PROJECT_PLACEHOLDER)}
                  alt={project.image ? t.projects.screenshotAlt.replace('{title}', project.title) : ''}
                  width={1280}
                  height={800}
                  loading="lazy"
                  decoding="async"
                />
                <div className="project-card-body">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-category">{project.category}</p>
                  <p className="project-card-description">{project.description}</p>
                  {project.certificate && (
                    <p className="project-inpi">{t.projects.registeredInpi}</p>
                  )}
                  <ul className="project-tech-list" aria-label={t.projects.technologies}>
                    {project.technologies.map((tech) => (
                      <li key={tech} className="project-tech-tag"><SkillIcon name={tech} />{tech}</li>
                    ))}
                  </ul>
                  <div className="project-card-footer">
                    <a
                      className="project-action"
                      href={repo ? repo.url : SITE_PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={repo ? `GitHub: ${project.title}` : t.projects.noPublicRepoLabel}
                    >
                      <Icon name="github" />
                      GitHub
                    </a>
                    {project.demo && (
                      <a
                        className="project-action project-action-primary"
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={newTab}
                      >
                        {t.projects.viewProject}
                        <ExternalLinkIcon />
                      </a>
                    )}
                    {project.slug && (
                      <a
                        className="project-action project-action-primary"
                        href={toHref(`/projetos/${project.slug}`)}
                        aria-label={`${t.projects.openDetails}: ${project.title}`}
                        onClick={(event) => onNavigate(event, `/projetos/${project.slug}`)}
                      >
                        {t.projects.openDetails}
                      </a>
                    )}
                    {!repo && <span className="project-no-repo">{t.projects.noPublicRepo}</span>}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
        <GitHubRepos variant="section" />
      </div>
    </section>
  )
}

export default Projects
