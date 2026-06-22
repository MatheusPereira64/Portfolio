import { GoogleGenerativeAI } from '@google/generative-ai'
import { buildSystemPrompt } from '../data/assistantKnowledge'
import { canUseAI, incrementAIUsage, isGeminiConfigured } from './chatbotRateLimit'

const debug = import.meta.env.DEV
  ? (...args) => console.log('[Chatbot AI]', ...args)
  : () => {}

const MODELS = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro']

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

async function callGeminiDirect(systemPrompt, messageText, conversationHistory) {
  const key = import.meta.env.VITE_GEMINI_API_KEY?.trim()
  if (!key || !key.startsWith('AIza')) return null

  const historyText = conversationHistory
    .slice(-6)
    .map((msg) => `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
    .join('\n')

  const userPrompt = historyText
    ? `${historyText}\n\nUser: ${messageText}`
    : messageText

  const genAI = new GoogleGenerativeAI(key)

  for (const modelName of MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: systemPrompt,
      })
      const result = await model.generateContent(userPrompt)
      const text = result.response.text()?.trim()
      if (text) {
        debug('OK', modelName)
        return { text, links: extractLinks(text) }
      }
    } catch (err) {
      debug('Model failed', modelName, err.message)
    }
  }
  return null
}

/**
 * @returns {Promise<{ text: string, links: object[] } | null>}
 */
export async function getAIResponse(messageText, conversationHistory, language) {
  if (!canUseAI()) return null
  if (!isGeminiConfigured()) return null

  incrementAIUsage()
  const systemPrompt = buildSystemPrompt(language)

  try {
    const viaProxy = await callProxy(
      `${systemPrompt}\n\nUser: ${messageText}`,
      conversationHistory
    )
    if (viaProxy) return viaProxy

    return await callGeminiDirect(systemPrompt, messageText, conversationHistory)
  } catch (err) {
    debug('AI error', err.message)
    return null
  }
}

export { isGeminiConfigured, getRemainingAIMessages, canUseAI } from './chatbotRateLimit'
