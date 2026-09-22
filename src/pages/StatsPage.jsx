import EmptyState from '../components/EmptyState.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import StatTile from '../components/StatTile.jsx'
import BestRated from '../features/BestRated.jsx'
import GenreBars from '../features/GenreBars.jsx'
import ScoreHistogram from '../features/ScoreHistogram.jsx'
import useStats from '../hooks/useStats.js'
import { useList } from '../state/ListContext.jsx'

const PANEL_CLASS = 'bg-paper border-2 border-ink rounded-lg p-6 flex flex-col gap-4'

function formatDiff(diff) {
  if (diff == null) return '–'
  return `${diff > 0 ? '+' : diff < 0 ? '-' : ''}${Math.abs(diff).toFixed(1)}`
}

function diffSub(diff) {
  if (diff == null) return 'avalie algo para comparar'
  if (diff === 0) return 'você avalia igual à média'
  return diff > 0 ? 'você avalia acima da média' : 'você avalia abaixo da média'
}

function StatsPage() {
  const { items } = useList()
  const stats = useStats(items)

  return (
    <div className="flex flex-col gap-6">
      <SectionHeading jp="統計" title="Estatísticas" subtitle="Calculadas a partir da sua lista." />
      {items.length === 0 ? (
        <EmptyState message="Sua lista está vazia." cta="Ir explorar" to="/" />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            <StatTile
              label="Animes na lista"
              value={stats.total}
              sub={`${stats.byStatus.done} assistidos · ${stats.byStatus.watching} assistindo`}
            />
            <StatTile label="Horas assistidas" value={stats.hours} sub={`${stats.episodesWatched} episódios`} />
            <StatTile label="Sua média" value={stats.myAverage ?? '–'} sub="nota média que você deu" />
            <StatTile label="Você vs. MAL" value={formatDiff(stats.diff)} sub={diffSub(stats.diff)} />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <section className={PANEL_CLASS}>
              <h3 className="font-display text-lg uppercase">Gêneros favoritos</h3>
              <GenreBars genres={stats.topGenres} />
            </section>
            <section className={PANEL_CLASS}>
              <h3 className="font-display text-lg uppercase">Melhor avaliado</h3>
              <BestRated item={stats.bestRated} />
              <h3 className="font-display text-lg uppercase">Suas notas</h3>
              <ScoreHistogram histogram={stats.scoreHistogram} />
            </section>
          </div>
        </>
      )}
    </div>
  )
}

export default StatsPage
