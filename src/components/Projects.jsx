import { useState, useEffect, useRef, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { PROJECTS, getLocalizedField, getProjectGithubRepos } from '../data/projects'
import SkillIcon from './SkillIcon'
import ProjectModal from './ProjectModal'
import GitHubRepos from './GitHubRepos'
import './Projects.css'

const Projects = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(3)
  const [openId, setOpenId] = useState(null)
  const carouselRef = useRef(null)

  const projects = useMemo(
    () =>
      PROJECTS.map((project) => ({
        ...project,
        title: getLocalizedField(project.title, language),
        description: getLocalizedField(project.description, language),
      })),
    [language]
  )

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1000) {
        setItemsToShow(Math.min(3, projects.length))
      } else if (window.innerWidth >= 600) {
        setItemsToShow(Math.min(2, projects.length))
      } else {
        setItemsToShow(1)
      }
    }

    updateItemsToShow()
    window.addEventListener('resize', updateItemsToShow)
    return () => window.removeEventListener('resize', updateItemsToShow)
  }, [projects.length])

  useEffect(() => {
    if (projects.length <= 1) return undefined

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [projects.length])

  useEffect(() => {
    setCurrentIndex(0)
  }, [language])

  useEffect(() => {
    const applyHash = () => {
      const match = window.location.hash.match(/^#project-(\d+)/)
      setOpenId(match ? Number(match[1]) : null)
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  const openProject = (id) => {
    window.location.hash = `project-${id}`
  }

  const closeProject = () => {
    if (window.location.hash.startsWith('#project-')) {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}#teams`)
    }
    setOpenId(null)
  }

  const openProjectData = projects.find((item) => item.id === openId) || null

  const getVisibleProjects = () => {
    const visible = []
    for (let i = 0; i < itemsToShow; i++) {
      const projectIndex = (currentIndex + i) % projects.length
      visible.push({ ...projects[projectIndex], index: projectIndex })
    }
    return visible
  }

  const visibleProjects = getVisibleProjects()

  return (
    <section className="teams" id="teams" data-lang={language}>
      <div className="max-width">
        <h2 className="title">{t.projects.title}</h2>
        <div className="carousel owl-carousel" ref={carouselRef}>
          {visibleProjects.map((project, index) => (
            <article
              key={`project-${project.id}-${index}`}
              className="card"
              role="button"
              tabIndex={0}
              onClick={() => openProject(project.id)}
              onKeyDown={(event) => event.key === 'Enter' && openProject(project.id)}
              aria-label={`${t.projects?.openDetails || 'Abrir detalhes'} — ${project.title}`}
            >
              <div className="box">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150/8b0000/ffffff?text=4.0'
                  }}
                />
                <h3 className="text">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <ul className="project-tech-list" aria-label={t.projects?.technologies || 'Tecnologias'}>
                  {project.technologies.map((tech) => (
                    <li key={tech} className="project-tech-tag">
                      <SkillIcon name={tech} />
                      {tech}
                    </li>
                  ))}
                </ul>
                <span className="project-open-hint">
                  {t.projects?.openDetails || 'Ver detalhes'}
                </span>
                {getProjectGithubRepos(project)[0] && (
                  <a
                    className="project-github-link"
                    href={getProjectGithubRepos(project)[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <i className="fab fa-github" aria-hidden="true"></i>
                    {t.projects?.viewOnGithub || 'GitHub'}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
        {projects.length > 1 && (
          <div className="carousel-dots owl-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`owl-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`${t.projects?.goToProject || 'Ir para o projeto'} ${index + 1}`}
              ></button>
            ))}
          </div>
        )}
        <GitHubRepos variant="section" />
      </div>
      {openProjectData && (
        <ProjectModal project={openProjectData} onClose={closeProject} />
      )}
    </section>
  )
}

export default Projects
