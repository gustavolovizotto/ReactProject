const ENDPOINT = 'https://graphql.anilist.co'

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function request(query, variables = {}, retry = true) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query, variables }),
  })
  if (res.status === 429 && retry) {
    const seconds = Number(res.headers.get('Retry-After')) || 2
    await wait(seconds * 1000)
    return request(query, variables, false)
  }
  if (!res.ok) throw new Error(`AniList ${res.status}`)
  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message)
  return json.data
}

const MEDIA_FIELDS = `
  id
  title { english romaji native }
  coverImage { large }
  averageScore
  popularity
  format
  episodes
  duration
  seasonYear
  startDate { year }
  status
  description(asHtml: false)
  genres
  studios(isMain: true) { nodes { name } }
  trailer { id site }
  rankings { rank type allTime }
  nextAiringEpisode { airingAt }
`

const TRAILER_URL = {
  youtube: (id) => `https://www.youtube.com/watch?v=${id}`,
  dailymotion: (id) => `https://www.dailymotion.com/video/${id}`,
}

function stripHtml(html) {
  return html ? html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim() : null
}

function normalize(raw) {
  const build = raw.trailer && TRAILER_URL[raw.trailer.site]
  return {
    id: raw.id,
    title: raw.title.english ?? raw.title.romaji,
    titleJp: raw.title.native,
    image: raw.coverImage.large,
    score: raw.averageScore != null ? raw.averageScore / 10 : null,
    rank: raw.rankings?.find((r) => r.type === 'RATED' && r.allTime)?.rank ?? null,
    members: raw.popularity,
    type: raw.format,
    episodes: raw.episodes,
    duration: raw.duration,
    year: raw.seasonYear ?? raw.startDate?.year ?? null,
    status: raw.status,
    synopsis: stripHtml(raw.description),
    genres: raw.genres ?? [],
    studios: raw.studios?.nodes.map((s) => s.name) ?? [],
    trailerUrl: build ? build(raw.trailer.id) : null,
  }
}

const PAGE_QUERY = `
  query ($page: Int, $perPage: Int, $search: String, $format: MediaFormat, $genre: [String],
         $status: MediaStatus, $season: MediaSeason, $seasonYear: Int, $sort: [MediaSort]) {
    Page(page: $page, perPage: $perPage) {
      pageInfo { currentPage lastPage hasNextPage }
      media(type: ANIME, isAdult: false, search: $search, format: $format, genre_in: $genre,
            status: $status, season: $season, seasonYear: $seasonYear, sort: $sort) {
        ${MEDIA_FIELDS}
      }
    }
  }
`

async function page(variables) {
  const data = await request(PAGE_QUERY, { perPage: 20, ...variables })
  return { items: data.Page.media.map(normalize), pageInfo: data.Page.pageInfo }
}

const TOP_FILTERS = {
  '': { sort: ['SCORE_DESC'] },
  bypopularity: { sort: ['POPULARITY_DESC'] },
  airing: { status: 'RELEASING', sort: ['POPULARITY_DESC'] },
}

export function getTopAnime(filter = '', pageNumber = 1) {
  return page({ page: pageNumber, ...(TOP_FILTERS[filter] ?? TOP_FILTERS['']) })
}

export function searchAnime({ q, type, genre, page: pageNumber = 1 }) {
  return page({
    page: pageNumber,
    search: q || undefined,
    format: type || undefined,
    genre: genre ? [genre] : undefined,
    sort: q ? ['SEARCH_MATCH'] : ['SCORE_DESC'],
  })
}

export async function getAnime(id) {
  const data = await request(`query ($id: Int) { Media(id: $id, type: ANIME) { ${MEDIA_FIELDS} } }`, { id })
  return normalize(data.Media)
}

export async function getRecommendations(id) {
  const data = await request(
    `query ($id: Int) {
      Media(id: $id, type: ANIME) {
        recommendations(sort: RATING_DESC, perPage: 6) {
          nodes { mediaRecommendation { id title { english romaji } coverImage { large } } }
        }
      }
    }`,
    { id },
  )
  return data.Media.recommendations.nodes
    .map((n) => n.mediaRecommendation)
    .filter(Boolean)
    .map((m) => ({ id: m.id, title: m.title.english ?? m.title.romaji, image: m.coverImage.large }))
}

let popularIndex = null

// Dois lotes de 50 (máximo da AniList) guardados em memória para a busca por prefixo no cliente.
export function getPopularIndex() {
  popularIndex ??= Promise.all(
    [1, 2].map((pageNumber) =>
      request(PAGE_QUERY, { page: pageNumber, perPage: 50, sort: ['POPULARITY_DESC'] }),
    ),
  ).then((pages) => pages.flatMap((data) => data.Page.media.map(normalize)))
  return popularIndex
}

const WEEKDAYS = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays']

function currentSeason(date = new Date()) {
  const seasons = ['WINTER', 'SPRING', 'SUMMER', 'FALL']
  return { season: seasons[Math.floor(date.getMonth() / 3)], seasonYear: date.getFullYear() }
}

export async function getSeasonNow() {
  const data = await request(PAGE_QUERY, { perPage: 25, ...currentSeason(), sort: ['POPULARITY_DESC'] })
  return {
    items: data.Page.media.map((raw) => ({
      ...normalize(raw),
      broadcastDay: raw.nextAiringEpisode
        ? WEEKDAYS[new Date(raw.nextAiringEpisode.airingAt * 1000).getDay()]
        : 'Sem dia',
    })),
  }
}

export const GENRES = [
  { id: 'Action', name: 'Ação' },
  { id: 'Adventure', name: 'Aventura' },
  { id: 'Comedy', name: 'Comédia' },
  { id: 'Drama', name: 'Drama' },
  { id: 'Fantasy', name: 'Fantasia' },
  { id: 'Romance', name: 'Romance' },
  { id: 'Sci-Fi', name: 'Ficção científica' },
  { id: 'Slice of Life', name: 'Slice of Life' },
  { id: 'Supernatural', name: 'Sobrenatural' },
  { id: 'Thriller', name: 'Suspense' },
]

export const TYPES = ['TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL']
