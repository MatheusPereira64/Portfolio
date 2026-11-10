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
import Icon from './Icon'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'
import './Projects.css'

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

/** Endereço mostrado na barra do cartão: o deploy, o repositório ou o registro no INPI. */
function cardAddress(project) {
  if (project.demo) return new URL(project.demo).host + new URL(project.demo).pathname.replace(/\/$/, '')
  const repo = getProjectGithubRepos(project)[0]
  if (repo) return repo.url.replace(/^https:\/\//, '')
  return null
}

const Projects = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const trackRef = useRef(null)
  const [range, setRange] = useState({ first: 0, visible: 1, atEnd: false })
  const [openId, setOpenId] = useState(null)
  const openerRef = useRef(null)

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
  const openProject = PROJECTS.find((project) => project.id === openId)

  // O foco volta ao botão do cartão, mesmo quando o modal foi aberto pela imagem.
  const open = (id, button) => {
    openerRef.current = button
    setOpenId(id)
  }
  const close = () => {
    setOpenId(null)
    requestAnimationFrame(() => openerRef.current?.focus())
  }

  return (
    <section className="teams" id="teams" data-lang={language}>
      <div className="max-width">
        <Reveal as="h2" className="section-heading">{t.projects.title}</Reveal>
        <Reveal as="p" className="section-intro">{t.projects.intro}</Reveal>
        <div className="projects-toolbar">
          <p className="projects-status" aria-live="polite">{status}</p>
          <a className="projects-github" href={SITE_PROFILE.github} target="_blank" rel="noopener noreferrer">
            <Icon name="github" />
            {t.projects.githubMore}
          </a>
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
          {projects.map((project, index) => {
            const isMock = project.imageKind === 'mock'
            const address = cardAddress(project)
            const altText = isMock ? t.projects.mockAlt : t.projects.screenshotAlt
            return (
              <article key={project.id} className="project-card">
                <div className="project-card-bar">
                  <span className="project-card-dots" aria-hidden="true"><i /><i /><i /></span>
                  <span className="project-card-address">{address || t.projects.privateAddress}</span>
                  {project.demo && <span className="project-card-live">{t.projects.live}</span>}
                  {isMock && <span className="project-card-badge">{t.projects.mockLabel}</span>}
                </div>
                <div
                  className="project-card-media"
                  onClick={(event) => open(project.id, event.currentTarget.querySelector('.project-card-open'))}
                >
                  <img
                    src={getProjectImageSrc(project.image || PROJECT_PLACEHOLDER)}
                    alt={project.image ? altText.replace('{title}', project.title) : ''}
                    width={1280}
                    height={800}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="project-card-overlay">
                    <p className="project-card-meta">
                      {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · {project.category}
                    </p>
                    <h3 className="project-card-title">{project.title}</h3>
                    {project.impact && (
                      <p className="project-card-impact">
                        <strong>{project.impact.value}</strong> {getLocalizedField(project.impact.label, language)}
                      </p>
                    )}
                    <div className="project-card-row">
                      <p className="project-card-description">{project.description}</p>
                      <button
                        type="button"
                        className="project-card-open"
                        aria-haspopup="dialog"
                        aria-label={`${t.projects.openProject}: ${project.title}`}
                        onClick={(event) => {
                          event.stopPropagation()
                          open(project.id, event.currentTarget)
                        }}
                      >
                        {t.projects.openProject}
                        <Icon name="arrow-right" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
      {openProject && <ProjectModal project={openProject} onClose={close} />}
    </section>
  )
}

export default Projects
