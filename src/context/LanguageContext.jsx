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
        contact: 'Contato'
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
        description: 'Desenvolvedor Full Stack com formação em Análise e Desenvolvimento de Sistemas. Tenho experiência em desenvolvimento web com foco em JavaScript, React e Node.js. Apaixonado por tecnologia e inovação, busco constantemente aprimorar minhas habilidades e contribuir para projetos que façam a diferença. Atualmente estudando no ITEGAM e desenvolvendo projetos pessoais para expandir meu portfólio.',
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
        description: 'Estudante de Análise e Desenvolvimento de Sistemas no ITEGAM, com foco em desenvolvimento web full stack. Tenho experiência prática em JavaScript, React.js, Node.js e Python. Participei de projetos acadêmicos e pessoais que me permitiram desenvolver habilidades sólidas em programação, resolução de problemas e trabalho em equipe.',
        education: '🎓 Formação',
        button: 'Entrar em contato'
      },
      projects: {
        title: 'Meus Projetos',
        subtitle: 'Meus sites referência'
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
        emptyMessage: 'Minhas publicações e artigos estão no LinkedIn. Clique abaixo para acompanhar.',
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
        contact: 'Contact'
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
        description: 'Full Stack Developer with a degree in Systems Analysis and Development. I have experience in web development focusing on JavaScript, React and Node.js. Passionate about technology and innovation, I constantly seek to improve my skills and contribute to projects that make a difference. Currently studying at ITEGAM and developing personal projects to expand my portfolio.',
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
        description: 'Systems Analysis and Development student at ITEGAM, focusing on full stack web development. I have practical experience in JavaScript, React.js, Node.js and Python. I participated in academic and personal projects that allowed me to develop solid skills in programming, problem solving and teamwork.',
        education: '🎓 Education',
        button: 'Get in touch'
      },
      projects: {
        title: 'My Projects',
        subtitle: 'My reference sites'
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
        emptyMessage: 'My posts and articles are on LinkedIn. Click below to follow along.',
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
        contact: 'Contacto'
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
        description: 'Desarrollador Full Stack con formación en Análisis y Desarrollo de Sistemas. Tengo experiencia en desarrollo web enfocado en JavaScript, React y Node.js. Apasionado por la tecnología y la innovación, busco constantemente mejorar mis habilidades y contribuir a proyectos que marquen la diferencia. Actualmente estudiando en ITEGAM y desarrollando proyectos personales para expandir mi portafolio.',
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
        description: 'Estudiante de Análisis y Desarrollo de Sistemas en ITEGAM, con enfoque en desarrollo web full stack. Tengo experiencia práctica en JavaScript, React.js, Node.js y Python. Participé en proyectos académicos y personales que me permitieron desarrollar habilidades sólidas en programación, resolución de problemas y trabajo en equipo.',
        education: '🎓 Formación',
        button: 'Ponerse en contacto'
      },
      projects: {
        title: 'Mis Proyectos',
        subtitle: 'Mis sitios de referencia'
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
        emptyMessage: 'Mis publicaciones y artículos están en LinkedIn. Haz clic abajo para seguir.',
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

