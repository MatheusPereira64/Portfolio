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
      year: '2024 - Atual',
      title: language === 'pt' ? 'Desenvolvedor Full Stack' : language === 'es' ? 'Desarrollador Full Stack' : 'Full Stack Developer',
      company: language === 'pt' ? 'Projetos Pessoais e Freelancer' : language === 'es' ? 'Proyectos Personales y Freelancer' : 'Personal Projects & Freelancer',
      description: language === 'pt' 
        ? 'Desenvolvimento de aplicações web completas usando React, Node.js e tecnologias modernas. Criação de portfólios, sistemas de gestão e aplicações responsivas. Trabalho com APIs RESTful, bancos de dados e integração de serviços.'
        : language === 'es'
        ? 'Desarrollo de aplicaciones web completas usando React, Node.js y tecnologías modernas. Creación de portafolios, sistemas de gestión y aplicaciones responsivas. Trabajo con APIs RESTful, bases de datos e integración de servicios.'
        : 'Development of complete web applications using React, Node.js and modern technologies. Creation of portfolios, management systems and responsive applications. Working with RESTful APIs, databases and service integration.',
      technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express', 'Git']
    },
    {
      year: '2023 - 2024',
      title: language === 'pt' ? 'Estudante de Análise e Desenvolvimento de Sistemas' : language === 'es' ? 'Estudiante de Análisis y Desarrollo de Sistemas' : 'Systems Analysis and Development Student',
      company: 'ITEGAM',
      description: language === 'pt'
        ? 'Formação em desenvolvimento de software com foco em tecnologias web e mobile. Participação em projetos acadêmicos, desenvolvimento de sistemas e aprendizado de metodologias ágeis. Estudos em estrutura de dados, algoritmos e engenharia de software.'
        : language === 'es'
        ? 'Formación en desarrollo de software con enfoque en tecnologías web y móviles. Participación en proyectos académicos, desarrollo de sistemas y aprendizaje de metodologías ágiles. Estudios en estructura de datos, algoritmos e ingeniería de software.'
        : 'Software development training focusing on web and mobile technologies. Participation in academic projects, system development and learning agile methodologies. Studies in data structures, algorithms and software engineering.',
      technologies: ['JavaScript', 'Python', 'Java', 'SQL', 'HTML/CSS', 'C++']
    },
    {
      year: '2022 - 2023',
      title: language === 'pt' ? 'Desenvolvedor Frontend Júnior' : language === 'es' ? 'Desarrollador Frontend Junior' : 'Junior Frontend Developer',
      company: language === 'pt' ? 'Projetos Acadêmicos' : language === 'es' ? 'Proyectos Académicos' : 'Academic Projects',
      description: language === 'pt'
        ? 'Desenvolvimento de interfaces web responsivas e interativas. Trabalho com HTML5, CSS3 e JavaScript vanilla. Criação de layouts modernos e experiência do usuário otimizada. Aprendizado de frameworks modernos como React.'
        : language === 'es'
        ? 'Desarrollo de interfaces web responsivas e interactivas. Trabajo con HTML5, CSS3 y JavaScript vanilla. Creación de layouts modernos y experiencia de usuario optimizada. Aprendizaje de frameworks modernos como React.'
        : 'Development of responsive and interactive web interfaces. Working with HTML5, CSS3 and vanilla JavaScript. Creation of modern layouts and optimized user experience. Learning modern frameworks like React.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Git']
    }
  ]

  return (
    <section className="experience" id="experience" data-lang={language} ref={ref}>
      <div className="max-width">
        <h2 className="title">{t.experience?.title || 'Experiência'}</h2>
        <div className={`experience-timeline ${inView ? 'animate' : ''}`}>
          {experiences.map((exp, index) => (
            <div key={index} className={`timeline-item ${inView ? 'animate' : ''}`} style={{ animationDelay: `${index * 0.2}s` }}>
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

