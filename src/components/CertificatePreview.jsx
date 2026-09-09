import { useEffect, useRef, useState } from 'react'

const PDFJS_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js'
const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'

let pdfJsLoader = null

function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib)
  if (pdfJsLoader) return pdfJsLoader

  pdfJsLoader = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = PDFJS_SRC
    script.async = true
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER
      resolve(window.pdfjsLib)
    }
    script.onerror = () => reject(new Error('pdf.js'))
    document.head.appendChild(script)
  })

  return pdfJsLoader
}

async function renderPage(pdfjsLib, src, canvas, useWorker) {
  const pdf = await pdfjsLib.getDocument({ url: src, disableWorker: !useWorker }).promise
  const page = await pdf.getPage(1)
  const targetWidth = 88
  const unscaled = page.getViewport({ scale: 1 })
  const viewport = page.getViewport({ scale: targetWidth / unscaled.width })
  canvas.width = viewport.width
  canvas.height = viewport.height
  await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise
}

const CertificatePreview = ({ src }) => {
  const canvasRef = useRef(null)
  const [failed, setFailed] = useState(false)
  const [ready, setReady] = useState(false)
  const isPdf = typeof src === 'string' && src.toLowerCase().includes('.pdf')

  useEffect(() => {
    if (!src || !isPdf) return undefined
    let cancelled = false
    setFailed(false)
    setReady(false)

    const render = async () => {
      try {
        const pdfjsLib = await loadPdfJs()
        if (cancelled || !canvasRef.current) return
        try {
          await renderPage(pdfjsLib, src, canvasRef.current, true)
        } catch {
          if (cancelled || !canvasRef.current) return
          await renderPage(pdfjsLib, src, canvasRef.current, false)
        }
        if (!cancelled) setReady(true)
      } catch {
        if (!cancelled) setFailed(true)
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [src, isPdf])

  if (!src) {
    return (
      <span className="cert-preview cert-preview--fallback" aria-hidden="true">
        <i className="fas fa-award"></i>
      </span>
    )
  }

  if (!isPdf) {
    return (
      <img className="cert-preview cert-preview--photo" src={src} alt="" />
    )
  }

  if (failed) {
    return (
      <span className="cert-preview cert-preview--fallback" aria-hidden="true">
        <i className="fas fa-file-pdf"></i>
      </span>
    )
  }

  return (
    <span className={`cert-preview-wrap${ready ? ' is-ready' : ''}`}>
      {!ready && (
        <span className="cert-preview cert-preview--fallback" aria-hidden="true">
          <i className="fas fa-file-pdf"></i>
        </span>
      )}
      <canvas ref={canvasRef} className="cert-preview" aria-hidden="true" hidden={!ready} />
    </span>
  )
}

export default CertificatePreview
