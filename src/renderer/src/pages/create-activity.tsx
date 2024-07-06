import PageTitle from "@renderer/components/page-title"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@renderer/components/ui/breadcrumb"
import { Link, useLocation, useParams } from "react-router-dom"

const CreateActivityPage = () => {
  const { id } = useParams()
  const location = useLocation()

  const isPerson = location.pathname.includes("/create-activity/person")

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
            <BreadcrumbPage>Lista de actividades</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageTitle>Crear actividad</PageTitle>

      <div>
        {isPerson ? (
          <p>Creating activity for person with ID: {id}</p>
        ) : (
          <p>Creating activity for legal person with ID: {id}</p>
        )}
      </div>
    </div>
  )
}

export default CreateActivityPage
