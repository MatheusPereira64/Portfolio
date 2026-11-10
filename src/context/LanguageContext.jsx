import { createContext, useContext, useState, useEffect } from 'react'

export const LanguageContext = createContext(null)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const SUPPORTED_LANGUAGES = ['pt', 'en', 'es']

function readSavedLanguage() {
  try {
    const saved = localStorage.getItem('selectedLanguage')
    if (SUPPORTED_LANGUAGES.includes(saved)) return saved
  } catch {
    /* armazenamento indisponível */
  }
  return null
}

export function detectLanguage() {
  const saved = readSavedLanguage()
  if (saved) return saved
  const candidates = typeof navigator !== 'undefined'
    ? [navigator.language, ...(navigator.languages || [])]
    : []
  for (const candidate of candidates) {
    const tag = String(candidate || '').toLowerCase()
    if (tag.startsWith('pt')) return 'pt'
    if (tag.startsWith('es')) return 'es'
  }
  return 'en'
}

function applyDocumentLanguage(language) {
  if (typeof document === 'undefined') return
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : language
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const initial = detectLanguage()
    applyDocumentLanguage(initial)
    return initial
  })

  useEffect(() => {
    try {
      localStorage.setItem('selectedLanguage', language)
    } catch {
      /* ignore */
    }
    applyDocumentLanguage(language)
  }, [language])

  const translations = {
    pt: {
      nav: {
        home: 'Inicio',
        about: 'Sobre mim',
        services: 'Serviços',
        skills: 'Habilidades',
        experience: 'Experiência',
        projects: 'Projetos',
        stats: 'Estatísticas',
        blog: 'Blog',
        contact: 'Contato',
        downloadCv: 'Baixar currículo',
        skipLink: 'Ir para o conteúdo',
        education: "Formação",
        certifications: "Certificados",
        chatOpen: "Abrir assistente",
        chatClose: "Fechar assistente",
        chatSubtitle: "Portfólio de Matheus Pereira",
        chatRestart: "Recomeçar conversa",
        chatPlaceholder: "Pergunte sobre projetos, experiência...",
        chatInput: "Sua mensagem",
        chatSend: "Enviar mensagem",
        chatLog: "Conversa com o assistente",
        chatTyping: "Digitando",
        logoLabel: 'Matheus Pereira, ir para o início',
        languageButton: 'Idioma: {language}. Alterar idioma',
        languageMenu: 'Escolher idioma',
        themeToDark: 'Ativar modo escuro',
        themeToLight: 'Ativar modo claro',
        openMenu: 'Abrir menu',
        closeMenu: 'Fechar menu',
        mainNavigation: 'Navegação principal'
      },
      home: {
        greeting: 'Olá, meu nome é',
        name: 'Matheus Pereira',
        subtitle: 'E eu sou:',
        button: 'Sobre mim',
        role: 'Engenheiro de Software Full Stack',
        proposition: 'Construo sistemas web e dashboards industriais (IoT, OEE/FPY) para o chão de fábrica — Manaus',
        talk: 'Falar comigo',
        downloadCv: 'Baixar CV',
        available: 'Disponível para projetos',
        inpi: '{count} softwares registrados no INPI',
        codeTabs: "Exemplos de código",
        codeFooter: "Perfil · Manaus · Indústria 4.0",
        code: {
          file: 'matheus.js',
          nameKey: 'nome',
          cityKey: 'cidade',
          companyKey: 'empresa',
          focusKey: 'foco',
          availableKey: 'disponivel',
          focusWeb: 'sistemas web',
          focusDash: 'dashboards industriais',
        }
      },
      about: {
        title: 'Sobre mim',
        subtitle: 'Quem eu sou ?',
        text: 'Eu sou Matheus e sou',
        description: 'Full Stack Software Engineer com formação em Engenharia da Computação. Atuo no ITEGAM em projetos de PD&I para Indústria 4.0 — aplicações web, APIs, dashboards industriais e integrações IoT. Trabalho com React, Vue.js, TypeScript, Node.js, Python e PostgreSQL, da definição de requisitos ao deploy.',
        button: 'Entrar em contato'
      },
      services: {
        title: 'Meus serviços',
        subtitle: 'O que eu ofereço',
        intro: 'O que posso construir ou melhorar para a sua empresa ou o seu projeto.'
      },
      skills: {
        title: 'Meus talentos',
        subtitle: 'O que eu sei',
        text: 'Minhas competências e experiência profissional',
        description: 'Full Stack Software Engineer no ITEGAM, com foco em aplicações web, APIs e sistemas industriais. Experiência prática em JavaScript, TypeScript, React, Vue.js, Node.js, Python, PostgreSQL e Docker, além de dashboards e indicadores como OEE e FPY.',
        education: 'Formação',
        certifications: 'Certificações',
        button: 'Entrar em contato'
      },
      projects: {
        title: 'Meus Projetos',
        subtitle: 'Projetos em destaque',
        viewCertificate: 'Ver certificado CRPC-INPI',
        technologies: 'Tecnologias',
        goToProject: 'Ir para o projeto',
        openDetails: 'Ver detalhes',
        closeDetails: 'Fechar detalhes',
        problem: 'Problema',
        contribution: 'O que eu fiz',
        results: 'Resultados',
        screenshots: 'Prévia',
        certifications: 'Certificações',
        viewOnGithub: 'Ver no GitHub',
        role: 'Papel',
        period: 'Período',
        decisions: 'Decisões técnicas',
        backToProjects: 'Voltar aos projetos',
        registeredInpi: 'Software registrado no INPI',
        notFound: 'Projeto não encontrado',
        viewProject: 'Ver projeto',
        githubMore: "Ver mais projetos no GitHub",
        openProject: "Ver projeto",
        viewDemo: "Ver demo online",
        closeModal: "Fechar",
        live: "NO AR",
        privateAddress: "Projeto interno · ITEGAM",
        screenshotAlt: 'Captura de tela de {title}',
        intro: 'Sistemas industriais e projetos pessoais, com as tecnologias usadas em cada um.',
        showing: 'Exibindo {from}–{to} de {total}',
        previous: 'Projetos anteriores',
        next: 'Próximos projetos',
        mockLabel: 'Ilustração',
        mockAlt: 'Ilustração do projeto {title}',
        opensInNewTab: 'abre em nova aba',
        noPublicRepo: 'Sem repositório público',
        noPublicRepoLabel: 'Perfil no GitHub. Este projeto não tem repositório público',
      },
      experience: {
        title: 'Experiência',
        role: "Atuação",
        subtitle: 'Minha jornada',
        intro: 'Do trabalho mais recente aos primeiros sistemas, com as tecnologias usadas em cada etapa.',
        current: 'Atual',
        results: 'Resultados:'
      },
      stats: {
        title: 'Estatísticas',
        subtitle: 'Números que falam'
      },
      blog: {
        title: 'Blog & Artigos',
        subtitle: 'Últimos artigos',
        readMore: 'Ler mais',
        viewOnLinkedIn: 'Ver no LinkedIn',
        viewAllOnLinkedIn: 'Ver publicações no LinkedIn',
        emptyMessage: 'O LinkedIn não libera os posts automaticamente. Cole o link de cada publicação em linkedinPosts.js para exibir a prévia.',
        previewUnavailable: 'Prévia indisponível — abra no LinkedIn',
      },
      education: {
        title: "Formação Acadêmica",
        intro: "Graduação e idiomas que sustentam o meu trabalho.",
        degree: "Graduação",
        course: "Curso"
      },
      certifications: {
        title: "Certificados e registros",
        intro: "Softwares registrados no INPI e cursos que concluí.",
        registrations: "Registros de software no INPI",
        courses: "Certificados",
        view: "Ver certificado",
        viewRegistration: "Ver registro",
        linkedin: "Ver todos os certificados no LinkedIn"
      },
      contact: {
        title: "Entre em contato",
        description: "Estou aberto a novos desafios e oportunidades. Se você tem um projeto em mente ou quer saber como posso contribuir com sua equipe, me escreva.",
        location: "Manaus, Amazonas - Brasil",
        cvHeading: "Baixar currículo",
        cvPortuguese: "Português",
        name: "Nome",
        email: "Email",
        subject: "Assunto",
        message: "Mensagem",
        send: "Enviar mensagem",
        sending: "Enviando...",
        mailtoHint: "Ao enviar, seu app de email abre com a mensagem pronta.",
        sent: "Mensagem enviada com sucesso!",
        mailtoOpened: "Seu app de email foi aberto. Confirme o envio por lá.",
        invalid: "Preencha todos os campos com um email válido.",
        sendError: "Não foi possível enviar a mensagem. Tente novamente ou use um dos contatos ao lado."
      }
    },
    en: {
      nav: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        skills: 'Skills',
        experience: 'Experience',
        projects: 'Projects',
        stats: 'Statistics',
        blog: 'Blog',
        contact: 'Contact',
        downloadCv: 'Download résumé',
        skipLink: 'Skip to content',
        education: "Education",
        certifications: "Certificates",
        chatOpen: "Open assistant",
        chatClose: "Close assistant",
        chatSubtitle: "Matheus Pereira's portfolio",
        chatRestart: "Restart conversation",
        chatPlaceholder: "Ask about projects, experience...",
        chatInput: "Your message",
        chatSend: "Send message",
        chatLog: "Conversation with the assistant",
        chatTyping: "Typing",
        logoLabel: 'Matheus Pereira, go to the top',
        languageButton: 'Language: {language}. Change language',
        languageMenu: 'Choose language',
        themeToDark: 'Switch to dark mode',
        themeToLight: 'Switch to light mode',
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        mainNavigation: 'Main navigation'
      },
      home: {
        greeting: 'Hello, my name is',
        name: 'Matheus Pereira',
        subtitle: 'And I am:',
        button: 'About me',
        role: 'Full Stack Software Engineer',
        proposition: 'I build web systems and industrial dashboards (IoT, OEE/FPY) for the shop floor — Manaus',
        talk: 'Talk to me',
        downloadCv: 'Download CV',
        available: 'Available for projects',
        inpi: '{count} software registrations at INPI',
        codeTabs: "Code samples",
        codeFooter: "Profile · Manaus · Industry 4.0",
        code: {
          file: 'matheus.js',
          nameKey: 'name',
          cityKey: 'city',
          companyKey: 'company',
          focusKey: 'focus',
          availableKey: 'available',
          focusWeb: 'web systems',
          focusDash: 'industrial dashboards',
        }
      },
      about: {
        title: 'About me',
        subtitle: 'Who am I?',
        text: 'I am Matheus and I am',
        description: 'Full Stack Software Engineer with a Computer Engineering degree. At ITEGAM I work on Industry 4.0 R&D — web apps, APIs, industrial dashboards, and IoT integrations. I use React, Vue.js, TypeScript, Node.js, Python, and PostgreSQL from requirements to deploy.',
        button: 'Get in touch'
      },
      services: {
        title: 'My services',
        subtitle: 'What I offer',
        intro: 'What I can build or improve for your company or project.'
      },
      skills: {
        title: 'My skills',
        subtitle: 'What I know',
        text: 'My skills and professional experience',
        description: 'Full Stack Software Engineer at ITEGAM, focused on web apps, APIs, and industrial systems. Hands-on with JavaScript, TypeScript, React, Vue.js, Node.js, Python, PostgreSQL, and Docker, plus dashboards and KPIs such as OEE and FPY.',
        education: 'Education',
        certifications: 'Certifications',
        button: 'Get in touch'
      },
      projects: {
        title: 'My Projects',
        subtitle: 'Featured projects',
        viewCertificate: 'View CRPC-INPI certificate',
        technologies: 'Technologies',
        goToProject: 'Go to project',
        openDetails: 'View details',
        closeDetails: 'Close details',
        problem: 'Problem',
        contribution: 'What I did',
        results: 'Results',
        screenshots: 'Preview',
        certifications: 'Certifications',
        viewOnGithub: 'View on GitHub',
        role: 'Role',
        period: 'Period',
        decisions: 'Technical decisions',
        backToProjects: 'Back to projects',
        registeredInpi: 'Software registered at INPI',
        notFound: 'Project not found',
        viewProject: 'View project',
        githubMore: "See more projects on GitHub",
        openProject: "View project",
        viewDemo: "View live demo",
        closeModal: "Close",
        live: "LIVE",
        privateAddress: "Internal project · ITEGAM",
        screenshotAlt: 'Screenshot of {title}',
        intro: 'Industrial systems and personal projects, with the technologies used in each one.',
        showing: 'Showing {from}–{to} of {total}',
        previous: 'Previous projects',
        next: 'Next projects',
        mockLabel: 'Illustration',
        mockAlt: 'Illustration of the {title} project',
        opensInNewTab: 'opens in a new tab',
        noPublicRepo: 'No public repository',
        noPublicRepoLabel: 'GitHub profile. This project has no public repository',
      },
      experience: {
        title: 'Experience',
        role: "Role",
        subtitle: 'My journey',
        intro: 'From the most recent work back to the first systems, with the technologies used at each step.',
        current: 'Current',
        results: 'Results:'
      },
      stats: {
        title: 'Statistics',
        subtitle: 'Numbers that speak'
      },
      blog: {
        title: 'Blog & Articles',
        subtitle: 'Latest articles',
        readMore: 'Read more',
        viewOnLinkedIn: 'View on LinkedIn',
        viewAllOnLinkedIn: 'View posts on LinkedIn',
        emptyMessage: 'LinkedIn does not expose posts automatically. Paste each post URL into linkedinPosts.js to show a preview.',
        previewUnavailable: 'Preview unavailable — open on LinkedIn',
      },
      education: {
        title: "Education",
        intro: "Degree and languages behind my work.",
        degree: "Degree",
        course: "Course"
      },
      certifications: {
        title: "Certificates and registrations",
        intro: "Software registered at INPI and courses I completed.",
        registrations: "Software registrations at INPI",
        courses: "Certificates",
        view: "View certificate",
        viewRegistration: "View registration",
        linkedin: "See all certificates on LinkedIn"
      },
      contact: {
        title: "Get in touch",
        description: "I'm open to new challenges and opportunities. If you have a project in mind or want to know how I can contribute to your team, write to me.",
        location: "Manaus, Amazonas - Brazil",
        cvHeading: "Download résumé",
        cvPortuguese: "Portuguese",
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send message",
        sending: "Sending...",
        mailtoHint: "When you send, your email app opens with the message ready.",
        sent: "Message sent successfully!",
        mailtoOpened: "Your email app was opened. Confirm sending there.",
        invalid: "Fill in all fields with a valid email.",
        sendError: "The message couldn't be sent. Try again or use one of the contacts listed here."
      }
    },
    es: {
      nav: {
        home: 'Inicio',
        about: 'Sobre mí',
        services: 'Servicios',
        skills: 'Habilidades',
        experience: 'Experiencia',
        projects: 'Proyectos',
        stats: 'Estadísticas',
        blog: 'Blog',
        contact: 'Contacto',
        downloadCv: 'Descargar currículum',
        skipLink: 'Saltar al contenido',
        education: "Formación",
        certifications: "Certificados",
        chatOpen: "Abrir asistente",
        chatClose: "Cerrar asistente",
        chatSubtitle: "Portafolio de Matheus Pereira",
        chatRestart: "Reiniciar conversación",
        chatPlaceholder: "Pregunta sobre proyectos, experiencia...",
        chatInput: "Tu mensaje",
        chatSend: "Enviar mensaje",
        chatLog: "Conversación con el asistente",
        chatTyping: "Escribiendo",
        logoLabel: 'Matheus Pereira, ir al inicio',
        languageButton: 'Idioma: {language}. Cambiar idioma',
        languageMenu: 'Elegir idioma',
        themeToDark: 'Activar modo oscuro',
        themeToLight: 'Activar modo claro',
        openMenu: 'Abrir menú',
        closeMenu: 'Cerrar menú',
        mainNavigation: 'Navegación principal'
      },
      home: {
        greeting: 'Hola, mi nombre es',
        name: 'Matheus Pereira',
        subtitle: 'Y soy:',
        button: 'Sobre mí',
        role: 'Ingeniero de Software Full Stack',
        proposition: 'Construyo sistemas web y dashboards industriales (IoT, OEE/FPY) para el piso de planta — Manaus',
        talk: 'Hablar conmigo',
        downloadCv: 'Descargar CV',
        available: 'Disponible para proyectos',
        inpi: '{count} softwares registrados en el INPI',
        codeTabs: "Ejemplos de código",
        codeFooter: "Perfil · Manaus · Industria 4.0",
        code: {
          file: 'matheus.js',
          nameKey: 'nombre',
          cityKey: 'ciudad',
          companyKey: 'empresa',
          focusKey: 'foco',
          availableKey: 'disponible',
          focusWeb: 'sistemas web',
          focusDash: 'dashboards industriales',
        }
      },
      about: {
        title: 'Sobre mí',
        subtitle: '¿Quién soy?',
        text: 'Soy Matheus y soy',
        description: 'Full Stack Software Engineer con formación en Ingeniería de Computación. En ITEGAM trabajo en I+D para Industria 4.0 — aplicaciones web, APIs, dashboards industriales e integraciones IoT. Uso React, Vue.js, TypeScript, Node.js, Python y PostgreSQL, de requisitos al deploy.',
        button: 'Ponerse en contacto'
      },
      services: {
        title: 'Mis servicios',
        subtitle: 'Lo que ofrezco',
        intro: 'Lo que puedo construir o mejorar para tu empresa o tu proyecto.'
      },
      skills: {
        title: 'Mis talentos',
        subtitle: 'Lo que sé',
        text: 'Mis competencias y experiencia profesional',
        description: 'Full Stack Software Engineer en ITEGAM, enfocado en aplicaciones web, APIs y sistemas industriales. Experiencia práctica en JavaScript, TypeScript, React, Vue.js, Node.js, Python, PostgreSQL y Docker, además de dashboards e indicadores como OEE y FPY.',
        education: 'Formación',
        certifications: 'Certificaciones',
        button: 'Ponerse en contacto'
      },
      projects: {
        title: 'Mis Proyectos',
        subtitle: 'Proyectos destacados',
        viewCertificate: 'Ver certificado CRPC-INPI',
        technologies: 'Tecnologías',
        goToProject: 'Ir al proyecto',
        openDetails: 'Ver detalles',
        closeDetails: 'Cerrar detalles',
        problem: 'Problema',
        contribution: 'Lo que hice',
        results: 'Resultados',
        screenshots: 'Vista previa',
        certifications: 'Certificaciones',
        viewOnGithub: 'Ver en GitHub',
        role: 'Papel',
        period: 'Período',
        decisions: 'Decisiones técnicas',
        backToProjects: 'Volver a los proyectos',
        registeredInpi: 'Software registrado en el INPI',
        notFound: 'Proyecto no encontrado',
        viewProject: 'Ver proyecto',
        githubMore: "Ver más proyectos en GitHub",
        openProject: "Ver proyecto",
        viewDemo: "Ver demo en línea",
        closeModal: "Cerrar",
        live: "EN LÍNEA",
        privateAddress: "Proyecto interno · ITEGAM",
        screenshotAlt: 'Captura de pantalla de {title}',
        intro: 'Sistemas industriales y proyectos personales, con las tecnologías usadas en cada uno.',
        showing: 'Mostrando {from}–{to} de {total}',
        previous: 'Proyectos anteriores',
        next: 'Próximos proyectos',
        mockLabel: 'Ilustración',
        mockAlt: 'Ilustración del proyecto {title}',
        opensInNewTab: 'se abre en una pestaña nueva',
        noPublicRepo: 'Sin repositorio público',
        noPublicRepoLabel: 'Perfil de GitHub. Este proyecto no tiene repositorio público',
      },
      experience: {
        title: 'Experiencia',
        role: "Rol",
        subtitle: 'Mi trayectoria',
        intro: 'Del trabajo más reciente a los primeros sistemas, con las tecnologías usadas en cada etapa.',
        current: 'Actual',
        results: 'Resultados:'
      },
      stats: {
        title: 'Estadísticas',
        subtitle: 'Números que hablan'
      },
      blog: {
        title: 'Blog y Artículos',
        subtitle: 'Últimos artículos',
        readMore: 'Leer más',
        viewOnLinkedIn: 'Ver en LinkedIn',
        viewAllOnLinkedIn: 'Ver publicaciones en LinkedIn',
        emptyMessage: 'LinkedIn no expone las publicaciones automáticamente. Pega la URL de cada post en linkedinPosts.js para mostrar la previa.',
        previewUnavailable: 'Previa no disponible — abrir en LinkedIn',
      },
      education: {
        title: "Formación Académica",
        intro: "Graduación e idiomas que sustentan mi trabajo.",
        degree: "Graduación",
        course: "Curso"
      },
      certifications: {
        title: "Certificados y registros",
        intro: "Softwares registrados en el INPI y cursos que concluí.",
        registrations: "Registros de software en el INPI",
        courses: "Certificados",
        view: "Ver certificado",
        viewRegistration: "Ver registro",
        linkedin: "Ver todos los certificados en LinkedIn"
      },
      contact: {
        title: "Ponte en contacto",
        description: "Estoy abierto a nuevos desafíos y oportunidades. Si tienes un proyecto en mente o quieres saber cómo puedo contribuir a tu equipo, escríbeme.",
        location: "Manaus, Amazonas - Brasil",
        cvHeading: "Descargar currículum",
        cvPortuguese: "Portugués",
        name: "Nombre",
        email: "Correo electrónico",
        subject: "Asunto",
        message: "Mensaje",
        send: "Enviar mensaje",
        sending: "Enviando...",
        mailtoHint: "Al enviar, tu app de correo se abre con el mensaje listo.",
        sent: "¡Mensaje enviado con éxito!",
        mailtoOpened: "Se abrió tu app de correo. Confirma el envío allí.",
        invalid: "Completa todos los campos con un correo válido.",
        sendError: "No se pudo enviar el mensaje. Inténtalo de nuevo o usa uno de los contactos indicados."
      }
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

