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

  const hasPosts = LINKEDIN_POSTS.length > 0

  return (
    <section className="blog" id="blog" data-lang={language} ref={ref}>
      <div className="max-width">
        <h2 className="title">{t.blog?.title || 'Blog & Artigos'}</h2>

        {hasPosts ? (
          <div className={`blog-grid ${inView ? 'animate' : ''}`}>
            {LINKEDIN_POSTS.map((post, index) => (
              <a
                key={post.id}
                href={post.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-card blog-card-link"
                style={{ animationDelay: `${index * 0.1}s` }}
                aria-label={`${getLocalizedField(post.title, language)} — ${t.blog?.viewOnLinkedIn || 'Ver no LinkedIn'}`}
              >
                <div className="blog-card-header">
                  <span className="blog-category">{getLocalizedField(post.category, language)}</span>
                  <span className="blog-linkedin-badge">
                    <i className="fab fa-linkedin" aria-hidden="true"></i>
                    LinkedIn
                  </span>
                </div>
                <h3 className="blog-title">{getLocalizedField(post.title, language)}</h3>
                <p className="blog-excerpt">{getLocalizedField(post.excerpt, language)}</p>
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
            ))}
          </div>
        ) : (
          <div className={`blog-empty ${inView ? 'animate' : ''}`}>
            <p className="blog-empty-text">
              {t.blog?.emptyMessage || 'Minhas publicações estão no LinkedIn.'}
            </p>
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
        )}

        {hasPosts && (
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
        )}
      </div>
    </section>
  )
}

export default Blog
