import { buttonVariants } from "@renderer/components/ui/button"
import { cn } from "@renderer/lib/utils"
import { Cloud } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import navItems from "./nav-items"

const Nav = () => {
  const location = useLocation()

  return (
    <nav className="flex flex-col gap-4 p-4">
      <div className="p-5 border-b">
        <Cloud />
      </div>
      <div className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.href}
            className={cn(
              buttonVariants({
                variant: location.pathname === item.href ? "secondary" : "ghost"
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
