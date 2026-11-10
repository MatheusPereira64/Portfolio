import { useLanguage } from '../context/LanguageContext'
import { SITE_PROFILE } from '../constants/siteProfile'
import {
  CERTIFICATIONS,
  getCertificateHref,
  getCertificatePreviewSrc,
  getLocalizedField,
} from '../data/certifications'
import Icon from './Icon'
import Reveal from './Reveal'
import './Certifications.css'

/** Diploma e inglês ficam em Formação Acadêmica; aqui só registros e cursos. */
const IN_EDUCATION = new Set(['fametro', 'icbeu'])

const cleanTitle = (cert, language) =>
  getLocalizedField(cert.title, language).replace(/^CRPC-INPI — /, '')

const Tags = ({ tags }) =>
  tags?.length > 0 ? (
    <ul className="cert-tags">
      {tags.map((tag) => <li key={tag}>{tag}</li>)}
    </ul>
  ) : null

/** Registro INPI: o próprio documento é a peça principal do cartão. */
const RegistrationCard = ({ cert, index, language, viewLabel }) => {
  const href = getCertificateHref(cert)
  const preview = getCertificatePreviewSrc(cert)
  const title = cleanTitle(cert, language)

  return (
    <Reveal as="li" className="cert-doc" index={index}>
      <a className="cert-doc-link" href={href} target="_blank" rel="noopener noreferrer">
        <span className="cert-doc-desk" aria-hidden="true">
          <span className="cert-doc-paper">
            {preview ? (
              <img src={preview} alt="" width={220} height={311} loading="lazy" decoding="async" />
            ) : (
              <Icon name="award" />
            )}
          </span>
        </span>
        <span className="cert-doc-body">
          <span className="cert-doc-title">{title}</span>
          <span className="cert-doc-meta">{cert.issuer}, {cert.year}</span>
          <span className="cert-doc-action">{viewLabel}</span>
        </span>
      </a>
      <Tags tags={cert.tags} />
    </Reveal>
  )
}

/** Curso: linha discreta, com miniatura ao lado. */
const CourseRow = ({ cert, index, language, viewLabel }) => {
  const href = getCertificateHref(cert)
  const preview = getCertificatePreviewSrc(cert)

  return (
    <Reveal as="li" className="cert-row" index={index}>
      <span className="cert-row-thumb" aria-hidden="true">
        {preview ? (
          <img src={preview} alt="" width={120} height={85} loading="lazy" decoding="async" />
        ) : (
          <Icon name="award" />
        )}
      </span>
      <div className="cert-row-text">
        <h4 className="cert-row-title">{cleanTitle(cert, language)}</h4>
        <p className="cert-row-meta">{cert.issuer}, {cert.year}</p>
        <Tags tags={cert.tags} />
      </div>
      {href && (
        <a className="cert-row-link" href={href} target="_blank" rel="noopener noreferrer">
          {viewLabel}
        </a>
      )}
    </Reveal>
  )
}

const Certifications = () => {
  const { translations, language } = useLanguage()
  const t = translations[language].certifications
  const registrations = CERTIFICATIONS.filter((cert) => cert.issuer === 'INPI')
  const courses = CERTIFICATIONS.filter((cert) => cert.issuer !== 'INPI' && !IN_EDUCATION.has(cert.id))

  return (
    <section className="certifications" id="certifications" data-lang={language}>
      <div className="max-width">
        <Reveal as="h2" className="section-heading">{t.title}</Reveal>
        <Reveal as="p" className="section-intro">{t.intro}</Reveal>

        <h3 className="cert-group-title">
          {t.registrations}
          <span className="cert-group-count">{registrations.length}</span>
        </h3>
        <ul className="cert-docs">
          {registrations.map((cert, index) => (
            <RegistrationCard key={cert.id} cert={cert} index={index} language={language} viewLabel={t.viewRegistration} />
          ))}
        </ul>

        <h3 className="cert-group-title">{t.courses}</h3>
        <ul className="cert-rows">
          {courses.map((cert, index) => (
            <CourseRow key={cert.id} cert={cert} index={index} language={language} viewLabel={t.view} />
          ))}
        </ul>

        <div className="cert-more">
          <a href={`${SITE_PROFILE.linkedin}details/certifications/`} target="_blank" rel="noopener noreferrer">
            <Icon name="linkedin" />
            {t.linkedin}
          </a>
        </div>
      </div>
    </section>
  )
}

export default Certifications
