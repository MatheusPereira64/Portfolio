import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

const ChevronIcon = ({ direction }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
    <path
      d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Projects = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const trackRef = useRef(null)
  const [range, setRange] = useState({ first: 0, visible: 1, atEnd: false })

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

  const measure = useCallback(() => {
    const track = trackRef.current
    const [card, next] = track ? track.children : []
    if (!card || !next) return
    const step = next.offsetLeft - card.offsetLeft
    const gap = step - card.offsetWidth
    setRange({
      first: Math.round(track.scrollLeft / step),
      visible: Math.max(1, Math.floor((track.clientWidth + gap) / step)),
      atEnd: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2,
    })
  }, [])

  useEffect(() => {
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(trackRef.current)
    return () => observer.disconnect()
  }, [measure])

  const move = (direction) => {
    const track = trackRef.current
    const target = track.children[Math.max(0, range.first + direction * range.visible)]
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({
      left: target ? target.offsetLeft : track.scrollWidth,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }

  const total = projects.length
  const status = t.projects.showing
    .replace('{from}', range.first + 1)
    .replace('{to}', range.atEnd ? total : Math.min(range.first + range.visible, total))
    .replace('{total}', total)

  return (
    <section className="teams" id="teams" data-lang={language}>
      <div className="max-width">
        <Reveal as="h2" className="section-heading">{t.projects.title}</Reveal>
        <Reveal as="p" className="section-intro">{t.projects.intro}</Reveal>
        <div className="projects-toolbar">
          <p className="projects-status" aria-live="polite">{status}</p>
          <div className="projects-arrows">
            <button
              type="button"
              className="projects-arrow"
              aria-label={t.projects.previous}
              disabled={range.first === 0}
              onClick={() => move(-1)}
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              className="projects-arrow"
              aria-label={t.projects.next}
              disabled={range.atEnd}
              onClick={() => move(1)}
            >
              <ChevronIcon direction="right" />
            </button>
          </div>
        </div>
        <div
          className="projects-track"
          ref={trackRef}
          role="group"
          aria-label={t.projects.title}
          tabIndex={0}
          onScroll={measure}
        >
          {projects.map((project) => {
            const repo = getProjectGithubRepos(project)[0]
            const isMock = project.imageKind === 'mock'
            const altText = isMock ? t.projects.mockAlt : t.projects.screenshotAlt
            return (
              <article key={project.id} className="project-card">
                <div className="project-card-frame">
                  <img
                    className="project-card-media"
                    src={getProjectImageSrc(project.image || PROJECT_PLACEHOLDER)}
                    alt={project.image ? altText.replace('{title}', project.title) : ''}
                    width={1280}
                    height={800}
                    loading="lazy"
                    decoding="async"
                  />
                  {isMock && <span className="project-card-mock">{t.projects.mockLabel}</span>}
                </div>
                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-category">{project.category}</p>
                {project.impact && (
                  <p className="project-impact">
                    <strong>{project.impact.value}</strong>
                    <span>{getLocalizedField(project.impact.label, language)}</span>
                  </p>
                )}
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
                      aria-label={`${t.projects.viewProject}: ${project.title} (${t.projects.opensInNewTab})`}
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
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Projects
