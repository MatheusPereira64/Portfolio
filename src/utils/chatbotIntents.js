import { PROJECTS } from '../data/projects'
import { SKILLS } from '../data/assistantKnowledge'
import { SKILL_GROUPS } from '../data/skillGroups'

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
    Disponibilidade: 'availability',
    Tecnologias: 'skills',
    Serviços: 'services',
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
    Availability: 'availability',
    Technologies: 'skills',
    Services: 'services',
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
    Disponibilidad: 'availability',
    Tecnologías: 'skills',
    Servicios: 'services',
  },
}

/** Nome curto (botões) e termos que identificam cada projeto em uma pergunta. */
export const PROJECT_SHORT_NAMES = {
  4: { label: 'Cunoku', terms: ['cunoku'] },
  9: { label: 'TraceMind', terms: ['tracemind', 'trace mind'] },
  1: { label: 'Manufatura', terms: ['manufatura', 'manufactura', 'manufacturing system'] },
  2: { label: 'Parametrização', terms: ['parametrizacao', 'parametrizacion', 'parameterization'] },
  3: { label: 'Monitoramento', terms: ['monitoramento', 'monitoreo', 'monitoring'] },
  5: { label: 'Nexo Assist', terms: ['nexo'] },
  6: { label: 'MP Agenda', terms: ['mp agenda', 'agendamento'] },
  7: { label: 'FinTrack', terms: ['fintrack'] },
  8: { label: 'WinCare', terms: ['wincare'] },
}

/**
 * Word-boundary intent synonyms — avoid substring traps like "git" in "digital".
 * A ordem importa: do mais específico para o mais genérico.
 */
const INTENT_PATTERNS = {
  message: [
    /\benviar\s+mensagem\b/i,
    /\bsend\s+(a\s+)?message\b/i,
    /\bformul[aá]rio\b/i,
    /\bcontact\s+form\b/i,
  ],
  whatsapp: [/\bwhats\s*app\b/i, /\bzap\b/i],
  linkedin: [/\blinkedin\b/i],
  github: [/\bgithub\b/i, /\breposit[oó]ri(o|os)\b/i, /\brepositor(y|ies)\b/i],
  cv: [
    /\b(curr[ií]culo|curriculum|curriculo|r[eé]sum[eé]|resume|cv\b|download\s+cv|baixar\s+cv)\b/i,
  ],
  blog: [/\bblog\b/i, /\bartigo(s)?\b/i, /\barticles?\b/i, /\bposts?\b/i, /\bpublica[cç][aã]o\b/i],
  location: [
    /\bonde\s+(ele\s+|voc[eê]\s+|o\s+matheus\s+)?(mora|fica|vive|reside)\b/i,
    /\bd[eo]\s+onde\s+[eé]\b/i,
    /\bcidade\b/i,
    /\bwhere\s+(is|does|do)\b.*\b(based|live|located|from)\b/i,
    /\bd[oó]nde\s+(vive|est[aá]|es)\b/i,
    /\bciudad\b/i,
  ],
  currentRole: [
    /\bonde\s+(ele\s+|voc[eê]\s+|o\s+matheus\s+)?trabalha\b/i,
    /\bcargo\s+atual\b/i,
    /\bempresa\s+atual\b/i,
    /\bwhere\s+(does|do)\b.*\bwork\b/i,
    /\bcurrent\s+(role|job|position|company)\b/i,
    /\bd[oó]nde\s+trabaja\b/i,
    /\bcargo\s+actual\b/i,
  ],
  education: [
    /\bforma[cç][aã]o\b/i,
    /\bformaci[oó]n\b/i,
    /\beducation\b/i,
    /\bgradua[cç][aã]o\b/i,
    /\bfaculdade\b/i,
    /\bdiploma\b/i,
    /\bdegree\b/i,
    /\buniversidad\b/i,
    /\buniversity\b/i,
    /\bfametro\b/i,
    /\bflexpeak\b/i,
    /\bsamsung\b/i,
    /\bengenharia\b/i,
    /\bengineering\s+degree\b/i,
    /\bestudou\b/i,
    /\bstudied\b/i,
  ],
  certifications: [/\bcertifica(do|dos|[cç][aã]o|[cç][oõ]es|te|tes|tion|tions|ciones)\b/i, /\binpi\b/i],
  languages: [
    /\bingl[eê]s\b/i,
    /\benglish\b/i,
    /\bidioma(s)?\b/i,
    /\blanguages?\b/i,
    /\bc1\b/i,
    /\bicbeu\b/i,
    /\bespanhol\b/i,
    /\bspanish\b/i,
  ],
  availability: [
    /\bdispon[ií]ve(l|is)\b/i,
    /\bdisponibilidade\b/i,
    /\bdisponibilidad\b/i,
    /\bavailab(le|ility)\b/i,
    /\bopen\s+to\s+work\b/i,
    /\bcontrat(o|ar|a|acao|ação)\b/i,
    /\bhir(e|ing)\b/i,
    /\bfreelance(r)?\b/i,
    /\bremoto\b/i,
    /\bremote\b/i,
    /\bsal[aá]rio\b/i,
    /\bsalary\b/i,
    /\bpretens[aã]o\b/i,
    /\bhourly\s+rate\b/i,
    /\bvaga(s)?\b/i,
    /\bjobs?\b/i,
    /\binternational\b/i,
    /\binternacional\b/i,
  ],
  leadership: [
    /\blideran[cç]a\b/i,
    /\bleadership\b/i,
    /\bproject\s+manager\b/i,
    /\bgest[aã]o\s+de\s+projeto\b/i,
    /\bgesti[oó]n\s+de\s+proyecto\b/i,
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
  industry: [
    /\bindustry\s*4\.?0\b/i,
    /\bind[uú]stria(l|is)?\b/i,
    /\bmanufactur/i,
    /\bmanufatura\b/i,
    /\bch[aã]o\s+de\s+f[aá]brica\b/i,
    /\bproduction\b/i,
    /\bqualidade\b/i,
    /\bdashboards?\b/i,
  ],
  experience: [
    /\bexperi[eê]ncia(s)?\b/i,
    /\bexperiencia\b/i,
    /\bexperience\b/i,
    /\bhist[oó]rico\b/i,
    /\bwork\s+history\b/i,
    /\btrajet[oó]ria\b/i,
    /\bcarreira\b/i,
    /\bcareer\b/i,
    /\bitegam\b/i,
    /\bvia\s+certa\b/i,
  ],
  services: [
    /\bservi[cç]os?\b/i,
    /\bservicios?\b/i,
    /\bservices?\b/i,
    /\bo\s+que\s+(ele\s+|voc[eê]\s+)?(faz|oferece)\b/i,
    /\bwhat\s+(do\s+you|does\s+he)\s+(do|offer)\b/i,
    /\bqu[eé]\s+(hace|ofrece|ofreces|haces)\b/i,
  ],
  skills: [
    /\bhabilidade(s)?\b/i,
    /\bhabilidad(es)?\b/i,
    /\bskills?\b/i,
    /\bstack\b/i,
    /\btecnolog(ia|ias|ía|ías|y|ies)\b/i,
  ],
  projects: [
    /\bprojeto(s)?\b/i,
    /\bproyecto(s)?\b/i,
    /\bprojects?\b/i,
    /\btrabalho(s)?\b/i,
    /\bwork\s+samples?\b/i,
    /\bwhat\s+.*\b(build|built|develop)\b/i,
  ],
  portfolio: [/\bportf[oó]lio\b/i, /\bportafolio\b/i, /\bwebsite\b/i, /\bsite\b/i],
  contact: [
    /\b(contato|contacto|contact|email|e-mail|correo|telefone|phone|tel[eé]fono|falar|reach|escribir|escrever)\b/i,
    /\b(how\s+to\s+(reach|contact|get\s+in\s+touch))\b/i,
  ],
  about: [
    /\bquem\s+[eé]\b/i,
    /\bwho\s+(is|are)\b/i,
    /\bqui[eé]n\s+es\b/i,
    /\babout\s+(matheus|him|you)\b/i,
    /\bsobre\s+(o\s+)?(matheus|ele|voc[eê]|ti|m[ií]m)\b/i,
    /\bapresent(e|a|ar)\b/i,
  ],
}

const GREETING = /^(oi+|ol[aá]|e\s*a[ií]|hey|hi|hello|hola|bom\s+dia|boa\s+tarde|boa\s+noite|good\s+(morning|afternoon|evening)|buen[oa]s(\s+(d[ií]as|tardes|noches))?)[\s!.,?]*$/i
const THANKS = /^(valeu|obrigad[oa]|muito\s+obrigad[oa]|thanks?(\s+you)?|thank\s+you|gracias|muchas\s+gracias)[\s!.,?]*$/i

/** Termos genéricos já cobertos por outras respostas não contam como tecnologia. */
const NOT_A_TECH = new Set(['industry 4.0', 'dashboards', 'data analytics', 'data visualization'])

const KNOWN_TECHS = [
  ...new Set([
    ...SKILL_GROUPS.flatMap((group) => group.items),
    ...SKILLS.map((skill) => skill.name),
    ...PROJECTS.flatMap((project) => project.technologies),
  ]),
].filter((tech) => !NOT_A_TECH.has(tech.toLowerCase()))

export function normalize(text) {
  return text.trim().toLowerCase().normalize('NFD').replace(/\p{M}/gu, '')
}

function hasTerm(text, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}($|[^\\p{L}\\p{N}])`, 'u').test(text)
}

function findProjectId(ascii) {
  const entry = Object.entries(PROJECT_SHORT_NAMES).find(([, { terms }]) =>
    terms.some((term) => hasTerm(ascii, term))
  )
  return entry ? Number(entry[0]) : null
}

function findTechs(ascii) {
  return KNOWN_TECHS.filter((tech) => {
    const key = normalize(tech)
    return hasTerm(ascii, key) || (key.endsWith('.js') && hasTerm(ascii, key.slice(0, -3)))
  })
}

/**
 * @returns {{ intent: string, projectId?: number, techs?: string[] } | null}
 *   null → usa a IA (se houver) ou a resposta padrão
 */
export function detectQuery(messageText, language) {
  const trimmed = messageText.trim()
  if (!trimmed) return null

  const quickMap = QUICK_REPLY_INTENTS[language] || QUICK_REPLY_INTENTS.en
  if (quickMap[trimmed]) return { intent: quickMap[trimmed] }

  const lower = trimmed.toLowerCase()
  const ascii = normalize(trimmed)

  if (GREETING.test(lower) || GREETING.test(ascii)) return { intent: 'greeting' }
  if (THANKS.test(lower) || THANKS.test(ascii)) return { intent: 'thanks' }

  const projectId = findProjectId(ascii)
  if (projectId) return { intent: 'project', projectId }

  const techs = findTechs(ascii)
  if (techs.length) return { intent: 'tech', techs }

  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(lower) || pattern.test(ascii)) {
        return { intent }
      }
    }
  }

  return null
}

/** Perguntas abertas sem resposta pronta → IA, quando configurada. */
export function shouldTryAI(messageText) {
  return messageText.trim().length >= 12
}
