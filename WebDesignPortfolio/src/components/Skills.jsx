import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Skills.css'

const Skills = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const [isVisible, setIsVisible] = useState(false)
  const skillsRef = useRef(null)

  const skills = [
    { name: 'JavaScript', percentage: 95, class: 'javascript' },
    { name: 'React', percentage: 95, class: 'react' },
    { name: 'HTML/CSS', percentage: 95, class: 'html' },
    { name: 'C++', percentage: 80, class: 'cpp' },
    { name: 'Java', percentage: 75, class: 'java' },
    { name: 'GitHub', percentage: 85, class: 'github' },
    { name: 'Web Design', percentage: 80, class: 'webdesign' },
    { name: 'Bootstrap', percentage: 85, class: 'bootstrap' },
    { name: 'Banco de Dados', percentage: 75, class: 'database' },
    { name: 'SQL/NoSQL', percentage: 80, class: 'sql' },
    { name: 'Python', percentage: 85, class: 'python' },
    { name: 'PHP', percentage: 65, class: 'php' },
    { name: 'Git', percentage: 85, class: 'git' },
    { name: 'Word', percentage: 90, class: 'word' },
    { name: 'Excel', percentage: 85, class: 'excel' }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current)
      }
    }
  }, [])

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const education = language === 'pt' ? [
    { title: 'Graduado em Engenharia da Computação', institution: 'FAMETRO', period: '2019 - 2024' },
    { title: 'Inglês Fluente - C1', institution: 'ICBEU', period: '2018' },
    { title: 'Lógica e Programação WEB - Full Stack', institution: 'Flexpeak', period: '2023' }
  ] : [
    { title: 'Graduated in Computer Engineering', institution: 'FAMETRO', period: '2019 - 2024' },
    { title: 'Fluent English - C1', institution: 'ICBEU', period: '2018' },
    { title: 'WEB Logic and Programming - Full Stack', institution: 'Flexpeak', period: '2023' }
  ]

  return (
    <section className="skills" id="skills" ref={skillsRef}>
      <div className="max-width">
        <h2 className="title">{t.skills.title}</h2>
        <div className="skills-content">
          <div className="column left">
            <div className="text">{t.skills.text}</div>
            <p>{t.skills.description}</p>
            
            <div className="education-info">
              <h4>{t.skills.education}</h4>
              {education.map((edu, index) => (
                <div key={index} className="education-item">
                  <p>
                    <strong>{edu.title}</strong><br />
                    {edu.institution}<br />
                    {edu.period}
                  </p>
                </div>
              ))}
            </div>
            
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>{t.skills.button}</a>
          </div>
          <div className="column right">
            {skills.map((skill, index) => (
              <div key={index} className="bars">
                <div className="info">
                  <span>{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>
                <div className="line">
                  <div 
                    className={`line-fill ${skill.class}`}
                    style={{ 
                      width: isVisible ? `${skill.percentage}%` : '0%',
                      transition: `width 2s ease-in-out ${index * 0.1}s`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

