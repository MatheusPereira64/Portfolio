import { useLanguage } from '../context/LanguageContext'
import { SITE_PROFILE } from '../constants/siteProfile'
import { getLocalizedField, getLinkedInEmbedSrc, getPublishedPosts } from '../data/linkedinPosts'
import Icon from './Icon'
import Reveal from './Reveal'
import './Blog.css'

const Blog = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const posts = getPublishedPosts()

  if (!posts.length) return null

  return (
    <section className="blog" id="blog" data-lang={language}>
      <div className="max-width">
        <Reveal as="h2" className="title">{t.blog?.title || 'Blog & Artigos'}</Reveal>

        <div className="blog-grid">
          {posts.map((post, index) => {
            const embedSrc = getLinkedInEmbedSrc(post.linkedinUrl)
            const title = getLocalizedField(post.title, language)
            return (
              <Reveal
                as="article"
                key={post.id}
                className={`blog-card${embedSrc ? ' blog-card--embed' : ''}`}
                index={index}
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
                        <Icon name="linkedin" />
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
                        {t.blog?.viewOnLinkedIn || 'Ver no LinkedIn'} <Icon name="arrow-right" />
                      </a>
                    </div>
                  </>
                )}
              </Reveal>
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
            <Icon name="linkedin" />
            {t.blog?.viewAllOnLinkedIn || 'Ver publicações no LinkedIn'}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Blog
