import Cover from '../components/Cover.jsx'

function BestRated({ item }) {
  if (!item) return <p className="text-muted">Avalie um anime para ver seu favorito aqui.</p>
  const { anime, score, comment } = item

  return (
    <div className="flex gap-4">
      <Cover src={anime.image} alt={anime.title} className="w-[120px] h-[168px] shrink-0" />
      <div className="flex flex-col gap-2 min-w-0">
        <h4 className="font-display text-base">{anime.title}</h4>
        <p className="text-sm">
          Sua nota <strong className="text-vermilion">{score}</strong> · MAL {anime.score ?? '–'}
        </p>
        {comment && <p className="text-sm text-muted italic">“{comment}”</p>}
      </div>
    </div>
  )
}

export default BestRated
