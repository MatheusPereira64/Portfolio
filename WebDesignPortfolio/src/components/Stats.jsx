import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../context/LanguageContext'
import './Stats.css'

const Stats = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const [counters, setCounters] = useState({
    projects: 0,
    code: 0,
    experience: 0,
    clients: 0
  })

  const stats = [
    {
      icon: 'fa-folder-open',
      value: counters.projects,
      suffix: '+',
      label: language === 'pt' ? 'Projetos' : language === 'es' ? 'Proyectos' : 'Projects'
    },
    {
      icon: 'fa-code',
      value: counters.code,
      suffix: 'K+',
      label: language === 'pt' ? 'Linhas de Código' : language === 'es' ? 'Líneas de Código' : 'Lines of Code'
    },
    {
      icon: 'fa-calendar-alt',
      value: counters.experience,
      suffix: '+',
      label: language === 'pt' ? 'Anos de Experiência' : language === 'es' ? 'Años de Experiencia' : 'Years Experience'
    },
    {
      icon: 'fa-users',
      value: counters.clients,
      suffix: '+',
      label: language === 'pt' ? 'Clientes Satisfeitos' : language === 'es' ? 'Clientes Satisfechos' : 'Happy Clients'
    }
  ]

  useEffect(() => {
    if (inView) {
      const targets = { projects: 20, code: 50, experience: 2, clients: 10 }
      const duration = 2000
      const steps = 60
      const stepDuration = duration / steps

      let currentStep = 0
      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps

        setCounters({
          projects: Math.floor(targets.projects * progress),
          code: Math.floor(targets.code * progress),
          experience: Math.floor(targets.experience * progress),
          clients: Math.floor(targets.clients * progress)
        })

        if (currentStep >= steps) {
          setCounters(targets)
          clearInterval(interval)
        }
      }, stepDuration)

      return () => clearInterval(interval)
    }
  }, [inView])

  return (
    <section className="stats" id="stats" data-lang={language} ref={ref}>
      <div className="max-width">
        <h2 className="title">{t.stats?.title || 'Estatísticas'}</h2>
        <div className={`stats-grid ${inView ? 'animate' : ''}`}>
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <div className="stat-value">
                {stat.value}{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats

