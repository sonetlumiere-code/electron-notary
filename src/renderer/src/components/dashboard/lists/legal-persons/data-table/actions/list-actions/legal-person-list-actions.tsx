import { Button } from "@renderer/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@renderer/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import DeleteAllLegalPersons from "./delete-all-legal-persons"
import ExportAllLegalPersons from "./export-all-legal-persons"
import ImportLegalPersons from "./import-legal-persons"

const LegalPersonListActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ImportLegalPersons />
        <ExportAllLegalPersons />
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DeleteAllLegalPersons />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LegalPersonListActions
