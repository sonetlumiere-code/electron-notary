import Layout from '@renderer/components/layout/layout'
import LegalPersonsList from '@renderer/components/lists/legal-persons/legal-persons.list'
import PersonsList from '@renderer/components/lists/persons/persons-list'
import CreateLegalPersonPage from '@renderer/pages/create-legal-person'
import CreatePersonPage from '@renderer/pages/create-person'
import EditLegalPersonPage from '@renderer/pages/edit-legal-person'
import EditPersonPage from '@renderer/pages/edit-person'
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
        path: '/persons-list',
        element: <PersonsList />
      },
      {
        path: '/create-person',
        element: <CreatePersonPage />
      },
      {
        path: '/edit-person/:id',
        element: <EditPersonPage />
      },
      {
        path: '/person/:id',
        element: <PersonDetailsPage />
      },
      {
        path: '/legal-persons-list',
        element: <LegalPersonsList />
      },
      {
        path: '/create-legal-person',
        element: <CreateLegalPersonPage />
      },
      {
        path: '/edit-legal-person/:id',
        element: <EditLegalPersonPage />
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
