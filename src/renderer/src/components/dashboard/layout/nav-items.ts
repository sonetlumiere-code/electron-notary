type NavigationItem = {
  id: number
  name: string
  href: string
}

const navItems: NavigationItem[] = [
  {
    id: 1,
    name: "Inicio",
    href: "/"
  },
  {
    id: 2,
    name: "Personas",
    href: "/persons-list"
  },
  {
    id: 3,
    name: "Personas jurídicas",
    href: "/legal-persons-list"
  }
]

export default navItems
