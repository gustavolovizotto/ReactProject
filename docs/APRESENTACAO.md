# Roteiro da apresentação · AnimeTracker (5 minutos)

## 1. Contexto e API (1 min)

- Problema: acompanhar os animes que quero ver, estou vendo e já vi, com nota pessoal e estatísticas.
- Solução: SPA em React que consome a **Jikan v4**, API pública e sem chave com os dados do MyAnimeList.
- Mostrar `src/services/jikan.js`: única camada que fala com a API e devolve o objeto Anime normalizado usado em toda a aplicação. Citar o limite de 3 req/s, o debounce de 500 ms na busca e o retry em caso de 429.

## 2. Demo do fluxo (2 min)

1. **Explorar**: abre com o Top 20. Trocar os chips (Melhor nota, Mais populares, Em exibição).
2. **Buscar** "fullmetal": a URL vira `?q=fullmetal`, espera meio segundo e mostra os resultados. Recarregar a página mantém a busca.
3. **Detalhe**: clicar na capa abre o modal com sinopse, nota MAL, ranking, membros, gêneros e trailer. Recomendações navegam para outro anime dentro do modal. Esc e clique fora fecham.
4. **Avaliar**: salvar com "Assisti" sem nota mostra o erro em vermelho. Com nota, o item entra na lista e o formulário passa para modo edição.
5. **Minha lista**: abas por status, trocar o status no select move o item de aba, lixeira remove. Recarregar a página mantém tudo (localStorage).
6. **Estatísticas**: horas assistidas, sua média, você vs. MAL, gêneros favoritos, melhor avaliado e histograma de notas.

## 3. Código: os hooks obrigatórios (1 min)

- `src/state/ListContext.jsx` → **useReducer**: reducer com `ADD`, `UPDATE`, `REMOVE`, persistido em localStorage, exposto pelo hook `useList()`.
- `src/components/Modal.jsx` → **createPortal**: o modal renderiza em `#modal-root`, fora da árvore da página, com fechamento por Esc e bloqueio de scroll.
- `src/hooks/useStats.js` → **useMemo**: todas as estatísticas recalculadas só quando a lista muda.
- Biblioteca externa: `src/features/RatingForm.jsx` com **react-hook-form + Yup** (nota obrigatória quando o status é "Assisti").

## 4. Processo e entrega (1 min)

- Mostrar o `git log`: um commit por task, mensagens em português no padrão `feat: ...`, PR por task.
- Mostrar o README: requisitos apontados para os arquivos, deploy no GitHub Pages e a seção "Ferramentas de apoio" documentando o uso do Claude Code com revisão do autor.
