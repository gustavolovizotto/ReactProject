import Chip from '../components/Chip.jsx'
import { STATUS } from '../state/ListContext.jsx'

const TABS = [
  { value: '', label: 'Todos', countKey: 'all' },
  { value: STATUS.PLAN, label: STATUS.PLAN, countKey: 'plan' },
  { value: STATUS.WATCHING, label: STATUS.WATCHING, countKey: 'watching' },
  { value: STATUS.DONE, label: STATUS.DONE, countKey: 'done' },
]

function StatusTabs({ value, onChange, counts }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TABS.map((tab) => (
        <Chip key={tab.value} active={value === tab.value} onClick={() => onChange(tab.value)}>
          {tab.label} <span className="opacity-70">{counts[tab.countKey]}</span>
        </Chip>
      ))}
    </div>
  )
}

export default StatusTabs
