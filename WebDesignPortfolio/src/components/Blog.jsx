import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../context/LanguageContext'
import './Blog.css'

const Blog = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const articles = [
    {
      id: 1,
      title: language === 'pt' 
        ? 'Como começar com React em 2024'
        : language === 'es'
        ? 'Cómo empezar con React en 2024'
        : 'Getting Started with React in 2024',
      excerpt: language === 'pt'
        ? 'Um guia completo para iniciantes que querem aprender React do zero...'
        : language === 'es'
        ? 'Una guía completa para principiantes que quieren aprender React desde cero...'
        : 'A complete guide for beginners who want to learn React from scratch...',
      date: '2024-01-15',
      category: language === 'pt' ? 'React' : 'React',
      readTime: '5 min'
    },
    {
      id: 2,
      title: language === 'pt'
        ? 'Melhores práticas de Node.js'
        : language === 'es'
        ? 'Mejores prácticas de Node.js'
        : 'Node.js Best Practices',
      excerpt: language === 'pt'
        ? 'Dicas e truques para escrever código Node.js mais eficiente e escalável...'
        : language === 'es'
        ? 'Consejos y trucos para escribir código Node.js más eficiente y escalable...'
        : 'Tips and tricks for writing more efficient and scalable Node.js code...',
      date: '2024-01-10',
      category: language === 'pt' ? 'Node.js' : 'Node.js',
      readTime: '7 min'
    },
    {
      id: 3,
      title: language === 'pt'
        ? 'Otimização de Performance em Aplicações Web'
        : language === 'es'
        ? 'Optimización de Rendimiento en Aplicaciones Web'
        : 'Web Application Performance Optimization',
      excerpt: language === 'pt'
        ? 'Estratégias avançadas para melhorar a performance de suas aplicações...'
        : language === 'es'
        ? 'Estrategias avanzadas para mejorar el rendimiento de tus aplicaciones...'
        : 'Advanced strategies to improve your applications performance...',
      date: '2024-01-05',
      category: language === 'pt' ? 'Performance' : 'Performance',
      readTime: '10 min'
    }
  ]

  return (
    <section className="blog" id="blog" data-lang={language} ref={ref}>
      <div className="max-width">
        <h2 className="title">{t.blog?.title || 'Blog & Artigos'}</h2>
        <div className={`blog-grid ${inView ? 'animate' : ''}`}>
          {articles.map((article, index) => (
            <article key={article.id} className="blog-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="blog-card-header">
                <span className="blog-category">{article.category}</span>
                <span className="blog-read-time">{article.readTime}</span>
              </div>
              <h3 className="blog-title">{article.title}</h3>
              <p className="blog-excerpt">{article.excerpt}</p>
              <div className="blog-card-footer">
                <span className="blog-date">{new Date(article.date).toLocaleDateString(language === 'pt' ? 'pt-BR' : language === 'es' ? 'es-ES' : 'en-US')}</span>
                <a href="#" className="blog-read-more">
                  {t.blog?.readMore || 'Ler mais'} <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog

