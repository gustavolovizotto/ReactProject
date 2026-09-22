function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-9 px-4 rounded-full border-2 border-ink text-sm ${
        active ? "bg-vermilion text-white" : "bg-transparent text-muted"
      }`}
    >
      {children}
    </button>
  )
}

export default Chip
