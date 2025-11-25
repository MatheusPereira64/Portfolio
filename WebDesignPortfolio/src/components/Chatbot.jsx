import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Chatbot.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const { translations, language } = useLanguage()
  const t = translations[language]

  const greetings = {
    pt: ['Olá! Como posso ajudar?', 'Oi! Em que posso ajudar?', 'Olá! Precisa de algo?'],
    en: ['Hello! How can I help?', 'Hi! What can I do for you?', 'Hello! Need something?'],
    es: ['¡Hola! ¿Cómo puedo ayudar?', '¡Hola! ¿En qué puedo ayudar?', '¡Hola! ¿Necesitas algo?']
  }

  const responses = {
    pt: {
      'contato': 'Você pode entrar em contato através do email matheuspereira6464@gmail.com ou pelo telefone +55 (92) 99213-8870.',
      'projetos': 'Você pode ver meus projetos na seção "Projetos" do portfólio. Lá você encontrará exemplos do meu trabalho.',
      'habilidades': 'Minhas principais habilidades incluem React, Node.js, JavaScript, Python e outras tecnologias modernas. Veja mais na seção "Habilidades".',
      'sobre': 'Sou desenvolvedor Full Stack com formação em Análise e Desenvolvimento de Sistemas. Veja mais na seção "Sobre mim".',
      'default': 'Desculpe, não entendi. Você pode perguntar sobre contato, projetos, habilidades ou sobre mim.'
    },
    en: {
      'contact': 'You can contact me via email matheuspereira6464@gmail.com or phone +55 (92) 99213-8870.',
      'projects': 'You can see my projects in the "Projects" section of the portfolio. There you will find examples of my work.',
      'skills': 'My main skills include React, Node.js, JavaScript, Python and other modern technologies. See more in the "Skills" section.',
      'about': 'I am a Full Stack Developer with a degree in Systems Analysis and Development. See more in the "About me" section.',
      'default': 'Sorry, I did not understand. You can ask about contact, projects, skills or about me.'
    },
    es: {
      'contacto': 'Puedes contactarme por correo electrónico matheuspereira6464@gmail.com o teléfono +55 (92) 99213-8870.',
      'proyectos': 'Puedes ver mis proyectos en la sección "Proyectos" del portafolio. Allí encontrarás ejemplos de mi trabajo.',
      'habilidades': 'Mis principales habilidades incluyen React, Node.js, JavaScript, Python y otras tecnologías modernas. Ver más en la sección "Habilidades".',
      'sobre': 'Soy desarrollador Full Stack con formación en Análisis y Desarrollo de Sistemas. Ver más en la sección "Sobre mí".',
      'default': 'Lo siento, no entendí. Puedes preguntar sobre contacto, proyectos, habilidades o sobre mí.'
    }
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = greetings[language][Math.floor(Math.random() * greetings[language].length)]
      setMessages([{ type: 'bot', text: greeting }])
    }
  }, [isOpen, language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = { type: 'user', text: inputValue }
    setMessages(prev => [...prev, userMessage])

    // Simular resposta do bot
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase()
      let responseKey = 'default'

      if (lowerInput.includes('contato') || lowerInput.includes('contact') || lowerInput.includes('contacto') || lowerInput.includes('email') || lowerInput.includes('telefone') || lowerInput.includes('phone')) {
        responseKey = language === 'pt' ? 'contato' : language === 'es' ? 'contacto' : 'contact'
      } else if (lowerInput.includes('projeto') || lowerInput.includes('project') || lowerInput.includes('proyecto') || lowerInput.includes('trabalho') || lowerInput.includes('work')) {
        responseKey = language === 'pt' ? 'projetos' : language === 'es' ? 'proyectos' : 'projects'
      } else if (lowerInput.includes('habilidade') || lowerInput.includes('skill') || lowerInput.includes('tecnologia') || lowerInput.includes('technology') || lowerInput.includes('tecnología')) {
        responseKey = language === 'pt' ? 'habilidades' : language === 'es' ? 'habilidades' : 'skills'
      } else if (lowerInput.includes('sobre') || lowerInput.includes('about') || lowerInput.includes('quem') || lowerInput.includes('who')) {
        responseKey = language === 'pt' ? 'sobre' : language === 'es' ? 'sobre' : 'about'
      }

      const botResponse = { type: 'bot', text: responses[language][responseKey] || responses[language]['default'] }
      setMessages(prev => [...prev, botResponse])
    }, 1000)

    setInputValue('')
  }

  return (
    <>
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir chatbot"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
      </button>
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>{language === 'pt' ? 'Assistente Virtual' : language === 'es' ? 'Asistente Virtual' : 'Virtual Assistant'}</h3>
            <button onClick={() => setIsOpen(false)} aria-label="Fechar chatbot">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <div className="message-content">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input" onSubmit={handleSend}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={language === 'pt' ? 'Digite sua mensagem...' : language === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
              aria-label="Mensagem do chatbot"
            />
            <button type="submit" aria-label="Enviar mensagem">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Chatbot

