import { buttonVariants } from "@renderer/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@renderer/components/ui/sheet"
import { cn } from "@renderer/lib/utils"
import { Menu } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import navItems from "./nav-items"
import etchartLogo from "/public/logo_etchart.png"

const MenuNav = () => {
  const location = useLocation()

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="block lg:hidden h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-primary lg:hidden w-[240px]">
        <nav className="flex flex-col gap-4">
          <div className="px-8 pt-8 pb-3 w-2/3 border-l-4 border-orange-500">
            <img src={etchartLogo} alt="Logo Etchart" />
          </div>
          <div className="space-y-2 p-6">
            {navItems.map((item) => (
              <SheetClose asChild key={item.id}>
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
              </SheetClose>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MenuNav
