import { useAuth } from "@renderer/components/auth-provider"
import { Navigate } from "react-router-dom"

const PublicRoute = ({ children }) => {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/" replace />
  }

  return children
}

export default PublicRoute
