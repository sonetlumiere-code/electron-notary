import PageTitle from "@renderer/components/page-title"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@renderer/components/ui/breadcrumb"
import { Button } from "@renderer/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@renderer/components/ui/card"
import { Link } from "react-router-dom"

const EditPersonPage = () => {
  const editPerson = () => {
    // to do
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
            <BreadcrumbPage>Editar ficha</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageTitle>Editar ficha</PageTitle>

      <Card>
        <CardHeader>
          <CardTitle>Ficha de persona</CardTitle>
          <CardDescription>Formulario para editar ficha de persona</CardDescription>
        </CardHeader>
        <CardContent>form content</CardContent>
        <CardFooter>
          <Button onClick={editPerson}>Editar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EditPersonPage
