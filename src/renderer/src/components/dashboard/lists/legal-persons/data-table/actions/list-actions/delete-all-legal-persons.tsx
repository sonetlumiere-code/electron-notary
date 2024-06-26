import { useConfirmation } from "@renderer/components/confirmation-provider"
import { useLegalPersons } from "@renderer/components/legal-persons-provider"
import { toast } from "@renderer/components/ui/use-toast"
import { Trash2 } from "lucide-react"

const DeleteAllLegalPersons = () => {
  const { legalPersons, clearLegalPersons } = useLegalPersons()
  const confirm = useConfirmation()

  const deleteAllLegalPersons = async () => {
    confirm({
      variant: "destructive",
      title: "¿Eliminar todas las fichas jurídicas?",
      description: "Esta acción es irreversible.",
      countDown: 5
    }).then(async () => {
      const allLegalPersonsIds = legalPersons.map((legalPerson) => legalPerson.id)

      try {
        const res = await window.legalPersonAPI.deleteLegalPersons(allLegalPersonsIds as number[])

        if (res?.length) {
          clearLegalPersons()
          toast({
            title: "Fichas jurídicas eliminadas.",
            description: "Todas las fichas han sido eliminadas correctamente."
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Hubo un error eliminando las fichas jurídicas.",
          description: "Intenta nuevamente más tarde."
        })
      }
    })
  }

  return (
    <span onClick={deleteAllLegalPersons} className="flex">
      <Trash2 className="w-4 h-4 text-destructive" />
      <p className="ml-2 text-destructive">Eliminar</p>
    </span>
  )
}

export default DeleteAllLegalPersons
