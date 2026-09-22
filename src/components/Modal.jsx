import { useEffect } from 'react'
import { createPortal } from 'react-dom'

function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 bg-ink/70 flex items-center justify-center p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[1040px] max-h-[90vh] overflow-y-auto bg-paper border-2 border-ink rounded-xl shadow-[8px_8px_0_#1c1a17] p-9 relative"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 h-10 w-10 rounded border-2 border-ink bg-cream font-semibold shadow-[3px_3px_0_#1c1a17] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
        >
          ×
        </button>
        {title && (
          <h2 id="modal-title" className="font-display text-2xl uppercase">
            {title}
          </h2>
        )}
        {children}
      </div>
    </div>,
    document.getElementById('modal-root'),
  )
}

export default Modal
