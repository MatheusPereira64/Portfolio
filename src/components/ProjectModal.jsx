import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { SITE_PROFILE } from '../constants/siteProfile'
import {
  PROJECT_PLACEHOLDER,
  getLocalizedField,
  getProjectGithubRepos,
  getProjectImageSrc,
} from '../data/projects'
import { onNavigate, toHref } from '../utils/routes'
import Icon from './Icon'
import SkillIcon from './SkillIcon'
import './ProjectModal.css'

export const ExternalLinkIcon = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
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

/**
 * Modal nativo (<dialog>): o navegador cuida do Esc e mantém o resto da página inerte.
 * Quem abre o modal devolve o foco ao fechar.
 */
const ProjectModal = ({ project, onClose }) => {
  const { translations, language } = useLanguage()
  const t = translations[language].projects
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const title = getLocalizedField(project.title, language)
  const repo = getProjectGithubRepos(project)[0]
  const isMock = project.imageKind === 'mock'

  return (
    <dialog
      ref={dialogRef}
      className="project-modal"
      aria-labelledby="project-modal-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="project-modal-inner">
        <div className="project-modal-media">
          <img
            src={getProjectImageSrc(project.image || PROJECT_PLACEHOLDER)}
            alt={project.image ? (isMock ? t.mockAlt : t.screenshotAlt).replace('{title}', title) : ''}
            width={1280}
            height={800}
          />
          {isMock && <span className="project-modal-mock">{t.mockLabel}</span>}
          <button type="button" className="project-modal-close" aria-label={t.closeModal} onClick={onClose}>
            <Icon name="times" />
          </button>
        </div>
        <div className="project-modal-body">
          <p className="project-modal-category">{getLocalizedField(project.category, language)}</p>
          <h2 id="project-modal-title">{title}</h2>
          {project.impact && (
            <p className="project-modal-impact">
              <strong>{project.impact.value}</strong>
              <span>{getLocalizedField(project.impact.label, language)}</span>
            </p>
          )}
          <p className="project-modal-description">{getLocalizedField(project.description, language)}</p>
          {project.certificate && <p className="project-modal-inpi">{t.registeredInpi}</p>}
          <ul className="project-modal-tags" aria-label={t.technologies}>
            {project.technologies.map((tech) => (
              <li key={tech}><SkillIcon name={tech} />{tech}</li>
            ))}
          </ul>
          <div className="project-modal-actions">
            <a
              className="project-modal-button"
              href={repo ? repo.url : SITE_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={repo ? undefined : t.noPublicRepoLabel}
            >
              <Icon name="github" />
              {t.viewOnGithub}
            </a>
            {project.demo && (
              <a
                className="project-modal-button is-primary"
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon />
                {t.viewDemo}
              </a>
            )}
            {project.slug && (
              <a
                className="project-modal-button is-primary"
                href={toHref(`/projetos/${project.slug}`)}
                onClick={(event) => {
                  onClose()
                  onNavigate(event, `/projetos/${project.slug}`)
                }}
              >
                {t.openDetails}
              </a>
            )}
          </div>
          {!repo && <p className="project-modal-note">{t.noPublicRepo}</p>}
        </div>
      </div>
    </dialog>
  )
}

export default ProjectModal
