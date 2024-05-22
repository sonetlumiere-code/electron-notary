import { Button } from "@renderer/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@renderer/components/ui/dropdown-menu"
import { PersonDataSheet } from "@shared/types"
import { Edit, MoreHorizontal, ViewIcon } from "lucide-react"
import { Link } from "react-router-dom"
import DeletePerson from "./delete-person"

type PersonActionsProps = {
  person: PersonDataSheet
}

const PersonActions = ({ person }: PersonActionsProps) => {
  return (
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
        <Link to={`/person/${person.id}`}>
          <DropdownMenuItem>
            <ViewIcon className="w-4 h-4 mr-2" />
            <p className="ml-2">Ver</p>
          </DropdownMenuItem>
        </Link>
        <Link to={`/edit-person/${person.id}`}>
          <DropdownMenuItem>
            <Edit className="w-4 h-4 mr-2" />
            <p className="ml-2">Editar</p>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem>
          <DeletePerson person={person} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PersonActions
