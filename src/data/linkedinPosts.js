/**
 * LinkedIn não expõe o feed de Atividades para sites estáticos (nem via API pública).
 *
 * Como atualizar uma publicação:
 * 1. Abra o post em https://www.linkedin.com/in/matheus-pereira64/recent-activity/shares/
 * 2. ⋯ → Copiar link para a publicação
 * 3. Cole em `linkedinUrl` abaixo (precisa ter `activity-123...` no endereço)
 * O blog monta o embed oficial sozinho.
 */
export const LINKEDIN_POSTS = [
  {
    id: 1,
    linkedinUrl: 'https://www.linkedin.com/in/matheus-pereira64/recent-activity/shares/',
    date: '2026-09-09',
    category: { pt: 'Stack', en: 'Stack', es: 'Stack' },
    title: {
      pt: 'Minha stack é mais do que uma lista de tecnologias',
      en: 'My stack is more than a list of technologies',
      es: 'Mi stack es más que una lista de tecnologías',
    },
    excerpt: {
      pt: 'React, Next.js, TypeScript, Node.js e Python no mesmo fluxo — frontend, APIs, dados e infra para produto de verdade.',
      en: 'React, Next.js, TypeScript, Node.js and Python in one flow — frontend, APIs, data and infra for real products.',
      es: 'React, Next.js, TypeScript, Node.js y Python en un mismo flujo — frontend, APIs, datos e infra para producto real.',
    },
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker'],
  },
  {
    id: 2,
    linkedinUrl: 'https://www.linkedin.com/in/matheus-pereira64/recent-activity/shares/',
    date: '2026-06-01',
    category: { pt: 'Indústria 4.0', en: 'Industry 4.0', es: 'Industria 4.0' },
    title: {
      pt: 'PD&I e Indústria 4.0 no ITEGAM',
      en: 'R&D and Industry 4.0 at ITEGAM',
      es: 'I+D e Industria 4.0 en ITEGAM',
    },
    excerpt: {
      pt: 'Aplicações web, IoT e dashboards industriais — OEE, FPY e dados em tempo real no chão de fábrica.',
      en: 'Web apps, IoT and industrial dashboards — OEE, FPY and real-time shop-floor data.',
      es: 'Aplicaciones web, IoT y dashboards industriales — OEE, FPY y datos en tiempo real en planta.',
    },
    tags: ['Vue.js', 'React', 'IoT', 'OEE', 'PostgreSQL'],
  },
  {
    id: 3,
    linkedinUrl: 'https://www.linkedin.com/in/matheus-pereira64/recent-activity/shares/',
    date: '2026-04-15',
    category: { pt: 'OEE', en: 'OEE', es: 'OEE' },
    title: {
      pt: 'OEE, FPY e qualidade em tempo real',
      en: 'OEE, FPY and quality in real time',
      es: 'OEE, FPY y calidad en tiempo real',
    },
    excerpt: {
      pt: 'Indicadores de produtividade e qualidade visíveis para operação e gestão, com APIs e frontend industrial.',
      en: 'Productivity and quality KPIs visible to operations and management, with APIs and industrial frontend.',
      es: 'Indicadores de productividad y calidad visibles para operación y gestión, con APIs y frontend industrial.',
    },
    tags: ['Dashboards', 'TypeScript', 'Node.js'],
  },
]

export function getLocalizedField(field, language) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[language] || field.en || field.pt || ''
}

/** Converte o link copiado do post no iframe oficial do LinkedIn. */
export function getLinkedInEmbedSrc(url) {
  if (!url || typeof url !== 'string') return null
  const urn = url.match(/urn:li:(activity|share|ugcPost):(\d+)/i)
  if (urn) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:${urn[1].toLowerCase()}:${urn[2]}`
  }
  const activity = url.match(/activity-(\d{15,})/i)
  if (activity) {
    return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activity[1]}`
  }
  return null
}
