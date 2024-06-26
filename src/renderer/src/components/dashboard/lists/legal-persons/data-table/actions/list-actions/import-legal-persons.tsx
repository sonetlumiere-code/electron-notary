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
import { Braces, Import, Terminal } from "lucide-react"

const ImportLegalPersons = () => {
  const { addLegalPersons } = useLegalPersons()

  const importLegalPersons = async (fileFormat: FileFormat) => {
    const filePath = await window.electronAPI.selectFile({ fileFormat })

    if (filePath) {
      try {
        const res = await window.legalPersonAPI.importLegalPersons(filePath)

        if (res.length > 0) {
          addLegalPersons(res)
          toast({
            title: "Importación exitosa.",
            description: `Se han importado ${res.length} fichas jurídicas.`
          })
        } else {
          toast({
            title: "No se ha importado ninguna ficha.",
            description: "Las fichas ya estaban registradas o algo falló durante la importación."
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error importando las fichas jurídicas.",
          description: "Formato de datos incorrectos."
        })
      }
    }
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Import className="w-4 h-4 mr-2" />
        <span>Importar</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => importLegalPersons(FileFormat.JSON)}>
            <Braces className="w-4 h-4 mr-2" />
            <span>JSON</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => importLegalPersons(FileFormat.CSV)}>
            <Terminal className="w-4 h-4 mr-2" />
            <span>CSV</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

export default ImportLegalPersons
