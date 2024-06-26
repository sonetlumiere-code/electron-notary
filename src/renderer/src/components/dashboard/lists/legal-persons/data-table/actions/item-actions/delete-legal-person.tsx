import { useConfirmation } from "@renderer/components/confirmation-provider"
import { useLegalPersons } from "@renderer/components/legal-persons-provider"
import { toast } from "@renderer/components/ui/use-toast"
import { LegalPersonDataSheet } from "@shared/types"
import { Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

type DeleteLegalPersonProps = {
  legalPerson: LegalPersonDataSheet
}

const DeleteLegalPerson = ({ legalPerson }: DeleteLegalPersonProps) => {
  const { deleteLegalPersons } = useLegalPersons()
  const navigate = useNavigate()
  const confirm = useConfirmation()

  const deleteLegalPerson = async () => {
    confirm({
      variant: "destructive",
      title: "¿Eliminar ficha?",
      description: "Esta acción es irreversible."
    }).then(async () => {
      try {
        const res = await window.legalPersonAPI.deleteLegalPersons([legalPerson.id] as number[])
        if (res) {
          deleteLegalPersons(res)
          navigate("/legal-persons-list")
          toast({
            title: "Ficha jurídica eliminada.",
            description: "La ficha jurídica ha sido eliminada correctamente."
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Hubo un error eliminando la ficha jurídica.",
          description: "Intenta nuevamente más tarde."
        })
      }
    })
  }

  return (
    <span onClick={deleteLegalPerson} className="flex">
      <Trash2 className="w-4 h-4 text-destructive" />
      <p className="ml-2 text-destructive">Eliminar</p>
    </span>
  )
}

export default DeleteLegalPerson
