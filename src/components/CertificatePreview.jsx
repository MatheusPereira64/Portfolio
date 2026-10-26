import Icon from './Icon'

const CertificatePreview = ({ src }) => {
  if (!src) {
    return (
      <span className="cert-preview cert-preview--fallback" aria-hidden="true">
        <Icon name="award" />
      </span>
    )
  }

  return (
    <img
      className="cert-preview cert-preview--photo"
      src={src}
      alt=""
      width={72}
      height={96}
      loading="lazy"
      decoding="async"
    />
  )
}

export default CertificatePreview
