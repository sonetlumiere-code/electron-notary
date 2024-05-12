import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import Nav from './nav'

const MenuNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="block lg:hidden h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="lg:hidden w-[260px]">
        <nav className="flex flex-col gap-4">
          <Nav />
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MenuNav
