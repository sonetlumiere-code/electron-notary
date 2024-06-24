import { useConfirmation } from "@renderer/components/confirmation-provider"
import { usePersons } from "@renderer/components/persons-provider"
import { toast } from "@renderer/components/ui/use-toast"
import { Trash2 } from "lucide-react"

const DeleteAllPersons = () => {
  const { persons, clearPersons } = usePersons()
  const confirm = useConfirmation()

  const deleteAllPersons = async () => {
    confirm({
      variant: "destructive",
      title: "¿Eliminar todas las fichas personales?",
      description: "Esta acción es irreversible.",
      countDown: 5
    }).then(async () => {
      const allPersonsIds = persons.map((person) => person.id)

      try {
        const res = await window.personAPI.deletePersons(allPersonsIds as number[])

        if (res?.length) {
          clearPersons()
          toast({
            title: "Fichas personales eliminadas.",
            description: "Todas las fichas han sido eliminadas correctamente."
          })
        }
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
    <span onClick={deleteAllPersons} className="flex">
      <Trash2 className="w-4 h-4 text-destructive" />
      <p className="ml-2 text-destructive">Eliminar</p>
    </span>
  )
}

export default DeleteAllPersons
