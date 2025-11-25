import { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../context/LanguageContext'
import './Experience.css'

const Experience = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const experiences = [
    {
      year: '2024',
      title: language === 'pt' ? 'Desenvolvedor Full Stack' : language === 'es' ? 'Desarrollador Full Stack' : 'Full Stack Developer',
      company: language === 'pt' ? 'Projetos Pessoais' : language === 'es' ? 'Proyectos Personales' : 'Personal Projects',
      description: language === 'pt' 
        ? 'Desenvolvimento de aplicações web completas usando React, Node.js e tecnologias modernas.'
        : language === 'es'
        ? 'Desarrollo de aplicaciones web completas usando React, Node.js y tecnologías modernas.'
        : 'Development of complete web applications using React, Node.js and modern technologies.',
      technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB']
    },
    {
      year: '2023',
      title: language === 'pt' ? 'Estudante de Análise e Desenvolvimento de Sistemas' : language === 'es' ? 'Estudiante de Análisis y Desarrollo de Sistemas' : 'Systems Analysis and Development Student',
      company: 'ITEGAM',
      description: language === 'pt'
        ? 'Formação em desenvolvimento de software com foco em tecnologias web e mobile.'
        : language === 'es'
        ? 'Formación en desarrollo de software con enfoque en tecnologías web y móviles.'
        : 'Software development training focusing on web and mobile technologies.',
      technologies: ['JavaScript', 'Python', 'Java', 'SQL']
    }
  ]

  return (
    <section className="experience" id="experience" data-lang={language} ref={ref}>
      <div className="max-width">
        <h2 className="title">{t.experience?.title || 'Experiência'}</h2>
        <div className={`experience-timeline ${inView ? 'animate' : ''}`}>
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-year">{exp.year}</div>
                <h3 className="timeline-title">{exp.title}</h3>
                <h4 className="timeline-company">{exp.company}</h4>
                <p className="timeline-description">{exp.description}</p>
                <div className="timeline-technologies">
                  {exp.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience

