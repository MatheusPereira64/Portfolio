/**
 * Gera os prints reais dos projetos com deploy em public/images/projects/*.webp.
 * A conversão para WebP usa o canvas do próprio Chromium, sem dependência nova.
 *
 * Uso:
 *   npm run og:install            (primeira vez — baixa o Chromium)
 *   npm run projects:screenshots
 */

import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(__dirname, '..', 'public', 'images', 'projects')
const WIDTH = 1280
const HEIGHT = 800
const WEBP_QUALITY = 0.82

const TARGETS = [
  { file: 'cunoku.webp', url: 'https://cunoku.cunokugame.workers.dev/' },
]

async function toWebp(page, png) {
  const dataUrl = await page.evaluate(
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
  return Buffer.from(dataUrl.split(',')[1], 'base64')
}

mkdirSync(OUT_DIR, { recursive: true })
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT }, locale: 'pt-BR' })
  for (const { file, url } of TARGETS) {
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 })
    if (!response?.ok()) throw new Error(`${url} respondeu ${response?.status()}`)
    await page.waitForTimeout(3500)
    const png = await page.screenshot({ type: 'png' })
    const webp = await toWebp(page, png)
    writeFileSync(path.join(OUT_DIR, file), webp)
    console.log(`${file}: ${Math.round(webp.length / 1024)} KB (${response.status()} ${url})`)
  }
} finally {
  await browser.close()
}
