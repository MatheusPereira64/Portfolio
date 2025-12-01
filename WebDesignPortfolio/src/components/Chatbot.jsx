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
    console.log('🔍 Chatbot montado - Verificando configuração da API')
    console.log('📋 Variáveis de ambiente disponíveis:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')))
    console.log('🔑 API Key disponível:', apiKey ? 'Sim' : 'Não')
    
    if (apiKey) {
      const trimmedKey = apiKey.trim()
      if (trimmedKey === '' || trimmedKey === 'sua_chave_aqui') {
        console.warn('⚠️ API Key está vazia ou contém valor padrão. Configure sua chave no arquivo .env')
        console.warn('📝 Instruções: Crie/edite WebDesignPortfolio/.env e adicione: VITE_GEMINI_API_KEY=sua_chave_real')
      } else {
        console.log('✅ API Key configurada (primeiros 10 chars):', trimmedKey.substring(0, 10) + '...')
        console.log('✅ Comprimento da chave:', trimmedKey.length, 'caracteres')
      }
    } else {
      console.warn('⚠️ API Key não encontrada. O chatbot usará respostas pré-programadas.')
      console.warn('📝 Para ativar a IA:')
      console.warn('   1. Crie o arquivo WebDesignPortfolio/.env')
      console.warn('   2. Adicione: VITE_GEMINI_API_KEY=sua_chave_aqui')
      console.warn('   3. Obtenha uma chave gratuita em: https://makersuite.google.com/app/apikey')
      console.warn('   4. Reinicie o servidor (npm run dev)')
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
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''
      const trimmedKey = apiKey.trim()
      const hasValidKey = trimmedKey && trimmedKey !== '' && trimmedKey !== 'sua_chave_aqui' && trimmedKey.startsWith('AIza')
      
      const greeting = greetings[language][Math.floor(Math.random() * greetings[language].length)]
      
      // Adicionar aviso se a API key não estiver configurada
      if (!hasValidKey) {
        const warningMsg = language === 'pt' 
          ? '⚠️ A API do Google Gemini não está configurada. O chatbot está usando respostas pré-programadas. Configure VITE_GEMINI_API_KEY no arquivo .env para ativar a IA.'
          : language === 'es'
          ? '⚠️ La API de Google Gemini no está configurada. El chatbot está usando respuestas preprogramadas. Configure VITE_GEMINI_API_KEY en el archivo .env para activar la IA.'
          : '⚠️ Google Gemini API is not configured. The chatbot is using pre-programmed responses. Configure VITE_GEMINI_API_KEY in the .env file to enable AI.'
        
        setMessages([
          { type: 'bot', text: greeting },
          { type: 'bot', text: warningMsg }
        ])
      } else {
        setMessages([{ type: 'bot', text: greeting }])
      }
    }
  }, [isOpen, language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Função para obter resposta da IA usando SDK do Google Generative AI
  const getAIResponse = async (messageText, conversationHistory) => {
    try {
      const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''
      const trimmedKey = GEMINI_API_KEY.trim()
      
      console.log('🔑 Verificando API Key...')
      console.log('   - Chave presente:', !!GEMINI_API_KEY)
      console.log('   - Chave após trim:', trimmedKey ? `Sim (${trimmedKey.length} chars)` : 'Vazia')
      
      if (!GEMINI_API_KEY || trimmedKey === '' || trimmedKey === 'sua_chave_aqui') {
        console.log('⚠️ API Key não encontrada, vazia ou contém valor padrão')
        console.log('📝 Configure a chave no arquivo WebDesignPortfolio/.env e reinicie o servidor')
        return null
      }
      
      // Validar formato da API key (deve começar com "AIza")
      if (!trimmedKey.startsWith('AIza')) {
        console.error('⚠️ Formato de API Key inválido!')
        console.error('   - A chave do Google Gemini deve começar com "AIza"')
        console.error('   - Chave atual começa com:', trimmedKey.substring(0, 4))
        console.error('   - Obtenha uma chave válida em: https://makersuite.google.com/app/apikey')
        return null
      }
      
      console.log('✅ API Key válida detectada (primeiros 10 chars):', trimmedKey.substring(0, 10) + '...')
      console.log('   - Formato correto: Começa com "AIza"')
      console.log('   - Comprimento:', trimmedKey.length, 'caracteres')
      
      // Tentar listar modelos disponíveis para debug
      try {
        const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${trimmedKey}`
        const listResponse = await fetch(listUrl)
        if (listResponse.ok) {
          const listData = await listResponse.json()
          const availableModels = listData.models?.map(m => m.name) || []
          console.log('📋 Modelos disponíveis:', availableModels.slice(0, 5).join(', '), availableModels.length > 5 ? '...' : '')
        }
      } catch (e) {
        console.log('   - Não foi possível listar modelos disponíveis (normal)')
      }

      // Contexto sobre o portfólio
      const context = language === 'pt' 
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
        : language === 'es'
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

      // Construir histórico da conversa
      const historyText = conversationHistory
        .slice(-5)
        .map(msg => `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
        .join('\n')

      const prompt = `${context}\n\nConversation history:\n${historyText}\n\nUser: ${messageText}\nAssistant:`

      // Tentar usar o SDK primeiro, depois API REST como fallback
      // O SDK gerencia melhor a versão da API automaticamente
      const models = ['gemini-pro', 'gemini-1.5-flash', 'gemini-1.5-pro']
      
      // Primeiro, tentar com o SDK
      for (const modelName of models) {
        try {
          console.log(`🔄 Tentando modelo via SDK: ${modelName}`)
          console.log(`   - Prompt length: ${prompt.length} caracteres`)
          
          const genAI = new GoogleGenerativeAI(trimmedKey)
          const model = genAI.getGenerativeModel({ model: modelName })
          
          console.log(`   - Modelo criado, gerando conteúdo...`)
          const result = await model.generateContent(prompt)
          console.log(`   - Resultado recebido, processando resposta...`)
          
          const response = await result.response
          const text = response.text()
          
          console.log(`   - Texto extraído: ${text ? text.length + ' caracteres' : 'vazio'}`)
          
          if (text && text.trim()) {
            console.log(`✅ Resposta recebida via SDK ${modelName} (${text.length} caracteres)`)
            
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
          }
        } catch (sdkError) {
          console.log(`⚠️ SDK falhou para ${modelName}:`, sdkError.message)
          // Continuar tentando outros modelos
          continue
        }
      }
      
      // Se o SDK falhou, tentar API REST diretamente
      console.log('🔄 SDK não funcionou, tentando API REST diretamente...')
      const endpoints = [
        { 
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${trimmedKey}`, 
          model: 'gemini-1.5-flash (v1beta REST)' 
        },
        { 
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${trimmedKey}`, 
          model: 'gemini-pro (v1beta REST)' 
        },
        { 
          url: `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${trimmedKey}`, 
          model: 'gemini-1.5-flash (v1 REST)' 
        },
        { 
          url: `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${trimmedKey}`, 
          model: 'gemini-pro (v1 REST)' 
        }
      ]
      
      for (const endpoint of endpoints) {
        try {
          console.log(`🔄 Tentando endpoint REST: ${endpoint.model}`)
          
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

          console.log(`   - Status da resposta: ${response.status}`)

          if (response.ok) {
            const data = await response.json()
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
            
            if (text && text.trim()) {
              console.log(`✅ Resposta recebida via ${endpoint.model} (${text.length} caracteres)`)
              
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
            }
          } else {
            const errorData = await response.json().catch(() => ({}))
            console.log(`   - Erro ${response.status}:`, errorData.error?.message || 'Erro desconhecido')
            
            if (response.status === 401 || response.status === 403) {
              console.error('⚠️ API Key inválida ou sem permissões')
              throw new Error('API Key inválida')
            }
            
            if (response.status === 429) {
              console.error('⚠️ Limite de quota atingido')
              throw new Error('Quota excedida')
            }
          }
        } catch (fetchError) {
          if (fetchError.message?.includes('inválida') || fetchError.message?.includes('excedida')) {
            throw fetchError
          }
          continue
        }
      }
      
      console.warn('⚠️ Nenhum modelo funcionou, usando fallback')
      return null
      
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
      console.log('📊 Histórico de mensagens:', messages.length, 'mensagens')
      
      // Tentar obter resposta da IA primeiro
      console.log('🤖 Tentando obter resposta da IA...')
      const aiResponse = await Promise.race([
        getAIResponse(messageText, [...messages, userMessage]),
        new Promise((resolve) => setTimeout(() => {
          console.warn('⏱️ Timeout: A resposta da IA demorou mais de 15 segundos')
          resolve(null)
        }, 15000))
      ])
      
      if (aiResponse && aiResponse.text) {
        console.log('✅ Resposta da IA recebida:', aiResponse.text.substring(0, 100) + '...')
        // Usar resposta da IA
        const botResponse = { type: 'bot', text: aiResponse.text, links: aiResponse.links || [] }
        setMessages(prev => [...prev, botResponse])
        setIsLoading(false)
      } else {
        console.log('⚠️ Resposta da IA não disponível, usando fallback')
        console.log('   - aiResponse:', aiResponse)
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
      console.error('   - Tipo do erro:', error.constructor.name)
      console.error('   - Mensagem:', error.message)
      console.error('   - Stack:', error.stack)
      // Em caso de erro, usar fallback
      setTimeout(() => {
        const response = getFallbackResponse(messageText)
        const botResponse = { type: 'bot', text: response.text, links: response.links || [] }
        setMessages(prev => [...prev, botResponse])
        setIsLoading(false)
      }, 1000)
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

