import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import AppLayout from './components/AppLayout.jsx'
import { ListProvider } from './state/ListContext.jsx'
import ExplorePage from './pages/ExplorePage.jsx'
import SeasonPage from './pages/SeasonPage.jsx'
import MyListPage from './pages/MyListPage.jsx'
import StatsPage from './pages/StatsPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <ExplorePage /> },
      { path: 'temporada', element: <SeasonPage /> },
      { path: 'lista', element: <MyListPage /> },
      { path: 'estatisticas', element: <StatsPage /> },
    ],
  },
], { basename: import.meta.env.BASE_URL })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ListProvider>
      <RouterProvider router={router} />
    </ListProvider>
  </StrictMode>,
)
