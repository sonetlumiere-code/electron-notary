import { Feather } from "lucide-react"
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-3 text-center">
          <Feather className="mx-auto w-32 h-32 py-5" />

          <h1 className="text-2xl font-semibold tracking-tight">Ingresar a tu cuenta</h1>
          <p className="text-sm text-muted-foreground">
            Introduce tus credenciales para iniciar sesión
          </p>
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
