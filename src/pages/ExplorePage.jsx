import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Chip from '../components/Chip.jsx'
import Button from '../components/Button.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Pagination from '../components/Pagination.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import Spinner from '../components/Spinner.jsx'
import AnimeDetailModal from '../features/AnimeDetailModal.jsx'
import AnimeGrid from '../features/AnimeGrid.jsx'
import SearchBar from '../features/SearchBar.jsx'
import useDebounce from '../hooks/useDebounce.js'
import useFetch from '../hooks/useFetch.js'
import usePrefixSearch from '../hooks/usePrefixSearch.js'
import { getTopAnime, searchAnime } from '../services/anilist.js'
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
  const page = Math.max(1, Number(params.get('page')) || 1)
  // Mudar a busca volta para a página 1; mudar a página mantém a busca.
  const onChange = (next) => {
    const entries = Object.entries(next).filter(([, v]) => v)
    setParams(Object.fromEntries(entries), { replace: true })
  }
  const setPage = (n) => {
    const entries = Object.entries({ ...values, page: n > 1 ? String(n) : '' }).filter(([, v]) => v)
    setParams(Object.fromEntries(entries))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const debouncedQ = useDebounce(values.q)
  const q = debouncedQ.length >= 3 ? debouncedQ : ''
  const { type, genre } = values
  const searching = Boolean(q || type || genre)

  const fetchPage = (n) => (searching ? searchAnime({ q, type, genre, page: n }) : getTopAnime(filter, n))
  const { data, loading, error } = useFetch(() => fetchPage(page), [searching, q, type, genre, filter, page])

  // "Ver mais" acumula páginas seguintes abaixo da atual, sem trocar a URL.
  // O acumulado é descartado quando a busca ou a página mudam (a chave deixa de bater).
  const key = JSON.stringify([searching, q, type, genre, filter, page])
  const [moreState, setMoreState] = useState({ key, items: [], next: null, loading: false })
  const more = moreState.key === key ? moreState : { key, items: [], next: null, loading: false }
  const lastLoaded = more.next ?? data?.pageInfo
  const loadMore = async () => {
    setMoreState({ ...more, loading: true })
    const result = await fetchPage(lastLoaded.currentPage + 1).catch(() => null)
    setMoreState({
      key,
      items: result ? [...more.items, ...result.items] : more.items,
      next: result?.pageInfo ?? more.next,
      loading: false,
    })
  }

  // Resultados locais por prefixo aparecem na hora; os da API completam quando chegam.
  const local = usePrefixSearch(type || genre ? '' : values.q)
  const remote = [...(data?.items ?? []), ...more.items]
  const items = searching || local.length > 0
    ? [...local, ...remote.filter((anime) => !local.some((l) => l.id === anime.id))]
    : remote
  const showGrid = data || local.length > 0

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        jp="探す"
        title="Explorar"
        subtitle="Busque no catálogo do AniList e monte sua lista."
      />
      <SearchBar values={values} onChange={onChange} />
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl uppercase">{searching || local.length > 0 ? 'Resultados' : 'Top animes'}</h3>
        {!searching && local.length === 0 && (
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
      {showGrid && (
        <AnimeGrid animes={items} onAdd={(anime) => add(anime)} onOpen={setSelectedId} isAdded={has} />
      )}
      {data && lastLoaded?.hasNextPage && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={loadMore} disabled={more.loading}>
            {more.loading ? 'Carregando…' : 'Ver mais'}
          </Button>
        </div>
      )}
      {data && (page > 1 || data.pageInfo.hasNextPage) && (
        <Pagination page={page} lastPage={data.pageInfo.lastPage} onChange={setPage} />
      )}
      <AnimeDetailModal id={selectedId} onClose={() => setSelectedId(null)} onOpen={setSelectedId} />
    </div>
  )
}

export default ExplorePage
