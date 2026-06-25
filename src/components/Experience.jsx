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
      year: language === 'pt' ? 'Jan 2023 - Jun 2023' : language === 'es' ? 'Ene 2023 - Jun 2023' : 'Jan 2023 - Jun 2023',
      title: language === 'pt' ? 'Engenheiro de Software' : language === 'es' ? 'Ingeniero de Software' : 'Software Engineer',
      company: 'VIA CERTA',
      description: language === 'pt'
        ? 'Desenvolvimento e manutenção de sistemas internos de gestão logística e administrativa. Atuação com bancos de dados SQL, suporte a aplicações, validação de dados e melhoria contínua de sistemas corporativos em colaboração com equipes multidisciplinares.'
        : language === 'es'
        ? 'Desarrollo y mantenimiento de sistemas internos de gestión logística y administrativa. Trabajo con bases de datos SQL, soporte a aplicaciones, validación de datos y mejora continua de sistemas corporativos junto a equipos multidisciplinarios.'
        : 'Developed and maintained internal logistics and business management systems. Worked with SQL databases, application support, data validation, and process optimization while collaborating with cross-functional teams to improve operational reliability.',
      technologies: ['SQL Server', 'SQL', 'Windows Server', 'Database Management', 'Troubleshooting', 'Git']
    },
    {
      year: '2022 - 2023',
      title: language === 'pt' ? 'Engenharia da Computação — Desenvolvimento de Software' : language === 'es' ? 'Ingeniería de Computación — Desarrollo de Software' : 'Computer Engineering — Software Development',
      company: 'FAMETRO · Samsung Ocean',
      description: language === 'pt'
        ? 'Formação em engenharia de software com projetos acadêmicos em desenvolvimento web e aplicações interativas. Participação em programas Samsung Ocean (React.js, JavaScript, Unity e Python), consolidando bases em front-end, lógica de programação e boas práticas de engenharia.'
        : language === 'es'
        ? 'Formación en ingeniería de software con proyectos académicos en desarrollo web y aplicaciones interactivas. Participación en programas Samsung Ocean (React.js, JavaScript, Unity y Python), consolidando bases en front-end, lógica de programación y buenas prácticas de ingeniería.'
        : 'Computer Engineering training with academic software projects and interactive web applications. Completed Samsung Ocean programs in React.js, JavaScript, Unity, and Python, building strong foundations in front-end development and software engineering practices.',
      technologies: ['JavaScript', 'React', 'Python', 'HTML/CSS', 'Unity', 'Git']
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

