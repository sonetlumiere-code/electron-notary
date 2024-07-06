import { Button } from "@renderer/components/ui/button"
import { Checkbox } from "@renderer/components/ui/checkbox"
import { LegalPersonDataSheet } from "@shared/types"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronsUpDown } from "lucide-react"
import LegalPersonActions from "./actions/item-actions/legal-person-actions"

export const columns: ColumnDef<LegalPersonDataSheet>[] = [
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
  // {
  //   accessorKey: "id",
  //   meta: "ID",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         ID
  //         <ChevronsUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => {
  //     return <div className="ml-4 font-medium">{row.getValue("id")}</div>
  //   }
  // },
  {
    accessorKey: "businessName",
    meta: "Razón Social",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Razón Social
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="ml-4 font-medium">{row.getValue("businessName")}</div>
    }
  },
  {
    accessorKey: "CUIT",
    meta: "CUIT",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CUIT
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="ml-4 font-medium">{row.getValue("CUIT")}</div>
    }
  },
  {
    accessorKey: "mainActivity",
    meta: "Actividad principal",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Actividad principal
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="ml-4 font-medium">{row.getValue("mainActivity")}</div>
    }
  },
  {
    id: "actions",
    header: () => <div className="text-end">Acciones</div>,
    cell: ({ row }) => {
      const rowData = row.original as LegalPersonDataSheet
      return (
        <div className="flex justify-end space-x-1">
          <LegalPersonActions
            legalPerson={rowData}
            showView
            showEdit
            showActivity
            showExport
            showDelete
          />
        </div>
      )
    }
  }
]
