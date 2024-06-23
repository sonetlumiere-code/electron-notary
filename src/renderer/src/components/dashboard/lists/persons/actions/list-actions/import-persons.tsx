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

const ImportPersons = () => {
  const { addPersons } = usePersons()

  const importPersons = async (fileFormat: FileFormat) => {
    const filePath = await window.electronAPI.selectFile({ fileFormat })

    if (filePath) {
      const res = await window.personAPI.importPersons(filePath)

      if (res.length > 0) {
        addPersons(res)
        toast({
          title: "Importación exitosa.",
          description: `Se han importado ${res.length} fichas personales.`
        })
      } else {
        toast({
          title: "No se ha importado ninguna ficha.",
          description: "Las fichas ya estaban registradas o algo falló durante la importación."
        })
      }
    }
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <span>Importar</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuItem onClick={() => importPersons(FileFormat.JSON)}>
            <span>JSON</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => importPersons(FileFormat.CSV)}>
            <span>CSV</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

export default ImportPersons
