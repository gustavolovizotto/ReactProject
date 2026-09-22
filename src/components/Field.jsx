export const inputClass = "h-11 w-full px-3 rounded border-2 border-ink bg-paper"

function Field({ label, id, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm text-muted">
        {label}
      </label>
      {children}
      {error && <p className="text-vermilion text-xs">{error}</p>}
    </div>
  )
}

export default Field
