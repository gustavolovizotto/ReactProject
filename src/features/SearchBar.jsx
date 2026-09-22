import Button from '../components/Button.jsx'
import Field, { inputClass } from '../components/Field.jsx'
import { GENRES, TYPES } from '../services/jikan.js'

function SearchBar({ values, onChange }) {
  const set = (field) => (e) => onChange({ ...values, [field]: e.target.value })

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex items-end gap-3">
      <Field label="Buscar" id="search-q">
        <input
          id="search-q"
          type="search"
          placeholder="Nome do anime"
          value={values.q}
          onChange={set('q')}
          className={`${inputClass} w-[560px]`}
        />
      </Field>
      <Field label="Tipo" id="search-type">
        <select id="search-type" value={values.type} onChange={set('type')} className={inputClass}>
          <option value="">Todos</option>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t.toUpperCase()}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Gênero" id="search-genre">
        <select id="search-genre" value={values.genre} onChange={set('genre')} className={inputClass}>
          <option value="">Todos</option>
          {GENRES.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </Field>
      <Button type="submit">Buscar</Button>
    </form>
  )
}

export default SearchBar
