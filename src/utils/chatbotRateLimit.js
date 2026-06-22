const STORAGE_KEY = 'portfolio_chatbot_ai_count'
export const AI_MESSAGE_LIMIT = 10

export function getAIUsageCount() {
  try {
    return parseInt(sessionStorage.getItem(STORAGE_KEY) || '0', 10) || 0
  } catch {
    return 0
  }
}

export function incrementAIUsage() {
  try {
    const next = getAIUsageCount() + 1
    sessionStorage.setItem(STORAGE_KEY, String(next))
    return next
  } catch {
    return AI_MESSAGE_LIMIT
  }
}

export function getRemainingAIMessages() {
  return Math.max(0, AI_MESSAGE_LIMIT - getAIUsageCount())
}

export function canUseAI() {
  return getAIUsageCount() < AI_MESSAGE_LIMIT
}

export function isGeminiConfigured() {
  const key = (import.meta.env.VITE_GEMINI_API_KEY || '').trim()
  const proxy = (import.meta.env.VITE_GEMINI_PROXY_URL || '').trim()
  if (proxy) return true
  return key.length > 0 && key !== 'sua_chave_aqui' && key.startsWith('AIza')
}
