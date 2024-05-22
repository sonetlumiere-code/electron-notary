import { Button } from "@renderer/components/ui/button"
import { Table } from "@tanstack/react-table"
import { ArrowRightFromLine } from "lucide-react"

type BulkExportPersonsProps<TData> = {
  table: Table<TData>
}

const BulkExportPersons = <TData,>({ table }: BulkExportPersonsProps<TData>) => {
  const bulkExport = async () => {
    // to do
    const selectedRowsIds = Object.keys(table.getState().rowSelection)
    console.log(selectedRowsIds)
  }

  return (
    <Button type="button" size="sm" onClick={bulkExport}>
      <ArrowRightFromLine className="w-4 h-4 mr-2" />
      Exportar
    </Button>
  )
}

export default BulkExportPersons
