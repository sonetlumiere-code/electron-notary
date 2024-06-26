import { Button } from "@renderer/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@renderer/components/ui/dropdown-menu"
import { LegalPersonDataSheet } from "@shared/types"
import { Edit, MoreHorizontal, ViewIcon } from "lucide-react"
import { Link } from "react-router-dom"
import DeleteLegalPerson from "./delete-legal-person"
import ExportLegalPerson from "./export-legal-person"

type LegalPersonActionsProps = {
  legalPerson: LegalPersonDataSheet
  showView?: boolean
  showEdit?: boolean
  showExport?: boolean
  showDelete?: boolean
}

const LegalPersonActions = ({
  legalPerson,
  showView,
  showEdit,
  showExport,
  showDelete
}: LegalPersonActionsProps) => {
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
          <Link to={`/legal-person/${legalPerson.id}`}>
            <DropdownMenuItem>
              <ViewIcon className="w-4 h-4" />
              <p className="ml-2">Ver</p>
            </DropdownMenuItem>
          </Link>
        )}
        {showEdit && (
          <Link to={`/edit-legal-person/${legalPerson.id}`}>
            <DropdownMenuItem>
              <Edit className="w-4 h-4" />
              <p className="ml-2">Editar</p>
            </DropdownMenuItem>
          </Link>
        )}
        {showExport && (
          <>
            <DropdownMenuSeparator />
            <ExportLegalPerson legalPerson={legalPerson} />
          </>
        )}
        {showDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DeleteLegalPerson legalPerson={legalPerson} />
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LegalPersonActions
