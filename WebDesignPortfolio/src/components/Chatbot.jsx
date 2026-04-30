import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { GoogleGenerativeAI } from '@google/generative-ai'
import './Chatbot.css'
import { SITE_PROFILE as PROFILE, CV_FILENAME } from '../constants/siteProfile'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const { translations, language } = useLanguage()
  const t = translations[language]

  const cvHref = `${import.meta.env.BASE_URL}curriculo/${encodeURIComponent(CV_FILENAME)}`

  const greetings = {
    pt: ['Olá! Como posso ajudar?', 'Oi! Em que posso ajudar?', 'Olá! Precisa de algo?'],
    en: ['Hello! How can I help?', 'Hi! What can I do for you?', 'Hello! Need something?'],
    es: ['¡Hola! ¿Cómo puedo ayudar?', '¡Hola! ¿En qué puedo ayudar?', '¡Hola! ¿Necesitas algo?']
  }

  const quickReplies = {
    pt: ['Contato', 'Currículo', 'LinkedIn', 'GitHub', 'Projetos'],
    en: ['Contact', 'Résumé', 'LinkedIn', 'GitHub', 'Projects'],
    es: ['Contacto', 'CV', 'LinkedIn', 'GitHub', 'Proyectos']
  }

  const responses = {
    pt: {
      contato: {
        text: `Aqui estão os dados para falar com ${PROFILE.shortName}:

📧 Email: ${PROFILE.email}
📱 Telefone/WhatsApp: ${PROFILE.phoneDisplayPt}`,
        links: [
          { label: `📧 ${PROFILE.email}`, plain: true },
          { label: `📱 ${PROFILE.phoneDisplayPt}`, plain: true },
          { label: '🔗 LinkedIn', url: PROFILE.linkedin },
          { label: '🔗 GitHub', url: PROFILE.github }
        ]
      },
      cv: {
        text: 'Podes baixar o currículo em PDF pelo link abaixo ou pelo botão “Baixar CV” na secção Contacto.',
        links: [{ label: '📄 Baixar CV (PDF)', url: cvHref }]
      },
      linkedin: {
        text: 'Perfil profissional no LinkedIn:',
        links: [{ label: '🔗 LinkedIn — Matheus Pereira', url: PROFILE.linkedin }]
      },
      github: {
        text: 'Repositórios e projetos no GitHub:',
        links: [{ label: '🔗 GitHub — MatheusPereira64', url: PROFILE.github }]
      },
      portfolio: {
        text: 'Este site é o portfólio online:',
        links: [{ label: '🌐 Ver portfólio', url: PROFILE.portfolioUrl }]
      },
      projetos: {
        text: 'Os projetos estão na secção “Projetos” deste site — faz scroll até lá ou usa o menu.',
        links: [{ label: '🌐 Abrir portfólio', url: '#teams' }]
      },
      habilidades: {
        text: 'Stack principal: React, Node.js, JavaScript, Python e desenvolvimento Full Stack. Mais detalhes na secção “Habilidades”.',
        links: [{ label: '🌐 Secção Habilidades', url: `${PROFILE.portfolioUrl}#skills` }]
      },
      sobre: {
        text: `${PROFILE.fullName} — desenvolvedor Full Stack (ADS no ITEGAM). Mais na secção “Sobre mim”.`,
        links: [
          { label: '🌐 Sobre mim', url: `${PROFILE.portfolioUrl}#about` },
          { label: `📧 ${PROFILE.email}`, plain: true }
        ]
      },
      default: {
        text: `Sou ${PROFILE.fullName}.

📧 ${PROFILE.email}
📱 ${PROFILE.phoneDisplayPt}

Posso também indicar LinkedIn, GitHub ou o currículo em PDF — usa um botão ou escreve “contato”, “currículo”, etc.`,
        links: [
          { label: `📧 ${PROFILE.email}`, plain: true },
          { label: `📱 ${PROFILE.phoneDisplayPt}`, plain: true },
          { label: '🔗 LinkedIn', url: PROFILE.linkedin },
          { label: '🔗 GitHub', url: PROFILE.github },
          { label: '📄 Baixar CV', url: cvHref }
        ]
      }
    },
    en: {
      contact: {
        text: `Here is how to reach ${PROFILE.shortName}:

📧 Email: ${PROFILE.email}
📱 Phone/WhatsApp: ${PROFILE.phoneDisplayEn}`,
        links: [
          { label: `📧 ${PROFILE.email}`, plain: true },
          { label: `📱 ${PROFILE.phoneDisplayEn}`, plain: true },
          { label: '🔗 LinkedIn', url: PROFILE.linkedin },
          { label: '🔗 GitHub', url: PROFILE.github }
        ]
      },
      cv: {
        text: 'You can download the résumé as PDF below, or use the “Download CV” button in the Contact section.',
        links: [{ label: '📄 Download CV (PDF)', url: cvHref }]
      },
      linkedin: {
        text: 'Professional profile on LinkedIn:',
        links: [{ label: '🔗 LinkedIn — Matheus Pereira', url: PROFILE.linkedin }]
      },
      github: {
        text: 'Repositories on GitHub:',
        links: [{ label: '🔗 GitHub — MatheusPereira64', url: PROFILE.github }]
      },
      portfolio: {
        text: 'Live portfolio:',
        links: [{ label: '🌐 Open portfolio', url: PROFILE.portfolioUrl }]
      },
      projects: {
        text: 'Projects are in the “Projects” section — scroll there or use the navigation.',
        links: [{ label: '🌐 Projects on site', url: '#teams' }]
      },
      skills: {
        text: 'Main stack: React, Node.js, JavaScript, Python, Full Stack. See the “Skills” section for more.',
        links: [{ label: '🌐 Skills section', url: `${PROFILE.portfolioUrl}#skills` }]
      },
      about: {
        text: `${PROFILE.fullName} — Full Stack developer (Systems Analysis & Development). More in “About me”.`,
        links: [
          { label: '🌐 About me', url: `${PROFILE.portfolioUrl}#about` },
          { label: `📧 ${PROFILE.email}`, plain: true }
        ]
      },
      default: {
        text: `I'm ${PROFILE.fullName}.

📧 ${PROFILE.email}
📱 ${PROFILE.phoneDisplayEn}

You can also ask for LinkedIn, GitHub or my résumé — or use a quick reply.`,
        links: [
          { label: `📧 ${PROFILE.email}`, plain: true },
          { label: `📱 ${PROFILE.phoneDisplayEn}`, plain: true },
          { label: '🔗 LinkedIn', url: PROFILE.linkedin },
          { label: '🔗 GitHub', url: PROFILE.github },
          { label: '📄 Download CV', url: cvHref }
        ]
      }
    },
    es: {
      contacto: {
        text: `Datos para contactar a ${PROFILE.shortName}:

📧 Correo: ${PROFILE.email}
📱 Teléfono/WhatsApp: ${PROFILE.phoneDisplayPt}`,
        links: [
          { label: `📧 ${PROFILE.email}`, plain: true },
          { label: `📱 ${PROFILE.phoneDisplayPt}`, plain: true },
          { label: '🔗 LinkedIn', url: PROFILE.linkedin },
          { label: '🔗 GitHub', url: PROFILE.github }
        ]
      },
      cv: {
        text: 'Puedes descargar el currículum en PDF aquí o con el botón “Descargar CV” en Contacto.',
        links: [{ label: '📄 Descargar CV (PDF)', url: cvHref }]
      },
      linkedin: {
        text: 'Perfil en LinkedIn:',
        links: [{ label: '🔗 LinkedIn — Matheus Pereira', url: PROFILE.linkedin }]
      },
      github: {
        text: 'Proyectos en GitHub:',
        links: [{ label: '🔗 GitHub — MatheusPereira64', url: PROFILE.github }]
      },
      portfolio: {
        text: 'Portafolio en línea:',
        links: [{ label: '🌐 Ver portafolio', url: PROFILE.portfolioUrl }]
      },
      proyectos: {
        text: 'Los proyectos están en la sección “Proyectos” de esta página.',
        links: [{ label: '🌐 Abrir portafolio', url: '#teams' }]
      },
      habilidades: {
        text: 'Stack: React, Node.js, JavaScript, Python, Full Stack. Más en “Habilidades”.',
        links: [{ label: '🌐 Sección Habilidades', url: `${PROFILE.portfolioUrl}#skills` }]
      },
      sobre: {
        text: `${PROFILE.fullName} — desarrollador Full Stack. Más en “Sobre mí”.`,
        links: [
          { label: '🌐 Sobre mí', url: `${PROFILE.portfolioUrl}#about` },
          { label: `📧 ${PROFILE.email}`, plain: true }
        ]
      },
      default: {
        text: `Soy ${PROFILE.fullName}.

📧 ${PROFILE.email}
📱 ${PROFILE.phoneDisplayPt}

También puedo indicarte LinkedIn, GitHub o el CV en PDF.`,
        links: [
          { label: `📧 ${PROFILE.email}`, plain: true },
          { label: `📱 ${PROFILE.phoneDisplayPt}`, plain: true },
          { label: '🔗 LinkedIn', url: PROFILE.linkedin },
          { label: '🔗 GitHub', url: PROFILE.github },
          { label: '📄 Descargar CV', url: cvHref }
        ]
      }
    }
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting =
        greetings[language][Math.floor(Math.random() * greetings[language].length)]
      setMessages([{ type: 'bot', text: greeting }])
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
        - Nome: ${PROFILE.fullName}
        - Email: ${PROFILE.email}
        - Telefone (DDI): ${PROFILE.phoneDigits} (${PROFILE.phoneDisplayPt})
        - LinkedIn: ${PROFILE.linkedin}
        - GitHub: ${PROFILE.github}
        - Habilidades: React, Node.js, JavaScript, Python, Full Stack Development
        - Formação: Análise e Desenvolvimento de Sistemas no ITEGAM
        
        Seja amigável, profissional e responda de forma concisa. Quando perguntarem sobre contato, LinkedIn ou GitHub, forneça os links diretamente.`
        : language === 'es'
        ? `Eres un asistente virtual del portafolio de Matheus Pereira, un desarrollador Full Stack.
        Información importante:
        - Nombre: ${PROFILE.fullName}
        - Email: ${PROFILE.email}
        - Teléfono (DDI): ${PROFILE.phoneDigits} (${PROFILE.phoneDisplayPt})
        - LinkedIn: ${PROFILE.linkedin}
        - GitHub: ${PROFILE.github}
        - Habilidades: React, Node.js, JavaScript, Python, Desarrollo Full Stack
        - Formación: Análisis y Desarrollo de Sistemas en ITEGAM
        
        Sé amigable, profesional y responde de forma concisa. Cuando pregunten sobre contacto, LinkedIn o GitHub, proporciona los enlaces directamente.`
        : `You are a virtual assistant for Matheus Pereira's portfolio, a Full Stack Developer.
        Important information:
        - Name: ${PROFILE.fullName}
        - Email: ${PROFILE.email}
        - Phone (country code): ${PROFILE.phoneDigits} (${PROFILE.phoneDisplayEn})
        - LinkedIn: ${PROFILE.linkedin}
        - GitHub: ${PROFILE.github}
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
    const ascii = lowerInput.normalize('NFD').replace(/\p{M}/gu, '')
    let responseKey = 'default'

    if (
      lowerInput.includes('contato') ||
      lowerInput.includes('contact') ||
      lowerInput.includes('contacto') ||
      lowerInput.includes('email') ||
      lowerInput.includes('correo') ||
      lowerInput.includes('telefone') ||
      lowerInput.includes('phone') ||
      lowerInput.includes('teléfono') ||
      lowerInput.includes('telefono')
    ) {
      responseKey = language === 'pt' ? 'contato' : language === 'es' ? 'contacto' : 'contact'
    } else if (
      lowerInput.includes('currículo') ||
      lowerInput.includes('curriculo') ||
      lowerInput.includes('curriculum') ||
      ascii.includes('resume') ||
      lowerInput.includes('résumé') ||
      lowerInput.includes('cv') ||
      lowerInput === 'cv'
    ) {
      responseKey = 'cv'
    } else if (lowerInput.includes('linkedin')) {
      responseKey = 'linkedin'
    } else if (lowerInput.includes('github') || lowerInput.includes('git')) {
      responseKey = 'github'
    } else if (
      lowerInput.includes('portfólio') ||
      lowerInput.includes('portfolio') ||
      lowerInput.includes('portafolio') ||
      lowerInput.includes('website') ||
      lowerInput.includes('página') ||
      lowerInput.includes('pagina') ||
      lowerInput.includes('site')
    ) {
      responseKey = 'portfolio'
    } else if (
      lowerInput.includes('projeto') ||
      lowerInput.includes('project') ||
      lowerInput.includes('proyecto') ||
      lowerInput.includes('trabalho') ||
      lowerInput.includes('work')
    ) {
      responseKey = language === 'pt' ? 'projetos' : language === 'es' ? 'proyectos' : 'projects'
    } else if (
      lowerInput.includes('habilidade') ||
      lowerInput.includes('skill') ||
      lowerInput.includes('tecnologia') ||
      lowerInput.includes('technology') ||
      lowerInput.includes('tecnología') ||
      lowerInput.includes('stack')
    ) {
      responseKey = language === 'pt' ? 'habilidades' : language === 'es' ? 'habilidades' : 'skills'
    } else if (
      lowerInput.includes('sobre') ||
      lowerInput.includes('about') ||
      lowerInput.includes('quem') ||
      lowerInput.includes('who')
    ) {
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
                      {msg.links.map((link, linkIndex) =>
                        link.plain ? (
                          <span key={linkIndex} className="message-chip message-chip--static">
                            {link.label}
                          </span>
                        ) : link.url ? (
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
                          <span key={linkIndex} className="message-link-text">
                            {link.text ? `${link.label}: ${link.text}` : link.label}
                          </span>
                        )
                      )}
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
            {!isLoading && messages.length > 0 && messages.every((m) => m.type === 'bot') && (
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

