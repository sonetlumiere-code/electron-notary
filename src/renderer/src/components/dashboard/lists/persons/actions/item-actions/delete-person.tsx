import { useConfirmation } from "@renderer/components/confirmation-provider"
import { usePersons } from "@renderer/components/persons-provider"
import { toast } from "@renderer/components/ui/use-toast"
import { PersonDataSheet } from "@shared/types"
import { Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

type DeletePersonProps = {
  person: PersonDataSheet
}

const DeletePerson = ({ person }: DeletePersonProps) => {
  const { deletePersons } = usePersons()
  const navigate = useNavigate()
  const confirm = useConfirmation()

  const deletePerson = async () => {
    confirm({
      variant: "destructive",
      title: "¿Eliminar ficha?",
      description: "Esta acción es irreversible."
    }).then(async () => {
      try {
        const res = await window.personAPI.deletePersons([person.id] as number[])
        if (res) {
          deletePersons(res)
          navigate("/persons-list")
          toast({
            title: "Ficha personal eliminada.",
            description: "La ficha ha sido eliminada correctamente."
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Hubo un error eliminando la ficha personal.",
          description: "Intenta nuevamente más tarde."
        })
      }
    })
  }

  return (
    <span onClick={deletePerson} className="flex">
      <Trash2 className="w-4 h-4 text-destructive" />
      <p className="ml-2 text-destructive">Eliminar</p>
    </span>
  )
}

export default DeletePerson
