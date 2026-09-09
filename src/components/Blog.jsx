import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../context/LanguageContext'
import { SITE_PROFILE } from '../constants/siteProfile'
import { LINKEDIN_POSTS, getLinkedInEmbedSrc, getLocalizedField } from '../data/linkedinPosts'
import './Blog.css'

const Blog = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const note =
    language === 'pt'
      ? 'O LinkedIn não libera a aba Atividades para sites estáticos. Cole o link de cada post (⋯ → Copiar link) em linkedinPosts.js para aparecer o embed oficial.'
      : language === 'es'
        ? 'LinkedIn no abre la pestaña Actividad para sitios estáticos. Pega el enlace de cada post (⋯ → Copiar enlace) en linkedinPosts.js para ver el embed oficial.'
        : 'LinkedIn does not expose the Activity tab to static sites. Paste each post link (⋯ → Copy link) into linkedinPosts.js to show the official embed.'

  return (
    <section className="blog" id="blog" data-lang={language} ref={ref}>
      <div className="max-width">
        <h2 className="title">{t.blog?.title || 'Blog & Artigos'}</h2>
        <p className="blog-note">{note}</p>

        <div className={`blog-grid ${inView ? 'animate' : ''}`}>
          {LINKEDIN_POSTS.map((post, index) => {
            const embedSrc = getLinkedInEmbedSrc(post.linkedinUrl)
            const title = getLocalizedField(post.title, language)
            return (
              <article
                key={post.id}
                className={`blog-card${embedSrc ? ' blog-card--embed' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {embedSrc ? (
                  <iframe
                    className="blog-embed"
                    src={embedSrc}
                    title={title}
                    loading="lazy"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <div className="blog-card-header">
                      <span className="blog-category">{getLocalizedField(post.category, language)}</span>
                      <span className="blog-linkedin-badge">
                        <i className="fab fa-linkedin" aria-hidden="true"></i>
                        LinkedIn
                      </span>
                    </div>
                    <h3 className="blog-title">{title}</h3>
                    <p className="blog-excerpt">{getLocalizedField(post.excerpt, language)}</p>
                    {post.tags?.length > 0 && (
                      <ul className="blog-tags">
                        {post.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                    )}
                    <div className="blog-card-footer">
                      <span className="blog-date">
                        {new Date(post.date).toLocaleDateString(
                          language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : 'en-US'
                        )}
                      </span>
                      <a
                        className="blog-read-more"
                        href={post.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t.blog?.viewOnLinkedIn || 'Ver no LinkedIn'} <i className="fas fa-arrow-right"></i>
                      </a>
                    </div>
                  </>
                )}
              </article>
            )
          })}
        </div>

        <div className="blog-footer-link">
          <a
            href={SITE_PROFILE.linkedinActivity}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-linkedin-cta"
          >
            <i className="fab fa-linkedin" aria-hidden="true"></i>
            {t.blog?.viewAllOnLinkedIn || 'Ver publicações no LinkedIn'}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Blog
