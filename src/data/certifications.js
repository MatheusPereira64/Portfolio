export function getLocalizedField(field, language) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[language] || field.en || field.pt || ''
}

export function getCertificateAssetHref(filename) {
  if (!filename) return null
  const encoded = filename.split('/').map((part) => encodeURIComponent(part)).join('/')
  return `${import.meta.env.BASE_URL}certificados/${encoded}`
}

/** Arquivo do certificado no site ou, sem arquivo, o link da credencial (`url`). */
export function getCertificateHref(cert) {
  if (typeof cert === 'string') return getCertificateAssetHref(cert)
  return getCertificateAssetHref(cert?.file || cert?.image) || cert?.url || null
}

export function getCertificatePreviewSrc(cert) {
  if (cert?.preview) return getCertificateAssetHref(cert.preview)
  const image = cert?.image
  if (image && !String(image).toLowerCase().endsWith('.pdf')) {
    return getCertificateAssetHref(image)
  }
  return null
}

export function countInpiRegistrations() {
  return CERTIFICATIONS.filter((cert) => cert.issuer === 'INPI').length
}

export function isPdfCertificate(src) {
  return typeof src === 'string' && src.toLowerCase().includes('.pdf')
}

/** Cursos e datas conferidos no LinkedIn (seção Licenças e certificados). */
export const CERTIFICATIONS = [
  {
    id: 'crpc-1',
    tags: ['Indústria 4.0', 'IoT', 'Vue.js'],
    title: { pt: 'CRPC-INPI — Sistema Inteligente de Manufatura', en: 'CRPC-INPI — Smart Manufacturing System', es: 'CRPC-INPI — Sistema Inteligente de Manufactura' },
    issuer: 'INPI',
    year: '2025',
    file: 'certificado-crpc-inpi-01.pdf',
    preview: 'thumbs/certificado-crpc-inpi-01.webp',
  },
  {
    id: 'crpc-2',
    tags: ['Indústria 4.0', 'IA', 'Python'],
    title: { pt: 'CRPC-INPI — Parametrização de Máquinas com IA', en: 'CRPC-INPI — AI Machine Parameterization', es: 'CRPC-INPI — Parametrización de Máquinas con IA' },
    issuer: 'INPI',
    year: '2025',
    file: 'certificado-crpc-inpi-02.pdf',
    preview: 'thumbs/certificado-crpc-inpi-02.webp',
  },
  {
    id: 'crpc-3',
    tags: ['Indústria 4.0', 'Dashboards', 'Vue.js'],
    title: { pt: 'CRPC-INPI — Monitoramento de Produção', en: 'CRPC-INPI — Production Monitoring', es: 'CRPC-INPI — Monitoreo de Producción' },
    issuer: 'INPI',
    year: '2025',
    file: 'certificado-crpc-inpi-03.pdf',
    preview: 'thumbs/certificado-crpc-inpi-03.webp',
  },
  {
    id: 'fametro',
    title: { pt: 'Bacharel em Engenharia da Computação', en: 'Bachelor of Computer Engineering', es: 'Licenciatura en Ingeniería de Computación' },
    issuer: 'FAMETRO',
    year: '2025',
    image: 'diploma-fametro-engenharia.jpg',
    preview: 'thumbs/diploma-fametro-engenharia.webp',
  },
  {
    id: 'fia-cloud-security',
    tags: ['Cloud', 'Segurança'],
    title: { pt: 'Segurança em Computação em Nuvem', en: 'Cloud Computing Security', es: 'Seguridad en la Computación en la Nube' },
    issuer: 'FIA Business School',
    mark: 'FIA',
    year: '2026',
  },
  {
    id: 'ocean-react-backend',
    tags: ["React","APIs"],
    title: { pt: "Front-end Web com ReactJS: Integração com o Back-end", en: "Frontend Web with ReactJS: Integration with Backend", es: "Front-end Web con ReactJS: Integración con el Back-end" },
    issuer: 'Samsung Ocean',
    mark: 'SO',
    year: '2024',
    url: 'https://oceanbrasil.com/certificado/clsewwe1k007yl308mmkoihfm_4457',
  },
  {
    id: 'ocean-react-intro',
    tags: ["React","JavaScript"],
    title: { pt: "Front-end Web com ReactJS: Introdução", en: "Frontend Web with ReactJS: Introduction", es: "Front-end Web con ReactJS: Introducción" },
    issuer: 'Samsung Ocean',
    mark: 'SO',
    year: '2024',
    url: 'https://oceanbrasil.com/certificado/clruuvi7k0040l4084yykwn00_4454',
  },
  {
    id: 'ocean-opinion-mining',
    tags: ["Python","Dados"],
    title: { pt: "Mineração de Opiniões com Python", en: "Opinion Mining with Python", es: "Minería de Opiniones con Python" },
    issuer: 'Samsung Ocean',
    mark: 'SO',
    year: '2024',
    url: 'https://oceanbrasil.com/certificado/cls298emb001ql508ffapc4pg_4452',
  },
  {
    id: 'ocean-unity-2d',
    tags: ["Unity","Jogos"],
    title: { pt: "Criação de Jogos 2D com Unity", en: "Creating 2D Games with Unity", es: "Creación de Juegos 2D con Unity" },
    issuer: 'Samsung Ocean',
    mark: 'SO',
    year: '2022',
    url: 'https://oceanbrasil.com/certificado/cla6jnrx93wqdv8ys1501n2gv_2867',
  },
  {
    id: 'xperiun-ia',
    tags: ['IA', 'Machine Learning'],
    title: { pt: 'Bê-a-bá da Inteligência Artificial', en: 'AI Basics (Bê-a-bá da IA)', es: 'Fundamentos de la IA (Bê-a-bá da IA)' },
    issuer: 'Xperiun | Data Analytics',
    mark: 'XP',
  },
  {
    id: 'microsoft-excel',
    tags: ['Excel'],
    title: { pt: 'Microsoft Office Specialist: Excel Associate (Office 2019)', en: 'Microsoft Office Specialist: Excel Associate (Office 2019)', es: 'Microsoft Office Specialist: Excel Associate (Office 2019)' },
    issuer: 'Microsoft',
    mark: 'MS',
  },
  {
    id: 'flexpeak',
    tags: ['Full Stack', 'JavaScript', 'Web'],
    title: { pt: 'Lógica e Programação WEB — Full Stack', en: 'WEB Logic and Programming — Full Stack', es: 'Lógica y Programación WEB — Full Stack' },
    issuer: 'Flexpeak',
    year: '2023',
    image: 'certificado-flexpeak-logica-web.jpg',
    preview: 'thumbs/certificado-flexpeak-logica-web.webp',
  },
  {
    id: 'icbeu',
    title: { pt: 'Inglês Fluente — C1', en: 'Fluent English — C1', es: 'Inglés fluido — C1' },
    issuer: 'ICBEU',
    year: '2019',
    image: 'certificado-icbeu-ingles.jpg',
    preview: 'thumbs/certificado-icbeu-ingles.webp',
  },
]
