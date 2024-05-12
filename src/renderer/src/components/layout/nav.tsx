import { mockData } from '@renderer/mock/data'
import NavItem from './nav-item'

const Nav = () => {
  return (
    <nav className="flex flex-col gap-4 p-4">
      <div className="space-y-2">
        {mockData.map((item) => (
          <NavItem key={item.id} dataSheet={item} />
        ))}
      </div>
    </nav>
  )
}

export default Nav
