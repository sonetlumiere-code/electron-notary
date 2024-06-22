import { ModeToggle } from "@renderer/components/mode-toggle"
import MenuNav from "./menu-nav"
import UserAvatar from "./user-avatar"

const Header = () => {
  return (
    <header className="flex items-center justify-between p-5 border-b">
      <MenuNav />
      <div className="flex gap-3">
        <ModeToggle />
        <UserAvatar />
      </div>
    </header>
  )
}

export default Header
