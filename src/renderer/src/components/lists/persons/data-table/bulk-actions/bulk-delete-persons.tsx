import { useConfirmation } from "@renderer/components/confirmation-provider"
import { Button } from "@renderer/components/ui/button"
import { toast } from "@renderer/components/ui/use-toast"
import { PersonDataSheet } from "@shared/types"
import { Table } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"

type BulkDeletePersonsProps<TData> = {
  table: Table<TData>
}

const BulkDeletePersons = <TData,>({ table }: BulkDeletePersonsProps<TData>) => {
  const confirm = useConfirmation()

  const bulkDelete = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    const selectedPersonsIds = selectedRows.map((row) => (row.original as PersonDataSheet).id)

    confirm({
      title: "Eliminar fichas personales?",
      description: `${selectedRows.length} documentos serán eliminados.`,
      variant: "destructive"
    }).then(async () => {
      const res = await window.personAPI.bulkDeletePersons(selectedPersonsIds as number[])

      table.resetRowSelection()
      toast({
        title: "Eliminación masiva realizada.",
        description: `Se han eliminado ${res?.length} documentos.`,
        duration: 5000
      })
    })
  }

  return (
    <Button type="button" size="sm" variant="destructive" onClick={bulkDelete}>
      <Trash2 className="w-4 h-4 mr-2" />
      Eliminar
    </Button>
  )
}

export default BulkDeletePersons
