import { Button } from '@renderer/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@renderer/components/ui/dropdown-menu'
import { PersonDataSheet } from '@shared/types'
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

type PersonActionsProps = {
  person: PersonDataSheet
}

const PersonActions = ({ person }: PersonActionsProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menú</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link to={`edit-person/${person.id}`}>
            <DropdownMenuItem>
              <Edit />
              <p className="ml-2">Editar</p>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Trash2 />
            <p className="ml-2">Eliminar</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default PersonActions
