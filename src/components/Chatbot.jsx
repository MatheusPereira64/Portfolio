import { useState, useRef, useEffect, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { ASSISTANT_PERSONA } from '../data/assistantKnowledge'
import { profileImageUrl } from '../constants/siteProfile'
import { detectIntent, shouldTryAI } from '../utils/chatbotIntents'
import {
  getStructuredResponse,
  getGreeting,
  getDefaultQuickReplies,
  getAiUnavailableMessage,
} from '../utils/chatbotResponses'
import { getAIResponse, isGeminiConfigured, canUseAI } from '../utils/chatbotAI'
import { handleChatAction } from '../utils/chatbotActions'
import './Chatbot.css'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [quickReplies, setQuickReplies] = useState([])
  const messagesEndRef = useRef(null)
  const { language } = useLanguage()

  const personaName = ASSISTANT_PERSONA.name[language] || ASSISTANT_PERSONA.en

  const pushBotMessage = useCallback((payload) => {
    setMessages((prev) => [
      ...prev,
      {
        type: 'bot',
        text: payload.text,
        links: payload.links || [],
      },
    ])
    if (payload.suggestedReplies?.length) {
      setQuickReplies(payload.suggestedReplies)
    }
  }, [])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ type: 'bot', text: getGreeting(language) }])
      setQuickReplies(getDefaultQuickReplies(language))
    }
  }, [isOpen, language, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const processMessage = async (messageText) => {
    const trimmed = messageText.trim()
    if (!trimmed) return

    const userMessage = { type: 'user', text: trimmed }
    setMessages((prev) => [...prev, userMessage])

    const intent = detectIntent(trimmed, language)

    if (intent) {
      const response = getStructuredResponse(intent, language)
      pushBotMessage(response)
      return
    }

    const tryAI = shouldTryAI(trimmed, intent) && canUseAI() && isGeminiConfigured()

    if (!tryAI) {
      if (shouldTryAI(trimmed, intent) && !canUseAI()) {
        const response = getStructuredResponse('default', language)
        pushBotMessage({
          text: `${getAiUnavailableMessage(language, 'rate_limit')}\n\n${response.text}`,
          links: response.links,
          suggestedReplies: response.suggestedReplies,
        })
        return
      }
      if (shouldTryAI(trimmed, intent) && !isGeminiConfigured()) {
        const response = getStructuredResponse('default', language)
        pushBotMessage({
          text: `${getAiUnavailableMessage(language, 'no_key')}\n\n${response.text}`,
          links: response.links,
          suggestedReplies: response.suggestedReplies,
        })
        return
      }
      const response = getStructuredResponse('default', language)
      pushBotMessage(response)
      return
    }

    setIsLoading(true)
    try {
      const history = [...messages, userMessage]
      const aiResponse = await Promise.race([
        getAIResponse(trimmed, history, language),
        new Promise((resolve) => setTimeout(() => resolve(null), 12000)),
      ])

      if (aiResponse?.text) {
        pushBotMessage({
          text: aiResponse.text,
          links: aiResponse.links,
          suggestedReplies: getDefaultQuickReplies(language),
        })
      } else {
        const response = getStructuredResponse('default', language)
        pushBotMessage({
          text: `${getAiUnavailableMessage(language, 'error')}\n\n${response.text}`,
          links: response.links,
          suggestedReplies: response.suggestedReplies,
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickReply = (reply) => processMessage(reply)

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    processMessage(inputValue)
    setInputValue('')
  }

  const renderLink = (link, linkIndex) => {
    if (link.type === 'plain' || link.plain) {
      return (
        <span key={linkIndex} className="message-chip message-chip--static">
          {link.label}
        </span>
      )
    }
    if (link.type === 'scroll') {
      return (
        <button
          key={linkIndex}
          type="button"
          className="message-link message-link--action"
          onClick={() => handleChatAction({ type: 'scroll', section: link.section })}
        >
          {link.label}
        </button>
      )
    }
    if (link.type === 'contact') {
      return (
        <button
          key={linkIndex}
          type="button"
          className="message-link message-link--action"
          onClick={() =>
            handleChatAction({
              type: 'contact',
              subject: link.subject,
              message: link.message,
            })
          }
        >
          {link.label}
        </button>
      )
    }
    if (link.url) {
      return (
        <a
          key={linkIndex}
          href={link.url}
          target={link.url.startsWith('http') ? '_blank' : undefined}
          rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="message-link"
        >
          {link.label}
        </a>
      )
    }
    return null
  }

  return (
    <>
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={language === 'pt' ? 'Abrir assistente' : 'Open assistant'}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comments'}`}></i>
      </button>
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <div className="chatbot-header__identity">
              <img
                className="chatbot-header__avatar"
                src={profileImageUrl()}
                alt=""
                width={40}
                height={40}
              />
              <div>
                <h3>{personaName}</h3>
                <span className="chatbot-header__subtitle">
                  {language === 'pt'
                    ? 'Portfólio de Matheus Pereira'
                    : language === 'es'
                      ? 'Portafolio de Matheus Pereira'
                      : "Matheus Pereira's portfolio"}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label={language === 'pt' ? 'Fechar' : 'Close'}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <div className="message-content">
                  {msg.text}
                  {msg.links?.length > 0 && (
                    <div className="message-links">
                      {msg.links.map((link, linkIndex) => renderLink(link, linkIndex))}
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
            {!isLoading && quickReplies.length > 0 && (
              <div className="quick-replies">
                {quickReplies.map((reply, index) => (
                  <button
                    key={`${reply}-${index}`}
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
              placeholder={
                language === 'pt'
                  ? 'Digite sua mensagem...'
                  : language === 'es'
                    ? 'Escribe tu mensaje...'
                    : 'Type your message...'
              }
              aria-label="Chat message"
              disabled={isLoading}
            />
            <button type="submit" aria-label="Send" disabled={isLoading || !inputValue.trim()}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Chatbot
