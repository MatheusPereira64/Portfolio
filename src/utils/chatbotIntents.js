const QUICK_REPLY_INTENTS = {
  pt: {
    Contato: 'contact',
    Currículo: 'cv',
    LinkedIn: 'linkedin',
    GitHub: 'github',
    Projetos: 'projects',
    Experiência: 'experience',
    Formação: 'education',
    WhatsApp: 'whatsapp',
    Mensagem: 'message',
  },
  en: {
    Contact: 'contact',
    Résumé: 'cv',
    'Resume': 'cv',
    LinkedIn: 'linkedin',
    GitHub: 'github',
    Projects: 'projects',
    Experience: 'experience',
    Education: 'education',
    WhatsApp: 'whatsapp',
    Message: 'message',
  },
  es: {
    Contacto: 'contact',
    CV: 'cv',
    LinkedIn: 'linkedin',
    GitHub: 'github',
    Proyectos: 'projects',
    Experiencia: 'experience',
    Formación: 'education',
    WhatsApp: 'whatsapp',
    Mensaje: 'message',
  },
}

/** Word-boundary intent synonyms — avoid substring traps like "git" in "digital" */
const INTENT_PATTERNS = {
  contact: [
    /\b(contato|contacto|contact|email|e-mail|correo|telefone|phone|tel[eé]fono|falar|reach|escribir|escrever)\b/i,
    /\b(como\s+(entrar|falar|contactar|contactar-me|me\s+contactar))\b/i,
    /\b(how\s+to\s+(reach|contact|get\s+in\s+touch))\b/i,
  ],
  cv: [
    /\b(curr[ií]culo|curriculum|curriculo|r[eé]sum[eé]|resume|cv\b|download\s+cv|baixar\s+cv)\b/i,
  ],
  linkedin: [/\blinkedin\b/i],
  github: [/\bgithub\b/i, /\breposit[oó]ri(o|os)\b/i, /\brepositor(y|ies)\b/i],
  whatsapp: [/\bwhatsapp\b/i, /\bwhats\s*app\b/i],
  portfolio: [/\bportf[oó]lio\b/i, /\bportafolio\b/i, /\bwebsite\b/i, /\bsite\b/i],
  projects: [
    /\bprojeto(s)?\b/i,
    /\bproyecto(s)?\b/i,
    /\bprojects?\b/i,
    /\btrabalho(s)?\b/i,
    /\bwork\s+samples?\b/i,
    /\bwhat\s+.*\b(build|built|develop)\b/i,
  ],
  skills: [
    /\bhabilidade(s)?\b/i,
    /\bhabilidad(es)?\b/i,
    /\bskills?\b/i,
    /\bstack\b/i,
    /\btecnolog(ias?|ías?|y)\b/i,
    /\breact\b/i,
    /\bnode\.?js\b/i,
  ],
  about: [/\bsobre\b/i, /\babout\b/i, /\bquem\s+[eé]\b/i, /\bwho\s+is\b/i, /\bquien\s+es\b/i],
  experience: [
    /\bexperi[eê]ncia\b/i,
    /\bexperiencia\b/i,
    /\bexperience\b/i,
    /\bhist[oó]rico\b/i,
    /\bwork\s+history\b/i,
    /\btrajet[oó]ria\b/i,
  ],
  education: [
    /\bform[aã]o\b/i,
    /\bformaci[oó]n\b/i,
    /\beducation\b/i,
    /\bfaculdade\b/i,
    /\buniversidad\b/i,
    /\buniversity\b/i,
    /\bfametro\b/i,
    /\bitegam\b/i,
    /\bflexpeak\b/i,
    /\bengenharia\b/i,
    /\bengineering\b/i,
  ],
  languages: [
    /\bingl[eê]s\b/i,
    /\benglish\b/i,
    /\bidioma(s)?\b/i,
    /\blanguage(s)?\b/i,
    /\bc1\b/i,
    /\bicbeu\b/i,
    /\bespanhol\b/i,
    /\bspanish\b/i,
  ],
  availability: [
    /\bdispon[ií]vel\b/i,
    /\bavailable\b/i,
    /\bopen\s+to\s+work\b/i,
    /\bcontrat(o|ar)\b/i,
    /\bhire\b/i,
    /\bcontrat(a|ar|o)\b/i,
    /\bfreelance\b/i,
    /\bremoto\b/i,
    /\bremote\b/i,
    /\bsal[aá]rio\b/i,
    /\bsalary\b/i,
    /\bpretens[aã]o\b/i,
    /\brate\b/i,
    /\bvaga(s)?\b/i,
    /\bjob(s)?\b/i,
    /\binternational\b/i,
    /\binternacional\b/i,
  ],
  industry: [
    /\bindustry\s*4\.?0\b/i,
    /\bind[uú]stria\b/i,
    /\bmanufactur/i,
    /\bmes\b/i,
    /\bprodu[cç][aã]o\b/i,
    /\bproduction\b/i,
    /\bquality\b/i,
    /\bqualidade\b/i,
    /\bdashboard\b/i,
  ],
  leadership: [
    /\blideran[cç]a\b/i,
    /\bleadership\b/i,
    /\bproject\s+manager\b/i,
    /\bgest[aã]o\s+de\s+projeto\b/i,
    /\bgestion\s+de\s+proyecto\b/i,
    /\bstakeholder\b/i,
    /\brequisitos\b/i,
    /\brequirements\b/i,
  ],
  career: [
    /\bcareer\s+goal\b/i,
    /\bobjetivo(s)?\s+de\s+carreira\b/i,
    /\bmeta(s)?\s+profission/i,
    /\bfuture\s+role\b/i,
    /\bwhat\s+role\b/i,
    /\bque\s+cargo\b/i,
  ],
  blog: [/\bblog\b/i, /\bartigo(s)?\b/i, /\bposts?\b/i, /\bpublica[cç][aã]o\b/i],
  message: [
    /\benviar\s+mensagem\b/i,
    /\bsend\s+(a\s+)?message\b/i,
    /\bformul[aá]rio\b/i,
    /\bcontact\s+form\b/i,
  ],
}

export const STRUCTURED_INTENTS = Object.keys(INTENT_PATTERNS)

function normalize(text) {
  return text.trim().normalize('NFD').replace(/\p{M}/gu, '')
}

/**
 * @returns {string|null} intent id, or null → use AI / default
 */
export function detectIntent(messageText, language) {
  const trimmed = messageText.trim()
  if (!trimmed) return null

  const quickMap = QUICK_REPLY_INTENTS[language] || QUICK_REPLY_INTENTS.en
  if (quickMap[trimmed]) return quickMap[trimmed]

  const lower = trimmed.toLowerCase()
  const ascii = normalize(lower)

  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(lower) || pattern.test(ascii)) {
        return intent
      }
    }
  }

  return null
}

/** Complex questions without clear intent → prefer AI */
export function shouldTryAI(messageText, intent) {
  if (intent) return false
  const q = messageText.trim()
  if (q.length < 12) return false
  return /\?|^(what|how|why|which|tell|explain|describe|quais|qual|como|quanto|por que|cu[aá]l|cu[aá]nto)/i.test(q)
}
