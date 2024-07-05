import AuthLayout from "@renderer/components/auth/_layout"
import LoginPage from "@renderer/components/auth/login/login"
import DashboardLayout from "@renderer/components/dashboard/layout/_layout"
import CreateActivityPage from "@renderer/pages/create-activity"
import CreateLegalPersonPage from "@renderer/pages/create-legal-person"
import CreatePersonPage from "@renderer/pages/create-person"
import EditActivityPage from "@renderer/pages/edit-activity"
import EditLegalPersonPage from "@renderer/pages/edit-legal-person"
import EditPersonPage from "@renderer/pages/edit-person"
import HomePage from "@renderer/pages/home"
import LegalPersonDetailsPage from "@renderer/pages/legal-person-details"
import LegalPersonsPage from "@renderer/pages/legal-persons"
import PersonDetailsPage from "@renderer/pages/person-details"
import PersonsPage from "@renderer/pages/persons"
import { createHashRouter, RouterProvider } from "react-router-dom"
import PrivateRoute from "./private-route"
import PublicRoute from "./public-route"

const router = createHashRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/persons",
        element: <PersonsPage />
      },
      {
        path: "/create-person",
        element: <CreatePersonPage />
      },
      {
        path: "/edit-person/:id",
        element: <EditPersonPage />
      },
      {
        path: "/person/:id",
        element: <PersonDetailsPage />
      },
      {
        path: "/legal-persons",
        element: <LegalPersonsPage />
      },
      {
        path: "/create-legal-person",
        element: <CreateLegalPersonPage />
      },
      {
        path: "/edit-legal-person/:id",
        element: <EditLegalPersonPage />
      },
      {
        path: "/legal-person/:id",
        element: <LegalPersonDetailsPage />
      },
      {
        path: "/create-activity/person/:id",
        element: <CreateActivityPage />
      },
      {
        path: "/edit-activity/:id",
        element: <EditActivityPage />
      }
    ]
  },
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "login",
        element: <LoginPage />
      }
    ]
  }
])

const AppRoutes = () => {
  return <RouterProvider router={router} />
}

export default AppRoutes
