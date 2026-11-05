/**
 * Gera public/og-image.jpg (1200×630), a imagem de prévia do link no LinkedIn,
 * WhatsApp e outras redes. O WhatsApp pode omitir imagens pesadas: MAX_BYTES é a margem.
 * O conteúdo fica na faixa central, porque o LinkedIn corta o topo e a base em
 * alguns lugares do perfil.
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
const OUT = path.join(ROOT, 'public', 'og-image.jpg')
const WIDTH = 1200
const HEIGHT = 630
const MAX_BYTES = 300 * 1024
const JPEG_QUALITY = 88

const asset = (...parts) => readFileSync(path.join(ROOT, ...parts)).toString('base64')
const font = (weight) =>
  `@font-face { font-family: Inter; font-weight: ${weight}; src: url(data:font/woff2;base64,${asset('src', 'assets', 'fonts', `inter-latin-${weight}.woff2`)}) format('woff2'); }`

const HTML = `<!doctype html><html><head><meta charset="utf-8"><style>
  ${font(400)}
  ${font(600)}
  ${font(700)}
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    display: flex;
    align-items: center;
    gap: 64px;
    padding: 0 88px;
    overflow: hidden;
    background:
      radial-gradient(560px 420px at 16% 50%, rgba(220, 20, 60, 0.32), transparent 70%),
      #050505;
    color: #f5f5f5;
    font-family: Inter, sans-serif;
  }
  .photo {
    flex-shrink: 0;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    padding: 6px;
    background: linear-gradient(135deg, #dc143c, #8b0000);
  }
  .photo img {
    display: block;
    width: 100%;
    height: 100%;
    border: 6px solid #050505;
    border-radius: 50%;
    object-fit: cover;
    object-position: center 12%;
  }
  svg { display: block; width: 150px; height: auto; overflow: visible; color: #ff8fa3; }
  g { fill: none; stroke: currentColor; stroke-width: 3.6; stroke-linejoin: round; stroke-linecap: round; }
  h1 { margin-top: 22px; font-size: 76px; font-weight: 700; line-height: 1.05; letter-spacing: -0.01em; }
  .role { margin-top: 14px; font-size: 38px; font-weight: 600; color: #e5e5e5; }
  .stack { margin-top: 26px; font-size: 26px; color: #bdbdbd; }
  .badge {
    display: inline-block;
    margin-top: 22px;
    padding: 10px 20px;
    border: 2px solid #ff8fa3;
    border-radius: 999px;
    color: #ff8fa3;
    font-size: 24px;
    font-weight: 600;
  }
</style></head><body>
  <div class="photo"><img src="data:image/webp;base64,${asset('public', 'images', 'matheus-profile-560.webp')}"></div>
  <div>
    <svg viewBox="0 0 150 44"><g>
      <path d="M24 12 10 22 24 32" />
      <path d="M40 36V8L56 26 72 8V36" />
      <path d="M86 36V8H99Q109 8 109 17T99 26H86" />
      <path d="M117 36 127 8" />
      <path d="M133 12 147 22 133 32" />
    </g></svg>
    <h1>Matheus Pereira</h1>
    <p class="role">Full Stack Software Engineer</p>
    <p class="stack">React · Vue.js · TypeScript · Node.js · Industry 4.0</p>
    <span class="badge">3 software registrations at INPI</span>
  </div>
</body></html>`

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } })
  await page.setContent(HTML, { waitUntil: 'load' })
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all([...document.images].map((image) => image.decode()))
  })
  const jpg = await page.screenshot({ type: 'jpeg', quality: JPEG_QUALITY })
  if (jpg.length > MAX_BYTES) throw new Error(`og-image.jpg tem ${jpg.length} bytes (limite ${MAX_BYTES})`)
  writeFileSync(OUT, jpg)
  console.log(`og-image.jpg: ${Math.round(jpg.length / 1024)} KB`)
} finally {
  await browser.close()
}
