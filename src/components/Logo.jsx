import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="flex h-12 w-12 items-center justify-center border-2 border-vermilion text-vermilion font-jp font-bold">
        アニ
      </span>
      <span className="flex flex-col leading-tight">
        <h1 className="font-display text-xl">AnimeTracker</h1>
        <span className="font-jp text-xs text-vermilion">アニメトラッカー</span>
      </span>
    </Link>
  )
}

export default Logo
