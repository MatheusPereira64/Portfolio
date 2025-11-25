import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { GoogleGenerativeAI } from '@google/generative-ai'
import './Chatbot.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const { translations, language } = useLanguage()
  const t = translations[language]

  // Verificar se a API key está disponível ao montar o componente
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    console.log('🔍 Chatbot montado - API Key disponível:', apiKey ? 'Sim' : 'Não')
    if (apiKey) {
      console.log('✅ Primeiros caracteres da API Key:', apiKey.substring(0, 15) + '...')
    } else {
      console.warn('⚠️ API Key não encontrada. O chatbot usará respostas pré-programadas.')
    }
  }, [])

  const greetings = {
    pt: ['Olá! Como posso ajudar?', 'Oi! Em que posso ajudar?', 'Olá! Precisa de algo?'],
    en: ['Hello! How can I help?', 'Hi! What can I do for you?', 'Hello! Need something?'],
    es: ['¡Hola! ¿Cómo puedo ayudar?', '¡Hola! ¿En qué puedo ayudar?', '¡Hola! ¿Necesitas algo?']
  }

  const quickReplies = {
    pt: ['Contato', 'LinkedIn', 'GitHub', 'Projetos', 'Habilidades'],
    en: ['Contact', 'LinkedIn', 'GitHub', 'Projects', 'Skills'],
    es: ['Contacto', 'LinkedIn', 'GitHub', 'Proyectos', 'Habilidades']
  }

  const responses = {
    pt: {
      'contato': {
        text: 'Você pode entrar em contato através de:',
        links: [
          { label: '📧 Email', url: 'mailto:matheuspereira6464@gmail.com' },
          { label: '📱 Telefone', url: 'tel:+5592992138870' },
          { label: '📍 Localização', text: 'Manaus, Amazonas - Brasil' }
        ]
      },
      'linkedin': {
        text: 'Conecte-se comigo no LinkedIn:',
        links: [
          { label: '🔗 LinkedIn', url: 'https://www.linkedin.com/in/matheus-pereira-836033243/' }
        ]
      },
      'github': {
        text: 'Veja meus projetos no GitHub:',
        links: [
          { label: '🔗 GitHub', url: 'https://github.com/MatheusPereira64' }
        ]
      },
      'projetos': {
        text: 'Você pode ver meus projetos na seção "Projetos" do portfólio. Lá você encontrará exemplos do meu trabalho.',
        links: []
      },
      'habilidades': {
        text: 'Minhas principais habilidades incluem React, Node.js, JavaScript, Python e outras tecnologias modernas. Veja mais na seção "Habilidades".',
        links: []
      },
      'sobre': {
        text: 'Sou desenvolvedor Full Stack com formação em Análise e Desenvolvimento de Sistemas. Veja mais na seção "Sobre mim".',
        links: []
      },
      'default': {
        text: 'Desculpe, não entendi. Você pode escolher uma das opções abaixo ou perguntar sobre contato, projetos, habilidades ou sobre mim.',
        links: []
      }
    },
    en: {
      'contact': {
        text: 'You can contact me through:',
        links: [
          { label: '📧 Email', url: 'mailto:matheuspereira6464@gmail.com' },
          { label: '📱 Phone', url: 'tel:+5592992138870' },
          { label: '📍 Location', text: 'Manaus, Amazonas - Brazil' }
        ]
      },
      'linkedin': {
        text: 'Connect with me on LinkedIn:',
        links: [
          { label: '🔗 LinkedIn', url: 'https://www.linkedin.com/in/matheus-pereira-836033243/' }
        ]
      },
      'github': {
        text: 'See my projects on GitHub:',
        links: [
          { label: '🔗 GitHub', url: 'https://github.com/MatheusPereira64' }
        ]
      },
      'projects': {
        text: 'You can see my projects in the "Projects" section of the portfolio. There you will find examples of my work.',
        links: []
      },
      'skills': {
        text: 'My main skills include React, Node.js, JavaScript, Python and other modern technologies. See more in the "Skills" section.',
        links: []
      },
      'about': {
        text: 'I am a Full Stack Developer with a degree in Systems Analysis and Development. See more in the "About me" section.',
        links: []
      },
      'default': {
        text: 'Sorry, I did not understand. You can choose one of the options below or ask about contact, projects, skills or about me.',
        links: []
      }
    },
    es: {
      'contacto': {
        text: 'Puedes contactarme a través de:',
        links: [
          { label: '📧 Correo', url: 'mailto:matheuspereira6464@gmail.com' },
          { label: '📱 Teléfono', url: 'tel:+5592992138870' },
          { label: '📍 Ubicación', text: 'Manaus, Amazonas - Brasil' }
        ]
      },
      'linkedin': {
        text: 'Conéctate conmigo en LinkedIn:',
        links: [
          { label: '🔗 LinkedIn', url: 'https://www.linkedin.com/in/matheus-pereira-836033243/' }
        ]
      },
      'github': {
        text: 'Ve mis proyectos en GitHub:',
        links: [
          { label: '🔗 GitHub', url: 'https://github.com/MatheusPereira64' }
        ]
      },
      'proyectos': {
        text: 'Puedes ver mis proyectos en la sección "Proyectos" del portafolio. Allí encontrarás ejemplos de mi trabajo.',
        links: []
      },
      'habilidades': {
        text: 'Mis principales habilidades incluyen React, Node.js, JavaScript, Python y otras tecnologías modernas. Ver más en la sección "Habilidades".',
        links: []
      },
      'sobre': {
        text: 'Soy desarrollador Full Stack con formación en Análisis y Desarrollo de Sistemas. Ver más en la sección "Sobre mí".',
        links: []
      },
      'default': {
        text: 'Lo siento, no entendí. Puedes elegir una de las opciones a continuación o preguntar sobre contacto, proyectos, habilidades o sobre mí.',
        links: []
      }
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

  // Função para obter resposta da IA usando API REST direta
  const getAIResponseDirectAPI = async (messageText, conversationHistory, apiKey, lang) => {
    // Contexto sobre o portfólio
    const context = lang === 'pt' 
      ? `Você é um assistente virtual do portfólio de Matheus Pereira, um desenvolvedor Full Stack. 
      Informações importantes:
      - Nome: Matheus Pereira de Souza
      - Email: matheuspereira6464@gmail.com
      - Telefone: +55 (92) 99213-8870
      - Localização: Manaus, Amazonas - Brasil
      - LinkedIn: https://www.linkedin.com/in/matheus-pereira-836033243/
      - GitHub: https://github.com/MatheusPereira64
      - Habilidades: React, Node.js, JavaScript, Python, Full Stack Development
      - Formação: Análise e Desenvolvimento de Sistemas no ITEGAM
      
      Seja amigável, profissional e responda de forma concisa. Quando perguntarem sobre contato, LinkedIn ou GitHub, forneça os links diretamente.`
      : lang === 'es'
      ? `Eres un asistente virtual del portafolio de Matheus Pereira, un desarrollador Full Stack.
      Información importante:
      - Nombre: Matheus Pereira de Souza
      - Email: matheuspereira6464@gmail.com
      - Teléfono: +55 (92) 99213-8870
      - Ubicación: Manaus, Amazonas - Brasil
      - LinkedIn: https://www.linkedin.com/in/matheus-pereira-836033243/
      - GitHub: https://github.com/MatheusPereira64
      - Habilidades: React, Node.js, JavaScript, Python, Desarrollo Full Stack
      - Formación: Análisis y Desarrollo de Sistemas en ITEGAM
      
      Sé amigable, profesional y responde de forma concisa. Cuando pregunten sobre contacto, LinkedIn o GitHub, proporciona los enlaces directamente.`
      : `You are a virtual assistant for Matheus Pereira's portfolio, a Full Stack Developer.
      Important information:
      - Name: Matheus Pereira de Souza
      - Email: matheuspereira6464@gmail.com
      - Phone: +55 (92) 99213-8870
      - Location: Manaus, Amazonas - Brazil
      - LinkedIn: https://www.linkedin.com/in/matheus-pereira-836033243/
      - GitHub: https://github.com/MatheusPereira64
      - Skills: React, Node.js, JavaScript, Python, Full Stack Development
      - Education: Systems Analysis and Development at ITEGAM
      
      Be friendly, professional and respond concisely. When asked about contact, LinkedIn or GitHub, provide the links directly.`

    const historyText = conversationHistory
      .slice(-5)
      .map(msg => `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
      .join('\n')

    const prompt = `${context}\n\nConversation history:\n${historyText}\n\nUser: ${messageText}\nAssistant:`

    // Tentar diferentes endpoints e modelos
    const endpoints = [
      { url: `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, model: 'gemini-pro (v1)' },
      { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, model: 'gemini-pro (v1beta)' },
      { url: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, model: 'gemini-1.5-flash (v1)' },
      { url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, model: 'gemini-1.5-flash (v1beta)' }
    ]

    for (const endpoint of endpoints) {
      try {
        console.log(`🔄 Tentando endpoint: ${endpoint.model}`)
        const response = await fetch(endpoint.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }]
          })
        })

        if (response.ok) {
          const data = await response.json()
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
          console.log(`✅ Resposta recebida via ${endpoint.model}`)
          
          // Extrair links
          const links = []
          const linkRegex = /(https?:\/\/[^\s]+)/g
          const foundLinks = text.match(linkRegex)
          if (foundLinks) {
            foundLinks.forEach(link => {
              if (link.includes('linkedin.com')) {
                links.push({ label: '🔗 LinkedIn', url: link })
              } else if (link.includes('github.com')) {
                links.push({ label: '🔗 GitHub', url: link })
              } else if (link.includes('mailto:')) {
                links.push({ label: '📧 Email', url: link })
              }
            })
          }
          
          return { text: text.trim(), links }
        } else {
          const errorData = await response.json().catch(() => ({}))
          console.log(`❌ ${endpoint.model} falhou:`, response.status, errorData)
        }
      } catch (e) {
        console.log(`❌ Erro ao tentar ${endpoint.model}:`, e.message)
        continue
      }
    }
    
    return null
  }

  // Função para obter resposta da IA (Google Gemini) usando API REST direta
  const getAIResponse = async (messageText, conversationHistory) => {
    try {
      const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
      
      console.log('🔑 API Key carregada:', GEMINI_API_KEY ? 'Sim (primeiros 10 chars: ' + GEMINI_API_KEY.substring(0, 10) + '...)' : 'Não')
      
      if (!GEMINI_API_KEY || GEMINI_API_KEY.trim() === '') {
        console.log('⚠️ API Key não encontrada ou vazia, usando fallback')
        return null
      }

      // Usar API REST diretamente, tentando diferentes endpoints
      return await getAIResponseDirectAPI(messageText, conversationHistory, GEMINI_API_KEY, language)
    } catch (error) {
      console.error('❌ Erro ao chamar API Gemini:', error)
      console.error('Detalhes do erro:', error.message)
      if (error.message?.includes('API_KEY') || error.message?.includes('API key')) {
        console.error('⚠️ Problema com a API Key. Verifique se está correta no arquivo .env')
      }
      if (error.message?.includes('quota') || error.message?.includes('limit')) {
        console.error('⚠️ Limite de quota atingido. Aguarde alguns minutos.')
      }
      return null // Retorna null para usar fallback
    }
  }

  // Função de fallback (respostas pré-programadas)
  const getFallbackResponse = (messageText) => {
    const lowerInput = messageText.toLowerCase()
    let responseKey = 'default'

    if (lowerInput.includes('contato') || lowerInput.includes('contact') || lowerInput.includes('contacto') || lowerInput.includes('email') || lowerInput.includes('telefone') || lowerInput.includes('phone')) {
      responseKey = language === 'pt' ? 'contato' : language === 'es' ? 'contacto' : 'contact'
    } else if (lowerInput.includes('linkedin')) {
      responseKey = 'linkedin'
    } else if (lowerInput.includes('github') || lowerInput.includes('git')) {
      responseKey = 'github'
    } else if (lowerInput.includes('projeto') || lowerInput.includes('project') || lowerInput.includes('proyecto') || lowerInput.includes('trabalho') || lowerInput.includes('work')) {
      responseKey = language === 'pt' ? 'projetos' : language === 'es' ? 'proyectos' : 'projects'
    } else if (lowerInput.includes('habilidade') || lowerInput.includes('skill') || lowerInput.includes('tecnologia') || lowerInput.includes('technology') || lowerInput.includes('tecnología')) {
      responseKey = language === 'pt' ? 'habilidades' : language === 'es' ? 'habilidades' : 'skills'
    } else if (lowerInput.includes('sobre') || lowerInput.includes('about') || lowerInput.includes('quem') || lowerInput.includes('who')) {
      responseKey = language === 'pt' ? 'sobre' : language === 'es' ? 'sobre' : 'about'
    }

    const response = responses[language][responseKey] || responses[language]['default']
    return { text: response.text, links: response.links || [] }
  }

  const processMessage = async (messageText) => {
    const userMessage = { type: 'user', text: messageText }
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      console.log('📨 Processando mensagem:', messageText)
      // Tentar obter resposta da IA primeiro
      const aiResponse = await getAIResponse(messageText, [...messages, userMessage])
      
      if (aiResponse) {
        console.log('✅ Usando resposta da IA')
        // Usar resposta da IA
        const botResponse = { type: 'bot', text: aiResponse.text, links: aiResponse.links || [] }
        setMessages(prev => [...prev, botResponse])
        setIsLoading(false)
      } else {
        console.log('⚠️ Usando fallback (respostas pré-programadas)')
        // Usar fallback (respostas pré-programadas)
        setTimeout(() => {
          const response = getFallbackResponse(messageText)
          const botResponse = { type: 'bot', text: response.text, links: response.links || [] }
          setMessages(prev => [...prev, botResponse])
          setIsLoading(false)
        }, 1000)
      }
    } catch (error) {
      console.error('❌ Erro no processMessage:', error)
      // Em caso de erro, usar fallback
      const response = getFallbackResponse(messageText)
      const botResponse = { type: 'bot', text: response.text, links: response.links || [] }
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }
  }

  const handleQuickReply = (reply) => {
    processMessage(reply)
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    processMessage(inputValue)
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
                <div className="message-content">
                  {msg.text}
                  {msg.links && msg.links.length > 0 && (
                    <div className="message-links">
                      {msg.links.map((link, linkIndex) => (
                        link.url ? (
                          <a 
                            key={linkIndex} 
                            href={link.url} 
                            target={link.url.startsWith('http') ? '_blank' : undefined}
                            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="message-link"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <span key={linkIndex} className="message-link-text">{link.label}: {link.text}</span>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            {messages.length === 1 && messages[0].type === 'bot' && !isLoading && (
              <div className="quick-replies">
                {quickReplies[language].map((reply, index) => (
                  <button
                    key={index}
                    type="button"
                    className="quick-reply-btn"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
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

