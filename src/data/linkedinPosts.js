/**
 * Publicações exibidas no blog. O LinkedIn não permite buscar posts automaticamente
 * em sites estáticos; adicione aqui a URL de cada publicação (⋯ → Copiar link).
 */
export const LINKEDIN_POSTS = [
  // Exemplo:
  // {
  //   id: 1,
  //   linkedinUrl: 'https://www.linkedin.com/posts/matheus-pereira64_...',
  //   date: '2025-03-10',
  //   category: { pt: 'Carreira', en: 'Career', es: 'Carrera' },
  //   title: {
  //     pt: 'Título da publicação',
  //     en: 'Post title',
  //     es: 'Título de la publicación',
  //   },
  //   excerpt: {
  //     pt: 'Resumo curto do post...',
  //     en: 'Short post summary...',
  //     es: 'Resumen corto del post...',
  //   },
  // },
]

export function getLocalizedField(field, language) {
  if (!field) return ''
  if (typeof field === 'string') return field
  return field[language] || field.en || field.pt || ''
}
