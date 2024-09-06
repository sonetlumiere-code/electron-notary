import { Button } from "@renderer/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@renderer/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import ExportAllActivities from "./export-all-activities"
import ImportActivities from "./import-activities"

const ActivitiesListActions = () => {
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
        <ImportActivities />
        <ExportAllActivities />
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ActivitiesListActions
