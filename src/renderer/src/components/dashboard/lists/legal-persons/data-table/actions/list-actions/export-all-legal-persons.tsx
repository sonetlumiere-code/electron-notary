import { useLegalPersons } from "@renderer/components/legal-persons-provider"
import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@renderer/components/ui/dropdown-menu"
import { toast } from "@renderer/components/ui/use-toast"
import { FileFormat } from "@shared/types"

const ExportAllLegalPersons = () => {
  const { legalPersons } = useLegalPersons()

  const exportAllLegalPersons = async (fileFormat: FileFormat) => {
    const directory = await window.electronAPI.selectDirectory()

    if (directory) {
      const allLegalPersonsIds = legalPersons.map((legalPerson) => legalPerson.id)

      const res = await window.legalPersonAPI.exportLegalPersons({
        directory,
        ids: allLegalPersonsIds as number[],
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
          <DropdownMenuItem onClick={() => exportAllLegalPersons(FileFormat.JSON)}>
            <span>JSON</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportAllLegalPersons(FileFormat.CSV)}>
            <span>CSV</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

export default ExportAllLegalPersons
