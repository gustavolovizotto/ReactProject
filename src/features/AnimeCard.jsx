import Button from '../components/Button.jsx'
import Cover from '../components/Cover.jsx'
import ScoreBadge from '../components/ScoreBadge.jsx'

function AnimeCard({ anime, onAdd, onOpen, added }) {
  const open = () => onOpen?.(anime.id)

  return (
    <article className="flex flex-col gap-2">
      <button type="button" onClick={open} className="relative w-[216px] text-left" aria-label={`Abrir ${anime.title}`}>
        <Cover src={anime.image} alt={anime.title} className="w-[216px] h-[300px]" />
        <span className="absolute bottom-2 right-2">
          <ScoreBadge score={anime.score} />
        </span>
      </button>
      <h3 className="font-display text-sm truncate">
        <button type="button" onClick={open} className="truncate w-full text-left">
          {anime.title}
        </button>
      </h3>
      <span className="text-sm text-muted">
        {anime.type} · {anime.episodes ?? '?'} ep
      </span>
      <Button variant="outline" onClick={() => onAdd?.(anime)} disabled={added}>
        {added ? 'Na lista ✓' : '+ Quero ver'}
      </Button>
    </article>
  )
}

export default AnimeCard
