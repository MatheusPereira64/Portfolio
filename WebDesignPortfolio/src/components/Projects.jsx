import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Projects.css'

const Projects = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const [currentIndex, setCurrentIndex] = useState(0)

  const projects = [
    {
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=869&q=80',
      title: language === 'pt' ? 'Aplicação Web Responsiva' : 'Responsive Web Application',
      description: language === 'pt' ? 'Frontend moderno' : 'Modern Frontend'
    },
    {
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      title: language === 'pt' ? 'Sistema de Gestão' : 'Management System',
      description: language === 'pt' ? 'Backend robusto' : 'Robust Backend'
    },
    {
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      title: language === 'pt' ? 'Jogo Interativo 2D' : 'Interactive 2D Game',
      description: language === 'pt' ? 'Game Engine' : 'Game Engine'
    },
    {
      image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      title: language === 'pt' ? 'Aplicativo Mobile' : 'Mobile Application',
      description: language === 'pt' ? 'Cross-platform' : 'Cross-platform'
    },
    {
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
      title: language === 'pt' ? 'API RESTful' : 'RESTful API',
      description: language === 'pt' ? 'Microserviços' : 'Microservices'
    },
    {
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=834&q=80',
      title: language === 'pt' ? 'Análise de Dados' : 'Data Analysis',
      description: language === 'pt' ? 'Python & AI' : 'Python & AI'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [projects.length])

  const getVisibleProjects = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      visible.push(projects[(currentIndex + i) % projects.length])
    }
    return visible
  }

  return (
    <section className="teams" id="teams" data-lang={language}>
      <div className="max-width">
        <h2 className="title">{t.projects.title}</h2>
        <div className="carousel">
          {getVisibleProjects().map((project, index) => (
            <div key={index} className="card">
              <div className="box">
                <img src={project.image} alt={project.title} />
                <div className="text">{project.title}</div>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {projects.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects

