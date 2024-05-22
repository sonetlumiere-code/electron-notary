import { Button } from '@renderer/components/ui/button'
import { Table } from '@tanstack/react-table'
import { Trash2 } from 'lucide-react'

type BulkDeletePersonsProps<TData> = {
  table: Table<TData>
}

const BulkDeletePersons = <TData,>({ table }: BulkDeletePersonsProps<TData>) => {
  const bulkDelete = async () => {
    // to do
    const selectedRowsIds = Object.keys(table.getState().rowSelection)
    console.log(selectedRowsIds)
  }

  return (
    <Button type="button" size="sm" variant="destructive" onClick={bulkDelete}>
      <Trash2 className="w-4 h-4 mr-2" />
      Eliminar
    </Button>
  )
}

export default BulkDeletePersons
