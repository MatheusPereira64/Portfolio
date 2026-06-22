import { SITE_PROFILE, CV_FILENAME } from '../constants/siteProfile'

export const ASSISTANT_PERSONA = {
  name: { pt: 'Assistente do Portfólio', en: 'Portfolio Assistant', es: 'Asistente del Portafolio' },
}

export const SKILLS = [
  { name: 'JavaScript', percentage: 95 },
  { name: 'TypeScript', percentage: 88 },
  { name: 'React', percentage: 95 },
  { name: 'PHP', percentage: 90 },
  { name: 'Data Visualization', percentage: 92 },
  { name: 'ECharts', percentage: 90 },
  { name: 'Requirements Analysis', percentage: 90 },
  { name: 'Project Management', percentage: 88 },
  { name: 'Industry 4.0', percentage: 88 },
  { name: 'Node.js', percentage: 90 },
  { name: 'HTML/CSS', percentage: 95 },
  { name: 'SQL', percentage: 85 },
  { name: 'REST APIs', percentage: 88 },
  { name: 'Agile/Scrum', percentage: 85 },
  { name: 'Python', percentage: 85 },
  { name: 'Vue.js', percentage: 80 },
  { name: 'MongoDB', percentage: 80 },
  { name: 'Docker', percentage: 78 },
  { name: 'Git', percentage: 85 },
  { name: 'AWS', percentage: 72 },
  { name: 'Spring Boot', percentage: 75 },
  { name: 'CI/CD', percentage: 80 },
]

const knowledge = {
  pt: {
    greeting:
      'Olá! Sou o assistente do portfólio de Matheus Pereira — engenheiro de software com foco em React, Industry 4.0 e gestão de projetos. Pergunte sobre experiência, projetos industriais ou contacto.',
    professionalSummary:
      'Engenheiro de Computação e Engenheiro de Software com experiência em desenvolvimento frontend, gestão de projetos, transformação digital industrial e soluções Industry 4.0. Especializado em React, TypeScript, JavaScript, dashboards industriais, sistemas de relatórios e plataformas de monitoramento de produção. Experiência em liderar projetos, levantamento de requisitos e entrega de software da concepção ao deploy.',
    specializations: [
      'Engenharia Frontend',
      'Desenvolvimento React',
      'Gestão de Projetos',
      'Industry 4.0',
      'Manufacturing Execution Systems (MES)',
      'Dashboards Industriais',
      'Sistemas de Monitoramento de Produção',
      'Visualização de Dados',
      'Análise de Requisitos',
      'Transformação Digital',
      'Aplicações de Inteligência Artificial',
    ],
    careerGoals:
      'Busca oportunidades como Frontend Software Engineer, Full Stack Developer, Technical Project Manager ou Industry 4.0 Software Engineer, aplicando tecnologia para melhorar experiências de utilizador, processos de negócio e operações industriais.',
    faq: {
      currentRole:
        'Matheus atua como Software Engineer e Project Manager, focado em aplicações web, soluções Industry 4.0 e projetos de transformação digital — incluindo projetos de pesquisa no ITEGAM.',
      preferredStack:
        'Stack principal: React, TypeScript, JavaScript, PHP, SQL, REST APIs, Git e tecnologias frontend modernas.',
      industryExperience:
        'Experiência em sistemas para ambientes de manufatura, monitoramento de produção, controlo de qualidade e otimização de processos industriais.',
      remoteWork:
        'Aberto a oportunidades remotas internacionais e posições de software engineering no exterior.',
      leadership:
        'Experiência em gestão de projetos de software, levantamento de requisitos, coordenação de stakeholders e liderança de iniciativas de desenvolvimento.',
    },
    availability: {
      openToWork: true,
      status:
        'Aberto a oportunidades internacionais (remoto) — Frontend, Full Stack, Technical PM ou Industry 4.0.',
      location: 'Manaus, Amazonas — Brasil',
      workModes: ['Remoto (internacional)', 'Híbrido', 'Presencial (Manaus)'],
      salaryNote:
        'Faixas salariais são tratadas em conversa direta — use o formulário de contacto ou WhatsApp.',
    },
    experience: [
      {
        period: '2024 — Atual',
        title: 'Software Engineer & Project Manager',
        company: 'Projetos de Pesquisa ITEGAM',
        summary:
          'Desenvolvimento de soluções Industry 4.0, sistemas inteligentes de monitoramento, aplicações com IA, dashboards industriais e projetos de transformação digital.',
        technologies: ['React', 'TypeScript', 'JavaScript', 'PHP', 'SQL', 'REST APIs', 'AI', 'Industry 4.0'],
      },
      {
        period: '2024 — Atual',
        title: 'Desenvolvedor Full Stack',
        company: 'Projetos Pessoais e Freelancer',
        summary:
          'Aplicações web com React, Node.js, APIs REST e integrações (EmailJS, GitHub Pages).',
        technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express', 'Git'],
      },
      {
        period: '2023 — 2024',
        title: 'Estudante de Análise e Desenvolvimento de Sistemas',
        company: 'ITEGAM',
        summary: 'Projetos académicos, metodologias ágeis, estruturas de dados e engenharia de software.',
        technologies: ['JavaScript', 'Python', 'Java', 'SQL', 'HTML/CSS'],
      },
      {
        period: '2022 — 2023',
        title: 'Desenvolvedor Frontend Júnior',
        company: 'Projetos Académicos',
        summary: 'Interfaces responsivas com HTML5, CSS3, JavaScript e React.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Git'],
      },
    ],
    education: [
      { title: 'Bacharelado em Engenharia da Computação', institution: 'FAMETRO', period: '2019 — 2024' },
      { title: 'Análise e Desenvolvimento de Sistemas', institution: 'ITEGAM', period: '2023 — 2024' },
      { title: 'Inglês Fluente — C1', institution: 'ICBEU', period: '2018' },
      { title: 'Lógica e Programação WEB — Full Stack', institution: 'Flexpeak', period: '2023' },
    ],
    languages: [
      { name: 'Português', level: 'Nativo' },
      { name: 'Inglês', level: 'Fluente (C1 — ICBEU)' },
      { name: 'Espanhol', level: 'Intermediário (site trilingue)' },
    ],
    projects: [
      {
        name: 'Sistema Inteligente de Monitoramento de Produção',
        stack: ['React', 'TypeScript', 'Charts', 'Industrial Data'],
        problem:
          'Plataforma de monitoramento e analytics de produção em tempo real para ambientes Industry 4.0.',
      },
      {
        name: 'Otimização de Parâmetros de Máquinas com IA',
        stack: ['Artificial Intelligence', 'React', 'Data Analysis'],
        problem:
          'Sistema inteligente para otimizar parâmetros de máquinas e melhorar a eficiência de manufatura.',
      },
      {
        name: 'Plataforma Industrial de Relatórios de Qualidade',
        stack: ['React', 'ECharts', 'SQL', 'Data Visualization'],
        problem:
          'Dashboard e relatórios para análise de defeitos e monitoramento da qualidade de produção.',
      },
      {
        name: 'Portfólio Profissional (este site)',
        stack: ['React', 'Vite', 'EmailJS', 'GitHub Pages', 'CSS3'],
        problem: 'Apresentar perfil, projetos e contacto de forma moderna, multilingue e responsiva.',
        url: SITE_PROFILE.portfolioUrl,
        repo: `${SITE_PROFILE.github}/Portfolio`,
      },
      {
        name: 'Repositórios no GitHub',
        stack: ['JavaScript', 'React', 'Node.js', 'Python', 'PHP'],
        problem: 'Mais projetos académicos, industriais e pessoais — consulte o perfil GitHub.',
        url: SITE_PROFILE.github,
        repo: SITE_PROFILE.github,
      },
    ],
    blogNote:
      'Artigos e publicações estão no LinkedIn. Posso indicar o perfil ou abrir a secção Blog.',
  },
  en: {
    greeting:
      "Hi! I'm Matheus Pereira's portfolio assistant — software engineer focused on React, Industry 4.0, and project management. Ask about experience, industrial projects, or how to get in touch.",
    professionalSummary:
      'Computer Engineer and Software Engineer with experience in frontend development, project management, industrial digital transformation, and Industry 4.0 solutions. Specialized in React, TypeScript, JavaScript, industrial dashboards, reporting systems, and production monitoring platforms. Experienced in leading projects, gathering requirements, and delivering software solutions from conception to deployment.',
    specializations: [
      'Frontend Engineering',
      'React Development',
      'Project Management',
      'Industry 4.0',
      'Manufacturing Execution Systems (MES)',
      'Industrial Dashboards',
      'Production Monitoring Systems',
      'Data Visualization',
      'Requirements Analysis',
      'Digital Transformation',
      'Artificial Intelligence Applications',
    ],
    careerGoals:
      'Seeking Frontend Software Engineer, Full Stack Developer, Technical Project Manager, or Industry 4.0 Software Engineer opportunities where technology can be leveraged to improve user experiences, business processes, and industrial operations.',
    faq: {
      currentRole:
        'Matheus works as a Software Engineer and Project Manager focused on web applications, Industry 4.0 solutions, and digital transformation projects — including research projects at ITEGAM.',
      preferredStack:
        'His primary stack includes React, TypeScript, JavaScript, PHP, SQL, REST APIs, Git, and modern frontend technologies.',
      industryExperience:
        'He has experience developing systems for manufacturing environments, production monitoring, quality control, and industrial process optimization.',
      remoteWork:
        'Matheus is open to remote opportunities worldwide and is actively pursuing international software engineering positions.',
      leadership:
        'He has experience managing software projects, gathering requirements, coordinating stakeholders, and leading development initiatives.',
    },
    availability: {
      openToWork: true,
      status:
        'Open to international remote opportunities — Frontend, Full Stack, Technical PM, or Industry 4.0 roles.',
      location: 'Manaus, Amazonas — Brazil',
      workModes: ['Remote (worldwide)', 'Hybrid', 'On-site (Manaus)'],
      salaryNote: 'Salary expectations are discussed directly — use the contact form or WhatsApp.',
    },
    experience: [
      {
        period: '2024 — Present',
        title: 'Software Engineer & Project Manager',
        company: 'ITEGAM Research Projects',
        summary:
          'Development of Industry 4.0 solutions, intelligent monitoring systems, AI-powered applications, industrial dashboards, and digital transformation projects.',
        technologies: ['React', 'TypeScript', 'JavaScript', 'PHP', 'SQL', 'REST APIs', 'AI', 'Industry 4.0'],
      },
      {
        period: '2024 — Present',
        title: 'Full Stack Developer',
        company: 'Personal Projects & Freelancer',
        summary: 'Web apps with React, Node.js, REST APIs, and integrations (EmailJS, GitHub Pages).',
        technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express', 'Git'],
      },
      {
        period: '2023 — 2024',
        title: 'Systems Analysis and Development Student',
        company: 'ITEGAM',
        summary: 'Academic projects, agile methods, data structures, and software engineering.',
        technologies: ['JavaScript', 'Python', 'Java', 'SQL', 'HTML/CSS'],
      },
      {
        period: '2022 — 2023',
        title: 'Junior Frontend Developer',
        company: 'Academic Projects',
        summary: 'Responsive interfaces with HTML5, CSS3, JavaScript, and React.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Git'],
      },
    ],
    education: [
      { title: 'Bachelor of Computer Engineering', institution: 'FAMETRO', period: '2019 — 2024' },
      { title: 'Systems Analysis and Development', institution: 'ITEGAM', period: '2023 — 2024' },
      { title: 'Fluent English — C1', institution: 'ICBEU', period: '2018' },
      { title: 'WEB Logic and Programming — Full Stack', institution: 'Flexpeak', period: '2023' },
    ],
    languages: [
      { name: 'Portuguese', level: 'Native' },
      { name: 'English', level: 'Fluent (C1 — ICBEU)' },
      { name: 'Spanish', level: 'Intermediate (trilingual site)' },
    ],
    projects: [
      {
        name: 'Intelligent Production Monitoring System',
        stack: ['React', 'TypeScript', 'Charts', 'Industrial Data'],
        problem:
          'Real-time production monitoring and analytics platform for Industry 4.0 environments.',
      },
      {
        name: 'AI-Powered Machine Parameter Optimization',
        stack: ['Artificial Intelligence', 'React', 'Data Analysis'],
        problem:
          'Intelligent system designed to optimize machine parameters and improve manufacturing efficiency.',
      },
      {
        name: 'Industrial Quality Reporting Platform',
        stack: ['React', 'ECharts', 'SQL', 'Data Visualization'],
        problem:
          'Dashboard and reporting platform used for defect analysis and production quality monitoring.',
      },
      {
        name: 'Professional Portfolio (this site)',
        stack: ['React', 'Vite', 'EmailJS', 'GitHub Pages', 'CSS3'],
        problem: 'Showcase profile, projects, and contact in a modern, multilingual, responsive way.',
        url: SITE_PROFILE.portfolioUrl,
        repo: `${SITE_PROFILE.github}/Portfolio`,
      },
      {
        name: 'GitHub Repositories',
        stack: ['JavaScript', 'React', 'Node.js', 'Python', 'PHP'],
        problem: 'More academic, industrial, and personal projects — see the GitHub profile.',
        url: SITE_PROFILE.github,
        repo: SITE_PROFILE.github,
      },
    ],
    blogNote: 'Posts and articles are on LinkedIn. I can share the profile or open the Blog section.',
  },
  es: {
    greeting:
      '¡Hola! Soy el asistente del portafolio de Matheus Pereira — ingeniero de software enfocado en React, Industry 4.0 y gestión de proyectos. Pregunta sobre experiencia, proyectos industriales o contacto.',
    professionalSummary:
      'Ingeniero de Computación e Ingeniero de Software con experiencia en desarrollo frontend, gestión de proyectos, transformación digital industrial y soluciones Industry 4.0. Especializado en React, TypeScript, JavaScript, dashboards industriales, sistemas de informes y plataformas de monitoreo de producción. Experiencia liderando proyectos, recopilando requisitos y entregando software desde la concepción hasta el despliegue.',
    specializations: [
      'Ingeniería Frontend',
      'Desarrollo React',
      'Gestión de Proyectos',
      'Industry 4.0',
      'Manufacturing Execution Systems (MES)',
      'Dashboards Industriales',
      'Sistemas de Monitoreo de Producción',
      'Visualización de Datos',
      'Análisis de Requisitos',
      'Transformación Digital',
      'Aplicaciones de Inteligencia Artificial',
    ],
    careerGoals:
      'Busca oportunidades como Frontend Software Engineer, Full Stack Developer, Technical Project Manager o Industry 4.0 Software Engineer, aplicando tecnología para mejorar experiencias de usuario, procesos de negocio y operaciones industriales.',
    faq: {
      currentRole:
        'Matheus trabaja como Software Engineer y Project Manager, enfocado en aplicaciones web, soluciones Industry 4.0 y proyectos de transformación digital — incluyendo proyectos de investigación en ITEGAM.',
      preferredStack:
        'Stack principal: React, TypeScript, JavaScript, PHP, SQL, REST APIs, Git y tecnologías frontend modernas.',
      industryExperience:
        'Experiencia desarrollando sistemas para entornos de manufactura, monitoreo de producción, control de calidad y optimización de procesos industriales.',
      remoteWork:
        'Abierto a oportunidades remotas internacionales y posiciones de ingeniería de software en el exterior.',
      leadership:
        'Experiencia gestionando proyectos de software, recopilando requisitos, coordinando stakeholders y liderando iniciativas de desarrollo.',
    },
    availability: {
      openToWork: true,
      status:
        'Abierto a oportunidades remotas internacionales — Frontend, Full Stack, Technical PM o Industry 4.0.',
      location: 'Manaus, Amazonas — Brasil',
      workModes: ['Remoto (internacional)', 'Híbrido', 'Presencial (Manaus)'],
      salaryNote:
        'Las expectativas salariales se tratan en conversación directa — usa el formulario o WhatsApp.',
    },
    experience: [
      {
        period: '2024 — Actual',
        title: 'Software Engineer & Project Manager',
        company: 'Proyectos de Investigación ITEGAM',
        summary:
          'Desarrollo de soluciones Industry 4.0, sistemas de monitoreo inteligente, aplicaciones con IA, dashboards industriales y proyectos de transformación digital.',
        technologies: ['React', 'TypeScript', 'JavaScript', 'PHP', 'SQL', 'REST APIs', 'AI', 'Industry 4.0'],
      },
      {
        period: '2024 — Actual',
        title: 'Desarrollador Full Stack',
        company: 'Proyectos Personales y Freelancer',
        summary:
          'Aplicaciones web con React, Node.js, APIs REST e integraciones (EmailJS, GitHub Pages).',
        technologies: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Express', 'Git'],
      },
      {
        period: '2023 — 2024',
        title: 'Estudiante de Análisis y Desarrollo de Sistemas',
        company: 'ITEGAM',
        summary: 'Proyectos académicos, metodologías ágiles, estructuras de datos e ingeniería de software.',
        technologies: ['JavaScript', 'Python', 'Java', 'SQL', 'HTML/CSS'],
      },
      {
        period: '2022 — 2023',
        title: 'Desarrollador Frontend Junior',
        company: 'Proyectos Académicos',
        summary: 'Interfaces responsivas con HTML5, CSS3, JavaScript y React.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Git'],
      },
    ],
    education: [
      { title: 'Licenciatura en Ingeniería de Computación', institution: 'FAMETRO', period: '2019 — 2024' },
      { title: 'Análisis y Desarrollo de Sistemas', institution: 'ITEGAM', period: '2023 — 2024' },
      { title: 'Inglés Fluido — C1', institution: 'ICBEU', period: '2018' },
      { title: 'Lógica y Programación WEB — Full Stack', institution: 'Flexpeak', period: '2023' },
    ],
    languages: [
      { name: 'Portugués', level: 'Nativo' },
      { name: 'Inglés', level: 'Fluido (C1 — ICBEU)' },
      { name: 'Español', level: 'Intermedio (sitio trilingüe)' },
    ],
    projects: [
      {
        name: 'Sistema Inteligente de Monitoreo de Producción',
        stack: ['React', 'TypeScript', 'Charts', 'Industrial Data'],
        problem:
          'Plataforma de monitoreo y analytics de producción en tiempo real para entornos Industry 4.0.',
      },
      {
        name: 'Optimización de Parámetros de Máquinas con IA',
        stack: ['Artificial Intelligence', 'React', 'Data Analysis'],
        problem:
          'Sistema inteligente para optimizar parámetros de máquinas y mejorar la eficiencia de manufactura.',
      },
      {
        name: 'Plataforma Industrial de Informes de Calidad',
        stack: ['React', 'ECharts', 'SQL', 'Data Visualization'],
        problem:
          'Dashboard e informes para análisis de defectos y monitoreo de calidad de producción.',
      },
      {
        name: 'Portafolio Profesional (este sitio)',
        stack: ['React', 'Vite', 'EmailJS', 'GitHub Pages', 'CSS3'],
        problem: 'Presentar perfil, proyectos y contacto de forma moderna, multilingüe y responsiva.',
        url: SITE_PROFILE.portfolioUrl,
        repo: `${SITE_PROFILE.github}/Portfolio`,
      },
      {
        name: 'Repositorios en GitHub',
        stack: ['JavaScript', 'React', 'Node.js', 'Python', 'PHP'],
        problem: 'Más proyectos académicos, industriales y personales — consulta el perfil de GitHub.',
        url: SITE_PROFILE.github,
        repo: SITE_PROFILE.github,
      },
    ],
    blogNote: 'Artículos y publicaciones están en LinkedIn.',
  },
}

export function getKnowledge(language) {
  return knowledge[language] || knowledge.en
}

export function getCvHref() {
  return `${import.meta.env.BASE_URL}curriculo/${encodeURIComponent(CV_FILENAME)}`
}

export function getWhatsAppUrl() {
  return `https://wa.me/${SITE_PROFILE.phoneDigits}`
}

/** Text block injected into Gemini system prompt */
export function buildKnowledgeContext(language) {
  const k = getKnowledge(language)
  const skillsLine = SKILLS.map((s) => `${s.name} (${s.percentage}%)`).join(', ')
  const specLine = k.specializations.join(', ')
  const expBlock = k.experience
    .map(
      (e) =>
        `- ${e.period}: ${e.title} @ ${e.company}. ${e.summary} [${e.technologies.join(', ')}]`
    )
    .join('\n')
  const eduBlock = k.education
    .map((e) => `- ${e.title}, ${e.institution} (${e.period})`)
    .join('\n')
  const langBlock = k.languages.map((l) => `- ${l.name}: ${l.level}`).join('\n')
  const projBlock = k.projects
    .map((p) => {
      const urlPart = p.url ? ` URL: ${p.url}` : ''
      const repoPart = p.repo ? ` Repo: ${p.repo}` : ''
      return `- ${p.name}: ${p.problem} Stack: ${p.stack.join(', ')}.${urlPart}${repoPart}`
    })
    .join('\n')

  return `
Name: ${SITE_PROFILE.fullName}
Email: ${SITE_PROFILE.email}
Phone: ${SITE_PROFILE.phoneDisplayEn} (${SITE_PROFILE.phoneDigits})
LinkedIn: ${SITE_PROFILE.linkedin}
GitHub: ${SITE_PROFILE.github}
Portfolio: ${SITE_PROFILE.portfolioUrl}
CV PDF: ${getCvHref()}

Professional summary:
${k.professionalSummary}

Specializations: ${specLine}

Career goals:
${k.careerGoals}

FAQ — Current role: ${k.faq.currentRole}
FAQ — Preferred stack: ${k.faq.preferredStack}
FAQ — Industry experience: ${k.faq.industryExperience}
FAQ — Remote work: ${k.faq.remoteWork}
FAQ — Leadership: ${k.faq.leadership}

Availability: ${k.availability.status}
Location: ${k.availability.location}
Work modes: ${k.availability.workModes.join(', ')}
${k.availability.salaryNote}

Skills: ${skillsLine}

Experience:
${expBlock}

Education:
${eduBlock}

Languages:
${langBlock}

Projects:
${projBlock}

Blog: ${k.blogNote}
`.trim()
}

export function buildSystemPrompt(language) {
  const langInstruction =
    language === 'pt'
      ? 'Responda sempre em português do Brasil.'
      : language === 'es'
        ? 'Responda siempre en español.'
        : 'Always respond in English.'

  return `You are ${ASSISTANT_PERSONA.name[language] || ASSISTANT_PERSONA.en}, a friendly virtual assistant on Matheus Pereira's portfolio website.
${langInstruction}
Use ONLY the facts below. If something is not listed, say you don't have that detail and suggest contact or LinkedIn.
Be concise (2–4 short paragraphs max). When relevant, mention links (LinkedIn, GitHub, portfolio, CV).
Highlight Industry 4.0, industrial dashboards, and project management experience when relevant.
Do not invent projects, employers, or salary figures.

${buildKnowledgeContext(language)}`
}
