import PersonListActions from "@renderer/components/dashboard/lists/persons/actions/list-actions/person-list-actions"
import PersonsList from "@renderer/components/dashboard/lists/persons/persons-list"
import PageTitle from "@renderer/components/page-title"
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

const PersonsPage = () => {
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

      <PersonsList />
    </div>
  )
}

export default PersonsPage
