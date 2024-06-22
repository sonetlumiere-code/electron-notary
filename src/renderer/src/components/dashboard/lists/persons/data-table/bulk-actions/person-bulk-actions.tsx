import { Table } from "@tanstack/react-table"
import BulkDeletePersons from "./bulk-delete-persons"
import BulkExportPersons from "./bulk-export-persons"

type PersonsBulkActionsProps<TData> = {
  table: Table<TData>
}

const PersonBulkActions = <TData,>({ table }: PersonsBulkActionsProps<TData>) => {
  const selectedRows = table.getFilteredSelectedRowModel().rows

  return (
    selectedRows.length > 0 && (
      <>
        <div className="space-x-2">
          <BulkExportPersons table={table} />
          <BulkDeletePersons table={table} />
        </div>

        <div className="flex-1">
          {selectedRows.length > 0 && (
            <div className="text-sm text-muted-foreground ml-2">
              {selectedRows.length} fila{selectedRows.length > 1 ? "s" : ""} seleccionada
              {selectedRows.length > 1 ? "s" : ""}
            </div>
          )}
        </div>
      </>
    )
  )
}

export default PersonBulkActions
