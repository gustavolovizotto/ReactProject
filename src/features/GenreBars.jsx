function GenreBars({ genres }) {
  if (genres.length === 0) return <p className="text-muted">Nenhum gênero ainda.</p>
  const max = Math.max(...genres.map((g) => g.count))

  return (
    <ul className="flex flex-col gap-3">
      {genres.map((genre) => (
        <li key={genre.name} className="flex flex-col gap-1">
          <div className="flex justify-between text-sm">
            <span className="font-semibold">{genre.name}</span>
            <span className="text-muted">{genre.count}</span>
          </div>
          <div className="h-2.5 border-2 border-ink rounded-full bg-sand overflow-hidden">
            <div className="h-full bg-vermilion" style={{ width: `${(genre.count / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default GenreBars
