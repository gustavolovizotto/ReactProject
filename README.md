# AnimeTracker

SPA em React que consome a API pública [Jikan](https://jikan.moe) (dados do MyAnimeList) para explorar animes e montar uma lista pessoal com status, nota e estatísticas.
Trabalho da disciplina Programação Web Fullstack.

**Deploy:** https://gustavolovizotto.github.io/ReactProject/

## Funcionalidades

- Top animes com ordenação (melhor nota, mais populares, em exibição)
- Busca por texto, tipo e gênero, com debounce de 500 ms e estado na URL
- Modal de detalhe com sinopse, números do MAL, trailer e recomendações navegáveis
- Formulário de avaliação (status, nota, comentário) com validação
- Lista pessoal persistida em localStorage, com abas por status e edição inline
- Estatísticas: horas assistidas, média pessoal vs. MAL, gêneros favoritos, histograma de notas

## Requisitos do enunciado → onde está no código

| Requisito | Onde está |
|---|---|
| API JSON aberta | Jikan v4 em [`src/services/jikan.js`](src/services/jikan.js) (`getTopAnime`, `searchAnime`, `getAnime`, `getRecommendations`), consumida via [`src/hooks/useFetch.js`](src/hooks/useFetch.js) |
| Hook obrigatório: `useReducer` | [`src/state/ListContext.jsx`](src/state/ListContext.jsx) (lista pessoal) |
| Hook obrigatório: `useMemo` | [`src/hooks/useStats.js`](src/hooks/useStats.js) (estatísticas) |
| Hook obrigatório: `createPortal` | [`src/components/Modal.jsx`](src/components/Modal.jsx) (modal de detalhe) |
| Biblioteca externa: React Router | [`src/main.jsx`](src/main.jsx), [`src/components/NavTabs.jsx`](src/components/NavTabs.jsx) |
| Biblioteca externa: react-hook-form + Yup | [`src/features/RatingForm.jsx`](src/features/RatingForm.jsx) |
| Biblioteca externa: Tailwind CSS v4 | [`src/index.css`](src/index.css) (tema) e classes em todos os componentes |
| SPA sem redirecionamento | `createBrowserRouter` em [`src/main.jsx`](src/main.jsx), navegação com `NavLink`; fallback `404.html` no GitHub Pages |
| Cadência de commits | Um commit por task, mensagens em português no padrão `feat: ...`, um PR por task |
| Documentar IA | Seção "Ferramentas de apoio" abaixo |
| Apresentação | Roteiro em [`docs/APRESENTACAO.md`](docs/APRESENTACAO.md) |

## Stack

- Vite + React 18 (JavaScript, `.jsx`)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- React Router v6
- react-hook-form + Yup (`@hookform/resolvers`)
- API: Jikan v4 (`https://api.jikan.moe/v4`), sem chave, limite de 3 req/s

## Estrutura

```
src/
  components/   # visuais reutilizáveis (Button, Cover, Modal, SectionHeading...)
  features/     # componentes de domínio (AnimeCard, ListRow, RatingForm...)
  pages/        # uma por rota (Explorar, Minha lista, Estatísticas)
  hooks/        # useFetch, useDebounce, useStats
  services/     # jikan.js
  state/        # ListContext.jsx (useReducer)
  lib/          # storage.js
```

## Como rodar

```bash
npm i && npm run dev
```

Outros scripts: `npm run build` (produção), `npm run lint` (oxlint), `npm run preview`, `npm run deploy` (publica no GitHub Pages).

## Divisão de responsabilidades

Integrante único: **Gustavo Tesin**, responsável por planejamento, design, implementação, testes manuais, deploy e apresentação.

## Ferramentas de apoio

O [Claude Code](https://claude.com/claude-code) foi usado como ferramenta de apoio em três frentes:

- **Planejamento**: quebra do trabalho em 13 tasks com critérios de aceite e mensagens de commit, registradas em [`ROADMAP.md`](ROADMAP.md).
- **Design**: geração do protótipo visual (paleta, tipografia, identidade com bordas e sombras duras) que serviu de referência para os componentes.
- **Código**: geração de componentes, hooks e serviços a partir das especificações de cada task.

Todo o código gerado foi revisado, testado no navegador e ajustado pelo autor antes de ser incorporado ao projeto.
