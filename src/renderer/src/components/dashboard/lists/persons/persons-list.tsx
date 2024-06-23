import PageTitle from "@renderer/components/page-title"
import { usePersons } from "@renderer/components/persons-provider"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@renderer/components/ui/breadcrumb"
import { buttonVariants } from "@renderer/components/ui/button"
import { cn } from "@renderer/lib/utils"
import { CirclePlus } from "lucide-react"
import { Link } from "react-router-dom"
import PersonListActions from "./actions/list-actions/person-list-actions"
import { PersonsDataTable } from "./data-table/persons-data-table"

const PersonsListPage = () => {
  const { persons } = usePersons()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Lista de personas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <PersonListActions />
      </div>

      <div className="flex justify-between items-center">
        <PageTitle>Fichas de personas</PageTitle>

        <Link to="/create-person" className={cn(buttonVariants({ variant: "default" }))}>
          <CirclePlus className="w-4 h-4 mr-2" />
          Crear
        </Link>
      </div>

      {persons && <PersonsDataTable data={persons} />}
    </div>
  )
}

export default PersonsListPage
