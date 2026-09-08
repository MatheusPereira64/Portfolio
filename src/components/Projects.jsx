import { useState, useEffect, useRef, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { PROJECTS, getLocalizedField, getProjectCertificateHref } from '../data/projects'
import SkillIcon from './SkillIcon'
import './Projects.css'

const Projects = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(3)
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
            <article key={`project-${project.id}-${index}`} className="card">
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
                {project.certificate && (
                  <a
                    href={getProjectCertificateHref(project.certificate)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-certificate-link"
                    aria-label={`${t.projects?.viewCertificate || 'Ver certificado'} — ${project.title}`}
                  >
                    <i className="fas fa-award" aria-hidden="true"></i>
                    {t.projects?.viewCertificate || 'Ver certificado CRPC-INPI'}
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
      </div>
    </section>
  )
}

export default Projects
