/** Dados do portfólio reutilizados (Contact, Chatbot, etc.) */
export const SITE_PROFILE = {
  fullName: 'Matheus Pereira de Souza',
  shortName: 'Matheus Pereira',
  email: 'matheuspereira6464@gmail.com',
  /** Apenas dígitos com código do país (55…) — usado em tel: e nas respostas do chat */
  phoneDigits: '5592992138870',
  phoneDisplayPt: '+55 (92) 99213-8870',
  phoneDisplayEn: '+55 (92) 99213-8870',
  /** valor para href tel: */
  phoneTel: '+5592992138870',
  linkedin: 'https://www.linkedin.com/in/matheus-pereira64/',
  github: 'https://github.com/MatheusPereira64',
  portfolioUrl: 'https://matheuspereira64.github.io/Portfolio/',
}

export const CV_FILENAME = 'CV - Matheus Pereira - 2026 - English.pdf'

/** Foto de perfil profissional (public/images/) */
export const PROFILE_IMAGE = 'images/matheus-profile.png'

export function profileImageUrl() {
  return `${import.meta.env.BASE_URL}${PROFILE_IMAGE}`
}
