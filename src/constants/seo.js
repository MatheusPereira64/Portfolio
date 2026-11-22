/**
 * Título, descrição e prévia de link por idioma.
 * Usado no build (vite.config.js gera /, /en/ e /es/ com estas tags, porque
 * WhatsApp e LinkedIn leem só o HTML) e no site, ao trocar de idioma.
 * Sem import.meta aqui: o arquivo também roda no Node durante o build.
 */
export const SITE_ORIGIN = 'https://matheuspereira64.github.io'
export const SITE_BASE = '/Portfolio/'
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE}`
export const OG_IMAGE = `${SITE_URL}og-image.jpg`

/** Português é a raiz do site e o padrão (x-default). */
export const SEO_LANGUAGES = ['pt', 'en', 'es']

export const SEO = {
  pt: {
    htmlLang: 'pt-BR',
    path: '',
    ogLocale: 'pt_BR',
    title: 'Matheus Pereira | Engenheiro de Software Full Stack',
    description:
      'Portfólio de Matheus Pereira, Engenheiro de Software Full Stack em Manaus: aplicações web, soluções para a Indústria 4.0 e softwares registrados no INPI.',
    imageAlt: 'Matheus Pereira, Engenheiro de Software Full Stack',
  },
  en: {
    htmlLang: 'en',
    path: 'en/',
    ogLocale: 'en_US',
    title: 'Matheus Pereira | Full Stack Software Engineer',
    description:
      'Portfolio of Matheus Pereira, Full Stack Software Engineer in Manaus, Brazil: web applications, Industry 4.0 solutions and software registered with INPI.',
    imageAlt: 'Matheus Pereira, Full Stack Software Engineer',
  },
  es: {
    htmlLang: 'es',
    path: 'es/',
    ogLocale: 'es_ES',
    title: 'Matheus Pereira | Ingeniero de Software Full Stack',
    description:
      'Portafolio de Matheus Pereira, Ingeniero de Software Full Stack en Manaus, Brasil: aplicaciones web, soluciones para la Industria 4.0 y software registrado en el INPI.',
    imageAlt: 'Matheus Pereira, Ingeniero de Software Full Stack',
  },
}

export const pageUrl = (language) => `${SITE_URL}${SEO[language].path}`

const escapeHtml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Bloco de <head> de um idioma: título, descrição, canônica, hreflang, Open Graph e Twitter. */
export function renderSeoTags(language) {
  const page = SEO[language]
  const url = pageUrl(language)
  const e = escapeHtml
  const alternates = SEO_LANGUAGES.map(
    (lang) => `<link rel="alternate" hreflang="${SEO[lang].htmlLang}" href="${pageUrl(lang)}" />`
  )
  const otherLocales = SEO_LANGUAGES.filter((lang) => lang !== language).map(
    (lang) => `<meta property="og:locale:alternate" content="${SEO[lang].ogLocale}" />`
  )

  return [
    `<title>${e(page.title)}</title>`,
    `<meta name="description" content="${e(page.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...alternates,
    `<link rel="alternate" hreflang="x-default" href="${pageUrl('pt')}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Matheus Pereira" />',
    `<meta property="og:locale" content="${page.ogLocale}" />`,
    ...otherLocales,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${e(page.title)}" />`,
    `<meta property="og:description" content="${e(page.description)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:secure_url" content="${OG_IMAGE}" />`,
    '<meta property="og:image:type" content="image/jpeg" />',
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${e(page.imageAlt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${e(page.title)}" />`,
    `<meta name="twitter:description" content="${e(page.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:image:alt" content="${e(page.imageAlt)}" />`,
  ].join('\n    ')
}

/** sitemap.xml com as três versões ligadas entre si por hreflang. */
export function renderSitemap() {
  const links = SEO_LANGUAGES.map(
    (lang) => `    <xhtml:link rel="alternate" hreflang="${SEO[lang].htmlLang}" href="${pageUrl(lang)}" />`
  ).join('\n')
  const urls = SEO_LANGUAGES.map(
    (lang) => `  <url>\n    <loc>${pageUrl(lang)}</loc>\n${links}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl('pt')}" />\n  </url>`
  ).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
}
