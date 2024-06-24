import { Button } from "@renderer/components/ui/button"
import { Checkbox } from "@renderer/components/ui/checkbox"
import { PersonDataSheet } from "@shared/types"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronsUpDown } from "lucide-react"
import PersonActions from "../actions/item-actions/person-actions"

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
  // {
  //   accessorKey: "CUIT_L",
  //   meta: "CUIT/L",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         CUIT/L
  //         <ChevronsUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => {
  //     return <div className="ml-4 font-medium">{row.getValue("CUIT_L")}</div>
  //   }
  // },
  // {
  //   accessorKey: "documentType",
  //   meta: "Número de documento",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Tipo de documento
  //         <ChevronsUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => {
  //     return <div className="ml-4 font-medium">{row.getValue("documentType")}</div>
  //   }
  // },
  {
    accessorKey: "documentNumber",
    meta: "N° de Documento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          N° de Documento
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="ml-4 font-medium">{row.getValue("documentNumber")}</div>
    }
  },
  // {
  //   accessorKey: "maritalStatus",
  //   meta: "Estado civil",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Estado civil
  //         <ChevronsUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => {
  //     const maritalStatus = row.getValue("maritalStatus") as MaritalStatus
  //     return <div className="ml-4 font-medium capitalize">{maritalStatus.toLowerCase()}</div>
  //   }
  // },
  {
    id: "actions",
    header: () => <div className="text-end">Acciones</div>,
    cell: ({ row }) => {
      const rowData = row.original as PersonDataSheet
      return (
        <div className="flex justify-end space-x-1">
          <PersonActions person={rowData} showView showEdit showExport showDelete />
        </div>
      )
    }
  }
]
