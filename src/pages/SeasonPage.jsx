import { useState } from 'react'
import ErrorMessage from '../components/ErrorMessage.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Spinner from '../components/Spinner.jsx'
import AnimeDetailModal from '../features/AnimeDetailModal.jsx'
import AnimeGrid from '../features/AnimeGrid.jsx'
import useFetch from '../hooks/useFetch.js'
import { getSeasonNow } from '../services/jikan.js'
import { useList } from '../state/ListContext.jsx'

const DAYS = {
  Mondays: 'Segunda-feira',
  Tuesdays: 'Terça-feira',
  Wednesdays: 'Quarta-feira',
  Thursdays: 'Quinta-feira',
  Fridays: 'Sexta-feira',
  Saturdays: 'Sábado',
  Sundays: 'Domingo',
  'Sem dia': 'Sem dia definido',
}

function SeasonPage() {
  const [selectedId, setSelectedId] = useState(null)
  const { add, has } = useList()
  const { data, loading, error } = useFetch(getSeasonNow, [])

  const unique = [...new Map((data?.items ?? []).map((anime) => [anime.id, anime])).values()]
  const groups = unique.reduce((acc, anime) => {
    const day = anime.broadcastDay in DAYS ? anime.broadcastDay : 'Sem dia'
    ;(acc[day] ??= []).push(anime)
    return acc
  }, {})

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        jp="今季"
        title="Temporada atual"
        subtitle="O que está no ar agora, por dia da semana."
      />
      {loading && <Spinner />}
      {error && <ErrorMessage message={error.message} />}
      {data &&
        Object.keys(DAYS)
          .filter((day) => groups[day])
          .map((day) => (
            <section key={day} className="flex flex-col gap-4">
              <h3 className="font-display text-xl uppercase">{DAYS[day]}</h3>
              <AnimeGrid
                animes={groups[day]}
                onAdd={(anime) => add(anime)}
                onOpen={setSelectedId}
                isAdded={has}
              />
            </section>
          ))}
      <AnimeDetailModal id={selectedId} onClose={() => setSelectedId(null)} onOpen={setSelectedId} />
    </div>
  )
}

export default SeasonPage
