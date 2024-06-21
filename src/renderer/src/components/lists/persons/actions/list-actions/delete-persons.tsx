import { useConfirmation } from "@renderer/components/confirmation-provider"
import { toast } from "@renderer/components/ui/use-toast"
import { Trash2 } from "lucide-react"

const DeletePersons = () => {
  const confirm = useConfirmation()

  const deletePersons = async () => {
    confirm({
      variant: "destructive",
      title: "¿Eliminar todas las fichas personales?",
      description: "Esta acción es irreversible.",
      countDown: 5
    }).then(async () => {
      try {
        await window.personAPI.deletePersons()

        toast({
          title: "Fichas personales eliminadas.",
          description: "Las fichas han sido eliminadas correctamente."
        })
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Hubo un error eliminando las fichas personales.",
          description: "Intenta nuevamente más tarde."
        })
      }
    })
  }

  return (
    <span onClick={deletePersons} className="flex">
      <Trash2 className="w-4 h-4 text-destructive" />
      <p className="ml-2 text-destructive">Eliminar</p>
    </span>
  )
}

export default DeletePersons
