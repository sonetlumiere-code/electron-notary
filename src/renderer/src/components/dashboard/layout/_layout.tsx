import { Outlet } from "react-router-dom"
import Header from "./header"
import Nav from "./nav"

const DashboardLayout = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden lg:block w-60 border-r overflow-auto bg-primary">
          <Nav />
        </aside>
        <main className="flex-1 overflow-auto min-h-[86vh] bg-muted/40">
          <Header />
          <div className="p-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
