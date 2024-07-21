import ActivitiesCard from "@renderer/components/activities-card"
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
import { Button } from "@renderer/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@renderer/components/ui/card"
import { toast } from "@renderer/components/ui/use-toast"
import { Activity, LegalPersonDataSheet } from "@shared/types"
import { format } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const LegalPersonDetailsPage = () => {
  const [legalPerson, setLegalPerson] = useState<
    (LegalPersonDataSheet & { activities: Activity[] }) | null
  >(null)

  const { id } = useParams()
  const legalPersonId = Number(id)

  useEffect(() => {
    const getLegalPerson = async () => {
      const res = await window.legalPersonAPI.getLegalPersonById(legalPersonId)
      setLegalPerson(res)
    }

    getLegalPerson()
  }, [])

  const openFile = async (fileName: string) => {
    try {
      await window.electronAPI.openFile(fileName)
    } catch (error) {
      console.error("Error opening file:", error)
      toast({
        variant: "destructive",
        title: "Error abriendo archivo adjunto."
      })
    }
  }

  return (
    <div className="relative space-y-6">
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
              <Link to="/legal-persons">Lista de personas jurídicas</Link>
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
              <CardTitle>{legalPerson?.businessName}</CardTitle>
              <CardDescription>Ficha de persona jurídica</CardDescription>
            </div>
            {legalPerson && (
              <LegalPersonActions
                legalPerson={legalPerson}
                showEdit
                showActivity
                showExport
                showDelete
              />
            )}
          </div>
        </CardHeader>
        <CardContent>
          {legalPerson && (
            <div className="relative grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Razón social</p>
                <p className="text-sm text-muted-foreground">{legalPerson.businessName}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">CUIT</p>
                <p className="text-sm text-muted-foreground">{legalPerson.CUIT}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Domicilio legal</p>
                <p className="text-sm text-muted-foreground">{legalPerson.legalAddress}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Actividad principal</p>
                <p className="text-sm text-muted-foreground">{legalPerson.mainActivity}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Instrumento de Constitución</p>
                <p className="text-sm text-muted-foreground">
                  {legalPerson.instrumentOfConstitution}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Fecha de inscripción</p>
                <p className="text-sm text-muted-foreground">
                  {format(toZonedTime(legalPerson.registrationDate, "UTC"), "dd/MM/yyyy")}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Lugar de inscripción</p>
                <p className="text-sm text-muted-foreground">{legalPerson.registrationOffice}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Matrícula</p>
                <p className="text-sm text-muted-foreground">{legalPerson.enrollment}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Legajo</p>
                <p className="text-sm text-muted-foreground">{legalPerson.file}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Teléfono de la sede social</p>
                <p className="text-sm text-muted-foreground">{legalPerson.registeredOfficePhone}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Domicilio de la sede social</p>
                <p className="text-sm text-muted-foreground">
                  {legalPerson.registeredOfficeAddress}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Email de la sede social</p>
                <p className="text-sm text-muted-foreground">{legalPerson.registeredOfficeEmail}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Copia del estatuto</p>
                {legalPerson.statuteCopy ? (
                  <Button
                    variant="link"
                    className="justify-start items-start p-0"
                    onClick={() => openFile(legalPerson.statuteCopy as string)}
                  >
                    <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                      {legalPerson.statuteCopy}
                    </span>
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                    -
                  </span>
                )}
              </div>

              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Copia de las actas</p>
                {legalPerson.proceedingsCopy ? (
                  <Button
                    variant="link"
                    className="justify-start items-start p-0"
                    onClick={() => openFile(legalPerson.proceedingsCopy as string)}
                  >
                    <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                      {legalPerson.proceedingsCopy}
                    </span>
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                    -
                  </span>
                )}
              </div>

              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Copia del balance</p>
                {legalPerson.balanceCopy ? (
                  <Button
                    variant="link"
                    className="justify-start items-start p-0"
                    onClick={() => openFile(legalPerson.balanceCopy as string)}
                  >
                    <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                      {legalPerson.balanceCopy}
                    </span>
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                    -
                  </span>
                )}
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Datos del representante</p>
                <p className="text-sm text-muted-foreground">{legalPerson.representativeData}</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      <ActivitiesCard isPerson={false} id={legalPersonId} />
    </div>
  )
}

export default LegalPersonDetailsPage
