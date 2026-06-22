import { SITE_PROFILE } from '../constants/siteProfile'
import {
  getKnowledge,
  getCvHref,
  getWhatsAppUrl,
  SKILLS,
} from '../data/assistantKnowledge'

const labels = {
  pt: {
    goProjects: 'Ver projetos no site',
    goSkills: 'Ver habilidades',
    goExperience: 'Ver experiência',
    goAbout: 'Sobre mim',
    goContact: 'Ir para contacto',
    sendMessage: 'Enviar mensagem',
    downloadCv: 'Baixar CV (PDF)',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    blog: 'Ver posts no LinkedIn',
    openPortfolio: 'Abrir portfólio',
    defaultSuggest: ['Experiência', 'Projetos', 'WhatsApp', 'Currículo'],
  },
  en: {
    goProjects: 'View projects on site',
    goSkills: 'View skills',
    goExperience: 'View experience',
    goAbout: 'About me',
    goContact: 'Go to contact',
    sendMessage: 'Send a message',
    downloadCv: 'Download CV (PDF)',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    blog: 'View posts on LinkedIn',
    openPortfolio: 'Open portfolio',
    defaultSuggest: ['Experience', 'Projects', 'WhatsApp', 'Résumé'],
  },
  es: {
    goProjects: 'Ver proyectos en el sitio',
    goSkills: 'Ver habilidades',
    goExperience: 'Ver experiencia',
    goAbout: 'Sobre mí',
    goContact: 'Ir a contacto',
    sendMessage: 'Enviar mensaje',
    downloadCv: 'Descargar CV (PDF)',
    whatsapp: 'WhatsApp',
    linkedin: 'LinkedIn',
    github: 'GitHub',
    blog: 'Ver posts en LinkedIn',
    openPortfolio: 'Abrir portafolio',
    defaultSuggest: ['Experiencia', 'Proyectos', 'WhatsApp', 'CV'],
  },
}

function L(language, key) {
  return (labels[language] || labels.en)[key]
}

function contactLinks(language) {
  const phone =
    language === 'en' ? SITE_PROFILE.phoneDisplayEn : SITE_PROFILE.phoneDisplayPt
  return [
    { type: 'plain', label: `📧 ${SITE_PROFILE.email}` },
    { type: 'plain', label: `📱 ${phone}` },
    { type: 'link', label: `💬 ${L(language, 'whatsapp')}`, url: getWhatsAppUrl() },
    { type: 'link', label: `🔗 ${L(language, 'linkedin')}`, url: SITE_PROFILE.linkedin },
    { type: 'link', label: `🔗 ${L(language, 'github')}`, url: SITE_PROFILE.github },
    { type: 'scroll', label: `📍 ${L(language, 'goContact')}`, section: 'contact' },
    {
      type: 'contact',
      label: `✉️ ${L(language, 'sendMessage')}`,
      subject:
        language === 'pt'
          ? 'Contacto via portfólio'
          : language === 'es'
            ? 'Contacto vía portafolio'
            : 'Contact via portfolio',
    },
  ]
}

const builders = {
  contact: (language) => {
    const k = getKnowledge(language)
    const phone =
      language === 'en' ? SITE_PROFILE.phoneDisplayEn : SITE_PROFILE.phoneDisplayPt
    return {
      text:
        language === 'pt'
          ? `Contacto de ${SITE_PROFILE.shortName}:\n\n📧 ${SITE_PROFILE.email}\n📱 ${phone}\n📍 ${k.availability.location}`
          : language === 'es'
            ? `Contacto de ${SITE_PROFILE.shortName}:\n\n📧 ${SITE_PROFILE.email}\n📱 ${phone}\n📍 ${k.availability.location}`
            : `How to reach ${SITE_PROFILE.shortName}:\n\n📧 ${SITE_PROFILE.email}\n📱 ${phone}\n📍 ${k.availability.location}`,
      links: contactLinks(language),
      suggestedReplies: labels[language]?.defaultSuggest || labels.en.defaultSuggest,
    }
  },

  cv: (language) => ({
    text:
      language === 'pt'
        ? 'Currículo em PDF (inglês, 2026):'
        : language === 'es'
          ? 'Currículum en PDF (inglés, 2026):'
          : 'Résumé PDF (English, 2026):',
    links: [
      { type: 'link', label: `📄 ${L(language, 'downloadCv')}`, url: getCvHref() },
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
      { type: 'scroll', label: '📝 Blog', section: 'blog' },
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
        url: `${SITE_PROFILE.github}/Portfolio`,
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
        ? 'Pode enviar mensagem directa pelo WhatsApp:'
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
        ? ['Experiência', 'Skills', 'Contato']
        : language === 'es'
          ? ['Experiencia', 'Skills', 'Contacto']
          : ['Experience', 'Skills', 'Contact'],
  }),

  projects: (language) => {
    const k = getKnowledge(language)
    const lines = k.projects
      .map(
        (p, i) =>
          `${i + 1}. **${p.name}**\n   ${p.problem}\n   Stack: ${p.stack.join(', ')}`
      )
      .join('\n\n')
    const text =
      language === 'pt'
        ? `Principais projetos:\n\n${lines.replace(/\*\*/g, '')}`
        : language === 'es'
          ? `Proyectos principales:\n\n${lines.replace(/\*\*/g, '')}`
          : `Main projects:\n\n${lines.replace(/\*\*/g, '')}`

    const links = [
      { type: 'scroll', label: `🚀 ${L(language, 'goProjects')}`, section: 'teams' },
      { type: 'link', label: `🔗 ${L(language, 'github')}`, url: SITE_PROFILE.github },
    ]
    k.projects.forEach((p) => {
      if (p.url) links.push({ type: 'link', label: `🌐 ${p.name}`, url: p.url })
    })
    return { text, links, suggestedReplies: getDefaultQuickReplies(language) }
  },

  skills: (language) => {
    const top = SKILLS.slice(0, 8)
      .map((s) => `${s.name} — ${s.percentage}%`)
      .join('\n')
    const text =
      language === 'pt'
        ? `Principais habilidades:\n\n${top}\n\n…e mais na secção Habilidades.`
        : language === 'es'
          ? `Habilidades principales:\n\n${top}\n\n…y más en la sección Habilidades.`
          : `Top skills:\n\n${top}\n\n…and more in the Skills section.`
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
        { type: 'link', label: `📄 ${L(language, 'downloadCv')}`, url: getCvHref() },
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
        ? `Formação académica:\n\n${lines}`
        : language === 'es'
          ? `Formación académica:\n\n${lines}`
          : `Education:\n\n${lines}`
    return {
      text,
      links: [
        { type: 'scroll', label: `📊 ${L(language, 'goSkills')}`, section: 'skills' },
        { type: 'link', label: `📄 ${L(language, 'downloadCv')}`, url: getCvHref() },
      ],
      suggestedReplies:
        language === 'pt'
          ? ['Experiência', 'Inglês', 'Contato']
          : language === 'es'
            ? ['Experiencia', 'Inglés', 'Contacto']
            : ['Experience', 'English', 'Contact'],
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
        { type: 'link', label: `📄 ${L(language, 'downloadCv')}`, url: getCvHref() },
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
        { type: 'scroll', label: '📝 Blog', section: 'blog' },
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
        { type: 'link', label: `📄 ${L(language, 'downloadCv')}`, url: getCvHref() },
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
        ? 'Abro o formulário de contacto para você:'
        : language === 'es'
          ? 'Abro el formulario de contacto:'
          : 'Opening the contact form for you:',
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

  default: (language) => {
    const k = getKnowledge(language)
    const phone =
      language === 'en' ? SITE_PROFILE.phoneDisplayEn : SITE_PROFILE.phoneDisplayPt
    return {
      text:
        language === 'pt'
          ? `${SITE_PROFILE.fullName}\n\n📧 ${SITE_PROFILE.email}\n📱 ${phone}\n\n${k.availability.status}\n\nUse os botões abaixo ou pergunte sobre experiência, projetos, formação ou disponibilidade.`
          : language === 'es'
            ? `${SITE_PROFILE.fullName}\n\n📧 ${SITE_PROFILE.email}\n📱 ${phone}\n\n${k.availability.status}\n\nUsa los botones o pregunta sobre experiencia, proyectos o contacto.`
            : `${SITE_PROFILE.fullName}\n\n📧 ${SITE_PROFILE.email}\n📱 ${phone}\n\n${k.availability.status}\n\nUse the quick buttons or ask about experience, projects, education, or availability.`,
      links: contactLinks(language).concat([
        { type: 'link', label: `📄 ${L(language, 'downloadCv')}`, url: getCvHref() },
      ]),
      suggestedReplies: labels[language]?.defaultSuggest || labels.en.defaultSuggest,
    }
  },
}

export function getStructuredResponse(intent, language) {
  const key = intent === 'cv' ? 'cv' : intent
  const builder = builders[key] || builders.default
  return builder(language)
}

export function getGreeting(language) {
  return getKnowledge(language).greeting
}

export function getDefaultQuickReplies(language) {
  const map = {
    pt: ['Contato', 'Currículo', 'Projetos', 'Experiência', 'WhatsApp'],
    en: ['Contact', 'Résumé', 'Projects', 'Experience', 'WhatsApp'],
    es: ['Contacto', 'CV', 'Proyectos', 'Experiencia', 'WhatsApp'],
  }
  return map[language] || map.en
}

export function getAiUnavailableMessage(language, reason) {
  if (reason === 'rate_limit') {
    return language === 'pt'
      ? 'Limite de mensagens com IA atingido nesta sessão. Use os botões rápidos — as respostas instantâneas continuam disponíveis.'
      : language === 'es'
        ? 'Límite de mensajes con IA alcanzado en esta sesión. Usa los botones rápidos.'
        : 'AI message limit reached for this session. Quick buttons still work instantly.'
  }
  if (reason === 'no_key') {
    return language === 'pt'
      ? 'Modo IA não configurado. Respostas instantâneas estão activas — experimente Contacto, Projetos ou Experiência.'
      : language === 'es'
        ? 'Modo IA no configurado. Respuestas instantáneas activas.'
        : 'AI mode not configured. Instant answers are active — try Contact, Projects, or Experience.'
  }
  return language === 'pt'
    ? 'Não consegui usar a IA agora. Aqui está a informação mais relevante:'
    : language === 'es'
      ? 'No pude usar la IA ahora. Aquí está la información relevante:'
      : "Couldn't reach AI right now. Here's the most relevant info:"
}
