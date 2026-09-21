import { Outlet } from 'react-router-dom'
import Frame from './Frame.jsx'
import Header from './Header.jsx'

function AppLayout() {
  return (
    <Frame>
      <Header />
      <main className="px-12 py-8">
        <Outlet />
      </main>
    </Frame>
  )
}

export default AppLayout
