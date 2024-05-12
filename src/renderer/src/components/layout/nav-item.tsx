import { PersonDataSheet } from '@renderer/types'

type NavItemProps = {
  dataSheet: PersonDataSheet
}

const NavItem = ({ dataSheet }: NavItemProps) => {
  return (
    <div className="p-4">
      {dataSheet.lastName} {dataSheet.name}
    </div>
  )
}

export default NavItem
