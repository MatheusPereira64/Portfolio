const ICONS = {
  javascript: 'devicon-javascript-plain colored',
  typescript: 'devicon-typescript-plain colored',
  react: 'devicon-react-original colored',
  vuejs: 'devicon-vuejs-plain colored',
  vue: 'devicon-vuejs-plain colored',
  nodejs: 'devicon-nodejs-plain colored',
  node: 'devicon-nodejs-plain colored',
  htmlcss: ['devicon-html5-plain colored', 'devicon-css3-plain colored'],
  html5: 'devicon-html5-plain colored',
  css3: 'devicon-css3-plain colored',
  python: 'devicon-python-plain colored',
  sql: 'devicon-azuresqldatabase-plain colored',
  sqlserver: 'devicon-microsoftsqlserver-plain colored',
  mongodb: 'devicon-mongodb-plain colored',
  docker: 'devicon-docker-plain colored',
  git: 'devicon-git-plain colored',
  aws: 'devicon-amazonwebservices-plain-wordmark colored',
  springboot: 'devicon-spring-original colored',
  cicd: 'devicon-githubactions-plain colored',
  java: 'devicon-java-plain colored',
  postgresql: 'devicon-postgresql-plain colored',
  redis: 'devicon-redis-plain colored',
  unity: 'devicon-unity-plain colored',
  express: 'devicon-express-original',
}

function normalizeSkillName(name) {
  return String(name)
    .toLowerCase()
    .replace(/\.js$/i, 'js')
    .replace(/[^a-z0-9]/g, '')
}

export function getSkillIconClasses(name) {
  const key = normalizeSkillName(name)
  const icon = ICONS[key]
  if (!icon) return []
  return Array.isArray(icon) ? icon : [icon]
}

const SkillIcon = ({ name, className = '' }) => {
  const classes = getSkillIconClasses(name)
  if (!classes.length) return null

  return (
    <span className={`skill-icon ${className}`.trim()} aria-hidden="true">
      {classes.map((iconClass) => (
        <i key={iconClass} className={iconClass}></i>
      ))}
    </span>
  )
}

export default SkillIcon
