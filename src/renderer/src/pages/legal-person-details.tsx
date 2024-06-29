import LegalPersonActions from "@renderer/components/dashboard/lists/legal-persons/data-table/actions/item-actions/legal-person-actions"
import PageTitle from "@renderer/components/page-title"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@renderer/components/ui/breadcrumb"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@renderer/components/ui/card"
import { Separator } from "@renderer/components/ui/separator"
import { LegalPersonDataSheet } from "@shared/types"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const LegalPersonDetailsPage = () => {
  const [legalPerson, setLegalPerson] = useState<LegalPersonDataSheet | null>(null)

  const { id } = useParams()
  const legalPersonId = Number(id)

  useEffect(() => {
    const getLegalPerson = async () => {
      const res = await window.legalPersonAPI.getLegalPersonById(legalPersonId)
      setLegalPerson(res)
    }

    getLegalPerson()
  }, [])

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
              <Link to="/legal-persons-list">Lista de personas jurídicas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detalle de persona jurídica</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageTitle>Detalle de persona jurídica</PageTitle>

      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div className="space-y-2">
              <CardTitle>Persona jurídica</CardTitle>
              <CardDescription>Ficha de persona jurídica</CardDescription>
            </div>
            {legalPerson && (
              <LegalPersonActions legalPerson={legalPerson} showEdit showExport showDelete />
            )}
          </div>
        </CardHeader>
        <CardContent>
          {legalPerson && (
            <div className="grid gap-3">
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Razón social</dt>
                  <dd>{legalPerson.businessName}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">CUIT</dt>
                  <dd>{legalPerson.CUIT}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Domicilio legal</dt>
                  <dd>{legalPerson.legalAddress}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Actividad principal</dt>
                  <dd>{legalPerson.mainActivity}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Instrumento de Constitución</dt>
                  <dd>{legalPerson.instrumentOfConstitution}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Fecha de inscripción</dt>
                  <dd>{format(legalPerson.registrationDate, "dd/MM/yyyy")}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Lugar de inscripción</dt>
                  <dd>{legalPerson.registrationOffice}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Teléfono de la sede social</dt>
                  <dd>{legalPerson.registeredOfficePhone}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Domicilio de la sede social</dt>
                  <dd>{legalPerson.registeredOfficeAddress}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email de la sede social</dt>
                  <dd>{legalPerson.registeredOfficeEmail}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Copia del estatuto</dt>
                  <dd>{legalPerson.statuteCopy}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Copia de las actas</dt>
                  <dd>{legalPerson.proceedingsCopy}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Copia del balance</dt>
                  <dd>{legalPerson.balanceCopy}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Datos del representante</dt>
                  <dd>{legalPerson.representativeData}</dd>
                </div>
              </dl>
            </div>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  )
}

export default LegalPersonDetailsPage
