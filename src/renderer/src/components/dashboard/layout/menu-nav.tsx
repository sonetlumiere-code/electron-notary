import { buttonVariants } from "@renderer/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@renderer/components/ui/sheet"
import { cn } from "@renderer/lib/utils"
import { Feather, Menu } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import navItems from "./nav-items"

const MenuNav = () => {
  const location = useLocation()

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="block lg:hidden h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-primary lg:hidden w-[240px]">
        <nav className="flex flex-col gap-4">
          <div className="p-5 border-b">
            <Feather className="text-primary-foreground" />
          </div>
          <div className="space-y-2">
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
