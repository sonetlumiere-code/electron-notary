import { useActivities } from "@renderer/components/activities-provider"
import { useConfirmation } from "@renderer/components/confirmation-provider"
import { toast } from "@renderer/components/ui/use-toast"
import { Activity } from "@shared/types"
import { Trash2 } from "lucide-react"

type DeleteActivityProps = {
  activity: Activity
}

const DeleteActivity = ({ activity }: DeleteActivityProps) => {
  const { deleteActivities } = useActivities()
  // const navigate = useNavigate()
  const confirm = useConfirmation()

  const deleteActivity = async () => {
    confirm({
      variant: "destructive",
      title: "¿Eliminar actividad?",
      description: "Esta acción es irreversible."
    }).then(async () => {
      try {
        const res = await window.activityAPI.deleteActivities([activity.id] as number[])
        if (res) {
          deleteActivities(res)
          // navigate("/activities")
          toast({
            title: "Actividad eliminada.",
            description: "La actividad ha sido eliminada correctamente."
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Hubo un error eliminando la actividad.",
          description: "Intenta nuevamente más tarde."
        })
      }
    })
  }

  return (
    <span onClick={deleteActivity} className="flex">
      <Trash2 className="w-4 h-4 text-destructive" />
      <p className="ml-2 text-destructive">Eliminar</p>
    </span>
  )
}

export default DeleteActivity
