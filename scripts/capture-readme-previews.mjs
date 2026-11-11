/**
 * Gera as prévias do README em readme-assets/*.webp, a partir do site rodando localmente.
 * A conversão para WebP usa o canvas do próprio Chromium, sem dependência nova.
 *
 * Uso:
 *   npm run og:install        (primeira vez — baixa o Chromium)
 *   npm run readme:previews
 */

import { chromium } from 'playwright'
import { TYPED_ROLES } from '../src/constants/typedRoles.js'
import { createServer } from 'vite'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = path.join(ROOT, 'readme-assets')
const PORT = 5189
const URL = `http://localhost:${PORT}/Portfolio/`
const WEBP_QUALITY = 0.8
const OPENING_MS = 3400
const CODE_TYPING_MS = 7000
/** Espera o "Eu sou …" mostrar um título inteiro, não uma palavra pela metade. */
const waitForFullRole = (page) =>
  page.waitForFunction(
    (roles) => roles.includes(document.querySelector('.hero-roles-word')?.textContent),
    TYPED_ROLES.pt,
    { timeout: 30000, polling: 50 }
  )

const HIDE_FLOATING = '.chatbot-toggle, .scroll-up-btn { display: none !important; }'

async function save(page, converter, file) {
  const png = await page.screenshot({ type: 'png' })
  const dataUrl = await converter.evaluate(
    async ({ base64, quality }) => {
      const image = new Image()
      image.src = `data:image/png;base64,${base64}`
      await image.decode()
      const canvas = document.createElement('canvas')
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      canvas.getContext('2d').drawImage(image, 0, 0)
      return canvas.toDataURL('image/webp', quality)
    },
    { base64: png.toString('base64'), quality: WEBP_QUALITY }
  )
  if (!dataUrl.startsWith('data:image/webp')) throw new Error('Chromium não gerou WebP')
  const webp = Buffer.from(dataUrl.split(',')[1], 'base64')
  writeFileSync(path.join(OUT_DIR, file), webp)
  console.log(`${file}: ${Math.round(webp.length / 1024)} KB`)
}

async function openSection(page, id) {
  await page.evaluate((section) => document.getElementById(section).scrollIntoView({ behavior: 'instant' }), id)
  await page.waitForTimeout(1400)
}

mkdirSync(OUT_DIR, { recursive: true })
const server = await createServer({ root: ROOT, server: { port: PORT, strictPort: true }, logLevel: 'silent' })
await server.listen()
const browser = await chromium.launch()
try {
  const converter = await browser.newPage()
  const options = { locale: 'pt-BR', colorScheme: 'dark' }

  const desktop = await browser.newPage({ ...options, viewport: { width: 1440, height: 900 } })
  await desktop.goto(URL, { waitUntil: 'domcontentloaded' })
  await desktop.addStyleTag({ content: HIDE_FLOATING })
  await desktop.waitForTimeout(OPENING_MS + CODE_TYPING_MS)
  await waitForFullRole(desktop)
  await save(desktop, converter, 'inicio.webp')
  // Mesma ordem da página.
  for (const [id, file] of [
    ['about', 'sobre.webp'],
    ['teams', 'projetos.webp'],
    ['experience', 'experiencia.webp'],
    ['education', 'formacao.webp'],
    ['certifications', 'certificados.webp'],
    ['contact', 'contato.webp'],
  ]) {
    await openSection(desktop, id)
    await save(desktop, converter, file)
  }

  const viewer = desktop.locator('#certifications button.cert-card-action').first()
  await viewer.scrollIntoViewIfNeeded()
  await desktop.waitForTimeout(800)
  await viewer.click()
  await desktop.waitForTimeout(600)
  await save(desktop, converter, 'certificado-aberto.webp')
  await desktop.locator('.cert-viewer-close').click()
  await desktop.waitForTimeout(300)

  await desktop.locator('.navbar .max-width .nav-circle').nth(1).click()
  await desktop.waitForTimeout(500)
  await openSection(desktop, 'teams')
  await save(desktop, converter, 'projetos-claro.webp')
  await desktop.locator('.navbar .max-width .nav-circle').nth(1).click()
  await desktop.waitForTimeout(500)

  await openSection(desktop, 'about')
  await desktop.addStyleTag({ content: '.chatbot-toggle { display: flex !important; }' })
  await desktop.locator('.chatbot-toggle').click()
  await desktop.waitForTimeout(400)
  await desktop.locator('.quick-reply-btn', { hasText: 'Projetos' }).click()
  await desktop.waitForTimeout(400)
  await desktop.locator('.quick-reply-btn', { hasText: 'Cunoku' }).click()
  await desktop.waitForTimeout(900)
  await save(desktop, converter, 'chatbot.webp')

  const phone = await browser.newPage({ ...options, viewport: { width: 390, height: 780 }, deviceScaleFactor: 2 })
  await phone.goto(URL, { waitUntil: 'domcontentloaded' })
  await phone.addStyleTag({ content: HIDE_FLOATING })
  await phone.waitForTimeout(OPENING_MS + CODE_TYPING_MS)
  await waitForFullRole(phone)
  await save(phone, converter, 'celular-inicio.webp')
  await openSection(phone, 'about')
  await save(phone, converter, 'celular-sobre.webp')
  await openSection(phone, 'teams')
  await save(phone, converter, 'celular-projetos.webp')
  await openSection(phone, 'experience')
  await save(phone, converter, 'celular-experiencia.webp')
} finally {
  await browser.close()
  await server.close()
}
