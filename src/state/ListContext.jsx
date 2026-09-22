import { createContext, useContext, useEffect, useReducer } from 'react'
import { load, save } from '../lib/storage.js'

export const STATUS = { PLAN: 'Quero ver', WATCHING: 'Assistindo', DONE: 'Assisti' }

const STORAGE_KEY = 'animetracker:list'

const ListContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { anime, status = STATUS.PLAN } = action
      if (state.some((item) => item.anime.id === anime.id)) return state
      return [
        ...state,
        { anime, status, score: null, comment: '', progress: 0, addedAt: new Date().toISOString() },
      ]
    }
    case 'UPDATE':
      return state.map((item) =>
        item.anime.id === action.id ? { ...item, ...action.patch } : item,
      )
    case 'REMOVE':
      return state.filter((item) => item.anime.id !== action.id)
    default:
      return state
  }
}

export function ListProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, () => load(STORAGE_KEY, []))

  useEffect(() => {
    save(STORAGE_KEY, items)
  }, [items])

  return <ListContext.Provider value={{ items, dispatch }}>{children}</ListContext.Provider>
}

export function useList() {
  const { items, dispatch } = useContext(ListContext)
  return {
    items,
    add: (anime, status) => dispatch({ type: 'ADD', anime, status }),
    update: (id, patch) => dispatch({ type: 'UPDATE', id, patch }),
    remove: (id) => dispatch({ type: 'REMOVE', id }),
    get: (id) => items.find((item) => item.anime.id === id) ?? null,
    has: (id) => items.some((item) => item.anime.id === id),
  }
}
