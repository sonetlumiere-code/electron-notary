import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@renderer/components/ui/dropdown-menu"
import { toast } from "@renderer/components/ui/use-toast"
import { FileFormat, PersonDataSheet } from "@shared/types"
import { ArrowRightFromLine, Braces, ScrollText, Terminal } from "lucide-react"

type ExportPersonProps = {
  person: PersonDataSheet
}

const ExportPerson = ({ person }: ExportPersonProps) => {
  const exportPerson = async (fileFormat: FileFormat) => {
    const directory = await window.electronAPI.selectDirectory()

    if (directory) {
      const res = await window.personAPI.exportPersons({
        directory,
        ids: [person.id as number],
        fileFormat
      })

      toast({
        title: `Exportación a ${fileFormat.toUpperCase()} realizada.`,
        description: `Se ha exportado la ficha personal al archivo ${res}`,
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
          <DropdownMenuItem onClick={() => exportPerson(FileFormat.JSON)}>
            <Braces className="w-4 h-4 mr-2" />
            <span>JSON</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportPerson(FileFormat.CSV)}>
            <Terminal className="w-4 h-4 mr-2" />
            <span>CSV</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportPerson(FileFormat.WORD)}>
            <ScrollText className="w-4 h-4 mr-2" />
            <span>Word</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

export default ExportPerson
