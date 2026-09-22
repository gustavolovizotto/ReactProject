function ScoreBadge({ score }) {
  return (
    <span className="bg-cream border-2 border-ink text-xs font-semibold px-2 py-1 rounded-md">
      ★ {score ?? "–"}
    </span>
  )
}

export default ScoreBadge
