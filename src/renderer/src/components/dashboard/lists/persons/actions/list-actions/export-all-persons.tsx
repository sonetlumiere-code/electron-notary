import { usePersons } from "@renderer/components/persons-provider"
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@renderer/components/ui/dropdown-menu"
import { toast } from "@renderer/components/ui/use-toast"
import { FileFormat } from "@shared/types"
import { ArrowRightFromLine, Braces, Terminal } from "lucide-react"

const ExportAllPersons = () => {
  const { persons } = usePersons()

  const exportAllPersons = async (fileFormat: FileFormat) => {
    const directory = await window.electronAPI.selectDirectory()

    if (directory) {
      const allPersonsIds = persons.map((person) => person.id)

      const res = await window.personAPI.exportPersons({
        directory,
        ids: allPersonsIds as number[],
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
        <ArrowRightFromLine className="w-4 h-4 mr-2" />
        <span>Exportar</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => exportAllPersons(FileFormat.JSON)}>
            <Braces className="w-4 h-4 mr-2" />
            <span>JSON</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportAllPersons(FileFormat.CSV)}>
            <Terminal className="w-4 h-4 mr-2" />
            <span>CSV</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

export default ExportAllPersons
