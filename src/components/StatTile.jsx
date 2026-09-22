function StatTile({ label, value, sub }) {
  return (
    <div className="bg-paper border-2 border-ink rounded-lg p-6 shadow-[4px_4px_0_#1c1a17] flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wider text-muted">{label}</span>
      <span className="font-display text-4xl text-vermilion">{value}</span>
      {sub && <span className="text-sm text-muted">{sub}</span>}
    </div>
  )
}

export default StatTile
