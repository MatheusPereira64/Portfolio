/**
 * Gera as imagens dos cartões em public/images/projects/*.webp (1280×800).
 *
 * - Cunoku: print real do deploy, dentro de um notebook desenhado.
 * - MP Agenda: tela real do README do repositório, dentro do mesmo notebook.
 * - Demais: mocks ilustrativos (em `imageKind: 'mock'` no projects.js). Sem números
 *   nem dados: gráficos e valores são só formas.
 *
 * A conversão para WebP usa o canvas do próprio Chromium, sem dependência nova.
 *
 * Uso:
 *   npm run og:install            (primeira vez — baixa o Chromium)
 *   npm run projects:images
 */

import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT_DIR = path.resolve(__dirname, '..', 'public', 'images', 'projects')
const WIDTH = 1280
const HEIGHT = 800
const WEBP_QUALITY = 0.84

const CUNOKU_URL = 'https://cunoku.cunokugame.workers.dev/'
const MP_AGENDA_SCREEN =
  'https://raw.githubusercontent.com/MatheusPereira64/PWA-AGENDAMENTO/main/docs/imagens/painel.png'

const BASE_CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; color: #e8ecf4; display: grid; place-items: center; position: relative; background: #0a0d14; }
  .glow { position: absolute; inset: 0; background:
    radial-gradient(520px 340px at 18% 16%, var(--accent), transparent 72%),
    radial-gradient(620px 380px at 88% 92%, var(--accent), transparent 74%); opacity: .42; }
  .floor { position: absolute; left: 0; right: 0; bottom: 0; height: 150px; background: linear-gradient(180deg, transparent, rgba(255,255,255,.05)); }
  .laptop { position: relative; width: 1000px; }
  .lid { background: #161a22; border: 2px solid #3a4150; border-radius: 22px 22px 6px 6px; padding: 16px; box-shadow: 0 40px 90px rgba(0,0,0,.6); }
  .screen { position: relative; height: 590px; border-radius: 6px; overflow: hidden; background: #10141c; }
  .screen img { width: 100%; height: 100%; object-fit: contain; object-position: top center; display: block; background: #f7f5ef; }
  .base { height: 20px; margin: 0 -56px; background: linear-gradient(180deg, #4a515f, #262b35); border-radius: 0 0 20px 20px; position: relative; }
  .base::before { content: ''; position: absolute; left: 50%; top: 0; width: 160px; height: 8px; transform: translateX(-50%); background: #1b1f27; border-radius: 0 0 8px 8px; }
  .app { display: flex; height: 100%; }
  .side { width: 196px; padding: 24px 18px; background: #0c1017; display: flex; flex-direction: column; gap: 14px; }
  .side b { font-size: 21px; margin-bottom: 12px; }
  .nav { height: 34px; border-radius: 8px; background: rgba(255,255,255,.06); }
  .nav.on { background: var(--strong); }
  .main { flex: 1; min-width: 0; padding: 26px; display: flex; flex-direction: column; gap: 16px; }
  h1 { font-size: 30px; font-weight: 700; }
  .row { display: flex; gap: 16px; }
  .panel { flex: 1; min-width: 0; padding: 18px; background: #1a202b; border: 1px solid rgba(255,255,255,.08); border-radius: 14px; }
  .label { font-size: 19px; color: #b6bfce; }
  .dot { display: inline-block; width: 14px; height: 14px; margin-right: 9px; border-radius: 50%; background: var(--strong); }
  .dot.warn { background: #f2b84b; }
  .line { height: 12px; border-radius: 6px; background: rgba(255,255,255,.14); margin-top: 11px; }
  svg { display: block; width: 100%; }
  .grow { flex: 1; min-height: 0; }
`

const page = (accent, strong, body) => `<!doctype html><html><head><meta charset="utf-8"><style>
  :root { --accent: ${accent}; --strong: ${strong}; }
  ${BASE_CSS}
</style></head><body><div class="glow"></div><div class="floor"></div>${body}</body></html>`

const laptop = (screen) => `<div class="laptop"><div class="lid"><div class="screen">${screen}</div></div><div class="base"></div></div>`

const app = (name, main) => `<div class="app"><div class="side"><b>${name}</b>
  <div class="nav on"></div><div class="nav"></div><div class="nav"></div><div class="nav"></div><div class="nav"></div></div>
  <div class="main">${main}</div></div>`

const lineChart = `<svg viewBox="0 0 600 190" preserveAspectRatio="none" style="height:100%"><g stroke="rgba(255,255,255,.08)"><path d="M0 40H600M0 95H600M0 150H600"/></g>
  <path d="M0 150C60 120 90 135 140 100S230 60 280 85 370 125 420 80 520 30 600 45V190H0Z" fill="var(--strong)" opacity=".22"/>
  <path d="M0 150C60 120 90 135 140 100S230 60 280 85 370 125 420 80 520 30 600 45" fill="none" stroke="var(--strong)" stroke-width="4"/></svg>`

const bars = (heights) => `<svg viewBox="0 0 ${heights.length * 44} 150" preserveAspectRatio="none" style="height:100%">${heights
  .map((h, i) => `<rect x="${i * 44 + 8}" y="${150 - h}" width="28" height="${h}" rx="5" fill="var(--strong)" opacity="${0.5 + (i % 3) * 0.2}"/>`)
  .join('')}</svg>`

const gauge = (label, fill) => `<div class="panel" style="text-align:center"><svg viewBox="0 0 120 70" style="width:130px;margin:auto">
  <path d="M12 62a48 48 0 0 1 96 0" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="11" stroke-linecap="round"/>
  <path d="M12 62a48 48 0 0 1 96 0" fill="none" stroke="var(--strong)" stroke-width="11" stroke-linecap="round" pathLength="100" stroke-dasharray="${fill} 100"/></svg>
  <div class="label" style="margin-top:6px;font-weight:600">${label}</div></div>`

const machine = (name, warn) => `<div class="panel"><div class="label"><span class="dot${warn ? ' warn' : ''}"></span>${name}</div><div class="line"></div></div>`

const slider = (name, at) => `<div style="margin-bottom:20px"><div class="label">${name}</div>
  <div style="position:relative;height:10px;margin-top:12px;border-radius:5px;background:rgba(255,255,255,.12)">
  <div style="position:absolute;left:0;top:0;bottom:0;width:${at}%;border-radius:5px;background:var(--strong)"></div>
  <div style="position:absolute;left:${at}%;top:-7px;width:24px;height:24px;margin-left:-12px;border-radius:50%;background:#fff"></div></div></div>`

const bubble = (text, mine) => `<div style="align-self:${mine ? 'flex-end' : 'flex-start'};max-width:74%;padding:14px 18px;border-radius:16px;font-size:20px;line-height:1.35;background:${mine ? 'var(--strong)' : '#1f2632'};color:${mine ? '#07131a' : '#e8ecf4'}">${text}</div>`

const MOCKS = {
  'manufatura.webp': page('#1f6feb', '#4c9dff', laptop(app('Manufatura', `
    <h1>Visão da produção</h1>
    <div class="row">${machine('Linha A')}${machine('Linha B', true)}${machine('Linha C')}</div>
    <div class="panel grow"><div class="label" style="margin-bottom:10px">Coleta em tempo real</div><div style="height:calc(100% - 36px)">${lineChart}</div></div>`))),
  'parametrizacao.webp': page('#7c3aed', '#a78bfa', laptop(app('Parâmetros', `
    <h1>Ajuste da máquina</h1>
    <div class="row grow"><div class="panel">${slider('Parâmetro A', 62)}${slider('Parâmetro B', 38)}${slider('Parâmetro C', 74)}
      <div style="display:inline-block;margin-top:6px;padding:11px 18px;border-radius:10px;background:var(--strong);color:#120a26;font-size:19px;font-weight:700">Aplicar sugestão</div></div>
      <div class="panel"><div class="label" style="margin-bottom:10px">Sugerido pelo modelo</div><div style="height:calc(100% - 36px)">${lineChart}</div></div></div>`))),
  'monitoramento.webp': page('#0d9488', '#2dd4bf', laptop(app('Produção', `
    <h1>Indicadores da operação</h1>
    <div class="row">${gauge('OEE', 72)}${gauge('FPY', 84)}${gauge('Qualidade', 90)}</div>
    <div class="panel grow"><div class="label" style="margin-bottom:10px">Produtividade por turno</div><div style="height:calc(100% - 36px)">${bars([70, 95, 80, 120, 105, 135, 90, 125, 110, 140, 100, 128])}</div></div>`))),
  'nexo-assist.webp': page('#0891b2', '#67e8f9', laptop(app('Nexo Assist', `
    <h1>Atendimento</h1>
    <div class="panel grow" style="display:flex;flex-direction:column;gap:14px;justify-content:flex-end">
      ${bubble('Não consigo acessar o e-mail.', true)}
      ${bubble('Encontrei um artigo na central de ajuda. Se não resolver, abro um chamado.')}
      ${bubble('Pode abrir.', true)}
      ${bubble('Confira o rascunho. Posso gravar o chamado?')}
      <div class="row" style="gap:10px"><div style="padding:9px 18px;border-radius:999px;background:var(--strong);color:#07131a;font-size:18px;font-weight:700">Confirmar</div>
      <div style="padding:9px 18px;border-radius:999px;border:1px solid rgba(255,255,255,.3);font-size:18px">Falar com analista</div></div>
    </div>`))),
  'wincare.webp': page('#2563eb', '#60a5fa', `<div style="position:relative;width:1010px;height:640px;border-radius:14px;overflow:hidden;background:#10141c;border:2px solid #3a4150;box-shadow:0 40px 90px rgba(0,0,0,.6)">
    <div style="display:flex;align-items:center;height:42px;padding:0 18px;background:#0c1017;font-size:17px;color:#b6bfce"><span>WinCare</span>
      <span style="margin-left:auto;letter-spacing:18px">— ▢ ✕</span></div>
    <div style="height:calc(100% - 42px)">${app('WinCare', `
      <h1>Central de manutenção</h1>
      <div class="row">${machine('Diagnóstico')}${machine('Reparo')}</div>
      <div class="row">${machine('Limpeza', true)}${machine('Monitoramento')}</div>
      <div class="panel grow"><div class="label" style="margin-bottom:10px">Desempenho</div><div style="height:calc(100% - 36px)">${lineChart}</div></div>`)}</div></div>`),
  'fintrack.webp': page('#059669', '#34d399', `<div style="position:relative;width:340px;height:690px;padding:14px;border-radius:44px;background:#161a22;border:2px solid #3a4150;box-shadow:0 40px 90px rgba(0,0,0,.6)">
    <div style="display:flex;flex-direction:column;gap:14px;height:100%;padding:34px 18px 18px;border-radius:32px;background:#10141c;overflow:hidden">
      <h1 style="font-size:28px">FinTrack</h1>
      <div class="panel" style="flex:none;height:150px">${lineChart}</div>
      <div class="label" style="font-weight:600">Transações</div>
      ${['Nubank', 'Inter', 'Itaú', 'Nubank', 'Inter']
        .map((bank, i) => `<div class="panel" style="flex:none;padding:13px 15px"><div class="label" style="font-size:17px"><span class="dot${i % 3 === 1 ? ' warn' : ''}"></span>${bank}</div></div>`)
        .join('')}
    </div></div>`),
}

async function toWebp(converter, png) {
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
  return Buffer.from(dataUrl.split(',')[1], 'base64')
}

mkdirSync(OUT_DIR, { recursive: true })
const browser = await chromium.launch()
try {
  const viewport = { viewport: { width: WIDTH, height: HEIGHT }, locale: 'pt-BR' }
  const scene = await browser.newPage(viewport)
  const converter = await browser.newPage(viewport)

  const render = async (file, html) => {
    await scene.setContent(html, { waitUntil: 'load' })
    await scene.evaluate(() => Promise.all([...document.images].map((image) => image.decode().catch(() => {}))))
    const webp = await toWebp(converter, await scene.screenshot({ type: 'png' }))
    writeFileSync(path.join(OUT_DIR, file), webp)
    console.log(`${file}: ${Math.round(webp.length / 1024)} KB`)
  }
  // `zoom` recorta as margens laterais de telas muito largas, mantendo o conteúdo centrado.
  const framed = (accent, strong, png, zoom = 1) =>
    page(accent, strong, laptop(`<img alt="" style="width:${zoom * 100}%;height:auto;margin-left:${(1 - zoom) * 50}%;max-width:none" src="data:image/png;base64,${png.toString('base64')}">`))

  const live = await browser.newPage({ viewport: { width: 1280, height: 780 }, locale: 'pt-BR' })
  const response = await live.goto(CUNOKU_URL, { waitUntil: 'networkidle', timeout: 45000 })
  if (!response?.ok()) throw new Error(`${CUNOKU_URL} respondeu ${response?.status()}`)
  await live.waitForTimeout(3500)
  await render('cunoku.webp', framed('#dc2626', '#f87171', await live.screenshot({ type: 'png' })))

  const screen = await fetch(MP_AGENDA_SCREEN)
  if (!screen.ok) throw new Error(`${MP_AGENDA_SCREEN} respondeu ${screen.status}`)
  await render('mp-agenda.webp', framed('#db2777', '#f472b6', Buffer.from(await screen.arrayBuffer()), 1.6))

  for (const [file, html] of Object.entries(MOCKS)) await render(file, html)
} finally {
  await browser.close()
}
