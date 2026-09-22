import { useState } from 'react'
import Chip from '../components/Chip.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Spinner from '../components/Spinner.jsx'
import AnimeGrid from '../features/AnimeGrid.jsx'
import useFetch from '../hooks/useFetch.js'
import { getTopAnime } from '../services/jikan.js'

const FILTERS = [
  { value: '', label: 'Melhor nota' },
  { value: 'bypopularity', label: 'Mais populares' },
  { value: 'airing', label: 'Em exibição' },
]

function ExplorePage() {
  const [filter, setFilter] = useState('')
  const { data, loading, error } = useFetch(() => getTopAnime(filter), [filter])

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        jp="探す"
        title="Explorar"
        subtitle="Busque no catálogo do MyAnimeList e monte sua lista."
      />
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl uppercase">Top animes</h3>
        <div className="flex gap-2">
          {FILTERS.map(({ value, label }) => (
            <Chip key={value} active={filter === value} onClick={() => setFilter(value)}>
              {label}
            </Chip>
          ))}
        </div>
      </div>
      {loading && <Spinner />}
      {error && <ErrorMessage message={error.message} />}
      {data && <AnimeGrid animes={data.items} />}
    </div>
  )
}

export default ExplorePage
