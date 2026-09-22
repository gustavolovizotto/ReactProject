const BASE = 'https://api.jikan.moe/v4'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function request(path, retry = true) {
  const res = await fetch(`${BASE}${path}`)
  if (res.status === 429 && retry) {
    await wait(1000)
    return request(path, false)
  }
  if (!res.ok) throw new Error(`Jikan ${res.status}`)
  return res.json()
}

function normalize(raw) {
  return {
    id: raw.mal_id,
    title: raw.title_english ?? raw.title,
    titleJp: raw.title_japanese,
    image: raw.images.jpg.large_image_url,
    score: raw.score,
    rank: raw.rank,
    members: raw.members,
    type: raw.type,
    episodes: raw.episodes,
    duration: raw.duration,
    year: raw.year,
    status: raw.status,
    synopsis: raw.synopsis,
    genres: raw.genres.map((g) => g.name),
    studios: raw.studios.map((s) => s.name),
    trailerUrl: raw.trailer?.url ?? null,
  }
}

export async function getTopAnime(filter = '') {
  const suffix = filter ? `&filter=${filter}` : ''
  const json = await request(`/top/anime?limit=20${suffix}`)
  return { items: json.data.map(normalize) }
}

export async function searchAnime({ q, type, genre }) {
  const params = new URLSearchParams()
  if (q) params.set('q', q)
  if (type) params.set('type', type)
  if (genre) params.set('genres', genre)
  params.set('limit', '20')
  params.set('order_by', 'score')
  params.set('sort', 'desc')
  params.set('sfw', 'true')
  const json = await request(`/anime?${params}`)
  return { items: json.data.map(normalize) }
}

export async function getAnime(id) {
  const json = await request(`/anime/${id}/full`)
  return normalize(json.data)
}

export async function getRecommendations(id) {
  const json = await request(`/anime/${id}/recommendations`)
  return json.data.slice(0, 6).map(({ entry }) => ({
    id: entry.mal_id,
    title: entry.title,
    image: entry.images.jpg.large_image_url,
  }))
}

export async function getSeasonNow() {
  const json = await request('/seasons/now?limit=25')
  return {
    items: json.data.map((raw) => ({
      ...normalize(raw),
      broadcastDay: raw.broadcast?.day ?? 'Sem dia',
    })),
  }
}

export const GENRES = [
  { id: 1, name: 'Ação' },
  { id: 2, name: 'Aventura' },
  { id: 4, name: 'Comédia' },
  { id: 8, name: 'Drama' },
  { id: 10, name: 'Fantasia' },
  { id: 22, name: 'Romance' },
  { id: 24, name: 'Ficção científica' },
  { id: 36, name: 'Slice of Life' },
  { id: 37, name: 'Sobrenatural' },
  { id: 41, name: 'Suspense' },
]

export const TYPES = ['tv', 'movie', 'ova', 'ona', 'special']
