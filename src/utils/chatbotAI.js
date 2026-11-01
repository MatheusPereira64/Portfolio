import { buildSystemPrompt } from '../data/assistantKnowledge'
import { canUseAI, incrementAIUsage, isGeminiConfigured } from './chatbotRateLimit'

const RECENT_MESSAGES = 4
const RECENT_MESSAGE_CHARS = 200
const MAX_QUESTION_CHARS = 300
/** O proxy recusa prompts maiores que isto (api/gemini-proxy.example.mjs). */
const MAX_PROMPT_CHARS = 8000

const debug = import.meta.env.DEV
  ? (...args) => console.log('[Chatbot AI]', ...args)
  : () => {}

function extractLinks(text) {
  const links = []
  const linkRegex = /(https?:\/\/[^\s)]+)/g
  const found = text.match(linkRegex)
  if (!found) return links
  found.forEach((url) => {
    if (url.includes('linkedin.com')) links.push({ label: '🔗 LinkedIn', url })
    else if (url.includes('github.com')) links.push({ label: '🔗 GitHub', url })
    else if (url.includes('wa.me')) links.push({ label: '💬 WhatsApp', url })
  })
  return links
}

async function callProxy(prompt) {
  const proxyUrl = import.meta.env.VITE_GEMINI_PROXY_URL?.trim()
  if (!proxyUrl) return null

  const response = await fetch(proxyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  if (!response.ok) {
    debug('Proxy error', response.status)
    return null
  }

  const data = await response.json()
  const text = data.text || data.reply || ''
  if (!text.trim()) return null
  return { text: text.trim(), links: extractLinks(text) }
}

/**
 * IA só via proxy (`VITE_GEMINI_PROXY_URL`). A chave permanece no servidor.
 * @returns {Promise<{ text: string, links: object[] } | null>}
 */
export async function getAIResponse(messageText, conversationHistory, language) {
  if (!canUseAI()) return null
  if (!isGeminiConfigured()) return null

  incrementAIUsage()
  const systemPrompt = buildSystemPrompt(language)

  try {
    const recent = conversationHistory
      .slice(-RECENT_MESSAGES - 1, -1)
      .map((message) => `${message.type === 'user' ? 'User' : 'Assistant'}: ${message.text.slice(0, RECENT_MESSAGE_CHARS)}`)
      .join('\n')
    const question = `\n\nUser: ${messageText.slice(0, MAX_QUESTION_CHARS)}`
    const header = '\n\nConversation so far:\n'
    const room = MAX_PROMPT_CHARS - systemPrompt.length - question.length - header.length
    const conversation = recent && room > 0 ? `${header}${recent.slice(-room)}` : ''
    return await callProxy(`${systemPrompt}${conversation}${question}`)
  } catch (err) {
    debug('AI error', err.message)
    return null
  }
}

export { isGeminiConfigured, getRemainingAIMessages, canUseAI } from './chatbotRateLimit'
