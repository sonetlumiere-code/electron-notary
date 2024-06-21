import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@renderer/components/ui/dropdown-menu"
import { toast } from "@renderer/components/ui/use-toast"
import { FileFormat } from "@shared/types"

const ExportPersons = () => {
  const exportPersons = async (fileFormat: FileFormat) => {
    const directory = await window.electronAPI.selectDirectory()

    if (directory) {
      const res = await window.personAPI.exportPersons({
        directory,
        fileFormat
      })

      toast({
        title: `Exportación a ${fileFormat.toUpperCase()} realizada.`,
        description: `Se ha exportado toda la tabla al archivo ${res}`,
        duration: 10000
      })
    }
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span>Exportar</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => exportPersons(FileFormat.JSON)}>
            <span>JSON</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportPersons(FileFormat.CSV)}>
            <span>CSV</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

export default ExportPersons
