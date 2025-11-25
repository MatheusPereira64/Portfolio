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
    return localStorage.getItem('selectedLanguage') || 'pt'
  })

  useEffect(() => {
    localStorage.setItem('selectedLanguage', language)
  }, [language])

  const translations = {
    pt: {
      nav: {
        home: 'Inicio',
        about: 'Sobre mim',
        services: 'Serviços',
        skills: 'Habilidades',
        projects: 'Projetos',
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
      contact: {
        title: 'Entre em contato',
        subtitle: 'Entre em contato',
        text: 'Entre em Contato',
        description: 'Estou sempre aberto a novos desafios e oportunidades. Se você tem um projeto em mente ou gostaria de discutir como posso contribuir para sua equipe, não hesite em entrar em contato.',
        formTitle: 'Envie uma mensagem',
        formInstruction: 'Preencha o formulário abaixo e clique em enviar. Seu cliente de email padrão será aberto com a mensagem preenchida.',
        name: 'Nome',
        email: 'Email',
        subject: 'Assunto / Subject',
        message: 'Mensagem / Message...',
        send: 'Enviar mensagem',
        namePlaceholder: 'Nome / Name',
        emailPlaceholder: 'Email',
        subjectPlaceholder: 'Assunto / Subject',
        messagePlaceholder: 'Mensagem / Message...'
      }
    },
    en: {
      nav: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        skills: 'Skills',
        projects: 'Projects',
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
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

