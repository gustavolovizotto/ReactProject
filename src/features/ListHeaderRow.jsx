const LABELS = ['', 'Anime', 'Progresso', 'Sua nota', 'Nota MAL', 'Status', '']

function ListHeaderRow() {
  return (
    <div className="grid grid-cols-[64px_1fr_160px_120px_120px_180px_48px] gap-5 px-3 text-xs uppercase tracking-wider text-muted">
      {LABELS.map((label, i) => (
        <span key={i}>{label}</span>
      ))}
    </div>
  )
}

export default ListHeaderRow
