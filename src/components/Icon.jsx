import angleUp from '@fortawesome/fontawesome-free/svgs/solid/angle-up.svg?raw'
import arrowRight from '@fortawesome/fontawesome-free/svgs/solid/arrow-right.svg?raw'
import award from '@fortawesome/fontawesome-free/svgs/solid/award.svg?raw'
import bars from '@fortawesome/fontawesome-free/svgs/solid/bars.svg?raw'
import check from '@fortawesome/fontawesome-free/svgs/solid/check.svg?raw'
import chevronDown from '@fortawesome/fontawesome-free/svgs/solid/chevron-down.svg?raw'
import chevronUp from '@fortawesome/fontawesome-free/svgs/solid/chevron-up.svg?raw'
import circleCheck from '@fortawesome/fontawesome-free/svgs/solid/circle-check.svg?raw'
import circleExclamation from '@fortawesome/fontawesome-free/svgs/solid/circle-exclamation.svg?raw'
import comments from '@fortawesome/fontawesome-free/svgs/solid/comments.svg?raw'
import download from '@fortawesome/fontawesome-free/svgs/solid/download.svg?raw'
import envelope from '@fortawesome/fontawesome-free/svgs/solid/envelope.svg?raw'
import fileArrowDown from '@fortawesome/fontawesome-free/svgs/solid/file-arrow-down.svg?raw'
import filePdf from '@fortawesome/fontawesome-free/svgs/solid/file-pdf.svg?raw'
import locationDot from '@fortawesome/fontawesome-free/svgs/solid/location-dot.svg?raw'
import moon from '@fortawesome/fontawesome-free/svgs/solid/moon.svg?raw'
import paperPlane from '@fortawesome/fontawesome-free/svgs/solid/paper-plane.svg?raw'
import phone from '@fortawesome/fontawesome-free/svgs/solid/phone.svg?raw'
import sun from '@fortawesome/fontawesome-free/svgs/solid/sun.svg?raw'
import user from '@fortawesome/fontawesome-free/svgs/solid/user.svg?raw'
import xmark from '@fortawesome/fontawesome-free/svgs/solid/xmark.svg?raw'
import css3Alt from '@fortawesome/fontawesome-free/svgs/brands/css3-alt.svg?raw'
import gitAlt from '@fortawesome/fontawesome-free/svgs/brands/git-alt.svg?raw'
import github from '@fortawesome/fontawesome-free/svgs/brands/github.svg?raw'
import html5 from '@fortawesome/fontawesome-free/svgs/brands/html5.svg?raw'
import linkedin from '@fortawesome/fontawesome-free/svgs/brands/linkedin.svg?raw'
import nodeJs from '@fortawesome/fontawesome-free/svgs/brands/node-js.svg?raw'
import python from '@fortawesome/fontawesome-free/svgs/brands/python.svg?raw'
import react from '@fortawesome/fontawesome-free/svgs/brands/react.svg?raw'
import squareJs from '@fortawesome/fontawesome-free/svgs/brands/square-js.svg?raw'

const ICONS = {
  'angle-up': angleUp,
  'arrow-right': arrowRight,
  award,
  bars,
  check,
  'chevron-down': chevronDown,
  'chevron-up': chevronUp,
  'check-circle': circleCheck,
  comments,
  download,
  envelope,
  'exclamation-circle': circleExclamation,
  'file-download': fileArrowDown,
  'file-pdf': filePdf,
  github,
  'html5': html5,
  'css3-alt': css3Alt,
  'js-square': squareJs,
  'git-alt': gitAlt,
  linkedin,
  'map-marker-alt': locationDot,
  moon,
  'node-js': nodeJs,
  'paper-plane': paperPlane,
  phone,
  python,
  react,
  sun,
  times: xmark,
  user,
}

const Icon = ({ name, title }) => {
  const svg = ICONS[name]
  if (!svg) return null

  return (
    <span
      className={`icon icon-${name}`}
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export default Icon
