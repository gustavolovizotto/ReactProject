import { NavLink } from 'react-router-dom'

function NavTabs({ items }) {
  return (
    <nav aria-label="Seções" className="flex gap-6">
      {items.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `py-2 font-semibold ${
              isActive
                ? 'text-vermilion border-b-[3px] border-vermilion'
                : 'text-ink border-b-[3px] border-transparent'
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export default NavTabs
