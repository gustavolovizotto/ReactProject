import AnimeCard from './AnimeCard.jsx'

function AnimeGrid({ animes, onAdd, onOpen, isAdded }) {
  if (!animes.length) return <p className="text-muted">Nenhum anime encontrado.</p>

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {animes.map((anime) => (
        <AnimeCard
          key={anime.id}
          anime={anime}
          onAdd={onAdd}
          onOpen={onOpen}
          added={isAdded?.(anime.id) ?? false}
        />
      ))}
    </div>
  )
}

export default AnimeGrid
