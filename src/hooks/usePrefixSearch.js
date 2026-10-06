import { useEffect, useMemo, useState } from 'react'
import { getPopularIndex } from '../services/anilist.js'

const normalizeText = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()

// A busca da AniList só casa palavras completas. Este hook filtra por prefixo,
// no cliente, os 100 animes mais populares para dar resultado enquanto se digita.
export default function usePrefixSearch(q) {
  const [index, setIndex] = useState([])

  useEffect(() => {
    let cancelled = false
    getPopularIndex()
      .then((items) => {
        if (!cancelled) setIndex(items)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  return useMemo(() => {
    const term = normalizeText(q.trim())
    if (term.length < 2) return []
    return index.filter((anime) =>
      normalizeText(anime.title)
        .split(/\s+/)
        .some((word) => word.startsWith(term)),
    )
  }, [index, q])
}
