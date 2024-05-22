import { Button } from "@renderer/components/ui/button"
import { Checkbox } from "@renderer/components/ui/checkbox"
import { PersonDataSheet } from "@shared/types"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronsUpDown } from "lucide-react"
import PersonActions from "./actions/person-actions"

export const columns: ColumnDef<PersonDataSheet>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="">
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "name",
    meta: "Nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nombre
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="ml-4 font-medium">{row.getValue("name")}</div>
    }
  },
  {
    accessorKey: "lastName",
    meta: "Apellido",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Apellido
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="ml-4 font-medium">{row.getValue("lastName")}</div>
    }
  },
  {
    accessorKey: "email",
    meta: "Email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="ml-4 font-medium">{row.getValue("email")}</div>
    }
  },
  {
    accessorKey: "city",
    meta: "Ciudad",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ciudad
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="ml-4 font-medium">{row.getValue("city")}</div>
    }
  },
  {
    id: "actions",
    header: () => <div className="text-end">Acciones</div>,
    cell: ({ row }) => {
      const rowData = row.original as PersonDataSheet
      return (
        <div className="flex justify-end space-x-1">
          <PersonActions person={rowData} />
        </div>
      )
    }
  }
]
