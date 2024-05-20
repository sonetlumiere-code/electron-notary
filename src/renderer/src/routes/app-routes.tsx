import Layout from '@renderer/components/layout/layout'
import CreateLegalPersonPage from '@renderer/pages/create-legal-person'
import CreatePersonPage from '@renderer/pages/create-person'
import CreateUserPage from '@renderer/pages/create-user'
import HomePage from '@renderer/pages/home'
import LegalPersonDetailsPage from '@renderer/pages/legal-person-details'
import PersonDetailsPage from '@renderer/pages/person-details'
import { createHashRouter, RouterProvider } from 'react-router-dom'

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
        path: '/create-user',
        element: <CreateUserPage />
      },
      {
        path: '/create-person',
        element: <CreatePersonPage />
      },
      {
        path: '/person/:id',
        element: <PersonDetailsPage />
      },
      {
        path: '/create-legal-person',
        element: <CreateLegalPersonPage />
      },
      {
        path: '/legal-person/:id',
        element: <LegalPersonDetailsPage />
      }
    ]
  }
])

const AppRoutes = () => {
  return <RouterProvider router={router} />
}

export default AppRoutes
