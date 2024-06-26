import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@renderer/components/ui/dropdown-menu"
import { toast } from "@renderer/components/ui/use-toast"
import { FileFormat, LegalPersonDataSheet } from "@shared/types"

type ExportLegalPersonProps = {
  legalPerson: LegalPersonDataSheet
}

const ExportLegalPerson = ({ legalPerson }: ExportLegalPersonProps) => {
  const exportLegalPerson = async (fileFormat: FileFormat) => {
    const directory = await window.electronAPI.selectDirectory()

    if (directory) {
      const res = await window.legalPersonAPI.exportLegalPersons({
        directory,
        ids: [legalPerson.id as number],
        fileFormat
      })

      toast({
        title: `Exportación a ${fileFormat.toUpperCase()} realizada.`,
        description: `Se ha exportado la ficha jurídica al archivo ${res}`,
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
          <DropdownMenuItem onClick={() => exportLegalPerson(FileFormat.JSON)}>
            <span>JSON</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportLegalPerson(FileFormat.CSV)}>
            <span>CSV</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportLegalPerson(FileFormat.WORD)}>
            <span>Word</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

export default ExportLegalPerson
