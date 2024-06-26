import { Button } from "@renderer/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@renderer/components/ui/dropdown-menu"
import { toast } from "@renderer/components/ui/use-toast"
import { FileFormat, PersonDataSheet } from "@shared/types"
import { Table } from "@tanstack/react-table"
import { ArrowRightFromLine, Braces, ScrollText, Terminal } from "lucide-react"

type BulkExportLegalPersonsProps<TData> = {
  table: Table<TData>
}

const BulkExportLegalPersons = <TData,>({ table }: BulkExportLegalPersonsProps<TData>) => {
  const bulkExport = async (fileFormat: FileFormat) => {
    const directory = await window.electronAPI.selectDirectory()

    if (directory) {
      const selectedRows = table.getFilteredSelectedRowModel().rows
      const selectedPersonsIds = selectedRows.map((row) => (row.original as PersonDataSheet).id)

      const res = await window.legalPersonAPI.exportLegalPersons({
        directory,
        ids: selectedPersonsIds as number[],
        fileFormat
      })

      table.resetRowSelection()

      toast({
        title: `Exportación a ${fileFormat.toUpperCase()} realizada.`,
        description: `Las filas seleccionadas han sido exportadas al archivo ${res}`,
        duration: 10000
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" size="sm">
          <ArrowRightFromLine className="w-4 h-4 mr-2" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Exportar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => bulkExport(FileFormat.JSON)}>
          <Braces className="w-4 h-4 mr-2" />
          <span>Exportar a JSON</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => bulkExport(FileFormat.CSV)}>
          <Terminal className="w-4 h-4 mr-2" />
          <span>Exportar a CSV</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => bulkExport(FileFormat.WORD)}>
          <ScrollText className="w-4 h-4 mr-2" />
          <span>Exportar a Word</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default BulkExportLegalPersons
