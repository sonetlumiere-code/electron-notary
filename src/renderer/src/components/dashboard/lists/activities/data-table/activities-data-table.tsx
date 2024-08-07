import { DataTablePagination } from "@renderer/components/ui/data-table-pagination"
import { DataTableViewOptions } from "@renderer/components/ui/data-table-view-options"
import { Input } from "@renderer/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@renderer/components/ui/table"
import { Activity } from "@shared/types"
import {
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { Search } from "lucide-react"
import { useState } from "react"
import { columns } from "./columns"

interface ActivitiesDataTableProps {
  data: Activity[]
}

export function ActivitiesDataTable({ data }: ActivitiesDataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [filtering, setFiltering] = useState<string>("")
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      globalFilter: filtering,
      columnVisibility,
      rowSelection
    },
    onGlobalFilterChange: setFiltering
  })

  return (
    <div className="relative grid gap-4">
      <div className="flex items-center">
        <div className="relative">
          <Input
            type="text"
            placeholder="Buscar"
            onChange={(event) => setFiltering(event.target.value)}
            className="pl-10 pr-4"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
        </div>
        <DataTableViewOptions table={table} />
      </div>
      <div className="">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2 h-9">
        <div className="flex items-center">{/* Bulk Actions */}</div>
        <DataTablePagination table={table} setPageSize />
      </div>
    </div>
  )
}
