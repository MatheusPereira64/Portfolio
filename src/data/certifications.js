export function getLocalizedField(field, language) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[language] || field.en || field.pt || ''
}

export function getCertificateAssetHref(filename) {
  if (!filename) return null
  return `${import.meta.env.BASE_URL}certificados/${encodeURIComponent(filename)}`
}

export function getCertificateHref(cert) {
  if (typeof cert === 'string') return getCertificateAssetHref(cert)
  return getCertificateAssetHref(cert?.file || cert?.image)
}

export function getCertificatePreviewSrc(cert) {
  return getCertificateAssetHref(cert?.image || cert?.file)
}

export function isPdfCertificate(src) {
  return typeof src === 'string' && src.toLowerCase().includes('.pdf')
}

export const CERTIFICATIONS = [
  {
    id: 'crpc-1',
    title: { pt: 'CRPC-INPI — Sistema Inteligente de Manufatura', en: 'CRPC-INPI — Smart Manufacturing System', es: 'CRPC-INPI — Sistema Inteligente de Manufactura' },
    issuer: 'INPI',
    year: '2025',
    file: 'certificado-crpc-inpi-01.pdf',
  },
  {
    id: 'crpc-2',
    title: { pt: 'CRPC-INPI — Parametrização de Máquinas com IA', en: 'CRPC-INPI — AI Machine Parameterization', es: 'CRPC-INPI — Parametrización de Máquinas con IA' },
    issuer: 'INPI',
    year: '2025',
    file: 'certificado-crpc-inpi-02.pdf',
  },
  {
    id: 'crpc-3',
    title: { pt: 'CRPC-INPI — Monitoramento de Produção', en: 'CRPC-INPI — Production Monitoring', es: 'CRPC-INPI — Monitoreo de Producción' },
    issuer: 'INPI',
    year: '2025',
    file: 'certificado-crpc-inpi-03.pdf',
  },
  {
    id: 'fametro',
    title: { pt: 'Bacharel em Engenharia da Computação', en: 'Bachelor of Computer Engineering', es: 'Licenciatura en Ingeniería de Computación' },
    issuer: 'FAMETRO',
    year: '2025',
    image: 'diploma-fametro-engenharia.jpg',
  },
  {
    id: 'flexpeak',
    title: { pt: 'Lógica e Programação WEB — Full Stack', en: 'WEB Logic and Programming — Full Stack', es: 'Lógica y Programación WEB — Full Stack' },
    issuer: 'Flexpeak',
    year: '2023',
    image: 'certificado-flexpeak-logica-web.jpg',
  },
  {
    id: 'samsung',
    title: { pt: 'Samsung Ocean — React, JS, Unity, Python', en: 'Samsung Ocean — React, JS, Unity, Python', es: 'Samsung Ocean — React, JS, Unity, Python' },
    issuer: 'Samsung Ocean',
    year: '2022–2023',
    file: 'certificado-samsung-ocean.pdf',
  },
  {
    id: 'icbeu',
    title: { pt: 'Inglês Fluente — C1', en: 'Fluent English — C1', es: 'Inglés fluido — C1' },
    issuer: 'ICBEU',
    year: '2019',
    image: 'certificado-icbeu-ingles.jpg',
  },
]
