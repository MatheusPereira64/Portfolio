import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../context/LanguageContext'
import { SITE_PROFILE } from '../constants/siteProfile'
import { LINKEDIN_POSTS, getLocalizedField } from '../data/linkedinPosts'
import './Blog.css'

const Blog = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  const [previews, setPreviews] = useState({})

  useEffect(() => {
    const urls = [...new Set(LINKEDIN_POSTS.map((post) => post.linkedinUrl).filter(Boolean))]
    urls.forEach((url) => {
      fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`)
        .then((res) => res.json())
        .then((payload) => {
          const data = payload?.data
          if (!data) return
          setPreviews((prev) => ({
            ...prev,
            [url]: {
              image: data.image?.url,
              title: data.title,
              description: data.description,
            },
          }))
        })
        .catch(() => {})
    })
  }, [])

  return (
    <section className="blog" id="blog" data-lang={language} ref={ref}>
      <div className="max-width">
        <h2 className="title">{t.blog?.title || 'Blog & Artigos'}</h2>
        <p className="blog-note">
          {language === 'pt'
            ? 'O LinkedIn não deixa um site estático ler o feed sozinho. A prévia abaixo usa o Open Graph do link; para um post específico, cole a URL em linkedinPosts.js (⋯ → Copiar link).'
            : language === 'es'
              ? 'LinkedIn no permite leer el feed desde un sitio estático. La previa usa Open Graph del enlace; para un post concreto, pega la URL en linkedinPosts.js.'
              : 'LinkedIn does not let a static site read your feed. Previews use Open Graph from the link; for a specific post, paste the URL into linkedinPosts.js (⋯ → Copy link).'}
        </p>

        <div className={`blog-grid ${inView ? 'animate' : ''}`}>
          {LINKEDIN_POSTS.map((post, index) => {
            const preview = previews[post.linkedinUrl]
            return (
              <a
                key={post.id}
                href={post.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-card blog-card-link"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {preview?.image && (
                  <img className="blog-preview-image" src={preview.image} alt="" loading="lazy" />
                )}
                <div className="blog-card-header">
                  <span className="blog-category">{getLocalizedField(post.category, language)}</span>
                  <span className="blog-linkedin-badge">
                    <i className="fab fa-linkedin" aria-hidden="true"></i>
                    LinkedIn
                  </span>
                </div>
                <h3 className="blog-title">{getLocalizedField(post.title, language)}</h3>
                <p className="blog-excerpt">
                  {preview?.description || getLocalizedField(post.excerpt, language)}
                </p>
                <div className="blog-card-footer">
                  <span className="blog-date">
                    {new Date(post.date).toLocaleDateString(
                      language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : 'en-US'
                    )}
                  </span>
                  <span className="blog-read-more">
                    {t.blog?.viewOnLinkedIn || 'Ver no LinkedIn'} <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </a>
            )
          })}
        </div>

        <div className="blog-footer-link">
          <a
            href={SITE_PROFILE.linkedinActivity}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-linkedin-cta blog-linkedin-cta--secondary"
          >
            <i className="fab fa-linkedin" aria-hidden="true"></i>
            {t.blog?.viewAllOnLinkedIn || 'Ver todas no LinkedIn'}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Blog
