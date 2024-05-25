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
import { PersonDataSheet } from "@shared/types"
import { CirclePlus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PersonsDataTable } from "./data-table/persons-data-table"

const PersonsList = () => {
  const [persons, setPersons] = useState<PersonDataSheet[] | null>(null)

  useEffect(() => {
    const getPersons = async () => {
      const res = await window.personAPI.getPersons()
      setPersons(res)
    }

    getPersons()
  }, [])

  // useEffect(() => {
  //   const searchPersons = async () => {
  //     const res = await window.personAPI.searchPersons({
  //       name: "",
  //       email: "",
  //       ids: ["4"]
  //     })
  //     setPersons(res)
  //     console.log(res)
  //   }

  //   searchPersons()
  // }, [])

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
            <BreadcrumbPage>Lista de personas</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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

export default PersonsList
