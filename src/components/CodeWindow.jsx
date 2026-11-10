import { useMemo, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { CODE_SAMPLES, highlight } from '../data/codeSamples'
import './CodeWindow.css'

// TODO: "MP Software & Technology" não aparece nos dados do site
// (a experiência publicada é ITEGAM). Entrou porque esta rodada pede esse nome.
const COMPANY = 'MP Software & Technology'
const CITY = 'Manaus, AM'

function piece(text, kind) {
  return { text, kind }
}

function lineText(parts) {
  return parts.map((part) => part.text).join('')
}

function buildLines(code) {
  const quote = (value) => piece(`'${value}'`, 's')
  return [
    [piece('const ', 'k'), piece('matheus', 'p'), piece(' = {')],
    [piece(`  ${code.nameKey}: `), quote(code.name), piece(',')],
    [piece(`  ${code.cityKey}: `), quote(CITY), piece(',')],
    [piece(`  ${code.companyKey}: `), quote(COMPANY), piece(',')],
    [
      piece(`  ${code.focusKey}: [`),
      quote(code.focusWeb),
      piece(', '),
      quote(code.focusDash),
      piece('],'),
    ],
    [piece(`  ${code.availableKey}: `), quote(code.available), piece(',')],
    [piece('};')],
  ]
}

const Line = ({ parts, style, typing, caret }) => (
  <span className={`code-line${typing ? ' is-typing' : ''}`} style={style}>
    {parts.map((part, index) =>
      part.kind ? (
        <span key={index} className={`tok tok-${part.kind}`}>{part.text}</span>
      ) : (
        <span key={index}>{part.text}</span>
      )
    )}
    {caret && <span className="code-caret" aria-hidden="true" />}
    {'\n'}
  </span>
)

/** Tempo de digitação por linha: devagar na abertura, mais rápido ao trocar de aba. */
function typingStyles(lines, start, secondsPerChar) {
  let cursor = start
  return lines.map((parts, index) => {
    const chars = lineText(parts).length + (index === lines.length - 1 ? 1 : 0)
    const duration = Math.max(0.12, chars * secondsPerChar)
    const style = {
      '--n': Math.max(chars, 1),
      '--d': `${duration}s`,
      '--t': `${cursor}s`,
    }
    cursor += duration + 0.04
    return style
  })
}

export default function CodeWindow({ delay = 0.3 }) {
  const { translations, language } = useLanguage()
  const home = translations[language].home
  const [active, setActive] = useState('profile')
  const [opened, setOpened] = useState(0)
  const tabRefs = useRef([])

  const code = useMemo(
    () => ({
      ...home.code,
      name: home.name,
      available: home.available,
    }),
    [home]
  )

  const profileLines = useMemo(() => buildLines(code), [code])


  const tabs = useMemo(
    () => [
      { id: 'profile', label: code.file, file: code.file, footer: home.codeFooter },
      ...CODE_SAMPLES,
    ],
    [code.file, home.codeFooter]
  )
  const current = tabs.find((tab) => tab.id === active) || tabs[0]
  const lines = useMemo(
    () => (current.code ? highlight(current.code, current.lang) : profileLines),
    [current, profileLines]
  )
  // A primeira abertura espera a animação de entrada; as trocas de aba digitam na hora.
  const styles = useMemo(
    () => (opened === 0 ? typingStyles(lines, delay, 0.035) : typingStyles(lines, 0.05, 0.006)),
    [lines, opened, delay]
  )

  const select = (id) => {
    if (id === active) return
    setOpened((count) => count + 1)
    setActive(id)
  }

  const handleKeyDown = (event) => {
    const index = tabs.findIndex((tab) => tab.id === active)
    const moves = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }
    if (!(event.key in moves)) return
    event.preventDefault()
    select(tabs[moves[event.key]].id)
    tabRefs.current[moves[event.key]]?.focus()
  }

  const openDelay = Math.max(0, delay - 0.6)

  return (
    <div className="code-window-wrap">
      <div className="code-window" style={{ '--open': `${openDelay}s` }}>
        <div className="code-window-bar">
          <span className="code-window-dots" aria-hidden="true"><i /><i /><i /></span>
          <div className="code-window-tabs" role="tablist" aria-label={home.codeTabs} onKeyDown={handleKeyDown}>
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                type="button"
                role="tab"
                id={`code-tab-${tab.id}`}
                aria-selected={tab.id === active}
                aria-controls="code-panel"
                tabIndex={tab.id === active ? 0 : -1}
                className={`code-window-tab${tab.id === active ? ' is-active' : ''}`}
                onClick={() => select(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div id="code-panel" role="tabpanel" aria-labelledby={`code-tab-${current.id}`}>
          <p className="code-window-file">{current.file}</p>
          <pre key={`${current.id}-${opened}`}>
            {lines.map((parts, index) => (
              <Line
                key={index}
                parts={parts}
                style={styles[index]}
                typing
                caret={index === lines.length - 1}
              />
            ))}
          </pre>
          <p className="code-window-footer">{current.footer}</p>
        </div>
      </div>
    </div>
  )
}
