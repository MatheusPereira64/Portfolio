/**
 * Gera public/preview.png (1200×630) para Open Graph / LinkedIn / WhatsApp.
 *
 * Uso:
 *   npm run og:install      (primeira vez — baixa o Chromium)
 *   npm run og:screenshot   (build se necessário + screenshot)
 *   npm run build:og        (build + screenshot)
 */

import { chromium } from 'playwright'
import { spawn } from 'node:child_process'
import { copyFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PORT = 4173
const BASE_PATH = '/Portfolio/'
const URL = `http://127.0.0.1:${PORT}${BASE_PATH}`
const CAPTURE_WIDTH = 1920
const CAPTURE_HEIGHT = 1080
const OG_WIDTH = 1200
const OG_HEIGHT = 630
const CLIP_X = Math.round((CAPTURE_WIDTH - OG_WIDTH) / 2)
const PUBLIC_OUT = path.join(ROOT, 'public', 'preview.png')
const DOCS_OUT = path.join(ROOT, 'docs', 'preview.png')

function run(command, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { cwd: ROOT, shell: true, stdio: 'inherit' })
    proc.on('error', reject)
    proc.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${command} ${args.join(' ')} exited with code ${code}`))
    })
  })
}

async function waitForServer(url, timeoutMs = 45000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { redirect: 'follow' })
      if (res.ok) return
    } catch {
      /* server not ready yet */
    }
    await new Promise((r) => setTimeout(r, 400))
  }
  throw new Error(`Preview server did not respond at ${url}`)
}

async function main() {
  const docsIndex = path.join(ROOT, 'docs', 'index.html')
  if (!existsSync(docsIndex)) {
    console.log('→ docs/ not found, running build first…')
    await run('npm', ['run', 'build'])
  }

  console.log('→ Starting vite preview…')
  const server = spawn(
    'npx',
    ['vite', 'preview', '--port', String(PORT), '--host', '127.0.0.1', '--strictPort'],
    { cwd: ROOT, shell: true, stdio: 'pipe' }
  )

  let browser
  try {
    await waitForServer(URL)
    console.log('→ Capturing Open Graph screenshot (1200×630)…')

    browser = await chromium.launch({ headless: true })
    const page = await browser.newPage({
      viewport: { width: CAPTURE_WIDTH, height: CAPTURE_HEIGHT },
      deviceScaleFactor: 1,
    })

    await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 })
    await page.waitForLoadState('domcontentloaded')
    // Aguarda fontes, hero e animação typed.js estabilizarem
    await page.waitForTimeout(3000)
    await page.evaluate(() => window.scrollTo(0, 0))

    await page.screenshot({
      path: PUBLIC_OUT,
      type: 'png',
      clip: { x: CLIP_X, y: 0, width: OG_WIDTH, height: OG_HEIGHT },
    })

    console.log(`✓ Saved ${PUBLIC_OUT}`)

    if (existsSync(path.join(ROOT, 'docs'))) {
      copyFileSync(PUBLIC_OUT, DOCS_OUT)
      console.log(`✓ Copied to ${DOCS_OUT}`)
    }

    console.log('\nPróximo passo: atualize o cache em')
    console.log('  https://www.linkedin.com/post-inspector/')
  } finally {
    if (browser) await browser.close()
    server.kill('SIGTERM')
  }
}

main().catch((err) => {
  if (err.message?.includes('Executable doesn\'t exist')) {
    console.error('\nChromium do Playwright não instalado. Execute:\n  npm run og:install\n')
  } else {
    console.error(err)
  }
  process.exit(1)
})
