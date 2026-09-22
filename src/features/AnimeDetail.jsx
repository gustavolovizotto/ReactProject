import Chip from '../components/Chip.jsx'
import Cover from '../components/Cover.jsx'
import { useList } from '../state/ListContext.jsx'
import RatingForm from './RatingForm.jsx'

const compact = new Intl.NumberFormat('pt-BR', { notation: 'compact' })

function Stat({ label, value }) {
  return (
    <div>
      <span className="font-display text-3xl text-vermilion">{value}</span>
      <p className="text-xs uppercase tracking-wider text-muted">{label}</p>
    </div>
  )
}

function AnimeDetail({ anime, recommendations, onOpen }) {
  const { get } = useList()
  const meta = [anime.type, anime.year, anime.episodes != null && `${anime.episodes} episódios`, anime.studios.join(', ')]
    .filter(Boolean)
    .join(' · ')

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-[260px_1fr] gap-8">
        <Cover src={anime.image} alt={anime.title} className="w-[260px] h-[370px]" />
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-wider text-muted">{meta}</span>
          {anime.titleJp && <span className="font-jp text-vermilion">{anime.titleJp}</span>}
          <h2 id="modal-title" className="font-display text-3xl uppercase">
            {anime.title}
          </h2>
          {anime.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {anime.genres.map((g) => (
                <Chip key={g}>{g}</Chip>
              ))}
            </div>
          )}
          <div className="flex gap-10">
            <Stat label="Nota MAL" value={anime.score ?? '–'} />
            <Stat label="Ranking" value={anime.rank ? `#${anime.rank}` : '–'} />
            <Stat label="Membros" value={anime.members ? compact.format(anime.members) : '–'} />
          </div>
          {anime.synopsis && <p className="text-sm leading-relaxed">{anime.synopsis}</p>}
          {anime.trailerUrl && (
            <a
              href={anime.trailerUrl}
              target="_blank"
              rel="noreferrer"
              className="self-start font-semibold text-vermilion underline underline-offset-4"
            >
              Assistir trailer ↗
            </a>
          )}
        </div>
      </div>
      <RatingForm key={anime.id} anime={anime} initial={get(anime.id)} />
      {recommendations.length > 0 && (
        <section className="flex flex-col gap-4">
          <h3 className="font-display text-xl uppercase">Quem gostou também viu</h3>
          <div className="flex flex-wrap gap-4">
            {recommendations.map((rec) => (
              <button
                key={rec.id}
                type="button"
                onClick={() => onOpen(rec.id)}
                className="flex w-[120px] flex-col gap-1 text-left"
                aria-label={`Abrir ${rec.title}`}
              >
                <Cover src={rec.image} alt={rec.title} className="w-[120px] h-[168px]" />
                <span className="text-xs truncate w-full">{rec.title}</span>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default AnimeDetail
