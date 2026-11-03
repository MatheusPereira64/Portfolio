/** Projetos em destaque — Indústria 4.0 (ITEGAM / CRPC-INPI) e repositórios públicos.
 *  Para ligar um card a um repositório: github: 'NomeDoRepo'
 *  ou github: 'https://github.com/MatheusPereira64/NomeDoRepo'
 *
 *  `demo`: só URL de deploy confirmada (responde 200). Sem deploy, deixe de fora.
 *  `image`: em public/images/projects (npm run projects:images). Sem `image`, usa o placeholder.
 *  `imageKind: 'mock'`: ilustração, não é tela real; o card mostra o selo "Ilustração".
 *  `impact`: resultado com número, sempre o mesmo declarado no currículo.
 *  `slug`: só para quem tem estudo de caso (`problem`, `contribution`, `results`).
 *
 *  Papel no estudo de caso reaproveita `contribution`.
 *  TODO: período real (Matheus fornece) — campo `period` ({ pt, en, es } ou string)
 *  TODO: decisões técnicas (Matheus fornece) — campo `decisions` ({ pt, en, es } ou string)
 */
export const PROJECTS = [
  {
    id: 1,
    slug: 'sistema-inteligente-de-manufatura',
    impact: {
      value: '40%',
      label: {
        pt: 'menos tempo para gerar relatórios',
        en: 'less time to generate reports',
        es: 'menos tiempo para generar informes',
      },
    },
    category: {
      pt: 'Indústria 4.0',
      en: 'Industry 4.0',
      es: 'Industria 4.0',
    },
    image: 'images/projects/manufatura.webp',
    imageKind: 'mock',
    screenshots: [],
    period: null,
    decisions: null,
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
    problem: {
      pt: 'O chão de fábrica precisava unificar dados de equipamentos e processos para enxergar gargalos e tomar decisão em tempo real.',
      en: 'The shop floor needed unified equipment and process data to spot bottlenecks and decide in real time.',
      es: 'El piso de planta necesitaba unificar datos de equipos y procesos para ver cuellos de botella y decidir en tiempo real.',
    },
    contribution: {
      pt: 'Desenvolvimento full stack da plataforma: frontend, APIs, integração IoT, coleta em tempo real e mineração de dados para KPIs operacionais.',
      en: 'Full-stack delivery of the platform: frontend, APIs, IoT integration, real-time collection, and data mining for operational KPIs.',
      es: 'Entrega full stack de la plataforma: frontend, APIs, integración IoT, recolección en tiempo real y minería de datos para KPIs.',
    },
    results: {
      pt: 'Visão unificada da produção, indicadores operacionais em tempo real e base para otimização contínua do processo.',
      en: 'Unified production visibility, real-time operational indicators, and a foundation for continuous process optimization.',
      es: 'Visión unificada de la producción, indicadores en tiempo real y base para la optimización continua.',
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
    slug: 'parametrizacao-de-maquinas-com-ia',
    impact: {
      value: '90%',
      label: {
        pt: 'de melhoria na precisão dos processos',
        en: 'improvement in process accuracy',
        es: 'de mejora en la precisión de los procesos',
      },
    },
    category: {
      pt: 'Indústria 4.0',
      en: 'Industry 4.0',
      es: 'Industria 4.0',
    },
    image: 'images/projects/parametrizacao.webp',
    imageKind: 'mock',
    screenshots: [],
    period: null,
    decisions: null,
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
    problem: {
      pt: 'Ajustes manuais de máquina geravam variação de qualidade, retrabalho e tempo parado.',
      en: 'Manual machine tuning caused quality variation, rework, and downtime.',
      es: 'Los ajustes manuales de máquina generaban variación de calidad, retrabajo y paradas.',
    },
    contribution: {
      pt: 'Implementação de pipelines de dados e modelos para sugerir parâmetros, além da interface e APIs usadas pela operação.',
      en: 'Built data pipelines and models to suggest parameters, plus the UI and APIs used by operations.',
      es: 'Implementé pipelines de datos y modelos para sugerir parámetros, además de la UI y las APIs de operación.',
    },
    results: {
      pt: 'Parametrização assistida por dados, menos falhas e decisão mais rápida no setup das máquinas.',
      en: 'Data-assisted parameterization, fewer failures, and faster machine-setup decisions.',
      es: 'Parametrización asistida por datos, menos fallas y decisiones más rápidas en el setup.',
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
    slug: 'monitoramento-de-producao',
    impact: {
      value: '90%',
      label: {
        pt: 'de melhoria na eficiência do monitoramento',
        en: 'improvement in monitoring efficiency',
        es: 'de mejora en la eficiencia del monitoreo',
      },
    },
    category: {
      pt: 'Indústria 4.0',
      en: 'Industry 4.0',
      es: 'Industria 4.0',
    },
    image: 'images/projects/monitoramento.webp',
    imageKind: 'mock',
    screenshots: [],
    period: null,
    decisions: null,
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
    problem: {
      pt: 'Indicadores como OEE, FPY e qualidade ficavam espalhados em planilhas e sistemas desconectados.',
      en: 'KPIs such as OEE, FPY, and quality lived in spreadsheets and disconnected systems.',
      es: 'Indicadores como OEE, FPY y calidad estaban en hojas y sistemas desconectados.',
    },
    contribution: {
      pt: 'Construção dos dashboards, visualizações e integração com a API de dados industriais para atualização em tempo real.',
      en: 'Built the dashboards, visualizations, and industrial-data API integration for real-time updates.',
      es: 'Construí dashboards, visualizaciones e integración con la API de datos industriales en tiempo real.',
    },
    results: {
      pt: 'Acompanhamento de OEE, FPY, produtividade e qualidade em uma única interface para a operação.',
      en: 'OEE, FPY, productivity, and quality tracked in a single interface for operations.',
      es: 'Seguimiento de OEE, FPY, productividad y calidad en una sola interfaz.',
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
  {
    id: 4,
    image: 'images/projects/cunoku.webp',
    demo: 'https://cunoku.cunokugame.workers.dev/',
    github: 'CunokuGame',
    title: {
      pt: 'Cunoku',
      en: 'Cunoku',
      es: 'Cunoku',
    },
    category: {
      pt: 'Jogo de cartas · PWA',
      en: 'Card game · PWA',
      es: 'Juego de cartas · PWA',
    },
    description: {
      pt: 'Jogo de cartas original inspirado na cultura e na estética japonesas, com regras próprias. Dá para criar ou entrar em salas, usar a fila rápida e jogar contra bots.',
      en: 'Original card game inspired by Japanese culture and aesthetics, with its own rules. Create or join rooms, use the quick queue, or play against bots.',
      es: 'Juego de cartas original inspirado en la cultura y la estética japonesas, con reglas propias. Permite crear o unirse a salas, usar la cola rápida y jugar contra bots.',
    },
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Cloudflare Workers', 'PostgreSQL'],
  },
  {
    id: 5,
    image: 'images/projects/nexo-assist.webp',
    imageKind: 'mock',
    github: 'Project-Nexo-Assist-',
    title: {
      pt: 'Nexo Assist',
      en: 'Nexo Assist',
      es: 'Nexo Assist',
    },
    category: {
      pt: 'Agente de IA · Service desk',
      en: 'AI agent · Service desk',
      es: 'Agente de IA · Service desk',
    },
    description: {
      pt: 'Protótipo de agente para service desk de TI. Consulta a central de ajuda e os chamados, pede confirmação antes de gravar e passa a conversa para um analista quando a regra manda.',
      en: 'Prototype agent for an IT service desk. It checks the help center and tickets, asks for confirmation before saving, and hands the conversation to an analyst when the rules require it.',
      es: 'Prototipo de agente para service desk de TI. Consulta la central de ayuda y los tickets, pide confirmación antes de guardar y pasa la conversación a un analista cuando la regla lo exige.',
    },
    technologies: ['Next.js', 'TypeScript', 'Mastra', 'SQLite', 'Drizzle ORM'],
  },
  {
    id: 6,
    image: 'images/projects/mp-agenda.webp',
    github: 'PWA-AGENDAMENTO',
    title: {
      pt: 'MP Agenda',
      en: 'MP Agenda',
      es: 'MP Agenda',
    },
    category: {
      pt: 'PWA · Agendamento online',
      en: 'PWA · Online booking',
      es: 'PWA · Reservas en línea',
    },
    description: {
      pt: 'Agendamento online para salões, barbearias, clínicas e autônomos. O cliente marca um horário real e o negócio acompanha a agenda, os clientes e a receita estimada.',
      en: 'Online booking for salons, barbershops, clinics, and freelancers. Customers pick a real time slot and the business tracks its schedule, customers, and estimated revenue.',
      es: 'Reservas en línea para salones, barberías, clínicas y autónomos. El cliente elige un horario real y el negocio sigue su agenda, sus clientes y los ingresos estimados.',
    },
    technologies: ['React', 'TypeScript', 'Vite', 'Express', 'Prisma', 'PostgreSQL'],
  },
  {
    id: 7,
    image: 'images/projects/fintrack.webp',
    imageKind: 'mock',
    github: 'Fintrack',
    title: {
      pt: 'FinTrack',
      en: 'FinTrack',
      es: 'FinTrack',
    },
    category: {
      pt: 'App Android · Finanças pessoais',
      en: 'Android app · Personal finance',
      es: 'App Android · Finanzas personales',
    },
    description: {
      pt: 'App Android que lê as notificações bancárias, identifica tipo, valor e banco de cada transação e registra tudo automaticamente em um banco local.',
      en: 'Android app that reads bank notifications, identifies each transaction type, amount, and bank, and records everything automatically in a local database.',
      es: 'App Android que lee las notificaciones bancarias, identifica tipo, valor y banco de cada transacción y lo registra todo automáticamente en una base local.',
    },
    technologies: ['React Native', 'TypeScript', 'Zustand', 'SQLite'],
  },
  {
    id: 8,
    image: 'images/projects/wincare.webp',
    github: 'WinCare',
    title: {
      pt: 'WinCare',
      en: 'WinCare',
      es: 'WinCare',
    },
    category: {
      pt: 'App desktop · Windows',
      en: 'Desktop app · Windows',
      es: 'App de escritorio · Windows',
    },
    description: {
      pt: 'Central de manutenção do Windows que reúne diagnóstico, reparo, limpeza e monitoramento em um só app, sem precisar abrir o CMD ou o PowerShell.',
      en: 'Windows maintenance hub that brings diagnostics, repair, cleanup, and monitoring into one app, with no need to open CMD or PowerShell.',
      es: 'Central de mantenimiento de Windows que reúne diagnóstico, reparación, limpieza y monitoreo en una sola app, sin abrir CMD ni PowerShell.',
    },
    technologies: ['Electron', 'React', 'TypeScript', 'Tailwind CSS'],
  },
]

export const GITHUB_USER = 'MatheusPereira64'

export const PROJECT_PLACEHOLDER = 'images/project-placeholder.svg'

export function getGithubOgImage(repoName, owner = GITHUB_USER) {
  return `https://opengraph.githubassets.com/1/${owner}/${repoName}`
}

export function getProjectImageSrc(image) {
  const value = image || PROJECT_PLACEHOLDER
  if (/^https?:/i.test(value)) return value
  return `${import.meta.env.BASE_URL}${value.replace(/^\//, '')}`
}

/** Aceita nome do repo (`WinCare`) ou URL (`https://github.com/user/repo`). */
export function getProjectGithubRepos(project) {
  const raw = project?.github
  if (!raw) return []
  const list = Array.isArray(raw) ? raw : [raw]
  return list
    .map((item) => {
      if (typeof item !== 'string' || !item.trim()) return null
      const value = item.trim()
      const remote = value.match(/github\.com\/([^/]+)\/([^/#?]+)/i)
      if (remote) {
        const owner = remote[1]
        const name = remote[2].replace(/\.git$/, '')
        return {
          name,
          url: `https://github.com/${owner}/${name}`,
          og: getGithubOgImage(name, owner),
        }
      }
      const name = value.replace(/\.git$/, '')
      return {
        name,
        url: `https://github.com/${GITHUB_USER}/${name}`,
        og: getGithubOgImage(name),
      }
    })
    .filter(Boolean)
}

export function getProjectCertificateHref(filename) {
  if (!filename) return null
  return `${import.meta.env.BASE_URL}certificados/${encodeURIComponent(filename)}`
}

export function getLocalizedField(field, language) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[language] || field.en || field.pt || ''
}

export function getProjectById(id) {
  return PROJECTS.find((project) => String(project.id) === String(id)) || null
}

export function getProjectBySlug(slug) {
  return PROJECTS.find((project) => project.slug === slug) || null
}
