import { NavigationItem } from '@renderer/types/nav-item'

const navItems: NavigationItem[] = [
  {
    id: 1,
    name: 'Inicio',
    href: '/'
  },
  {
    id: 2,
    name: 'Crear Usuario',
    href: '/create-user'
  },
  {
    id: 3,
    name: 'Crear Persona',
    href: '/create-person'
  },
  {
    id: 4,
    name: 'Crear Persona Jurídica',
    href: '/create-legal-person'
  }
]

export default navItems
