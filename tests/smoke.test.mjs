/**
 * Teste rápido do site já buildado (pasta docs/), servido pelo `vite preview`.
 * Roda com: npm run test:e2e   (faz o build antes)
 * No CI, o Chromium do Playwright é instalado antes deste passo.
 */
import { after, before, test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { chromium } from 'playwright'
import { preview } from 'vite'
import { classifyLink } from '../src/utils/analytics.js'

const PORT = 4179
const ROOT = `http://localhost:${PORT}/Portfolio/`

let server
let browser

before(async () => {
  server = await preview({ preview: { port: PORT, strictPort: true }, logLevel: 'silent' })
  browser = await chromium.launch()
})

after(async () => {
  await browser?.close()
  await new Promise((resolve) => server?.httpServer.close(resolve))
})

/** Página nova, sem animações, com erros de console coletados. */
async function openPage(url = ROOT, locale = 'pt-BR') {
  const context = await browser.newContext({ locale, reducedMotion: 'reduce', viewport: { width: 1280, height: 800 } })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  await page.goto(url, { waitUntil: 'networkidle' })
  return { page, errors, close: () => context.close() }
}

test('a página abre em português, sem erros no console', async () => {
  const { page, errors, close } = await openPage()
  assert.equal(await page.locator('h1').first().isVisible(), true)
  assert.equal(await page.locator('.hero-actions a').first().innerText(), 'Ver projetos')
  assert.equal(await page.evaluate(() => document.documentElement.lang), 'pt-BR')
  assert.deepEqual(errors, [])
  await close()
})

test('/en/ abre o site em inglês e volta para a raiz', async () => {
  const { page, close } = await openPage(`${ROOT}en/`)
  assert.equal(new URL(page.url()).pathname, '/Portfolio/')
  assert.equal(await page.locator('.hero-actions a').first().innerText(), 'View projects')
  assert.match(await page.title(), /Full Stack Software Engineer/)
  await close()
})

test('as páginas de idioma têm prévia de link própria', () => {
  const es = readFileSync('docs/es/index.html', 'utf8')
  assert.match(es, /<html lang="es">/)
  assert.match(es, /<meta property="og:locale" content="es_ES" \/>/)
  assert.match(es, /<link rel="canonical" href="https:\/\/matheuspereira64\.github\.io\/Portfolio\/es\/" \/>/)
  const sitemap = readFileSync('docs/sitemap.xml', 'utf8')
  assert.equal(sitemap.match(/<loc>/g).length, 3)
})

test('trocar o idioma muda textos e título da aba', async () => {
  const { page, close } = await openPage()
  await page.locator('.nav-circle-lang').click()
  await page.locator('.language-option', { hasText: 'Español' }).click()
  assert.equal(await page.locator('.hero-actions a').first().innerText(), 'Ver proyectos')
  assert.match(await page.title(), /Ingeniero de Software/)
  assert.equal(await page.evaluate(() => document.documentElement.lang), 'es')
  await close()
})

test('modal de projeto abre e fecha com Esc, devolvendo o foco', async () => {
  const { page, close } = await openPage()
  const opener = page.locator('.project-card-open').first()
  await opener.scrollIntoViewIfNeeded()
  await opener.click()
  await page.locator('dialog.project-modal[open]').waitFor()
  await page.keyboard.press('Escape')
  await page.locator('dialog.project-modal').waitFor({ state: 'detached' })
  assert.equal(await opener.evaluate((element) => element === document.activeElement), true)
  await close()
})

test('visualizador de certificado abre e fecha pelo X', async () => {
  const { page, close } = await openPage()
  const opener = page.locator('#certifications button.cert-card-action').first()
  await opener.scrollIntoViewIfNeeded()
  await opener.click()
  const viewer = page.locator('dialog.cert-viewer[open]')
  await viewer.waitFor()
  assert.ok((await viewer.locator('img').evaluate((img) => img.naturalWidth)) > 0)
  await page.locator('.cert-viewer-close').click()
  await viewer.waitFor({ state: 'detached' })
  await close()
})

test('formulário vazio não envia e marca os campos', async () => {
  const { page, close } = await openPage()
  const submit = page.locator('.contact-form button[type="submit"]')
  await submit.scrollIntoViewIfNeeded()
  await submit.click()
  assert.ok((await page.locator('.contact-form [aria-invalid="true"]').count()) >= 1)
  await close()
})

test('o chatbot só é baixado quando aberto', async () => {
  const { page, close } = await openPage()
  const chatChunk = (url) => /\/assets\/Chatbot-[^/]+\.js$/.test(url)
  const loaded = await page.evaluate(() => performance.getEntriesByType('resource').map((entry) => entry.name))
  assert.equal(loaded.some(chatChunk), false)
  const request = page.waitForRequest((req) => chatChunk(req.url()))
  await page.locator('.chatbot-toggle').click()
  await request
  await page.locator('#chatbot-panel').waitFor()
  await page.keyboard.press('Escape')
  await page.locator('#chatbot-panel').waitFor({ state: 'detached' })
  await close()
})

test('analytics reconhece currículo e canais de contato', () => {
  assert.deepEqual(classifyLink('/Portfolio/curriculo/CV%20-%20Matheus%20Pereira%20-%202026%20-%20English.pdf'), {
    event: 'Download CV',
    props: { idioma: 'en' },
  })
  assert.equal(classifyLink('https://wa.me/5592992138870').props.canal, 'whatsapp')
  assert.equal(classifyLink('https://www.linkedin.com/in/matheus-pereira64/').props.canal, 'linkedin')
  assert.equal(classifyLink('mailto:alguem@example.com').props.canal, 'email')
  assert.equal(classifyLink('#about'), null)
})
