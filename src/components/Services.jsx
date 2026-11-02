import { useLanguage } from '../context/LanguageContext'
import { getLocalizedField } from '../data/projects'
import { SERVICES } from '../data/services'
import Reveal from './Reveal'
import './Services.css'

const ICON_PATHS = {
  web: 'M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5zM3 9.5h18M6 7.25h.01M8.5 7.25h.01',
  chart: 'M4 4v16h16M8 16v-4M12 16V8M16 16v-6',
  plug: 'M9 3v5M15 3v5M6.5 8h11v3a5.5 5.5 0 0 1-11 0zM12 16.5V21',
  phone: 'M8 3h8a1.5 1.5 0 0 1 1.5 1.5v15A1.5 1.5 0 0 1 16 21H8a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 8 3zM11 18h2',
  spark: 'M12 3.5l1.9 5.1a2.5 2.5 0 0 0 1.5 1.5l5.1 1.9-5.1 1.9a2.5 2.5 0 0 0-1.5 1.5L12 20.5l-1.9-5.1a2.5 2.5 0 0 0-1.5-1.5L3.5 12l5.1-1.9a2.5 2.5 0 0 0 1.5-1.5z',
  tools: 'M14.5 6.5a4 4 0 0 1 5-1.2l-2.8 2.8 1.2 1.2 2.8-2.8a4 4 0 0 1-5.4 5.1L8 18.4a2 2 0 0 1-2.9-2.9l6.8-6.8a4 4 0 0 1 2.6-2.2z',
}

const ServiceIcon = ({ name }) => (
  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" focusable="false">
    <path
      d={ICON_PATHS[name]}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Services = () => {
  const { translations, language } = useLanguage()
  const t = translations[language].services

  return (
    <section className="services" id="services" data-lang={language}>
      <div className="max-width">
        <Reveal as="h2" className="section-heading">{t.title}</Reveal>
        <Reveal as="p" className="section-intro">{t.intro}</Reveal>
        <ul className="services-grid">
          {SERVICES.map((service, index) => (
            <Reveal as="li" key={service.id} className="service-card" index={index}>
              <ServiceIcon name={service.icon} />
              <h3>{getLocalizedField(service.title, language)}</h3>
              <p>{getLocalizedField(service.description, language)}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Services
