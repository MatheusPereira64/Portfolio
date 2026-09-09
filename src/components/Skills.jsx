import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { CERTIFICATIONS, getCertificateHref, getCertificatePreviewSrc, getLocalizedField } from '../data/certifications'
import CertificatePreview from './CertificatePreview'
import SkillIcon from './SkillIcon'
import './Skills.css'

const Skills = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const [isVisible, setIsVisible] = useState(false)
  const skillsRef = useRef(null)
  const contentRef = useRef(null)

  const skills = [
    { name: 'JavaScript', percentage: 95 },
    { name: 'TypeScript', percentage: 88 },
    { name: 'React', percentage: 95 },
    { name: 'Vue.js', percentage: 80 },
    { name: 'Node.js', percentage: 90 },
    { name: 'HTML/CSS', percentage: 95 },
    { name: 'Python', percentage: 85 },
    { name: 'SQL', percentage: 85 },
    { name: 'MongoDB', percentage: 80 },
    { name: 'REST APIs', percentage: 88 },
    { name: 'Docker', percentage: 78 },
    { name: 'Git', percentage: 85 },
    { name: 'AWS', percentage: 72 },
    { name: 'Spring Boot', percentage: 75 },
    { name: 'CI/CD', percentage: 80 },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (contentRef.current) {
              contentRef.current.classList.add('visible')
            }
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
    { title: 'Inglês Fluente - C1', institution: 'ICBEU', period: '2019' },
    { title: 'Lógica e Programação WEB - Full Stack', institution: 'Flexpeak', period: '2023' }
  ] : language === 'es' ? [
    { title: 'Graduado en Ingeniería de Computación', institution: 'FAMETRO', period: '2019 - 2024' },
    { title: 'Inglés fluido - C1', institution: 'ICBEU', period: '2019' },
    { title: 'Lógica y Programación WEB - Full Stack', institution: 'Flexpeak', period: '2023' }
  ] : [
    { title: 'Graduated in Computer Engineering', institution: 'FAMETRO', period: '2019 - 2024' },
    { title: 'Fluent English - C1', institution: 'ICBEU', period: '2019' },
    { title: 'WEB Logic and Programming - Full Stack', institution: 'Flexpeak', period: '2023' }
  ]

  return (
    <section className="skills" id="skills" ref={skillsRef} data-lang={language}>
      <div className="max-width">
        <h2 className="title">{t.skills.title}</h2>
        <div className="certifications-strip" id="certifications">
          <h3>{t.skills.certifications || 'Certificações'}</h3>
          <ul className="certifications-grid">
            {CERTIFICATIONS.map((cert) => {
              const href = getCertificateHref(cert)
              const previewSrc = getCertificatePreviewSrc(cert)
              const title = getLocalizedField(cert.title, language)
              const content = (
                <>
                  <CertificatePreview src={previewSrc} />
                  <span className="cert-card-meta">
                    <span className="cert-issuer">{cert.issuer}</span>
                    <strong>{title}</strong>
                    <span className="cert-year">{cert.year}</span>
                  </span>
                </>
              )
              return (
                <li key={cert.id} className="cert-card">
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {content}
                    </a>
                  ) : (
                    <div>{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="skills-content" ref={contentRef}>
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
              <div key={skill.name} className="bars">
                <div className="info">
                  <span className="skill-name">
                    <SkillIcon name={skill.name} />
                    {skill.name}
                  </span>
                  <span>{skill.percentage}%</span>
                </div>
                <div
                  className="line"
                  style={{
                    '--skill-width': `${skill.percentage}%`,
                    '--skill-delay': `${(index + 1) * 0.1}s`,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

