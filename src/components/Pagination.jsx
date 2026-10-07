import Button from './Button.jsx'

function Pagination({ page, lastPage, onChange }) {
  return (
    <nav aria-label="Paginação" className="flex items-center justify-center gap-4">
      <Button variant="outline" onClick={() => onChange(page - 1)} disabled={page <= 1}>
        ← Anterior
      </Button>
      <span className="font-display text-sm uppercase">
        Página {page}
        {lastPage ? ` de ${lastPage}` : ''}
      </span>
      <Button variant="outline" onClick={() => onChange(page + 1)} disabled={lastPage ? page >= lastPage : false}>
        Próxima →
      </Button>
    </nav>
  )
}

export default Pagination
