import { buildSystemPrompt } from '../data/assistantKnowledge'
import { canUseAI, incrementAIUsage, isGeminiConfigured } from './chatbotRateLimit'

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

async function callProxy(prompt, history) {
  const proxyUrl = import.meta.env.VITE_GEMINI_PROXY_URL?.trim()
  if (!proxyUrl) return null

  const response = await fetch(proxyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, history }),
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
    return await callProxy(
      `${systemPrompt}\n\nUser: ${messageText}`,
      conversationHistory
    )
  } catch (err) {
    debug('AI error', err.message)
    return null
  }
}

export { isGeminiConfigured, getRemainingAIMessages, canUseAI } from './chatbotRateLimit'
