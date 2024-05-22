import { ModeToggle } from "../mode-toggle"
import MenuNav from "./menu-nav"

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 border-b">
      <MenuNav />
      <ModeToggle />
    </header>
  )
}

export default Header
