import { useEffect, useRef } from 'react'
import Icon from './Icon'
import './CertificateViewer.css'

/**
 * Mostra a imagem do certificado num <dialog> nativo: Esc, clique fora e o X fecham.
 * Quem abre devolve o foco ao botão de origem.
 */
const CertificateViewer = ({ src, title, closeLabel, openLabel, onClose }) => {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="cert-viewer"
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button type="button" className="cert-viewer-close" aria-label={closeLabel} onClick={onClose} autoFocus>
        <Icon name="times" />
      </button>
      <figure className="cert-viewer-figure">
        <img src={src} alt={title} />
        <figcaption>
          <span>{title}</span>
          <a href={src} target="_blank" rel="noopener noreferrer">{openLabel}</a>
        </figcaption>
      </figure>
    </dialog>
  )
}

export default CertificateViewer
