import { getLocalizedField, getProjectImageSrc } from '../data/projects'
import Reveal from './Reveal'
import SkillIcon from './SkillIcon'
import './TimelineCard.css'

/**
 * Cartão da linha do tempo (Experiência e Formação).
 * O selo usa `item.logo` (logo oficial), `item.icon` (ícone próprio) ou a sigla `item.mark`.
 */
const CodeMark = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" focusable="false">
    <path d="M8.5 7 3.5 12l5 5M15.5 7l5 5-5 5M13.5 5l-3 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const TimelineCard = ({ item, index, language, kindLabel, tagsLabel, current }) => (
  <Reveal as="li" className={`timeline-item${item.current ? ' is-current' : ''}`} index={index}>
    <article className="timeline-card">
      <div className="timeline-card-side">
        <span className={`timeline-card-mark${item.logo ? ' has-logo' : ''}`} aria-hidden="true">
          {item.logo ? (
            <img src={getProjectImageSrc(item.logo)} alt="" width={56} height={56} loading="lazy" decoding="async" />
          ) : item.icon === 'code' ? (
            <CodeMark />
          ) : (
            item.mark
          )}
        </span>
        <p className="timeline-card-org">{getLocalizedField(item.org, language)}</p>
        <p className="timeline-card-period">
          <time dateTime={item.start}>{getLocalizedField(item.period, language)}</time>
        </p>
        {item.place && <p className="timeline-card-place">{getLocalizedField(item.place, language)}</p>}
        {item.current && current && <span className="timeline-card-badge">{current}</span>}
      </div>
      <div className="timeline-card-main">
        <p className="timeline-card-kind">{kindLabel}</p>
        <h3 className="timeline-card-title">{getLocalizedField(item.title, language)}</h3>
        <ul className="timeline-card-points">
          {getLocalizedField(item.points, language).map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        {item.technologies?.length > 0 && (
          <ul className="timeline-card-tags" aria-label={tagsLabel}>
            {item.technologies.map((tech) => (
              <li key={tech}><SkillIcon name={tech} />{tech}</li>
            ))}
          </ul>
        )}
        {item.link && (
          <a className="timeline-card-link" href={item.link.href} target="_blank" rel="noopener noreferrer">
            {getLocalizedField(item.link.label, language)} ↗
          </a>
        )}
      </div>
    </article>
  </Reveal>
)

export default TimelineCard
