import { useLegalPersons } from "@renderer/components/legal-persons-provider"
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
import LegalPersonListActions from "./data-table/actions/list-actions/legal-person-list-actions"
import { LegalPersonsDataTable } from "./data-table/legal-persons-data-table"

const LegalPersonsListPage = () => {
  const { legalPersons } = useLegalPersons()

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

      {legalPersons && <LegalPersonsDataTable data={legalPersons} />}
    </div>
  )
}

export default LegalPersonsListPage
