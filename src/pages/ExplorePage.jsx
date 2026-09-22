import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Chip from '../components/Chip.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Spinner from '../components/Spinner.jsx'
import AnimeDetailModal from '../features/AnimeDetailModal.jsx'
import AnimeGrid from '../features/AnimeGrid.jsx'
import SearchBar from '../features/SearchBar.jsx'
import useDebounce from '../hooks/useDebounce.js'
import useFetch from '../hooks/useFetch.js'
import { getTopAnime, searchAnime } from '../services/jikan.js'
import { useList } from '../state/ListContext.jsx'

const FILTERS = [
  { value: '', label: 'Melhor nota' },
  { value: 'bypopularity', label: 'Mais populares' },
  { value: 'airing', label: 'Em exibição' },
]

function ExplorePage() {
  const [filter, setFilter] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const { add, has } = useList()
  const [params, setParams] = useSearchParams()
  const values = {
    q: params.get('q') ?? '',
    type: params.get('type') ?? '',
    genre: params.get('genre') ?? '',
  }
  const onChange = (next) => {
    const entries = Object.entries(next).filter(([, v]) => v)
    setParams(Object.fromEntries(entries), { replace: true })
  }

  const debouncedQ = useDebounce(values.q)
  const q = debouncedQ.length >= 3 ? debouncedQ : ''
  const { type, genre } = values
  const searching = Boolean(q || type || genre)

  const { data, loading, error } = useFetch(
    () => (searching ? searchAnime({ q, type, genre }) : getTopAnime(filter)),
    [searching, q, type, genre, filter],
  )

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        jp="探す"
        title="Explorar"
        subtitle="Busque no catálogo do MyAnimeList e monte sua lista."
      />
      <SearchBar values={values} onChange={onChange} />
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl uppercase">{searching ? 'Resultados' : 'Top animes'}</h3>
        {!searching && (
          <div className="flex gap-2">
            {FILTERS.map(({ value, label }) => (
              <Chip key={value} active={filter === value} onClick={() => setFilter(value)}>
                {label}
              </Chip>
            ))}
          </div>
        )}
      </div>
      {loading && <Spinner />}
      {error && <ErrorMessage message={error.message} />}
      {data && (
        <AnimeGrid animes={data.items} onAdd={(anime) => add(anime)} onOpen={setSelectedId} isAdded={has} />
      )}
      <AnimeDetailModal id={selectedId} onClose={() => setSelectedId(null)} onOpen={setSelectedId} />
    </div>
  )
}

export default ExplorePage
