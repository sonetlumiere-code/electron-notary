import PageTitle from '@renderer/components/page-title'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@renderer/components/ui/breadcrumb'
import { Button } from '@renderer/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@renderer/components/ui/card'
import { toast } from '@renderer/components/ui/use-toast'
import { DocumentType, MaritalStatus } from '@shared/types'
import { Link } from 'react-router-dom'

const CreatePersonPage = () => {
  const createPerson = async () => {
    try {
      const newPerson = await window.api.createPerson({
        name: 'Alfio',
        lastName: 'Doe',
        gender: 'Male',
        nationality: 'American',
        documentType: DocumentType.DNI,
        documentNumber: 12345678,
        CUIT_L: 9876543210,
        birthdate: new Date('1990-01-01'),
        birthplace: 'New York',
        maritalStatus: MaritalStatus.SOLTERO,
        spouseName: 'Eva',
        spouseNumber: 423232221,
        marriageRegime: 'Custom',
        divorceNumber: 'demo',
        divorceDate: 'asd',
        divorceCourt: 'qqqqqq',
        deceasedSpouseName: 'w',
        numberOfChildren: 2,
        address: '123 Main St',
        city: 'New York City',
        province: 'New York',
        profession: 'Engineer',
        phoneNumber: '555-1234',
        mobileNumber: '555-5678',
        email: 'alfio.doe@example.com',
        isPoliticallyExposed: true,
        politicalPosition: 'asd',
        originOfFunds: 'qqqqqq',
        reasonForChoosing: 'Recommended by a friend',
        referredBy: 'Jane Smith'
      })
      console.log(newPerson)
      toast({
        title: 'Nueva ficha creada.',
        description: 'La ficha de datos personales ha sido creada correctamente.'
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Error creando la ficha de datos personales.'
      })
    }
  }

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/persons-list">Lista de personas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Crear ficha</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageTitle>Crear ficha</PageTitle>

      <Card>
        <CardHeader>
          <CardTitle>Ficha de persona</CardTitle>
          <CardDescription>Formulario para crear nueva ficha de persona</CardDescription>
        </CardHeader>
        <CardContent>form content</CardContent>
        <CardFooter>
          <Button onClick={createPerson}>Crear</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CreatePersonPage
