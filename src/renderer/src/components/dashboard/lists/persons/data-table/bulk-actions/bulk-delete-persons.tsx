import { useConfirmation } from "@renderer/components/confirmation-provider"
import { usePersons } from "@renderer/components/persons-provider"
import { Button } from "@renderer/components/ui/button"
import { toast } from "@renderer/components/ui/use-toast"
import { PersonDataSheet } from "@shared/types"
import { Table } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"

type BulkDeletePersonsProps<TData> = {
  table: Table<TData>
}

const BulkDeletePersons = <TData,>({ table }: BulkDeletePersonsProps<TData>) => {
  const { deletePersons } = usePersons()

  const confirm = useConfirmation()

  const bulkDelete = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    const selectedPersonsIds = selectedRows.map((row) => (row.original as PersonDataSheet).id)

    confirm({
      variant: "destructive",
      title: "¿Eliminar fichas personales?",
      description: `${selectedRows.length} documento${selectedRows.length > 1 ? "s" : ""} será${selectedRows.length > 1 ? "n" : ""} eliminado${selectedRows.length > 1 ? "s" : ""}.`
    }).then(async () => {
      const res = await window.personAPI.deletePersons(selectedPersonsIds as number[])

      if (res?.length) {
        deletePersons(res)
        table.resetRowSelection()

        toast({
          title: "Eliminación realizada.",
          description: `Se ha${res?.length > 1 ? "n" : ""} eliminado ${res?.length} documento${res?.length > 1 ? "s" : ""}.`,
          duration: 5000
        })
      }
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
