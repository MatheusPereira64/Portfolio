import { SITE_PROFILE, getCvHref } from '../constants/siteProfile'
import { getPublishedPosts } from '../data/linkedinPosts'
import {
  getKnowledge,
  getWhatsAppUrl,
  SKILLS,
} from '../data/assistantKnowledge'
import { CERTIFICATIONS, getCertificateHref } from '../data/certifications'
import {
  PROJECTS,
  getLocalizedField,
  getProjectById,
  getProjectGithubRepos,
} from '../data/projects'
import { SERVICES } from '../data/services'
import { PROJECT_SHORT_NAMES } from './chatbotIntents'

const labels = {
  pt: {
    goProjects: 'Ver projetos no site',
    goSkills: 'Ver habilidades',
    goExperience: 'Ver experiência',
    goAbout: 'Sobre mim',
    goServices: 'Ver serviços',
    goEducation: 'Ver formação',
    goContact: 'Ir para contato',
    sendMessage: 'Enviar mensagem',
    downloadCv: 'Baixar CV (PDF)',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    blog: 'Ver posts no LinkedIn',
    openPortfolio: 'Abrir portfólio',
    defaultSuggest: ['Experiência', 'Projetos', 'WhatsApp', 'Currículo'],
    viewProject: 'Ver projeto',
    viewDetails: 'Ver detalhes',
    inpi: 'Software registrado no INPI.',
    projectsWord: 'Projetos',
  },
  en: {
    goProjects: 'View projects on site',
    goSkills: 'View skills',
    goExperience: 'View experience',
    goAbout: 'About me',
    goServices: 'View services',
    goEducation: 'View education',
    goContact: 'Go to contact',
    sendMessage: 'Send a message',
    downloadCv: 'Download CV (PDF)',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    blog: 'View posts on LinkedIn',
    openPortfolio: 'Open portfolio',
    defaultSuggest: ['Experience', 'Projects', 'WhatsApp', 'Résumé'],
    viewProject: 'View project',
    viewDetails: 'View details',
    inpi: 'Software registered at INPI.',
    projectsWord: 'Projects',
  },
  es: {
    goProjects: 'Ver proyectos en el sitio',
    goSkills: 'Ver habilidades',
    goExperience: 'Ver experiencia',
    goAbout: 'Sobre mí',
    goServices: 'Ver servicios',
    goEducation: 'Ver formación',
    goContact: 'Ir a contacto',
    sendMessage: 'Enviar mensaje',
    downloadCv: 'Descargar CV (PDF)',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    blog: 'Ver posts en LinkedIn',
    openPortfolio: 'Abrir portafolio',
    defaultSuggest: ['Experiencia', 'Proyectos', 'WhatsApp', 'CV'],
    viewProject: 'Ver proyecto',
    viewDetails: 'Ver detalles',
    inpi: 'Software registrado en el INPI.',
    projectsWord: 'Proyectos',
  },
}

function L(language, key) {
  return (labels[language] || labels.en)[key]
}

function cvDownloadLinks(language) {
  return [
    {
      type: 'link',
      label: language === 'pt' ? '📄 CV English' : language === 'es' ? '📄 CV en English' : '📄 CV in English',
      url: getCvHref('en'),
    },
    {
      type: 'link',
      label:
        language === 'pt'
          ? '📄 CV Português'
          : language === 'es'
            ? '📄 CV en Portugués'
            : '📄 CV in Portuguese',
      url: getCvHref('pt'),
    },
  ]
}

function contactLinks(language) {
  const phone =
    language === 'en' ? SITE_PROFILE.phoneDisplayEn : SITE_PROFILE.phoneDisplayPt
  return [
    { type: 'link', label: `📧 ${SITE_PROFILE.email}`, url: `mailto:${SITE_PROFILE.email}` },
    { type: 'link', label: `📱 ${phone}`, url: `tel:${SITE_PROFILE.phoneTel}` },
    { type: 'link', label: `💬 ${L(language, 'whatsapp')}`, url: getWhatsAppUrl() },
    { type: 'link', label: `🔗 ${L(language, 'linkedin')}`, url: SITE_PROFILE.linkedin },
    { type: 'link', label: `🔗 ${L(language, 'github')}`, url: SITE_PROFILE.github },
    { type: 'scroll', label: `📍 ${L(language, 'goContact')}`, section: 'contact' },
    {
      type: 'contact',
      label: `✉️ ${L(language, 'sendMessage')}`,
      subject:
        language === 'pt'
          ? 'Contato via portfólio'
          : language === 'es'
            ? 'Contacto vía portafolio'
            : 'Contact via portfolio',
    },
  ]
}

const builders = {
  contact: (language) => {
    const k = getKnowledge(language)
    return {
      text:
        language === 'pt'
          ? `Estes são os contatos de ${SITE_PROFILE.shortName}, em ${k.availability.location}:`
          : language === 'es'
            ? `Estos son los contactos de ${SITE_PROFILE.shortName}, en ${k.availability.location}:`
            : `Here is how to reach ${SITE_PROFILE.shortName}, based in ${k.availability.location}:`,
      links: contactLinks(language),
      suggestedReplies: labels[language]?.defaultSuggest || labels.en.defaultSuggest,
    }
  },

  cv: (language) => ({
    text:
      language === 'pt'
        ? 'Escolha o currículo em PDF (2026):'
        : language === 'es'
          ? 'Elige el currículum en PDF (2026):'
          : 'Choose a résumé PDF (2026):',
    links: [
      {
        type: 'link',
        label: language === 'pt' ? '📄 CV em English' : '📄 CV in English',
        url: getCvHref('en'),
      },
      {
        type: 'link',
        label: language === 'pt' ? '📄 CV em Português' : language === 'es' ? '📄 CV en Portugués' : '📄 CV in Portuguese',
        url: getCvHref('pt'),
      },
      { type: 'scroll', label: `📍 ${L(language, 'goContact')}`, section: 'contact' },
    ],
    suggestedReplies: ['LinkedIn', 'GitHub', 'WhatsApp'],
  }),

  linkedin: (language) => ({
    text:
      language === 'pt'
        ? 'Perfil profissional e publicações:'
        : language === 'es'
          ? 'Perfil profesional y publicaciones:'
          : 'Professional profile and posts:',
    links: [
      { type: 'link', label: `🔗 ${L(language, 'linkedin')}`, url: SITE_PROFILE.linkedin },
      {
        type: 'link',
        label: `📝 ${L(language, 'blog')}`,
        url: SITE_PROFILE.linkedinActivity,
      },
      ...(getPublishedPosts().length ? [{ type: 'scroll', label: '📝 Blog', section: 'blog' }] : []),
    ],
    suggestedReplies:
      language === 'pt'
        ? ['GitHub', 'Projetos', 'WhatsApp']
        : language === 'es'
          ? ['GitHub', 'Proyectos', 'WhatsApp']
          : ['GitHub', 'Projects', 'WhatsApp'],
  }),

  github: (language) => ({
    text:
      language === 'pt'
        ? 'Código-fonte e repositórios:'
        : language === 'es'
          ? 'Código fuente y repositorios:'
          : 'Source code and repositories:',
    links: [
      { type: 'link', label: `🔗 ${L(language, 'github')}`, url: SITE_PROFILE.github },
      {
        type: 'link',
        label: `🌐 ${L(language, 'openPortfolio')}`,
        url: SITE_PROFILE.portfolioUrl,
      },
      { type: 'scroll', label: `🚀 ${L(language, 'goProjects')}`, section: 'teams' },
    ],
    suggestedReplies:
      language === 'pt'
        ? ['Projetos', 'LinkedIn', 'Currículo']
        : language === 'es'
          ? ['Proyectos', 'LinkedIn', 'CV']
          : ['Projects', 'LinkedIn', 'Résumé'],
  }),

  whatsapp: (language) => ({
    text:
      language === 'pt'
        ? 'Você pode enviar uma mensagem direta pelo WhatsApp:'
        : language === 'es'
          ? 'Puedes enviar un mensaje directo por WhatsApp:'
          : 'You can send a direct WhatsApp message:',
    links: [
      { type: 'link', label: `💬 ${L(language, 'whatsapp')}`, url: getWhatsAppUrl() },
      { type: 'scroll', label: `✉️ ${L(language, 'sendMessage')}`, section: 'contact' },
    ],
    suggestedReplies: labels[language]?.defaultSuggest || labels.en.defaultSuggest,
  }),

  portfolio: (language) => ({
    text:
      language === 'pt'
        ? 'Este site é o portfólio online:'
        : language === 'es'
          ? 'Este sitio es el portafolio en línea:'
          : 'This site is the live portfolio:',
    links: [
      { type: 'link', label: `🌐 ${L(language, 'openPortfolio')}`, url: SITE_PROFILE.portfolioUrl },
      { type: 'scroll', label: `🚀 ${L(language, 'goProjects')}`, section: 'teams' },
    ],
    suggestedReplies:
      language === 'pt'
        ? ['Experiência', 'Tecnologias', 'Contato']
        : language === 'es'
          ? ['Experiencia', 'Tecnologías', 'Contacto']
          : ['Experience', 'Technologies', 'Contact'],
  }),

  projects: (language) => {
    const lines = PROJECTS.map(
      (project) => `• ${getLocalizedField(project.title, language)} (${getLocalizedField(project.category, language)})`
    ).join('\n')
    const intro =
      language === 'pt'
        ? 'Estes são os projetos de Matheus. Escolha um para saber mais:'
        : language === 'es'
          ? 'Estos son los proyectos de Matheus. Elige uno para saber más:'
          : "These are Matheus's projects. Pick one to learn more:"
    return {
      text: `${intro}\n\n${lines}`,
      links: [{ type: 'scroll', label: `🚀 ${L(language, 'goProjects')}`, section: 'teams' }],
      suggestedReplies: PROJECTS.map((project) => PROJECT_SHORT_NAMES[project.id].label),
    }
  },

  skills: (language) => {
    const top = SKILLS.map((s) => s.name).join(', ')
    const text =
      language === 'pt'
        ? `Tecnologias que uso:\n\n${top}\n\nEstão agrupadas na seção Sobre mim.`
        : language === 'es'
          ? `Tecnologías que uso:\n\n${top}\n\nEstán agrupadas en la sección Sobre.`
          : `Technologies I use:\n\n${top}\n\nThey are grouped in the About section.`
    return {
      text,
      links: [
        { type: 'scroll', label: `📊 ${L(language, 'goSkills')}`, section: 'skills' },
        { type: 'scroll', label: `💼 ${L(language, 'goExperience')}`, section: 'experience' },
      ],
      suggestedReplies:
        language === 'pt'
          ? ['Projetos', 'Experiência', 'Contato']
          : language === 'es'
            ? ['Proyectos', 'Experiencia', 'Contacto']
            : ['Projects', 'Experience', 'Contact'],
    }
  },

  about: (language) => {
    const k = getKnowledge(language)
    return {
      text: `${SITE_PROFILE.fullName}\n\n${k.professionalSummary}\n\n${k.availability.status}\n📍 ${k.availability.location}`,
      links: [
        { type: 'scroll', label: `👤 ${L(language, 'goAbout')}`, section: 'about' },
        ...cvDownloadLinks(language),
        { type: 'scroll', label: `📍 ${L(language, 'goContact')}`, section: 'contact' },
      ],
      suggestedReplies: labels[language]?.defaultSuggest || labels.en.defaultSuggest,
    }
  },

  experience: (language) => {
    const k = getKnowledge(language)
    const lines = k.experience
      .map((e) => `• ${e.period} — ${e.title} (${e.company})\n  ${e.summary}`)
      .join('\n\n')
    const text =
      language === 'pt'
        ? `Experiência profissional:\n\n${lines}`
        : language === 'es'
          ? `Experiencia profesional:\n\n${lines}`
          : `Professional experience:\n\n${lines}`
    return {
      text,
      links: [
        { type: 'scroll', label: `💼 ${L(language, 'goExperience')}`, section: 'experience' },
        { type: 'link', label: `🔗 ${L(language, 'linkedin')}`, url: SITE_PROFILE.linkedin },
      ],
      suggestedReplies:
        language === 'pt'
          ? ['Formação', 'Projetos', 'LinkedIn']
          : language === 'es'
            ? ['Formación', 'Proyectos', 'LinkedIn']
            : ['Education', 'Projects', 'LinkedIn'],
    }
  },

  education: (language) => {
    const k = getKnowledge(language)
    const lines = k.education
      .map((e) => `• ${e.title}\n  ${e.institution} (${e.period})`)
      .join('\n\n')
    const text =
      language === 'pt'
        ? `Formação acadêmica:\n\n${lines}`
        : language === 'es'
          ? `Formación académica:\n\n${lines}`
          : `Education:\n\n${lines}`
    return {
      text,
      links: [
        { type: 'scroll', label: `🎓 ${L(language, 'goEducation')}`, section: 'education' },
        ...cvDownloadLinks(language),
      ],
      suggestedReplies:
        language === 'pt'
          ? ['Experiência', 'Projetos', 'Contato']
          : language === 'es'
            ? ['Experiencia', 'Proyectos', 'Contacto']
            : ['Experience', 'Projects', 'Contact'],
    }
  },

  languages: (language) => {
    const k = getKnowledge(language)
    const lines = k.languages.map((l) => `• ${l.name}: ${l.level}`).join('\n')
    const text =
      language === 'pt'
        ? `Idiomas:\n\n${lines}`
        : language === 'es'
          ? `Idiomas:\n\n${lines}`
          : `Languages:\n\n${lines}`
    return {
      text,
      links: [{ type: 'scroll', label: `👤 ${L(language, 'goAbout')}`, section: 'about' }],
      suggestedReplies:
        language === 'pt'
          ? ['Experiência', 'Contato', 'WhatsApp']
          : language === 'es'
            ? ['Experiencia', 'Contacto', 'WhatsApp']
            : ['Experience', 'Contact', 'WhatsApp'],
    }
  },

  availability: (language) => {
    const k = getKnowledge(language)
    const modes = k.availability.workModes.join(', ')
    const text = `${k.availability.status}\n\n📍 ${k.availability.location}\n🌍 ${modes}\n\n${k.faq.remoteWork}\n\n${k.availability.salaryNote}`
    return {
      text,
      links: [
        { type: 'link', label: `💬 ${L(language, 'whatsapp')}`, url: getWhatsAppUrl() },
        {
          type: 'contact',
          label: `✉️ ${L(language, 'sendMessage')}`,
          subject:
            language === 'pt'
              ? 'Oportunidade profissional'
              : language === 'es'
                ? 'Oportunidad profesional'
                : 'Job opportunity',
        },
        ...cvDownloadLinks(language),
      ],
      suggestedReplies:
        language === 'pt'
          ? ['Experiência', 'Projetos', 'LinkedIn']
          : language === 'es'
            ? ['Experiencia', 'Proyectos', 'LinkedIn']
            : ['Experience', 'Projects', 'LinkedIn'],
    }
  },

  blog: (language) => {
    const k = getKnowledge(language)
    return {
      text: k.blogNote,
      links: [
        {
          type: 'link',
          label: `📝 ${L(language, 'blog')}`,
          url: SITE_PROFILE.linkedinActivity,
        },
        ...(getPublishedPosts().length ? [{ type: 'scroll', label: '📝 Blog', section: 'blog' }] : []),
        { type: 'link', label: `🔗 ${L(language, 'linkedin')}`, url: SITE_PROFILE.linkedin },
      ],
      suggestedReplies:
        language === 'pt'
          ? ['Projetos', 'GitHub', 'Contato']
          : language === 'es'
            ? ['Proyectos', 'GitHub', 'Contacto']
            : ['Projects', 'GitHub', 'Contact'],
    }
  },

  industry: (language) => {
    const k = getKnowledge(language)
    const specs = k.specializations.slice(0, 6).join(', ')
    return {
      text: `${k.faq.industryExperience}\n\n${language === 'pt' ? 'Especializações' : language === 'es' ? 'Especializaciones' : 'Specializations'}: ${specs}`,
      links: [
        { type: 'scroll', label: `🚀 ${L(language, 'goProjects')}`, section: 'teams' },
        { type: 'scroll', label: `💼 ${L(language, 'goExperience')}`, section: 'experience' },
      ],
      suggestedReplies:
        language === 'pt'
          ? ['Projetos', 'Experiência', 'Contato']
          : language === 'es'
            ? ['Proyectos', 'Experiencia', 'Contacto']
            : ['Projects', 'Experience', 'Contact'],
    }
  },

  leadership: (language) => {
    const k = getKnowledge(language)
    return {
      text: `${k.faq.leadership}\n\n${k.faq.currentRole}`,
      links: [
        { type: 'scroll', label: `💼 ${L(language, 'goExperience')}`, section: 'experience' },
        { type: 'link', label: `🔗 ${L(language, 'linkedin')}`, url: SITE_PROFILE.linkedin },
      ],
      suggestedReplies:
        language === 'pt'
          ? ['Projetos', 'Formação', 'Contato']
          : language === 'es'
            ? ['Proyectos', 'Formación', 'Contacto']
            : ['Projects', 'Education', 'Contact'],
    }
  },

  career: (language) => {
    const k = getKnowledge(language)
    return {
      text: `${k.careerGoals}\n\n${k.faq.remoteWork}`,
      links: [
        ...cvDownloadLinks(language),
        {
          type: 'contact',
          label: `✉️ ${L(language, 'sendMessage')}`,
          subject:
            language === 'pt'
              ? 'Oportunidade profissional'
              : language === 'es'
                ? 'Oportunidad profesional'
                : 'Job opportunity',
        },
      ],
      suggestedReplies:
        language === 'pt'
          ? ['Experiência', 'LinkedIn', 'WhatsApp']
          : language === 'es'
            ? ['Experiencia', 'LinkedIn', 'WhatsApp']
            : ['Experience', 'LinkedIn', 'WhatsApp'],
    }
  },

  message: (language) => ({
    text:
      language === 'pt'
        ? 'O formulário de contato está aqui:'
        : language === 'es'
          ? 'El formulario de contacto está aquí:'
          : 'The contact form is here:',
    links: [
      {
        type: 'contact',
        label: `✉️ ${L(language, 'sendMessage')}`,
        subject:
          language === 'pt'
            ? 'Mensagem via assistente do portfólio'
            : language === 'es'
              ? 'Mensaje vía asistente del portafolio'
              : 'Message via portfolio assistant',
        message:
          language === 'pt'
            ? 'Olá Matheus,\n\n'
            : language === 'es'
              ? 'Hola Matheus,\n\n'
              : 'Hi Matheus,\n\n',
      },
      { type: 'link', label: `💬 ${L(language, 'whatsapp')}`, url: getWhatsAppUrl() },
    ],
    suggestedReplies: [],
  }),

  services: (language) => {
    const lines = SERVICES.map((service) => `• ${getLocalizedField(service.title, language)}`).join('\n')
    const intro =
      language === 'pt'
        ? 'Estes são os serviços que Matheus oferece:'
        : language === 'es'
          ? 'Estos son los servicios que ofrece Matheus:'
          : 'These are the services Matheus offers:'
    return {
      text: `${intro}\n\n${lines}`,
      links: [{ type: 'scroll', label: `🛠️ ${L(language, 'goServices')}`, section: 'services' }],
      suggestedReplies: language === 'pt' ? ['Projetos', 'Contato'] : language === 'es' ? ['Proyectos', 'Contacto'] : ['Projects', 'Contact'],
    }
  },

  certifications: (language) => {
    const lines = CERTIFICATIONS.map(
      (cert) => `• ${getLocalizedField(cert.title, language)} (${cert.issuer}, ${cert.year})`
    ).join('\n')
    const heading = language === 'pt' ? 'Certificações:' : language === 'es' ? 'Certificaciones:' : 'Certifications:'
    return {
      text: `${heading}\n\n${lines}`,
      links: [{ type: 'scroll', label: `🎓 ${L(language, 'goAbout')}`, section: 'certifications' }],
      suggestedReplies: labels[language]?.defaultSuggest || labels.en.defaultSuggest,
    }
  },

  location: (language) => {
    const k = getKnowledge(language)
    return {
      text: `📍 ${k.availability.location}\n🌍 ${k.availability.workModes.join(', ')}`,
      links: [{ type: 'scroll', label: `📍 ${L(language, 'goContact')}`, section: 'contact' }],
      suggestedReplies: labels[language]?.defaultSuggest || labels.en.defaultSuggest,
    }
  },

  currentRole: (language) => ({
    text: getKnowledge(language).faq.currentRole,
    links: [{ type: 'scroll', label: `💼 ${L(language, 'goExperience')}`, section: 'experience' }],
    suggestedReplies: labels[language]?.defaultSuggest || labels.en.defaultSuggest,
  }),

  greeting: (language) => ({
    text:
      language === 'pt'
        ? 'Olá! Sobre o que você quer saber?'
        : language === 'es'
          ? '¡Hola! ¿Qué te gustaría saber?'
          : 'Hi! What would you like to know?',
    suggestedReplies: getDefaultQuickReplies(language),
  }),

  thanks: (language) => ({
    text:
      language === 'pt'
        ? 'De nada! Se quiser falar direto com Matheus, é só usar um dos botões.'
        : language === 'es'
          ? '¡De nada! Si quieres hablar directamente con Matheus, usa uno de los botones.'
          : "You're welcome! To talk to Matheus directly, use one of the buttons.",
    suggestedReplies: language === 'pt' ? ['Contato', 'WhatsApp', 'Currículo'] : language === 'es' ? ['Contacto', 'WhatsApp', 'CV'] : ['Contact', 'WhatsApp', 'Résumé'],
  }),

  project: (language, { projectId }) => {
    const project = getProjectById(projectId)
    if (!project) return builders.projects(language)
    const repo = getProjectGithubRepos(project)[0]
    const title = getLocalizedField(project.title, language)
    const category = getLocalizedField(project.category, language)
    const inpi = project.certificate ? `\n\n${L(language, 'inpi')}` : ''
    const impact = project.impact ? `\n\n${project.impact.value} ${getLocalizedField(project.impact.label, language)}.` : ''
    const links = []
    if (project.demo) links.push({ type: 'link', label: `🌐 ${L(language, 'viewProject')}`, url: project.demo })
    if (project.slug) links.push({ type: 'route', label: `📄 ${L(language, 'viewDetails')}`, path: `/projetos/${project.slug}` })
    if (repo) links.push({ type: 'link', label: `🔗 ${L(language, 'github')}`, url: repo.url })
    return {
      text: `${title} (${category})\n\n${getLocalizedField(project.description, language)}${impact}${inpi}\n\nStack: ${project.technologies.join(', ')}`,
      links,
      suggestedReplies: [L(language, 'projectsWord'), ...(language === 'pt' ? ['Experiência', 'Contato'] : language === 'es' ? ['Experiencia', 'Contacto'] : ['Experience', 'Contact'])],
    }
  },

  tech: (language, { techs }) => {
    const k = getKnowledge(language)
    const wanted = techs.map((tech) => tech.toLowerCase())
    const uses = (list) => (list || []).some((item) => wanted.includes(item.toLowerCase()))
    const jobs = k.experience.filter((item) => uses(item.technologies)).map((item) => item.company)
    const related = PROJECTS.filter((project) => uses(project.technologies))
    const names = techs.join(', ')
    const lines = []
    if (jobs.length) lines.push(`• ${language === 'en' ? 'Experience' : language === 'es' ? 'Experiencia' : 'Experiência'}: ${jobs.join(', ')}`)
    if (related.length) {
      lines.push(`• ${L(language, 'projectsWord')}: ${related.map((project) => PROJECT_SHORT_NAMES[project.id].label).join(', ')}`)
    }
    const intro =
      language === 'pt'
        ? `Sim, Matheus trabalha com ${names}.`
        : language === 'es'
          ? `Sí, Matheus trabaja con ${names}.`
          : `Yes, Matheus works with ${names}.`
    return {
      text: lines.length ? `${intro}\n\n${lines.join('\n')}` : intro,
      links: [{ type: 'scroll', label: `📊 ${L(language, 'goSkills')}`, section: 'skills' }],
      suggestedReplies: related.slice(0, 3).map((project) => PROJECT_SHORT_NAMES[project.id].label),
    }
  },

  default: (language) => ({
    text:
      language === 'pt'
        ? 'Não tenho essa informação aqui. Escolha um dos assuntos abaixo ou fale direto com Matheus.'
        : language === 'es'
          ? 'No tengo esa información aquí. Elige uno de los temas de abajo o habla directamente con Matheus.'
          : "I don't have that information here. Pick a topic below or talk to Matheus directly.",
    links: [
      { type: 'link', label: `💬 ${L(language, 'whatsapp')}`, url: getWhatsAppUrl() },
      { type: 'link', label: `📧 ${SITE_PROFILE.email}`, url: `mailto:${SITE_PROFILE.email}` },
    ],
    suggestedReplies: getDefaultQuickReplies(language),
  }),
}

export function getStructuredResponse(query, language) {
  const { intent, ...details } = typeof query === 'string' ? { intent: query } : query
  const builder = builders[intent] || builders.default
  return builder(language, details)
}

export function getGreeting(language) {
  return getKnowledge(language).greeting
}

export function getDefaultQuickReplies(language) {
  const map = {
    pt: ['Projetos', 'Serviços', 'Experiência', 'Tecnologias', 'Formação', 'Disponibilidade', 'Contato'],
    en: ['Projects', 'Services', 'Experience', 'Technologies', 'Education', 'Availability', 'Contact'],
    es: ['Proyectos', 'Servicios', 'Experiencia', 'Tecnologías', 'Formación', 'Disponibilidad', 'Contacto'],
  }
  return map[language] || map.en
}
