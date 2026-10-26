import { useLanguage } from '../context/LanguageContext'
import { profileImageProps, SITE_PROFILE, triggerCvDownload } from '../constants/siteProfile'
import { countInpiRegistrations } from '../data/certifications'
import { goToSection } from '../utils/routes'
import './Home.css'

const Home = () => {
  const { translations, language } = useLanguage()
  const t = translations[language]
  const inpiCount = countInpiRegistrations()
  const whatsappHref = `https://wa.me/${SITE_PROFILE.phoneDigits}`

  return (
    <section className="home" id="home">
      <div className="max-width">
        <div className="home-inner">
          <div className="home-content">
            <p className="home-availability">
              <span className="home-availability-dot" aria-hidden="true" />
              {t.home.available}
            </p>
            <p className="text-1">{t.home.role}</p>
            <h1 className="text-2">{t.home.name}</h1>
            <p className="home-proposition">{t.home.proposition}</p>
            <div className="home-actions">
              <a className="home-cta home-cta-primary" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                {t.home.talk}
              </a>
              <button type="button" className="home-cta home-cta-secondary" onClick={() => triggerCvDownload(language)}>
                {t.home.downloadCv}
              </button>
            </div>
            {inpiCount > 0 && (
              <p className="home-proof">
                <a href="#certifications" onClick={(event) => goToSection(event, 'certifications')}>
                  {t.home.inpi.replace('{count}', String(inpiCount))}
                </a>
              </p>
            )}
          </div>
          <div className="home-profile">
            <div className="home-profile-ring">
              <img
                {...profileImageProps()}
                alt={SITE_PROFILE.fullName}
                width={280}
                height={280}
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
