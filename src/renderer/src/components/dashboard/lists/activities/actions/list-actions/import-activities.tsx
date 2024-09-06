import { useActivities } from "@renderer/components/activities-provider"
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

const ImportActivities = () => {
  const { addActivities } = useActivities()

  const importActivities = async (fileFormat: FileFormat) => {
    const filePath = await window.electronAPI.selectFile({ fileFormat })

    if (filePath) {
      try {
        const res = await window.activityAPI.importActivities(filePath)

        if (res.length > 0) {
          addActivities(res)
          toast({
            title: "Importación exitosa.",
            description: `Se han importado ${res.length} actividades.`
          })
        } else {
          toast({
            title: "No se ha importado ninguna actividad.",
            description:
              "Las actividades ya estaban registradas o algo falló durante la importación."
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error importando las actividades.",
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
          <DropdownMenuItem onClick={() => importActivities(FileFormat.JSON)}>
            <Braces className="w-4 h-4 mr-2" />
            <span>JSON</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => importActivities(FileFormat.CSV)}>
            <Terminal className="w-4 h-4 mr-2" />
            <span>CSV</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

export default ImportActivities
