import { useAuth } from "@renderer/components/auth-provider"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}

export default PrivateRoute
