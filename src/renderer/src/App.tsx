import { createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/layout'
import { ThemeProvider } from './components/theme-provider'
import CreatePersonPage from './pages/create-person'
import HomePage from './pages/home'
import PersonDetailsPage from './pages/person-details'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/create-person',
        element: <CreatePersonPage />
      },
      {
        path: '/person:id',
        element: <PersonDetailsPage />
      }
    ]
  }
])

function App(): JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
