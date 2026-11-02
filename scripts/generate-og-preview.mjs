/**
 * Gera public/og-image.png (1200×630), a imagem de prévia do link no WhatsApp,
 * LinkedIn e outras redes. O WhatsApp pode omitir imagens pesadas: MAX_BYTES é a margem.
 *
 * Uso:
 *   npm run og:install   (primeira vez — baixa o Chromium)
 *   npm run og:image
 */

import { chromium } from 'playwright'
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public', 'og-image.png')
const WIDTH = 1200
const HEIGHT = 630
const MAX_BYTES = 300 * 1024

const font = (weight) => {
  const data = readFileSync(path.join(ROOT, 'src', 'assets', 'fonts', `inter-latin-${weight}.woff2`))
  return `@font-face { font-family: Inter; font-weight: ${weight}; src: url(data:font/woff2;base64,${data.toString('base64')}) format('woff2'); }`
}

const HTML = `<!doctype html><html><head><meta charset="utf-8"><style>
  ${font(400)}
  ${font(700)}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 96px;
    border-left: 16px solid #dc143c;
    background: #050505;
    color: #f5f5f5;
    font-family: Inter, sans-serif;
  }
  svg { display: block; width: 280px; height: auto; overflow: visible; }
  g { fill: none; stroke: currentColor; stroke-width: 3.4; stroke-linejoin: round; stroke-linecap: round; }
  h1 { margin-top: 56px; font-size: 84px; font-weight: 700; line-height: 1.1; }
  p { margin-top: 18px; font-size: 40px; color: #d4d4d4; }
</style></head><body>
  <svg viewBox="0 0 150 44"><g>
    <path d="M24 12 10 22 24 32" />
    <path d="M40 36V8L56 26 72 8V36" />
    <path d="M86 36V8H99Q109 8 109 17T99 26H86" />
    <path d="M117 36 127 8" />
    <path d="M133 12 147 22 133 32" />
  </g></svg>
  <h1>Matheus Pereira</h1>
  <p>Full Stack Software Engineer</p>
</body></html>`

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })
  await page.setContent(HTML, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  const png = await page.screenshot({ type: 'png' })
  if (png.length > MAX_BYTES) throw new Error(`og-image.png tem ${png.length} bytes (limite ${MAX_BYTES})`)
  writeFileSync(OUT, png)
  console.log(`og-image.png: ${Math.round(png.length / 1024)} KB`)
} finally {
  await browser.close()
}
