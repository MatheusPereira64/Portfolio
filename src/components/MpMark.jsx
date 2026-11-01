export default function MpMark({ className = '', ...props }) {
  return (
    <svg className={`mp-mark ${className}`.trim()} viewBox="0 0 150 44" aria-hidden="true" focusable="false" {...props}>
      <g>
        <path className="br-open" d="M24 12 10 22 24 32" />
        <g className="mp">
          <path d="M40 36V8L56 26 72 8V36" />
          <path d="M86 36V8H99Q109 8 109 17T99 26H86" />
        </g>
        <path className="br-close" d="M117 36 127 8" />
        <path className="br-close" d="M133 12 147 22 133 32" />
      </g>
    </svg>
  )
}
