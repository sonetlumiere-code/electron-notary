import { Button } from "@renderer/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@renderer/components/ui/dropdown-menu"
import { Activity } from "@shared/types"
import { Edit, MoreHorizontal, ViewIcon } from "lucide-react"
import { Link } from "react-router-dom"
import DeleteActivity from "./delete-activity"

type ActivityActionsProps = {
  activity: Activity
  showView?: boolean
  showEdit?: boolean
  showDelete?: boolean
}

const ActivityActions = ({ activity, showView, showEdit, showDelete }: ActivityActionsProps) => {
  const isPerson = activity.person_id

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
        {showView && (
          <Link
            to={`/${isPerson ? "person" : "legal-person"}/${isPerson ? activity.person_id : activity.legal_person_id}`}
          >
            <DropdownMenuItem>
              <ViewIcon className="w-4 h-4" />
              <p className="ml-2">Ver ficha</p>
            </DropdownMenuItem>
          </Link>
        )}
        {showEdit && (
          <Link to={`/edit-activity/${activity.id}`}>
            <DropdownMenuItem>
              <Edit className="w-4 h-4" />
              <p className="ml-2">Editar</p>
            </DropdownMenuItem>
          </Link>
        )}
        {showDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DeleteActivity activity={activity} />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActivityActions
