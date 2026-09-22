const BASE = "object-cover border-2 border-ink rounded-md"

function Cover({ src, alt, className = "" }) {
  if (!src) {
    return (
      <div className={`${BASE} bg-sand flex items-center justify-center text-center text-xs text-muted p-2 ${className}`}>
        {alt}
      </div>
    )
  }
  return <img src={src} alt={alt} loading="lazy" className={`${BASE} ${className}`} />
}

export default Cover
