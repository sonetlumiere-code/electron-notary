type NavigationItem = {
  id: number
  name: string
  href: string
}

const navItems: NavigationItem[] = [
  // {
  //   id: 0,
  //   name: "Inicio",
  //   href: "/"
  // },
  {
    id: 1,
    name: "Personas",
    href: "/persons"
  },
  {
    id: 2,
    name: "Personas jurídicas",
    href: "/legal-persons"
  },
  {
    id: 3,
    name: "Actividades",
    href: "/activities"
  }
]

export default navItems
