import { Table } from "@tanstack/react-table"
import BulkDeleteLegalPersons from "./bulk-delete-legal-persons"
import BulkExportLegalPersons from "./bulk-export-legal-persons"

type LegalPersonsBulkActionsProps<TData> = {
  table: Table<TData>
}

const LegalPersonBulkActions = <TData,>({ table }: LegalPersonsBulkActionsProps<TData>) => {
  const selectedRows = table.getFilteredSelectedRowModel().rows

  return (
    selectedRows.length > 0 && (
      <>
        <div className="space-x-2">
          <BulkExportLegalPersons table={table} />
          <BulkDeleteLegalPersons table={table} />
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

export default LegalPersonBulkActions
