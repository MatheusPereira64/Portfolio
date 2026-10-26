import { PROJECTS, getLocalizedField } from './projects'

export const SKILL_GROUPS = [
  {
    id: 'frontend',
    label: { pt: 'Frontend', en: 'Frontend', es: 'Frontend' },
    items: ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'HTML/CSS'],
  },
  {
    id: 'backend',
    label: { pt: 'Backend', en: 'Backend', es: 'Backend' },
    items: ['Node.js', 'Python', 'Java', 'REST APIs', 'Spring Boot', 'Express'],
  },
  {
    id: 'data',
    label: { pt: 'Dados', en: 'Data', es: 'Datos' },
    items: ['PostgreSQL', 'SQL', 'SQL Server', 'MongoDB', 'Redis', 'Data Analytics'],
  },
  {
    id: 'devops',
    label: { pt: 'DevOps', en: 'DevOps', es: 'DevOps' },
    items: ['Docker', 'Git', 'AWS', 'CI/CD'],
  },
  {
    id: 'industry',
    label: { pt: 'Indústria 4.0', en: 'Industry 4.0', es: 'Industria 4.0' },
    items: ['IoT', 'Dashboards', 'OEE', 'FPY', 'Machine Learning', 'Industry 4.0'],
  },
]

function projectText(project) {
  return [project.problem, project.contribution, project.results, project.description]
    .map((field) => getLocalizedField(field, 'pt'))
    .join(' ')
    .toLowerCase()
}

export function projectsUsing(tech) {
  const key = tech.toLowerCase()
  if (key === 'oee' || key === 'fpy') {
    return PROJECTS.filter((project) => projectText(project).includes(key))
  }
  return PROJECTS.filter((project) =>
    (project.technologies || []).some((item) => item.toLowerCase() === key)
  )
}
