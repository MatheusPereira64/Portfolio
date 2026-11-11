import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { SITE_PROFILE } from '../constants/siteProfile'
import {
  CERTIFICATIONS,
  getCertificateHref,
  getCertificatePreviewSrc,
  getLocalizedField,
} from '../data/certifications'
import CertificateViewer from './CertificateViewer'
import Icon from './Icon'
import { ExternalLinkIcon } from './ProjectModal'
import Reveal from './Reveal'
import './Certifications.css'

/** Diploma e inglês ficam em Formação Acadêmica; aqui só registros e cursos. */
const IN_EDUCATION = new Set(['fametro', 'icbeu'])

const IMAGE_FILE = /\.(jpe?g|png|webp)$/i

const cleanTitle = (cert, language) =>
  getLocalizedField(cert.title, language).replace(/^CRPC-INPI — /, '')

const byYearDesc = (list) =>
  list
    .map((cert, order) => ({ cert, order }))
    .sort((a, b) => (parseInt(b.cert.year, 10) || 0) - (parseInt(a.cert.year, 10) || 0) || a.order - b.order)
    .map(({ cert }) => cert)

/**
 * Cartão único para registros e cursos: a folha do certificado em cima,
 * depois título, emissor, ano, tags e o botão.
 * Imagens abrem no visualizador; PDFs e páginas de verificação, em nova aba.
 */
const CertCard = ({ cert, index, language, viewLabel, onOpenImage }) => {
  const href = getCertificateHref(cert)
  const preview = getCertificatePreviewSrc(cert)
  const title = cleanTitle(cert, language)
  const opensInViewer = Boolean(href && IMAGE_FILE.test(href))
  const isPortrait = cert.issuer === 'INPI'

  return (
    <Reveal as="li" className="cert-card" index={index}>
      <span className={`cert-card-desk${isPortrait ? ' is-portrait' : ''}`} aria-hidden="true">
        <span className="cert-card-paper">
          {preview ? (
            <img src={preview} alt="" width={480} height={isPortrait ? 679 : 340} loading="lazy" decoding="async" />
          ) : (
            <Icon name="award" />
          )}
        </span>
      </span>
      <div className="cert-card-body">
        <h4 className="cert-card-title">{title}</h4>
        <p className="cert-card-issuer">{cert.issuer}</p>
        {cert.year && <p className="cert-card-year">{cert.year}</p>}
        {cert.tags?.length > 0 && (
          <ul className="cert-tags">
            {cert.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        )}
        {opensInViewer ? (
          <button
            type="button"
            className="cert-card-action"
            onClick={(event) => onOpenImage({ src: href, title }, event.currentTarget)}
          >
            {viewLabel}
          </button>
        ) : href ? (
          <a className="cert-card-action" href={href} target="_blank" rel="noopener noreferrer">
            {viewLabel}
            <ExternalLinkIcon />
          </a>
        ) : null}
      </div>
    </Reveal>
  )
}

const Certifications = () => {
  const { translations, language } = useLanguage()
  const t = translations[language].certifications
  const [viewing, setViewing] = useState(null)
  const openerRef = useRef(null)

  const registrations = CERTIFICATIONS.filter((cert) => cert.issuer === 'INPI')
  const courses = byYearDesc(CERTIFICATIONS.filter((cert) => cert.issuer !== 'INPI' && !IN_EDUCATION.has(cert.id)))

  const openImage = (image, opener) => {
    openerRef.current = opener
    setViewing(image)
  }

  const closeImage = () => setViewing(null)

  // Só depois que o <dialog> sai da página o foco pode voltar ao botão que o abriu.
  useEffect(() => {
    if (viewing || !openerRef.current) return
    openerRef.current.focus()
    openerRef.current = null
  }, [viewing])

  const groups = [
    { key: 'registrations', title: t.registrations, items: registrations, viewLabel: t.viewRegistration },
    { key: 'courses', title: t.courses, items: courses, viewLabel: t.view },
  ]

  return (
    <section className="certifications" id="certifications" data-lang={language}>
      <div className="max-width">
        <Reveal as="h2" className="section-heading">{t.title}</Reveal>
        <Reveal as="p" className="section-intro">{t.intro}</Reveal>

        {groups.map((group) => (
          <div key={group.key} className="cert-group">
            <h3 className="cert-group-title">
              {group.title}
              <span className="cert-group-count">{group.items.length}</span>
            </h3>
            <ul className="cert-grid">
              {group.items.map((cert, index) => (
                <CertCard
                  key={cert.id}
                  cert={cert}
                  index={index}
                  language={language}
                  viewLabel={group.viewLabel}
                  onOpenImage={openImage}
                />
              ))}
            </ul>
          </div>
        ))}

        <div className="cert-more">
          <a href={`${SITE_PROFILE.linkedin}details/certifications/`} target="_blank" rel="noopener noreferrer">
            <Icon name="linkedin" />
            {t.linkedin}
          </a>
        </div>
      </div>

      {viewing && (
        <CertificateViewer
          src={viewing.src}
          title={viewing.title}
          closeLabel={t.close}
          openLabel={t.openFull}
          onClose={closeImage}
        />
      )}
    </section>
  )
}

export default Certifications
