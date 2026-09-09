import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { getLocalizedField, getProjectCertificateHref } from '../data/projects'
import SkillIcon from './SkillIcon'
import GitHubRepos from './GitHubRepos'
import './ProjectModal.css'

const ProjectModal = ({ project, onClose }) => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const closeRef = useRef(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!project) return null

  const title = getLocalizedField(project.title, language)
  const certificateHref = getProjectCertificateHref(project.certificate)

  return (
    <div className="project-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="project-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="project-modal-close"
          onClick={onClose}
          ref={closeRef}
          aria-label={t.projects?.closeDetails || 'Fechar'}
        >
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>

        <img className="project-modal-hero" src={project.image} alt="" />
        <h2 id="project-modal-title">{title}</h2>

        <section>
          <h3>{t.projects?.problem || 'Problema'}</h3>
          <p>{getLocalizedField(project.problem, language)}</p>
        </section>
        <section>
          <h3>{t.projects?.contribution || 'O que eu fiz'}</h3>
          <p>{getLocalizedField(project.contribution, language)}</p>
        </section>
        <section>
          <h3>{t.projects?.results || 'Resultados'}</h3>
          <p>{getLocalizedField(project.results, language)}</p>
        </section>

        <section>
          <h3>{t.projects?.technologies || 'Stack'}</h3>
          <ul className="project-modal-tech">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <SkillIcon name={tech} />
                {tech}
              </li>
            ))}
          </ul>
        </section>

        {project.screenshots?.length > 0 && (
          <section>
            <h3>{t.projects?.screenshots || 'Prévia'}</h3>
            <div className="project-modal-shots">
              {project.screenshots.map((src) => (
                <img key={src} src={src} alt="" loading="lazy" />
              ))}
            </div>
          </section>
        )}

        {certificateHref && (
          <a
            className="project-modal-cert"
            href={certificateHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-award" aria-hidden="true"></i>
            {t.projects?.viewCertificate || 'Ver certificado CRPC-INPI'}
          </a>
        )}

        <GitHubRepos />
      </div>
    </div>
  )
}

export default ProjectModal
