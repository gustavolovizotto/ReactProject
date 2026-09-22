import { useMemo } from 'react'
import { STATUS } from '../state/ListContext.jsx'

const DEFAULT_MINUTES = 24

function episodeMinutes(duration) {
  const match = /(\d+)\s*min/.exec(duration ?? '')
  return match ? Number(match[1]) : DEFAULT_MINUTES
}

function average(values) {
  if (values.length === 0) return null
  const sum = values.reduce((acc, v) => acc + v, 0)
  return Math.round((sum / values.length) * 10) / 10
}

function computeStats(items) {
  const rated = items.filter((item) => item.score != null)
  const myAverage = average(rated.map((item) => item.score))
  const malAverage = average(rated.map((item) => item.anime.score).filter((s) => s != null))

  const genreCounts = {}
  for (const item of items) {
    for (const name of item.anime.genres ?? []) {
      genreCounts[name] = (genreCounts[name] ?? 0) + 1
    }
  }
  const topGenres = Object.entries(genreCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  const scoreHistogram = Array.from({ length: 10 }, () => 0)
  for (const item of rated) {
    const index = Math.round(item.score) - 1
    if (index >= 0 && index < 10) scoreHistogram[index] += 1
  }

  const bestRated = rated.reduce((best, item) => {
    if (!best) return item
    if (item.score !== best.score) return item.score > best.score ? item : best
    return (item.anime.score ?? 0) > (best.anime.score ?? 0) ? item : best
  }, null)

  return {
    total: items.length,
    byStatus: {
      plan: items.filter((item) => item.status === STATUS.PLAN).length,
      watching: items.filter((item) => item.status === STATUS.WATCHING).length,
      done: items.filter((item) => item.status === STATUS.DONE).length,
    },
    hours: Math.round(
      items.reduce((acc, item) => acc + (item.progress * episodeMinutes(item.anime.duration)) / 60, 0),
    ),
    episodesWatched: items.reduce((acc, item) => acc + item.progress, 0),
    myAverage,
    malAverage,
    diff: myAverage != null && malAverage != null ? Math.round((myAverage - malAverage) * 10) / 10 : null,
    topGenres,
    scoreHistogram,
    bestRated,
  }
}

export default function useStats(items) {
  return useMemo(() => computeStats(items), [items])
}
