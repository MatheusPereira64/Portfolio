/**
 * O LinkedIn bloqueia leitura automática dos posts em sites estáticos.
 * Para cada publicação: LinkedIn → ⋯ → Copiar link para a publicação.
 * A prévia (imagem + título) é buscada via microlink.io na hora.
 */
export const LINKEDIN_POSTS = [
  {
    id: 1,
    linkedinUrl: 'https://www.linkedin.com/in/matheus-pereira64/recent-activity/all/',
    date: '2026-06-01',
    category: { pt: 'Indústria 4.0', en: 'Industry 4.0', es: 'Industria 4.0' },
    title: {
      pt: 'PD&I e Indústria 4.0 no ITEGAM',
      en: 'R&D and Industry 4.0 at ITEGAM',
      es: 'I+D e Industria 4.0 en ITEGAM',
    },
    excerpt: {
      pt: 'Acompanhe no LinkedIn as publicações sobre sistemas industriais, IoT e transformação digital.',
      en: 'Follow LinkedIn posts on industrial systems, IoT, and digital transformation.',
      es: 'Sigue en LinkedIn las publicaciones sobre sistemas industriales, IoT y transformación digital.',
    },
  },
  {
    id: 2,
    linkedinUrl: 'https://www.linkedin.com/in/matheus-pereira64/recent-activity/all/',
    date: '2026-04-15',
    category: { pt: 'OEE', en: 'OEE', es: 'OEE' },
    title: {
      pt: 'OEE, FPY e qualidade em tempo real',
      en: 'OEE, FPY and quality in real time',
      es: 'OEE, FPY y calidad en tiempo real',
    },
    excerpt: {
      pt: 'Dashboards e indicadores de chão de fábrica — veja as publicações no perfil.',
      en: 'Shop-floor dashboards and KPIs — see the posts on the profile.',
      es: 'Dashboards e indicadores de planta — ver las publicaciones en el perfil.',
    },
  },
  {
    id: 3,
    linkedinUrl: 'https://www.linkedin.com/in/matheus-pereira64/recent-activity/all/',
    date: '2026-02-20',
    category: { pt: 'Vue / React', en: 'Vue / React', es: 'Vue / React' },
    title: {
      pt: 'Frontend industrial com Vue.js e React',
      en: 'Industrial frontend with Vue.js and React',
      es: 'Frontend industrial con Vue.js y React',
    },
    excerpt: {
      pt: 'Interfaces, TypeScript e APIs para monitoramento industrial. Abra o LinkedIn para ler.',
      en: 'UIs, TypeScript, and APIs for industrial monitoring. Open LinkedIn to read.',
      es: 'Interfaces, TypeScript y APIs para monitoreo industrial. Abre LinkedIn para leer.',
    },
  },
  {
    id: 4,
    linkedinUrl: 'https://www.linkedin.com/in/matheus-pereira64/recent-activity/all/',
    date: '2025-11-10',
    category: { pt: 'Carreira', en: 'Career', es: 'Carrera' },
    title: {
      pt: 'Full Stack Software Engineer',
      en: 'Full Stack Software Engineer',
      es: 'Full Stack Software Engineer',
    },
    excerpt: {
      pt: 'Atualizações de carreira, projetos e certificações CRPC-INPI no LinkedIn.',
      en: 'Career updates, projects, and CRPC-INPI certificates on LinkedIn.',
      es: 'Actualizaciones de carrera, proyectos y certificados CRPC-INPI en LinkedIn.',
    },
  },
]

export function getLocalizedField(field, language) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[language] || field.en || field.pt || ''
}
