import LegalPersonListActions from "@renderer/components/dashboard/lists/legal-persons/data-table/actions/list-actions/legal-person-list-actions"
import LegalPersonsList from "@renderer/components/dashboard/lists/legal-persons/legal-persons.list"
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
import { CirclePlus, Link } from "lucide-react"

const LegalPersonsPage = () => {
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
              <BreadcrumbPage>Lista de personas jurídicas</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <LegalPersonListActions />
      </div>

      <div className="flex justify-between items-center">
        <PageTitle>Fichas de personas jurídicas</PageTitle>

        <Link to="/create-legal-person" className={cn(buttonVariants({ variant: "default" }))}>
          <CirclePlus className="w-4 h-4 mr-2" />
          Crear
        </Link>
      </div>

      <LegalPersonsList />
    </div>
  )
}

export default LegalPersonsPage
