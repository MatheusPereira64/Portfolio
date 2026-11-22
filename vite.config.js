import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { SEO, SEO_LANGUAGES, renderSeoTags, renderSitemap } from './src/constants/seo.js'

const OUT_DIR = 'docs'
const SEO_BLOCK = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/

const withLanguage = (html, language) =>
  html
    .replace(SEO_BLOCK, `<!-- seo:start -->\n    ${renderSeoTags(language)}\n    <!-- seo:end -->`)
    .replace(/<html lang="[^"]*">/, `<html lang="${SEO[language].htmlLang}">`)

/**
 * Prévia de link por idioma: a raiz sai em português e o build grava
 * /en/index.html e /es/index.html com as tags do idioma, mais o sitemap.xml.
 */
const languagePages = () => {
  let isBuild = false
  return {
    name: 'language-pages',
    configResolved(config) {
      isBuild = config.command === 'build'
    },
    transformIndexHtml: (html) => withLanguage(html, 'pt'),
    // No dev o Vite também chama closeBundle ao encerrar: só grava arquivos no build.
    closeBundle() {
      if (!isBuild) return
      const outDir = path.resolve(OUT_DIR)
      const html = readFileSync(path.join(outDir, 'index.html'), 'utf8')
      if (!SEO_BLOCK.test(html)) throw new Error('index.html sem o bloco <!-- seo:start --> … <!-- seo:end -->')
      for (const language of SEO_LANGUAGES.filter((lang) => SEO[lang].path)) {
        const dir = path.join(outDir, SEO[language].path)
        mkdirSync(dir, { recursive: true })
        writeFileSync(path.join(dir, 'index.html'), withLanguage(html, language))
      }
      writeFileSync(path.join(outDir, 'sitemap.xml'), renderSitemap())
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), languagePages()],
  base: '/Portfolio/',
  build: {
    outDir: OUT_DIR,
    assetsDir: 'assets',
    emptyOutDir: true,
  },
})
