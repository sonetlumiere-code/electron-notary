import { AuthSchema } from "@renderer/lib/validators/auth-validator"
import { User } from "@shared/types"
import { createContext, useContext, useState } from "react"

type AuthProviderProps = {
  children: React.ReactNode
}

type AuthResponse = {
  success?: boolean
  user?: Partial<User>
  error?: string
}

type AuthProviderState = {
  user: Partial<User> | null
  login: (data: AuthSchema) => Promise<AuthResponse>
  logout: () => void
}

const initialAuthState: AuthProviderState = {
  user: null,
  login: async () => ({}),
  logout: () => {}
}

const AuthContext = createContext<AuthProviderState>(initialAuthState)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<Partial<User> | null>(null)

  const login = async (data: AuthSchema): Promise<AuthResponse> => {
    if (data.username === "admin" && data.password === "password") {
      const loggedInUser: User = {
        id: 1,
        username: data.username,
        password: data.password
      }

      const safeUser = {
        id: loggedInUser.id,
        username: loggedInUser.username
      }

      setUser(safeUser)

      return {
        success: true,
        user: safeUser
      }
    } else {
      return { success: false, error: "Credenciales incorrectas." }
    }
  }

  const logout = () => {
    setUser(null)
  }

  const value: AuthProviderState = {
    user,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
