import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { GITHUB_REPOS_URL, GITHUB_USER, getGithubOgImage } from '../data/projects'
import { SITE_PROFILE } from '../constants/siteProfile'
import './GitHubRepos.css'

const HIDDEN = new Set(['portfolio', 'matheuspereira64'])

const GitHubRepos = ({ variant = 'section' }) => {
  const { language, translations } = useLanguage()
  const t = translations[language]
  const [repos, setRepos] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    fetch(GITHUB_REPOS_URL)
      .then((res) => {
        if (!res.ok) throw new Error('github')
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        const list = (Array.isArray(data) ? data : [])
          .filter((repo) => !repo.fork && !HIDDEN.has(repo.name.toLowerCase()))
          .slice(0, 4)
        setRepos(list)
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => { cancelled = true }
  }, [])

  const title = t.projects?.githubReposTitle || 'GitHub'

  return (
    <section className={`github-repos github-repos--${variant}`}>
      <h3>{title}</h3>
      {status === 'loading' && <p className="github-repos-status">…</p>}
      {status === 'error' && (
        <a href={SITE_PROFILE.github} target="_blank" rel="noopener noreferrer">
          GitHub/{GITHUB_USER}
        </a>
      )}
      {status === 'ready' && (
        <div className="github-repos-grid">
          {repos.map((repo) => (
            <a
              key={repo.id}
              className="github-repo-card"
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={getGithubOgImage(repo.name)}
                alt=""
                loading="lazy"
              />
              <strong>{repo.name}</strong>
              <span>{repo.description || repo.language || 'GitHub'}</span>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

export default GitHubRepos
