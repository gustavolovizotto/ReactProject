import Logo from './Logo.jsx'
import NavTabs from './NavTabs.jsx'
import ListCounter from './ListCounter.jsx'

const NAV_ITEMS = [
  { to: '/', label: 'Explorar' },
  { to: '/temporada', label: 'Temporada' },
  { to: '/lista', label: 'Minha lista' },
  { to: '/estatisticas', label: 'Estatísticas' },
]

function Header() {
  return (
    <header className="h-[84px] px-12 flex items-center justify-between border-b-2 border-ink">
      <Logo />
      <NavTabs items={NAV_ITEMS} />
      <ListCounter count={0} />
    </header>
  )
}

export default Header
