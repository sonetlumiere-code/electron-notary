import { ModeToggle } from '../mode-toggle'
import MenuNav from './menu-nav'

const Header = () => {
  return (
    <nav className="flex items-center justify-between p-5 border-b">
      <div className="flex items-center space-x-4">
        <MenuNav />
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Header
