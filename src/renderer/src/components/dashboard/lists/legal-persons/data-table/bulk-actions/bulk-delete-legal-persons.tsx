import { useConfirmation } from "@renderer/components/confirmation-provider"
import { useLegalPersons } from "@renderer/components/legal-persons-provider"
import { Button } from "@renderer/components/ui/button"
import { toast } from "@renderer/components/ui/use-toast"
import { PersonDataSheet } from "@shared/types"
import { Table } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"

type BulkDeleteLegalPersonsProps<TData> = {
  table: Table<TData>
}

const BulkDeleteLegalPersons = <TData,>({ table }: BulkDeleteLegalPersonsProps<TData>) => {
  const { deleteLegalPersons } = useLegalPersons()

  const confirm = useConfirmation()

  const bulkDelete = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows
    const selectedPersonsIds = selectedRows.map((row) => (row.original as PersonDataSheet).id)

    confirm({
      variant: "destructive",
      title: "¿Eliminar fichas jurídicas?",
      description: `${selectedRows.length} documento${selectedRows.length > 1 ? "s" : ""} será${selectedRows.length > 1 ? "n" : ""} eliminado${selectedRows.length > 1 ? "s" : ""}.`
    }).then(async () => {
      const res = await window.legalPersonAPI.deleteLegalPersons(selectedPersonsIds as number[])

      if (res?.length) {
        deleteLegalPersons(res)
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

export default BulkDeleteLegalPersons
