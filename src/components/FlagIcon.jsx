const FLAGS = {
  br: (
    <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="640" height="480" fill="#009b3a" />
      <polygon points="320,60 580,240 320,420 60,240" fill="#fedf00" />
      <circle cx="320" cy="240" r="118" fill="#002776" />
      <path
        d="M320 152c44 28 72 68 72 88s-28 60-72 88c-44-28-72-68-72-88s28-60 72-88z"
        fill="#fff"
      />
    </svg>
  ),
  us: (
    <svg viewBox="0 0 19 10" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="19" height="10" fill="#b22234" />
      <rect y="0.769" width="19" height="0.769" fill="#fff" />
      <rect y="2.308" width="19" height="0.769" fill="#fff" />
      <rect y="3.846" width="19" height="0.769" fill="#fff" />
      <rect y="5.385" width="19" height="0.769" fill="#fff" />
      <rect y="6.923" width="19" height="0.769" fill="#fff" />
      <rect y="8.462" width="19" height="0.769" fill="#fff" />
      <rect width="7.6" height="5.385" fill="#3c3b6e" />
    </svg>
  ),
  es: (
    <svg viewBox="0 0 750 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="750" height="500" fill="#c60b1e" />
      <rect width="750" height="250" y="125" fill="#ffc400" />
    </svg>
  ),
}

const FlagIcon = ({ country, className = '' }) => {
  const flag = FLAGS[country]
  if (!flag) return null

  return (
    <span className={`lang-flag ${className}`.trim()} role="img">
      {flag}
    </span>
  )
}

export default FlagIcon
