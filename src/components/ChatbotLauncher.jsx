import { Suspense, lazy, useCallback, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import Icon from './Icon'
import './ChatbotLauncher.css'

const loadChatbot = () => import('./Chatbot')
const Chatbot = lazy(loadChatbot)

/**
 * Botão do assistente. O painel, com as respostas e os dados do portfólio,
 * só é baixado na primeira abertura (ou antes, quando o mouse/foco chega ao botão).
 * Depois de carregado, ele fica montado para manter a conversa entre aberturas.
 */
const ChatbotLauncher = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const toggleRef = useRef(null)
  const { language, translations } = useLanguage()
  const copy = translations[language].nav

  const close = useCallback((restoreFocus = true) => {
    setIsOpen(false)
    if (restoreFocus) toggleRef.current?.focus()
  }, [])

  const toggle = () => {
    setHasLoaded(true)
    setIsOpen((open) => !open)
  }

  return (
    <>
      <button
        type="button"
        ref={toggleRef}
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggle}
        onPointerEnter={loadChatbot}
        onFocus={loadChatbot}
        aria-label={isOpen ? copy.chatClose : copy.chatOpen}
        aria-expanded={isOpen}
        aria-controls={isOpen ? 'chatbot-panel' : undefined}
      >
        <Icon name={isOpen ? 'times' : 'comments'} />
      </button>
      {hasLoaded && (
        <Suspense fallback={null}>
          <Chatbot isOpen={isOpen} onClose={close} />
        </Suspense>
      )}
    </>
  )
}

export default ChatbotLauncher
