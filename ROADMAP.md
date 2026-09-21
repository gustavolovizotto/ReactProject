# Roadmap · AnimeTracker

SPA em React que consome a API pública **Jikan** (dados do MyAnimeList) e permite montar uma lista pessoal de animes com status, nota e estatísticas. Trabalho da disciplina Programação Web Fullstack. Prazo: **sexta, 25/09/2026**.

Design aprovado: https://claude.ai/artifact/NMDwaEm3HtFbcEp5pzVbc3

## Requisitos do enunciado e como cada um é atendido

| Requisito | Atendido por |
|---|---|
| API JSON aberta | Jikan v4 (`https://api.jikan.moe/v4`), sem chave |
| Hook obrigatório (lista: useMemo, useReducer, react-redux, useRef, forwardRef, memo, lazy, createPortal) | `useReducer` na lista pessoal, `useMemo` nas estatísticas, `createPortal` no modal |
| Biblioteca externa | React Router, react-hook-form + Yup, Tailwind CSS |
| SPA sem redirecionamento | Rotas client-side com React Router |
| Cadência de commits | 1 commit por task, mensagens em português no padrão `feat: ...` |
| Documentar IA | Seção "Ferramentas de apoio" no README citando Claude Code |
| Apresentação | Roteiro na task 13 |

## Regras gerais para todas as tasks

- **Stack fixa**: Vite + React 18 (JavaScript, arquivos `.jsx`), Tailwind CSS v4 via `@tailwindcss/vite`, `react-router-dom` v6, `react-hook-form`, `yup`, `@hookform/resolvers`. Não adicionar outra dependência sem necessidade.
- **Sem TypeScript, sem MUI, sem styled-components, sem CSS module.** Tudo com classes Tailwind. CSS global só em `src/index.css` (tokens do tema e fontes).
- **Componentização**: um componente por arquivo, nome do arquivo igual ao componente, `export default`. Componente não faz `fetch`, recebe dados por props. Páginas orquestram, componentes exibem.
- **Estrutura de pastas**:
  ```
  src/
    components/   # visuais reutilizáveis (Button, Cover, SectionHeading...)
    features/     # componentes de domínio (AnimeCard, ListRow, RatingForm...)
    pages/        # uma por rota
    hooks/        # useFetch, useList, useStats
    services/     # jikan.js
    state/        # ListContext.jsx (useReducer)
    lib/          # utilidades puras (format.js, storage.js)
  ```
- **Tema** (definido uma vez em `src/index.css` com `@theme` do Tailwind v4):
  - cores: `--color-cream: #f3e9d8`, `--color-paper: #faf4e8`, `--color-sand: #eadfca`, `--color-ink: #1c1a17`, `--color-muted: #5e574d`, `--color-vermilion: #e8432b`
  - fontes: `--font-display: "Archivo Black"`, `--font-body: "DM Sans"`, `--font-jp: "Noto Sans JP"` (Google Fonts no `index.html`)
  - Identidade: bordas `border-2 border-ink`, sombra dura `shadow-[4px_4px_0_#1c1a17]`, títulos em caixa alta na fonte display, rótulo japonês em vermelhão acima de cada título, rabisco SVG abaixo.
- **Acessibilidade mínima**: botão é `<button>`, link é `<a>`/`<Link>`, input tem `<label>`, botão só com ícone tem `aria-label`.
- **Fluxo git por task**: só começar a task N se o PR da task N-1 já estiver **mergeado** na `main` (conferir com `gh pr list --state merged`; se o anterior estiver aberto, parar e avisar). Então `git checkout main && git pull`, `git checkout -b task-NN-slug`, implementar, `npm run build` e `npm run lint` sem erro, funcionalidade conferida no navegador, **um commit** com a mensagem indicada, `git push -u origin task-NN-slug` e `gh pr create --title "<mensagem do commit>" --body "<resumo e critério de aceite>"`. Parar e aguardar o merge.
- **Autoria**: todo commit deve ter autor e committer `gustavolovizotto` (`git config user.email gustavolovizotto@gmail.com`). **Proibido** qualquer trailer `Co-Authored-By` ou rodapé "Generated with Claude Code", tanto no commit quanto na descrição do PR. O uso de IA é documentado apenas no README.
- **Limite da Jikan**: 3 requisições por segundo. Nunca disparar fetch a cada tecla, sempre com debounce de 500 ms.
- **Formato do objeto Anime normalizado** (usado em toda a aplicação, produzido só em `services/jikan.js`):
  ```js
  { id, title, titleJp, image, score, rank, members, type, episodes, duration, year, status, synopsis, genres: [string], studios: [string], trailerUrl }
  ```

---

## Cronograma

| Dia | Tasks |
|---|---|
| Seg 21/09 | 01, 02 |
| Ter 22/09 | 03, 04, 05 |
| Qua 23/09 | 06, 07, 08 |
| Qui 24/09 | 09, 10, 11, 13 |
| Sex 25/09 | 12 se sobrar tempo. Apresentação. |

---

## Task 01 · Scaffold do projeto

**Objetivo**: projeto Vite rodando com Tailwind, React Router e fontes carregadas.

**Passos**:
1. Na raiz do repositório (já clonado em `~/Development/ReactProject`) rodar `npm create vite@latest . -- --template react` (aceitar sobrescrever pasta vazia).
2. Instalar: `npm i react-router-dom react-hook-form yup @hookform/resolvers` e `npm i -D tailwindcss @tailwindcss/vite`.
3. Em `vite.config.js` adicionar o plugin `tailwindcss()` ao array `plugins`.
4. Substituir `src/index.css` por: `@import "tailwindcss";` seguido do bloco `@theme` com as cores e fontes da seção "Tema". Adicionar `body { @apply bg-vermilion font-body text-ink; }`.
5. Em `index.html`: `lang="pt-BR"`, `<title>AnimeTracker</title>`, `<link>` do Google Fonts com Archivo Black, DM Sans (400, 500, 600, 700) e Noto Sans JP (500, 700).
6. Apagar `src/App.css`, `src/assets/react.svg`. Deixar `App.jsx` renderizando só `<h1 className="font-display">AnimeTracker</h1>` por enquanto.
7. Criar `README.md` com: nome do projeto, descrição em 2 linhas, integrante (Gustavo Tesin), stack, como rodar (`npm i && npm run dev`), e seção **Ferramentas de apoio** dizendo que o Claude Code foi usado para planejamento, design e geração de código, com revisão do autor.
8. `.gitignore` já vem do Vite. Conferir que `node_modules` e `dist` estão nele.

**Critério de aceite**: `npm run dev` abre a página com fundo vermelhão e título na fonte Archivo Black.

**Commit**: `chore: scaffold vite + react + tailwind + router`

---

## Task 02 · Layout e rotas

**Objetivo**: casca visual da aplicação com a moldura, cabeçalho e navegação entre 4 rotas, sem conteúdo.

**Arquivos a criar**:
- `src/components/Frame.jsx`: `<div className="min-h-screen p-4 bg-vermilion">` contendo `<div className="min-h-[calc(100vh-2rem)] rounded-[22px] border-2 border-ink bg-cream overflow-hidden">{children}</div>`.
- `src/components/Logo.jsx`: caixa quadrada 48 px com `border-2 border-vermilion text-vermilion font-jp` e o texto `アニ`; ao lado, `<h1>` "AnimeTracker" na fonte display e abaixo `<span className="font-jp text-xs text-vermilion">アニメトラッカー</span>`. Todo o logo é um `<Link to="/">`.
- `src/components/NavTabs.jsx`: recebe `items = [{ to, label }]`. Renderiza `<nav aria-label="Seções">` com `<NavLink>` para cada item. Classe do ativo: `text-vermilion border-b-[3px] border-vermilion`; inativo: `text-ink border-b-[3px] border-transparent`.
- `src/components/ListCounter.jsx`: recebe `count`. Caixa com `border-2 border-ink shadow-[3px_3px_0_#1c1a17]`, texto `<span className="font-jp text-vermilion">リスト</span> {count} na lista`. Nesta task recebe `0` fixo.
- `src/components/Header.jsx`: `<header className="h-[84px] px-12 flex items-center justify-between border-b-2 border-ink">` com `Logo`, `NavTabs` e `ListCounter`.
- `src/components/AppLayout.jsx`: `Frame` > `Header` + `<main className="px-12 py-8">` com `<Outlet />`.
- `src/pages/ExplorePage.jsx`, `SeasonPage.jsx`, `MyListPage.jsx`, `StatsPage.jsx`: cada uma retorna só um `<h2>` com o nome.
- `src/main.jsx`: `createBrowserRouter` com uma rota pai `element: <AppLayout />` e filhas `index` (Explore), `temporada`, `lista`, `estatisticas`. Envolver em `RouterProvider`.

**Itens do NavTabs**: Explorar `/`, Temporada `/temporada`, Minha lista `/lista`, Estatísticas `/estatisticas`.

**Critério de aceite**: clicar nas abas troca a página sem recarregar e a aba ativa fica sublinhada em vermelho.

**Commit**: `feat: layout base com moldura, header e rotas`

---

## Task 03 · Serviço da Jikan e hook de fetch

**Objetivo**: uma única camada que fala com a API e devolve objetos normalizados.

**Arquivos a criar**:
- `src/services/jikan.js`:
  - `const BASE = "https://api.jikan.moe/v4"`.
  - Função interna `request(path)`: `fetch`, se `!res.ok` lança `Error(`Jikan ${res.status}`)`, retorna `res.json()`.
  - Função interna `normalize(raw)` que transforma o item bruto da Jikan no objeto Anime padronizado (ver "Formato do objeto Anime"). Campos: `id = mal_id`, `title = title_english ?? title`, `titleJp = title_japanese`, `image = images.jpg.large_image_url`, `score`, `rank`, `members`, `type`, `episodes`, `duration`, `year`, `status`, `synopsis`, `genres = genres.map(g => g.name)`, `studios = studios.map(s => s.name)`, `trailerUrl = trailer?.url ?? null`.
  - Exportar:
    - `getTopAnime(filter = "")` → `/top/anime?limit=20` e, se `filter`, `&filter=bypopularity|airing`. Retorna `{ items: [Anime] }`.
    - `searchAnime({ q, type, genre })` → `/anime?q=&type=&genres=&limit=20&order_by=score&sort=desc&sfw=true`. Só inclui os parâmetros preenchidos (usar `URLSearchParams`).
    - `getAnime(id)` → `/anime/${id}/full`. Retorna um Anime.
    - `getRecommendations(id)` → `/anime/${id}/recommendations`, pega os 6 primeiros, mapeia `entry` para `{ id, title, image }`.
    - `getSeasonNow()` → `/seasons/now?limit=25`. Retorna `{ items: [Anime] }` com campo extra `broadcastDay = broadcast?.day ?? "Sem dia"`.
    - `GENRES`: array fixo `[{ id: 1, name: "Ação" }, { id: 2, name: "Aventura" }, { id: 4, name: "Comédia" }, { id: 8, name: "Drama" }, { id: 10, name: "Fantasia" }, { id: 22, name: "Romance" }, { id: 24, name: "Ficção científica" }, { id: 36, name: "Slice of Life" }, { id: 37, name: "Sobrenatural" }, { id: 41, name: "Suspense" }]`.
    - `TYPES`: `["tv", "movie", "ova", "ona", "special"]`.
- `src/hooks/useFetch.js`: `useFetch(fetcher, deps)`. Estado `{ data, loading, error }`. Dentro de `useEffect` chama `fetcher()`, ignora resultado se o componente desmontou ou as deps mudaram (flag `cancelled`). Retorna `{ data, loading, error }`.

**Critério de aceite**: em `ExplorePage`, temporariamente, `const { data } = useFetch(() => getTopAnime(), [])` e `console.log(data)` mostra 20 animes normalizados. Remover o log antes do commit.

**Commit**: `feat: serviço jikan com normalização e hook useFetch`

---

## Task 04 · Componentes visuais base

**Objetivo**: peças reutilizáveis da identidade visual, sem lógica de negócio.

**Arquivos a criar em `src/components/`**:
- `SectionHeading.jsx`: props `jp`, `title`, `subtitle`. Renderiza `<span className="font-jp text-3xl text-vermilion leading-none">{jp}</span>`, `<h2 className="font-display text-3xl uppercase">{title}</h2>`, o SVG do rabisco (96×10, `stroke="currentColor"`, `text-ink`, path `M2 6c6-6 10-6 16 0s10 6 16 0 10-6 16 0 10 6 16 0 10-6 16 0 10 6 12 2`) e `<p className="text-muted">{subtitle}</p>` se houver.
- `Button.jsx`: props `variant = "primary" | "outline"`, `...rest`. Base: `h-11 px-5 rounded border-2 border-ink font-semibold shadow-[4px_4px_0_#1c1a17] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50`. Primary: `bg-vermilion text-white`. Outline: `bg-paper text-ink`.
- `Chip.jsx`: props `active`, `onClick`, `children`. `h-9 px-4 rounded-full border-2 border-ink text-sm`. Ativo: `bg-vermilion text-white`; inativo: `bg-transparent text-muted`.
- `Cover.jsx`: props `src`, `alt`, `className`. `<img>` com `loading="lazy"`, `object-cover border-2 border-ink rounded-md`. Se `src` for nulo, renderiza `<div>` da mesma classe com `bg-sand` e o `alt` centralizado em texto pequeno.
- `ScoreBadge.jsx`: prop `score`. `<span className="bg-cream border-2 border-ink text-xs font-semibold px-2 py-1 rounded-md">★ {score ?? "–"}</span>`.
- `Field.jsx`: props `label`, `id`, `error`, `children`. `<label htmlFor={id}>` em `text-sm text-muted`, o `children` (input ou select passado pelo pai) e `<p className="text-vermilion text-xs">{error}</p>` se houver. Classe padrão para inputs, exportada como `inputClass = "h-11 w-full px-3 rounded border-2 border-ink bg-paper"`.
- `Spinner.jsx`: texto `Carregando…` com `animate-pulse`, centralizado.
- `ErrorMessage.jsx`: prop `message`. Caixa `border-2 border-vermilion text-vermilion p-4`.

**Critério de aceite**: `ExplorePage` renderiza um `SectionHeading` e um `Button` só para conferência visual.

**Commit**: `feat: componentes visuais base da identidade`

---

## Task 05 · Página Explorar com Top Animes

**Objetivo**: grid de cards com os animes do Top, com chips de ordenação.

**Arquivos**:
- `src/features/AnimeCard.jsx`: props `anime`, `onAdd`, `added`. `<article className="flex flex-col gap-2">` com `Cover` (216×300, `ScoreBadge` posicionado no canto inferior direito via wrapper `relative`), título em `<h3 className="font-display text-sm truncate">`, meta `<span className="text-sm text-muted">{type} · {episodes ?? "?"} ep</span>` e `Button variant="outline"` com texto `+ Quero ver` (ou `Na lista ✓` desabilitado quando `added`). O clique no cover e no título chama `onOpen(anime.id)` (prop) para abrir o detalhe; nesta task `onOpen` ainda não faz nada.
- `src/features/AnimeGrid.jsx`: props `animes`, `onAdd`, `onOpen`, `isAdded`. `<div className="grid grid-cols-5 gap-6">` mapeando `AnimeCard`. Se `animes` vazio, mostra `<p className="text-muted">Nenhum anime encontrado.</p>`.
- `src/pages/ExplorePage.jsx`: estado `filter` (`""`, `"bypopularity"`, `"airing"`). `useFetch(() => getTopAnime(filter), [filter])`. Renderiza `SectionHeading jp="探す" title="Explorar" subtitle="Busque no catálogo do MyAnimeList e monte sua lista."`, linha com `<h3>Top animes</h3>` e 3 `Chip` (Melhor nota, Mais populares, Em exibição), depois `Spinner`/`ErrorMessage`/`AnimeGrid`.

**Critério de aceite**: página abre com 20 cards, trocar o chip refaz a busca e reordena.

**Commit**: `feat: página explorar com top animes e ordenação`

---

## Task 06 · Busca com filtros

**Objetivo**: buscar por texto, tipo e gênero, com a busca refletida na URL.

**Arquivos**:
- `src/hooks/useDebounce.js`: `useDebounce(value, delay = 500)` retorna o valor atrasado via `useState` + `useEffect` com `setTimeout`.
- `src/features/SearchBar.jsx`: props `values = { q, type, genre }`, `onChange(next)`. `<form onSubmit={e => e.preventDefault()} className="flex items-end gap-3">` com `Field` "Buscar" (input texto, largura 560), `Field` "Tipo" (select com opção "Todos" + `TYPES`), `Field` "Gênero" (select com "Todos" + `GENRES`), e `Button` "Buscar" tipo `submit`. Cada mudança chama `onChange({ ...values, campo: valor })`.
- `src/pages/ExplorePage.jsx`: usar `useSearchParams`. `values` vem dos params (`q`, `type`, `genre`). `onChange` grava nos params (remover chave vazia). `const q = useDebounce(values.q)`. Regra: se `q` tem 3+ caracteres **ou** `type` **ou** `genre` estiver preenchido, chama `searchAnime({ q, type, genre })` e o título da seção vira "Resultados"; senão mantém `getTopAnime(filter)` e "Top animes". Chips de ordenação só aparecem no modo Top.

**Critério de aceite**: digitar "fullmetal" atualiza a URL para `?q=fullmetal`, espera meio segundo e mostra resultados. Recarregar a página com a URL mantém a busca.

**Commit**: `feat: busca com filtros e estado na URL`

---

## Task 07 · Estado da lista pessoal com useReducer

**Objetivo**: adicionar animes à lista, com persistência em localStorage. Hook obrigatório `useReducer`.

**Arquivos**:
- `src/lib/storage.js`: `load(key, fallback)` com `try/catch` em `JSON.parse(localStorage.getItem(key))`, e `save(key, value)`.
- `src/state/ListContext.jsx`:
  - Constantes exportadas `STATUS = { PLAN: "Quero ver", WATCHING: "Assistindo", DONE: "Assisti" }`.
  - Formato de item: `{ anime: Anime, status, score: number|null, comment: string, progress: number, addedAt: ISOString }`.
  - `reducer(state, action)` com ações: `ADD` (`{ anime, status = STATUS.PLAN }`, ignora se já existe), `UPDATE` (`{ id, patch }`, faz merge no item), `REMOVE` (`{ id }`).
  - `ListProvider`: `useReducer(reducer, undefined, () => load("animetracker:list", []))`, `useEffect` que salva a cada mudança, `Context.Provider value={{ items, dispatch }}`.
  - Hook `useList()` que retorna `{ items, add(anime, status), update(id, patch), remove(id), get(id), has(id) }` construídos sobre `dispatch`.
- `src/main.jsx`: envolver `RouterProvider` com `ListProvider`.
- `Header.jsx`: `ListCounter count={items.length}` usando `useList`.
- `ExplorePage.jsx`: passar `onAdd={anime => add(anime)}` e `isAdded={has}` para o grid.

**Critério de aceite**: clicar "+ Quero ver" muda o botão para "Na lista ✓", o contador do header sobe, e ao recarregar a página o estado persiste.

**Commit**: `feat: lista pessoal com useReducer e localStorage`

---

## Task 08 · Modal de detalhe

**Objetivo**: abrir o detalhe de um anime em um modal sem sair da página. Hook obrigatório `createPortal`.

**Arquivos**:
- `index.html`: adicionar `<div id="modal-root"></div>` após `#root`.
- `src/components/Modal.jsx`: props `open`, `onClose`, `title`, `children`. Se `!open` retorna `null`. Usa `createPortal` para `document.getElementById("modal-root")`. Estrutura: overlay `fixed inset-0 bg-ink/70 flex items-center justify-center p-4` (clique fecha), painel `role="dialog" aria-modal="true" aria-labelledby="modal-title"` com `w-full max-w-[1040px] max-h-[90vh] overflow-y-auto bg-paper border-2 border-ink rounded-xl shadow-[8px_8px_0_#1c1a17] p-9 relative`, botão fechar `aria-label="Fechar"` no canto. `useEffect` fecha com tecla Escape e bloqueia scroll do body enquanto aberto.
- `src/features/AnimeDetail.jsx`: prop `anime`, `recommendations`, `onOpen`. Layout em duas colunas: `Cover` 260×370; à direita meta em caixa alta pequena (`{type} · {year} · {episodes} episódios · {studios.join(", ")}`), `titleJp` em `font-jp text-vermilion`, `<h2 id="modal-title">` título, `Chip`s dos gêneros (não clicáveis), três números grandes em `font-display text-vermilion` (Nota MAL, Ranking `#`, Membros formatados com `Intl.NumberFormat("pt-BR", { notation: "compact" })`), sinopse, e `<a target="_blank" rel="noreferrer">` "Assistir trailer" se `trailerUrl`. Abaixo, `<h3>Quem gostou também viu</h3>` com os 6 recomendados em `Cover` 120×168 clicáveis chamando `onOpen(id)`.
- `src/pages/ExplorePage.jsx`: estado `selectedId`. `onOpen={setSelectedId}`. Renderiza `<AnimeDetailModal id={selectedId} onClose={() => setSelectedId(null)} />`.
- `src/features/AnimeDetailModal.jsx`: prop `id`, `onClose`, `onOpen`. Faz `useFetch(() => Promise.all([getAnime(id), getRecommendations(id)]), [id])` quando `id` existe. Renderiza `Modal` com `Spinner`, `ErrorMessage` ou `AnimeDetail`. Clicar num recomendado troca o `id` (via `onOpen` do pai).

**Critério de aceite**: clicar na capa abre o modal com dados completos, Esc e clique fora fecham, recomendação navega para outro anime dentro do modal.

**Commit**: `feat: modal de detalhe com createPortal e recomendações`

---

## Task 09 · Formulário de avaliação

**Objetivo**: no modal, salvar status, nota e comentário com validação. Bibliotecas `react-hook-form` + `yup`.

**Arquivos**:
- `src/features/RatingForm.jsx`: props `anime`, `initial` (item da lista ou `null`), `onSaved`.
  - Schema Yup:
    ```js
    yup.object({
      status: yup.string().oneOf(Object.values(STATUS)).required("Escolha um status"),
      score: yup.number().transform(v => (Number.isNaN(v) ? null : v)).nullable()
        .min(1).max(10)
        .when("status", { is: STATUS.DONE, then: s => s.required("Dê uma nota para o que você assistiu") }),
      comment: yup.string().max(200, "Máximo de 200 caracteres"),
    })
    ```
  - `useForm({ resolver: yupResolver(schema), defaultValues: initial ?? { status: STATUS.PLAN, score: null, comment: "" } })`.
  - Layout: caixa `bg-sand border-2 border-ink rounded-lg p-6`, `<h3>` "Adicionar à minha lista" (ou "Editar na minha lista" se `initial`), linha com `Field` Status (select com os 3 status), `Field` "Sua nota (1 a 10)" (select vazio + 1..10), `Field` Comentário (input), `Button` "Salvar". Erros aparecem sob cada campo via `errors.campo?.message`. Texto de apoio: `A nota é obrigatória quando o status é "Assisti".`
  - `onSubmit`: se `initial`, `update(anime.id, data)`; senão `add(anime, data.status)` seguido de `update(anime.id, data)`. Chama `onSaved()`.
  - Botão secundário "Remover da lista" (`variant="outline"`) só quando `initial`.
- `AnimeDetail.jsx`: renderizar `RatingForm` entre as informações e as recomendações, passando `initial={get(anime.id)}`.

**Critério de aceite**: salvar com "Assisti" sem nota mostra erro em vermelho; com nota, o item aparece na lista com o status escolhido e o formulário passa para modo edição.

**Commit**: `feat: formulário de avaliação com react-hook-form e yup`

---

## Task 10 · Página Minha lista

**Objetivo**: visualizar e gerenciar a lista pessoal.

**Arquivos**:
- `src/features/StatusTabs.jsx`: props `value`, `onChange`, `counts = { all, plan, watching, done }`. Quatro `Chip`: Todos, Quero ver, Assistindo, Assisti, cada um com o número ao lado em `opacity-70`.
- `src/features/ListRow.jsx`: props `item`, `onStatusChange`, `onRemove`, `onOpen`. `<div className="grid grid-cols-[64px_1fr_160px_120px_120px_180px_48px] gap-5 items-center p-3 bg-paper border-2 border-ink rounded-md">` com: `Cover` 48×68; título (clicável, `onOpen`) e meta; progresso `{progress} / {episodes ?? "?"}`; sua nota em `text-vermilion font-semibold` (ou `–`); `★ {score MAL}`; `<select aria-label={`Status de ${title}`}>` com os 3 status chamando `onStatusChange`; botão lixeira `aria-label={`Remover ${title}`}` com SVG inline.
- `src/features/ListHeaderRow.jsx`: mesma grade com rótulos em `text-xs uppercase tracking-wider text-muted`: vazio, Anime, Progresso, Sua nota, Nota MAL, Status, vazio.
- `src/pages/MyListPage.jsx`: `useList()`, estado `tab`. Filtra `items` pelo status. `SectionHeading jp="私のリスト" title="Minha lista" subtitle={`Salva neste navegador. ${items.length} animes.`}`. Se lista vazia: caixa com texto "Sua lista está vazia." e `<Link to="/">` estilizado como `Button` "Ir explorar". Senão `StatusTabs`, `ListHeaderRow` e `ListRow`s. Reutiliza `AnimeDetailModal` para `onOpen`.

**Critério de aceite**: trocar o status no select move o item de aba; remover apaga com persistência; lista vazia mostra o convite.

**Commit**: `feat: página minha lista com filtros e edição de status`

---

## Task 11 · Página Estatísticas

**Objetivo**: números calculados a partir da lista. Hook obrigatório `useMemo`.

**Arquivos**:
- `src/hooks/useStats.js`: `useStats(items)` com `useMemo(() => ..., [items])` retornando:
  - `total`, `byStatus = { plan, watching, done }`
  - `hours`: soma de `progress * minutosDoEpisodio / 60`, onde minutos = número extraído de `anime.duration` (regex `/(\d+)\s*min/`, padrão 24). Arredondar.
  - `episodesWatched`: soma de `progress`.
  - `myAverage`: média dos `score` não nulos, 1 casa decimal, `null` se nenhum.
  - `malAverage`: média de `anime.score` dos mesmos itens avaliados. `diff = myAverage - malAverage`.
  - `topGenres`: contagem de `anime.genres`, top 5 em `[{ name, count }]`.
  - `scoreHistogram`: array de 10 posições com a contagem de cada nota 1..10.
  - `bestRated`: item com maior `score` (desempate por `anime.score`), ou `null`.
- `src/components/StatTile.jsx`: props `label`, `value`, `sub`. Caixa `bg-paper border-2 border-ink rounded-lg p-6 shadow-[4px_4px_0_#1c1a17]`, valor em `font-display text-4xl text-vermilion`.
- `src/features/GenreBars.jsx`: prop `genres`. Para cada, rótulo + contagem e barra `h-2.5 border-2 border-ink rounded-full bg-sand` com preenchimento `bg-vermilion` de largura `count / max * 100%`.
- `src/features/ScoreHistogram.jsx`: prop `histogram`. 10 colunas `flex items-end`, altura proporcional ao máximo (mínimo 4 px), rótulo 1..10.
- `src/features/BestRated.jsx`: prop `item`. `Cover` 120×168, título, "Sua nota **X** · MAL Y", comentário entre aspas se houver.
- `src/pages/StatsPage.jsx`: `SectionHeading jp="統計" title="Estatísticas" subtitle="Calculadas a partir da sua lista."`. Grid de 4 `StatTile` (Animes na lista, Horas assistidas, Sua média, Você vs. MAL com sinal `+`/`-` e sub "você avalia acima/abaixo da média"). Abaixo, duas colunas: `GenreBars` e um painel com `BestRated` + `ScoreHistogram`. Se lista vazia, mesma caixa de convite da Task 10 (extrair para `src/components/EmptyState.jsx` com props `message`, `cta`, `to`).

**Critério de aceite**: adicionar e avaliar animes altera os números na hora; com lista vazia aparece o convite.

**Commit**: `feat: página estatísticas com useMemo`

---

## Task 12 · Página Temporada (opcional)

**Objetivo**: animes em exibição agrupados por dia da semana. Só fazer se as tasks 01 a 11 e 13 estiverem prontas.

**Arquivos**:
- `src/pages/SeasonPage.jsx`: `useFetch(getSeasonNow, [])`. Agrupa `items` por `broadcastDay` com `Object.groupBy` (ou `reduce`). Ordem dos dias: Mondays, Tuesdays, Wednesdays, Thursdays, Fridays, Saturdays, Sundays, depois "Sem dia". Traduzir para português com um objeto `DAYS`. Para cada dia, `<h3 className="font-display">` e `AnimeGrid` com os mesmos `onAdd`, `isAdded`, `onOpen` da Explorar. `SectionHeading jp="今季" title="Temporada atual" subtitle="O que está no ar agora, por dia da semana."`.

Se a task for pulada, remover a aba Temporada do `NavTabs` e a rota, para não apresentar aba vazia.

**Commit**: `feat: página temporada agrupada por dia` ou `chore: remove aba temporada`

---

## Task 13 · Polimento, README final e deploy

**Objetivo**: entrega apresentável.

**Passos**:
1. Testar o fluxo inteiro: explorar → buscar → abrir detalhe → avaliar → ver na lista → mudar status → estatísticas. Corrigir o que quebrar.
2. Tratar erro 429 da Jikan: em `request()`, se `res.status === 429`, esperar 1 s e tentar uma vez mais.
3. Responsividade mínima: grid `grid-cols-2 md:grid-cols-3 lg:grid-cols-5`; `ListRow` com `overflow-x-auto` no container; header `px-4 md:px-12`; `SearchBar` com `flex-wrap`.
4. Rodapé em `AppLayout`: `Dados de MyAnimeList via Jikan API` com links, em `text-sm text-vermilion`.
5. Deploy no GitHub Pages: `npm i -D gh-pages`, em `vite.config.js` `base: "/ReactProject/"`, em `main.jsx` `createBrowserRouter(routes, { basename: import.meta.env.BASE_URL })`, script `"deploy": "vite build && gh-pages -d dist"`, criar `public/404.html` copiando o `index.html` gerado (fallback de rota). Rodar `npm run deploy` e ativar Pages na branch `gh-pages`. Colocar o link no README.
6. README final com: link do deploy, screenshots (pasta `docs/`), tabela "Requisito → onde está no código" (igual à do topo deste arquivo, com caminhos dos arquivos), seção "Divisão de responsabilidades" (integrante único), seção "Ferramentas de apoio" detalhando o uso do Claude Code e do design gerado.
7. Roteiro da apresentação (5 minutos) em `docs/APRESENTACAO.md`: 1 min contexto e API, 2 min demo do fluxo, 1 min mostrar `ListContext` (useReducer), `Modal` (createPortal) e `useStats` (useMemo), 1 min mostrar commits e README.

**Commit**: `chore: polimento, readme final e deploy no github pages`

---

## Checklist final antes da apresentação

- [ ] Repositório público com pelo menos 12 commits distribuídos em 4 dias
- [ ] Deploy acessível
- [ ] README com ferramentas de apoio e IA
- [ ] Os 3 requisitos (API, hook, lib) apontados no README com caminho de arquivo
- [ ] Nenhum `console.log` sobrando, `npm run build` e `npm run lint` limpos
