import Logo from './Logo.jsx'
import NavTabs from './NavTabs.jsx'
import ListCounter from './ListCounter.jsx'
import { useList } from '../state/ListContext.jsx'

const NAV_ITEMS = [
  { to: '/', label: 'Explorar' },
  { to: '/temporada', label: 'Temporada' },
  { to: '/lista', label: 'Minha lista' },
  { to: '/estatisticas', label: 'Estatísticas' },
]

function Header() {
  const { items } = useList()

  return (
    <header className="h-[84px] px-4 md:px-12 flex items-center justify-between border-b-2 border-ink">
      <Logo />
      <NavTabs items={NAV_ITEMS} />
      <ListCounter count={items.length} />
    </header>
  )
}

export default Header
