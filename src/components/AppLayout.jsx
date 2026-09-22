import { Outlet } from 'react-router-dom'
import Frame from './Frame.jsx'
import Header from './Header.jsx'

function AppLayout() {
  return (
    <Frame>
      <Header />
      <main className="px-4 md:px-12 py-8">
        <Outlet />
      </main>
      <footer className="px-4 md:px-12 py-6 border-t-2 border-ink text-sm text-vermilion">
        Dados de{' '}
        <a href="https://myanimelist.net" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">
          MyAnimeList
        </a>{' '}
        via{' '}
        <a href="https://jikan.moe" target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">
          Jikan API
        </a>
      </footer>
    </Frame>
  )
}

export default AppLayout
