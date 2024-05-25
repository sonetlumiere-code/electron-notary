import { Button } from "@renderer/components/ui/button"
import { toast } from "@renderer/components/ui/use-toast"
import { PersonDataSheet } from "@shared/types"
import { Table } from "@tanstack/react-table"
import { ArrowRightFromLine } from "lucide-react"

type BulkExportPersonsProps<TData> = {
  table: Table<TData>
}

const BulkExportPersons = <TData,>({ table }: BulkExportPersonsProps<TData>) => {
  const bulkExport = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    const selectedPersonsIds = selectedRows.map((row) => (row.original as PersonDataSheet).id)

    const directory = await window.electronAPI.selectDirectory()

    if (directory) {
      const fileName = "person_data_sheets.json"
      const res = await window.personAPI.exportPersonsByIds({
        directory,
        fileName,
        ids: selectedPersonsIds as number[]
      })

      table.resetRowSelection()

      toast({
        title: "Exportación realizada.",
        description: `Las filas seleccionadas han sido exportadas al archivo ${res}/${fileName}`,
        duration: 6000
      })
    }
  }

  return (
    <Button type="button" size="sm" onClick={bulkExport}>
      <ArrowRightFromLine className="w-4 h-4 mr-2" />
      Exportar
    </Button>
  )
}

export default BulkExportPersons
