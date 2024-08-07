import { Badge } from "@renderer/components/ui/badge"
import { Button } from "@renderer/components/ui/button"
import { Activity } from "@shared/types"
import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ChevronsUpDown } from "lucide-react"
import ActivityActions from "../actions/item-actions/activity-actions"

export const columns: ColumnDef<Activity>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <div className="">
  //       <Checkbox
  //         checked={table.getIsAllPageRowsSelected()}
  //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //         aria-label="Select all"
  //       />
  //     </div>
  //   ),
  //   cell: ({ row }) => (
  //     <div className="">
  //       <Checkbox
  //         checked={row.getIsSelected()}
  //         onCheckedChange={(value) => row.toggleSelected(!!value)}
  //         aria-label="Select row"
  //       />
  //     </div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    accessorKey: "date",
    meta: "Fecha",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="ml-4 font-medium">{format(row.getValue("date"), "dd/MM/yyyy")}</div>
    }
  },
  {
    accessorKey: "act",
    meta: "Acto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Acto
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="ml-4 font-medium">{row.getValue("act")}</div>
    }
  },
  {
    accessorKey: "person_id",
    meta: "Ficha",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ficha
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isPerson = row.getValue("person_id")
      return (
        <div className="ml-4 font-medium">
          {isPerson ? <Badge>Persona</Badge> : <Badge>Persona jurídica</Badge>}
        </div>
      )
    }
  },
  {
    id: "actions",
    header: () => <div className="text-end">Acciones</div>,
    cell: ({ row }) => {
      const rowData = row.original as Activity
      return (
        <div className="flex justify-end space-x-1">
          <ActivityActions activity={rowData} showView showEdit showDelete />
        </div>
      )
    }
  }
]
