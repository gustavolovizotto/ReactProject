import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import AnimeDetailModal from '../features/AnimeDetailModal.jsx'
import ListHeaderRow from '../features/ListHeaderRow.jsx'
import ListRow from '../features/ListRow.jsx'
import StatusTabs from '../features/StatusTabs.jsx'
import { STATUS, useList } from '../state/ListContext.jsx'

const BUTTON_CLASS =
  'inline-flex items-center h-11 px-5 rounded border-2 border-ink font-semibold shadow-[4px_4px_0_#1c1a17] bg-vermilion text-white'

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
        <div className="flex flex-col items-start gap-4 rounded-lg border-2 border-ink bg-paper p-8">
          <p className="text-muted">Sua lista está vazia.</p>
          <Link to="/" className={BUTTON_CLASS}>
            Ir explorar
          </Link>
        </div>
      ) : (
        <>
          <StatusTabs value={tab} onChange={setTab} counts={counts} />
          <div className="flex flex-col gap-3">
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
        </>
      )}
      <AnimeDetailModal id={selectedId} onClose={() => setSelectedId(null)} onOpen={setSelectedId} />
    </div>
  )
}

export default MyListPage
