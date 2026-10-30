import { useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
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

export default function CodeWindow({ delay = 0.3 }) {
  const { translations, language } = useLanguage()
  const home = translations[language].home
  const code = useMemo(
    () => ({
      ...home.code,
      name: home.name,
      available: home.available,
    }),
    [home]
  )

  const lines = useMemo(() => buildLines(code), [code])
  const source = lines.map(lineText).join('\n')

  const painted = useMemo(() => {
    let cursor = delay
    return lines.map((parts) => {
      const text = lineText(parts)
      const chars = text.length + (parts === lines[lines.length - 1] ? 1 : 0)
      const duration = Math.max(0.2, chars * 0.035)
      const style = {
        '--n': chars,
        '--d': `${duration}s`,
        '--t': `${cursor}s`,
      }
      cursor += duration + 0.1
      return { parts, style, text }
    })
  }, [delay, lines])

  const openDelay = Math.max(0, delay - 0.6)

  return (
    <div className="code-window-wrap">
      <pre className="code-window-source">{source}</pre>
      <div
        className="code-window"
        style={{ '--open': `${openDelay}s` }}
        aria-hidden="true"
      >
        <div className="code-window-bar">
          <i />
          <i />
          <i />
          <span>{code.file}</span>
        </div>
        <pre>
          {painted.map((line, index) => (
            <span key={line.text} className="code-line" style={line.style}>
              {line.parts.map((part, partIndex) =>
                part.kind ? (
                  <span key={partIndex} className={`tok tok-${part.kind}`}>
                    {part.text}
                  </span>
                ) : (
                  <span key={partIndex}>{part.text}</span>
                )
              )}
              {index === painted.length - 1 && <span className="code-caret" />}
            </span>
          ))}
        </pre>
      </div>
    </div>
  )
}
