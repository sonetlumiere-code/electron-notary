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
import { ArrowRightFromLine, Braces, Terminal } from "lucide-react"

const ExportAllActivities = () => {
  const { activities } = useActivities()

  const exportAllActivities = async (fileFormat: FileFormat) => {
    const directory = await window.electronAPI.selectDirectory()

    if (directory) {
      const allActivitiesIds = activities.map((activity) => activity.id)

      console.log(fileFormat)

      const res = await window.activityAPI.exportActivities({
        directory,
        ids: allActivitiesIds as number[],
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
          <DropdownMenuItem onClick={() => exportAllActivities(FileFormat.JSON)}>
            <Braces className="w-4 h-4 mr-2" />
            <span>JSON</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportAllActivities(FileFormat.CSV)}>
            <Terminal className="w-4 h-4 mr-2" />
            <span>CSV</span>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

export default ExportAllActivities
