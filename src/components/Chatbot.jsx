import { useState, useRef, useEffect, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { ASSISTANT_PERSONA } from '../data/assistantKnowledge'
import { profileImageUrl } from '../constants/siteProfile'
import { detectQuery, shouldTryAI } from '../utils/chatbotIntents'
import {
  getStructuredResponse,
  getGreeting,
  getDefaultQuickReplies,
} from '../utils/chatbotResponses'
import { getAIResponse, isGeminiConfigured, canUseAI } from '../utils/chatbotAI'
import { handleChatAction } from '../utils/chatbotActions'
import Icon from './Icon'
import './Chatbot.css'

const AI_TIMEOUT_MS = 12000
const NARROW_SCREEN = '(max-width: 480px)'

const RestartIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
    <path
      d="M4 12a8 8 0 1 0 2.6-5.9M4 4v4.5h4.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [quickReplies, setQuickReplies] = useState([])
  const logRef = useRef(null)
  const inputRef = useRef(null)
  const toggleRef = useRef(null)
  const { language, translations } = useLanguage()
  const copy = translations[language].nav

  const personaName = ASSISTANT_PERSONA.name[language] || ASSISTANT_PERSONA.name.en

  const startConversation = useCallback(() => {
    setMessages([{ type: 'bot', text: getGreeting(language), isGreeting: true }])
    setQuickReplies(getDefaultQuickReplies(language))
  }, [language])

  const pushBotMessage = useCallback((payload) => {
    setMessages((prev) => [
      ...prev,
      {
        type: 'bot',
        text: payload.text,
        links: payload.links || [],
      },
    ])
    setQuickReplies(payload.suggestedReplies || [])
  }, [])

  // Sem conversa em andamento, a saudação acompanha o idioma do site.
  useEffect(() => {
    if (!isOpen) return
    setMessages((prev) => {
      if (prev.length > 1 || (prev.length === 1 && !prev[0].isGreeting)) return prev
      setQuickReplies(getDefaultQuickReplies(language))
      return [{ type: 'bot', text: getGreeting(language), isGreeting: true }]
    })
  }, [isOpen, language])

  useEffect(() => {
    if (!isOpen) return undefined
    // Em tela de toque, focar o campo abriria o teclado por cima das sugestões.
    const touch = window.matchMedia('(pointer: coarse)').matches
    ;(touch ? logRef.current : inputRef.current)?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Resposta longa: mostra o começo dela, não o fim.
  useEffect(() => {
    const log = logRef.current
    if (!log) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const last = log.querySelector('.message:last-of-type')
    const showStart = !isLoading && last?.classList.contains('bot')
    log.scrollTo({
      top: showStart ? last.offsetTop - 12 : log.scrollHeight,
      behavior: reduced ? 'auto' : 'smooth',
    })
  }, [messages, isLoading])

  const processMessage = async (messageText) => {
    const trimmed = messageText.trim()
    if (!trimmed || isLoading) return

    const userMessage = { type: 'user', text: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setQuickReplies([])

    const query = detectQuery(trimmed, language)
    if (query) {
      pushBotMessage(getStructuredResponse(query, language))
      return
    }

    const tryAI = shouldTryAI(trimmed) && canUseAI() && isGeminiConfigured()
    if (!tryAI) {
      pushBotMessage(getStructuredResponse('default', language))
      return
    }

    setIsLoading(true)
    try {
      const history = [...messages, userMessage]
      const aiResponse = await Promise.race([
        getAIResponse(trimmed, history, language),
        new Promise((resolve) => setTimeout(() => resolve(null), AI_TIMEOUT_MS)),
      ])

      if (aiResponse?.text) {
        pushBotMessage({
          text: aiResponse.text,
          links: aiResponse.links,
          suggestedReplies: getDefaultQuickReplies(language),
        })
      } else {
        pushBotMessage(getStructuredResponse('default', language))
      }
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    processMessage(inputValue)
    setInputValue('')
  }

  // Em tela estreita o painel cobre a página: fecha para mostrar o destino.
  const runAction = (action) => {
    handleChatAction(action)
    if (window.matchMedia(NARROW_SCREEN).matches) setIsOpen(false)
  }

  const renderLink = (link, linkIndex) => {
    if (link.type === 'scroll') {
      return (
        <button
          key={linkIndex}
          type="button"
          className="message-link"
          onClick={() => runAction({ type: 'scroll', section: link.section })}
        >
          {link.label}
        </button>
      )
    }
    if (link.type === 'route') {
      return (
        <button
          key={linkIndex}
          type="button"
          className="message-link"
          onClick={() => runAction({ type: 'route', path: link.path })}
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
          className="message-link"
          onClick={() =>
            runAction({
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
      const external = link.url.startsWith('http')
      return (
        <a
          key={linkIndex}
          href={link.url}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
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
        type="button"
        ref={toggleRef}
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? copy.chatClose : copy.chatOpen}
        aria-expanded={isOpen}
        aria-controls="chatbot-panel"
      >
        <Icon name={isOpen ? 'times' : 'comments'} />
      </button>
      {isOpen && (
        <div className="chatbot-container" id="chatbot-panel" role="dialog" aria-label={personaName}>
          <div className="chatbot-header">
            <div className="chatbot-header__identity">
              <img
                className="chatbot-header__avatar"
                src={profileImageUrl()}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>{personaName}</h3>
                <span className="chatbot-header__subtitle">{copy.chatSubtitle}</span>
              </div>
            </div>
            <div className="chatbot-header__actions">
              <button
                type="button"
                onClick={startConversation}
                aria-label={copy.chatRestart}
                title={copy.chatRestart}
              >
                <RestartIcon />
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  toggleRef.current?.focus()
                }}
                aria-label={copy.chatClose}
                title={copy.chatClose}
              >
                <Icon name="times" />
              </button>
            </div>
          </div>
          <div
            className="chatbot-messages"
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label={copy.chatLog}
            tabIndex={0}
          >
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
                <div className="message-content" role="status" aria-label={copy.chatTyping}>
                  <div className="typing-indicator" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            {!isLoading && quickReplies.length > 0 && (
              <div className="quick-replies">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    className="quick-reply-btn"
                    onClick={() => processMessage(reply)}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
          <form className="chatbot-input" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={copy.chatPlaceholder}
              aria-label={copy.chatInput}
              maxLength={500}
            />
            <button type="submit" aria-label={copy.chatSend} disabled={isLoading || !inputValue.trim()}>
              <Icon name="paper-plane" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default Chatbot
