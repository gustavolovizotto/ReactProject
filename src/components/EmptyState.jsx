import { Link } from 'react-router-dom'

const BUTTON_CLASS =
  'inline-flex items-center h-11 px-5 rounded border-2 border-ink font-semibold shadow-[4px_4px_0_#1c1a17] bg-vermilion text-white'

function EmptyState({ message, cta, to }) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-lg border-2 border-ink bg-paper p-8">
      <p className="text-muted">{message}</p>
      <Link to={to} className={BUTTON_CLASS}>
        {cta}
      </Link>
    </div>
  )
}

export default EmptyState
