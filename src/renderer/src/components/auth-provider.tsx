import { AuthSchema, zodAuthSchema } from "@renderer/lib/validators/auth-validator"
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
    const validatedFields = zodAuthSchema.safeParse(data)

    if (!validatedFields.success) {
      return { error: "Campos inválidos." }
    }

    const { username, password } = validatedFields.data

    const res = await window.authAPI.logIn({ username, password })

    if (res.error) {
      return { success: false, error: res.error }
    }

    if (res.user) {
      setUser(res.user)

      return { success: true, user: res.user }
    }

    return { success: false, error: "Algo salió mal." }
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
