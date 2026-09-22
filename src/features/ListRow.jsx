import Cover from '../components/Cover.jsx'
import { STATUS } from '../state/ListContext.jsx'

function ListRow({ item, onStatusChange, onRemove, onOpen }) {
  const { anime, status, score, progress } = item

  return (
    <div className="grid grid-cols-[64px_1fr_160px_120px_120px_180px_48px] gap-5 items-center p-3 bg-paper border-2 border-ink rounded-md">
      <Cover src={anime.image} alt={anime.title} className="w-12 h-[68px]" />
      <div className="min-w-0">
        <h3 className="font-display text-sm truncate">
          <button type="button" onClick={() => onOpen(anime.id)} className="truncate w-full text-left">
            {anime.title}
          </button>
        </h3>
        <span className="text-sm text-muted">
          {anime.type} · {anime.year ?? '?'}
        </span>
      </div>
      <span className="text-sm">
        {progress} / {anime.episodes ?? '?'}
      </span>
      <span className="text-vermilion font-semibold">{score ?? '–'}</span>
      <span className="text-sm">★ {anime.score ?? '–'}</span>
      <select
        aria-label={`Status de ${anime.title}`}
        value={status}
        onChange={(e) => onStatusChange(anime.id, e.target.value)}
        className="h-11 w-full px-3 rounded border-2 border-ink bg-paper"
      >
        {Object.values(STATUS).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => onRemove(anime.id)}
        aria-label={`Remover ${anime.title}`}
        className="h-11 w-11 flex items-center justify-center rounded border-2 border-ink bg-paper text-ink hover:text-vermilion"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6" />
        </svg>
      </button>
    </div>
  )
}

export default ListRow
