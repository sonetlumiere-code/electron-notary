import { Button } from "@renderer/components/ui/button"
import { toast } from "@renderer/components/ui/use-toast"

const CreateLegalPersonPage = () => {
  const createLegalPerson = async () => {
    try {
      const newLegalPerson = await window.legalPersonAPI.createLegalPerson({
        businessName: "Tech Innovators Inc.",
        CUIT: 12345678901,
        legalAddress: "123 Innovation Drive, Suite 100, Silicon Valley, CA",
        mainActivity: "Software Development",
        instrumentOfConstitution: "Articles of Incorporation",
        registrationDate: new Date("2010-05-15"),
        registrationNumber: 567890,
        registeredOfficePhone: 5551234567,
        registeredOfficeAddress: "123 Innovation Drive, Suite 100, Silicon Valley, CA",
        registeredOfficeEmail: "info@techinnovators.com",
        statuteCopy: "path/to/statuteCopy.pdf",
        proceedingsCopy: "path/to/proceedingsCopy.pdf",
        balanceCopy: "path/to/balanceCopy.pdf",
        representativeData: "John Doe, CEO"
      })

      console.log(newLegalPerson)
      toast({
        title: "Nueva ficha creada.",
        description: "La ficha de persona jurídica ha sido creada correctamente."
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error creando la ficha de persona jurídica."
      })
    }
  }

  return (
    <>
      <div>Create Legal Person Page</div>
      <Button onClick={createLegalPerson}>Crear persona jurídica</Button>
    </>
  )
}

export default CreateLegalPersonPage
