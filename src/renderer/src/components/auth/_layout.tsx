import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-3 text-center">
          <img src={"src/assets/img/icon.png"} alt="Logo" className="mx-auto w-36 py-3" />

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
