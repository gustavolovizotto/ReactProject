import { useState } from 'react'
import EmptyState from '../components/EmptyState.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import AnimeDetailModal from '../features/AnimeDetailModal.jsx'
import ListHeaderRow from '../features/ListHeaderRow.jsx'
import ListRow from '../features/ListRow.jsx'
import StatusTabs from '../features/StatusTabs.jsx'
import { STATUS, useList } from '../state/ListContext.jsx'

function MyListPage() {
  const { items, update, remove } = useList()
  const [tab, setTab] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const count = (status) => items.filter((item) => item.status === status).length
  const counts = {
    all: items.length,
    plan: count(STATUS.PLAN),
    watching: count(STATUS.WATCHING),
    done: count(STATUS.DONE),
  }
  const visible = tab ? items.filter((item) => item.status === tab) : items

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading
        jp="私のリスト"
        title="Minha lista"
        subtitle={`Salva neste navegador. ${items.length} animes.`}
      />
      {items.length === 0 ? (
        <EmptyState message="Sua lista está vazia." cta="Ir explorar" to="/" />
      ) : (
        <>
          <StatusTabs value={tab} onChange={setTab} counts={counts} />
          <div className="overflow-x-auto">
            <div className="flex flex-col gap-3 min-w-[880px]">
              <ListHeaderRow />
              {visible.map((item) => (
                <ListRow
                  key={item.anime.id}
                  item={item}
                  onStatusChange={(id, status) => update(id, { status })}
                  onRemove={remove}
                  onOpen={setSelectedId}
                />
              ))}
              {visible.length === 0 && <p className="text-muted">Nenhum anime nesta aba.</p>}
            </div>
          </div>
        </>
      )}
      <AnimeDetailModal id={selectedId} onClose={() => setSelectedId(null)} onOpen={setSelectedId} />
    </div>
  )
}

export default MyListPage
