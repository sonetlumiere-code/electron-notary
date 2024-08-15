import { buttonVariants } from "@renderer/components/ui/button"
import { cn } from "@renderer/lib/utils"
import { NavLink, useLocation } from "react-router-dom"
import navItems from "./nav-items"
import etchartLogo from "/logo_etchart.png"

const Nav = () => {
  const location = useLocation()

  return (
    <nav className="flex flex-col gap-4">
      <div className="px-7 pt-8 pb-3 w-2/3 border-l-4 border-orange-500">
        <img src={etchartLogo} alt="Logo Etchart" />
      </div>
      <div className="space-y-2 p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.href}
            className={cn(
              buttonVariants({
                variant: location.pathname === item.href ? "secondary" : "default"
              }),
              "w-full justify-start"
            )}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Nav
