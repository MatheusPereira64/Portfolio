/** Projetos do perfil LinkedIn — Indústria 4.0 */
export const PROJECTS = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80',
    title: {
      pt: 'Sistema Inteligente de Manufatura (IoT)',
      en: 'Smart Manufacturing System (IoT)',
      es: 'Sistema Inteligente de Manufactura (IoT)',
    },
    description: {
      pt: 'Solução para Indústria 4.0 com monitoramento e otimização de processos produtivos, integração IoT, coleta de dados em tempo real e mineração de dados para KPIs operacionais.',
      en: 'Industry 4.0 solution for monitoring and optimizing production processes, with IoT integration, real-time data collection, and data mining for operational KPIs.',
      es: 'Solución para Industria 4.0 con monitoreo y optimización de procesos productivos, integración IoT, recolección de datos en tiempo real y minería de datos para KPIs operativos.',
    },
    technologies: [
      'Vue.js',
      'TypeScript',
      'PostgreSQL',
      'Python',
      'IoT',
      'Data Analytics',
      'Industry 4.0',
    ],
    certificate: 'certificado-crpc-inpi-01.pdf',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=400&q=80',
    title: {
      pt: 'Parametrização de Máquinas com IA',
      en: 'AI Machine Parameterization System',
      es: 'Parametrización de Máquinas con IA',
    },
    description: {
      pt: 'Solução com Inteligência Artificial para parametrização e otimização de máquinas industriais, redução de falhas, automação e tomada de decisão orientada por dados.',
      en: 'AI-powered solution for industrial machine parameterization and optimization, reducing failures, enabling automation, and supporting data-driven decision-making.',
      es: 'Solución con Inteligencia Artificial para parametrización y optimización de máquinas industriales, reducción de fallas, automatización y decisiones basadas en datos.',
    },
    technologies: [
      'Python',
      'TypeScript',
      'PostgreSQL',
      'Machine Learning',
      'Data Analytics',
      'Industry 4.0',
    ],
    certificate: 'certificado-crpc-inpi-02.pdf',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
    title: {
      pt: 'Monitoramento de Produção em Tempo Real',
      en: 'Real-Time Production Monitoring UI',
      es: 'Monitoreo de Producción en Tiempo Real',
    },
    description: {
      pt: 'Interface front-end com dashboards e visualizações para acompanhamento de indicadores produtivos em tempo real e suporte à tomada de decisão na manufatura inteligente.',
      en: 'Front-end interface with dashboards and data visualizations for real-time production indicators and decision support in smart manufacturing.',
      es: 'Interfaz front-end con dashboards y visualizaciones para seguimiento de indicadores productivos en tiempo real y apoyo a la toma de decisiones.',
    },
    technologies: [
      'Vue.js',
      'TypeScript',
      'PostgreSQL',
      'Dashboards',
      'Data Visualization',
      'Industry 4.0',
    ],
    certificate: 'certificado-crpc-inpi-03.pdf',
  },
]

export function getProjectCertificateHref(filename) {
  if (!filename) return null
  return `${import.meta.env.BASE_URL}certificados/${encodeURIComponent(filename)}`
}

export function getLocalizedField(field, language) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[language] || field.en || field.pt || ''
}
