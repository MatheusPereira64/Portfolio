import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language)
    const htmlLang = language === 'pt' ? 'pt-BR' : language
    document.documentElement.lang = htmlLang
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
        skipLink: 'Ir para o conteúdo'
      },
      home: {
        greeting: 'Olá, meu nome é',
        name: 'Matheus Pereira',
        subtitle: 'E eu sou:',
        button: 'Sobre mim'
      },
      about: {
        title: 'Sobre mim',
        subtitle: 'Quem eu sou ?',
        text: 'Eu sou Matheus e sou',
        description: 'Full Stack Software Engineer com formação em Engenharia da Computação. Atuo no ITEGAM em projetos de PD&I para Indústria 4.0 — aplicações web, APIs, dashboards industriais e integrações IoT. Trabalho com React, Vue.js, TypeScript, Node.js, Python e PostgreSQL, da definição de requisitos ao deploy.',
        button: 'Meus serviços'
      },
      services: {
        title: 'Meus serviços',
        subtitle: 'O que eu ofereço'
      },
      skills: {
        title: 'Meus talentos',
        subtitle: 'O que eu sei',
        text: 'Minhas competências e experiência profissional',
        description: 'Full Stack Software Engineer no ITEGAM, com foco em aplicações web, APIs e sistemas industriais. Experiência prática em JavaScript, TypeScript, React, Vue.js, Node.js, Python, PostgreSQL e Docker, além de dashboards e indicadores como OEE e FPY.',
        education: '🎓 Formação',
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
      },
      experience: {
        title: 'Experiência',
        subtitle: 'Minha jornada'
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
      contact: {
        title: 'Entre em contato',
        subtitle: 'Entre em contato',
        text: 'Entre em Contato',
        description: 'Estou sempre aberto a novos desafios e oportunidades. Se você tem um projeto em mente ou gostaria de discutir como posso contribuir para sua equipe, não hesite em entrar em contato.',
        formTitle: 'Envie uma mensagem',
        formInstruction: 'Preencha o formulário abaixo e clique em enviar. Seu cliente de email padrão será aberto com a mensagem preenchida.',
        name: 'Nome',
        email: 'Email',
        subject: 'Assunto',
        message: 'Mensagem...',
        send: 'Enviar mensagem',
        namePlaceholder: 'Nome',
        emailPlaceholder: 'Email',
        subjectPlaceholder: 'Assunto',
        messagePlaceholder: 'Mensagem...'
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
        skipLink: 'Skip to content'
      },
      home: {
        greeting: 'Hello, my name is',
        name: 'Matheus Pereira',
        subtitle: 'And I am:',
        button: 'About me'
      },
      about: {
        title: 'About me',
        subtitle: 'Who am I?',
        text: 'I am Matheus and I am',
        description: 'Full Stack Software Engineer with a Computer Engineering degree. At ITEGAM I work on Industry 4.0 R&D — web apps, APIs, industrial dashboards, and IoT integrations. I use React, Vue.js, TypeScript, Node.js, Python, and PostgreSQL from requirements to deploy.',
        button: 'My services'
      },
      services: {
        title: 'My services',
        subtitle: 'What I offer'
      },
      skills: {
        title: 'My skills',
        subtitle: 'What I know',
        text: 'My skills and professional experience',
        description: 'Full Stack Software Engineer at ITEGAM, focused on web apps, APIs, and industrial systems. Hands-on with JavaScript, TypeScript, React, Vue.js, Node.js, Python, PostgreSQL, and Docker, plus dashboards and KPIs such as OEE and FPY.',
        education: '🎓 Education',
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
      },
      experience: {
        title: 'Experience',
        subtitle: 'My journey'
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
      contact: {
        title: 'Get in touch',
        subtitle: 'Get in Touch',
        text: 'Get in Touch',
        description: 'I\'m always open to new challenges and opportunities. If you have a project in mind or would like to discuss how I can contribute to your team, don\'t hesitate to get in touch.',
        formTitle: 'Send a message',
        formInstruction: 'Fill out the form below and click send. Your default email client will open with the message filled in.',
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message...',
        send: 'Send message',
        namePlaceholder: 'Name',
        emailPlaceholder: 'Email',
        subjectPlaceholder: 'Subject',
        messagePlaceholder: 'Message...'
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
        skipLink: 'Saltar al contenido'
      },
      home: {
        greeting: 'Hola, mi nombre es',
        name: 'Matheus Pereira',
        subtitle: 'Y soy:',
        button: 'Sobre mí'
      },
      about: {
        title: 'Sobre mí',
        subtitle: '¿Quién soy?',
        text: 'Soy Matheus y soy',
        description: 'Full Stack Software Engineer con formación en Ingeniería de Computación. En ITEGAM trabajo en I+D para Industria 4.0 — aplicaciones web, APIs, dashboards industriales e integraciones IoT. Uso React, Vue.js, TypeScript, Node.js, Python y PostgreSQL, de requisitos al deploy.',
        button: 'Mis servicios'
      },
      services: {
        title: 'Mis servicios',
        subtitle: 'Lo que ofrezco'
      },
      skills: {
        title: 'Mis talentos',
        subtitle: 'Lo que sé',
        text: 'Mis competencias y experiencia profesional',
        description: 'Full Stack Software Engineer en ITEGAM, enfocado en aplicaciones web, APIs y sistemas industriales. Experiencia práctica en JavaScript, TypeScript, React, Vue.js, Node.js, Python, PostgreSQL y Docker, además de dashboards e indicadores como OEE y FPY.',
        education: '🎓 Formación',
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
      },
      experience: {
        title: 'Experiencia',
        subtitle: 'Mi trayectoria'
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
      contact: {
        title: 'Ponerse en contacto',
        subtitle: 'Ponerse en contacto',
        text: 'Ponerse en contacto',
        description: 'Siempre estoy abierto a nuevos desafíos y oportunidades. Si tienes un proyecto en mente o te gustaría discutir cómo puedo contribuir a tu equipo, no dudes en ponerte en contacto.',
        formTitle: 'Enviar un mensaje',
        formInstruction: 'Complete el formulario a continuación y haga clic en enviar. Su cliente de correo electrónico predeterminado se abrirá con el mensaje completado.',
        name: 'Nombre',
        email: 'Correo electrónico',
        subject: 'Asunto',
        message: 'Mensaje...',
        send: 'Enviar mensaje',
        namePlaceholder: 'Nombre',
        emailPlaceholder: 'Correo electrónico',
        subjectPlaceholder: 'Asunto',
        messagePlaceholder: 'Mensaje...'
      }
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

