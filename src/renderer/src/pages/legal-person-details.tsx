import { useActivities } from "@renderer/components/activities-provider"
import DeleteActivity from "@renderer/components/dashboard/lists/activities/actions/item-actions/delete-activity"
import LegalPersonActions from "@renderer/components/dashboard/lists/legal-persons/data-table/actions/item-actions/legal-person-actions"
import PageTitle from "@renderer/components/page-title"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@renderer/components/ui/accordion"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@renderer/components/ui/dropdown-menu"
import { Activity, LegalPersonDataSheet } from "@shared/types"
import { format } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import { Edit, MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const LegalPersonDetailsPage = () => {
  const [legalPerson, setLegalPerson] = useState<
    (LegalPersonDataSheet & { activities: Activity[] }) | null
  >(null)

  const { activities } = useActivities()

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
              <CardTitle>Persona jurídica</CardTitle>
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
                <p className="text-sm text-muted-foreground">{legalPerson.statuteCopy}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Copia de las actas</p>
                <p className="text-sm text-muted-foreground">{legalPerson.proceedingsCopy}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Copia del balance</p>
                <p className="text-sm text-muted-foreground">{legalPerson.balanceCopy}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Datos del representante</p>
                <p className="text-sm text-muted-foreground">{legalPerson.representativeData}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Matrícula</p>
                <p className="text-sm text-muted-foreground">{legalPerson.enrollment}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Legajo</p>
                <p className="text-sm text-muted-foreground">{legalPerson.file}</p>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <div className="space-y-2">
            <CardTitle>Actividades</CardTitle>
            <CardDescription>Historial de actividades</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {legalPerson?.activities.length ? (
            <Accordion type="single" collapsible>
              {activities
                .filter((activity) => activity.legal_person_id === legalPersonId)
                .map((activity) => (
                  <AccordionItem key={activity.id} value={`item-${activity.id}`}>
                    <AccordionTrigger>
                      <div className="space-x-5">
                        <span>{format(toZonedTime(activity.date, "UTC"), "dd/MM/yyyy")}</span>
                        <span>{activity.act}</span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent>
                      <div className="flex justify-between items-center">
                        <div
                          key={activity.id}
                          className="relative w-5/6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        >
                          <div className="grid gap-1 self-start">
                            <p className="text-sm font-medium leading-none">Fecha</p>
                            <p className="text-sm text-muted-foreground">
                              <span>{format(toZonedTime(activity.date, "UTC"), "dd/MM/yyyy")}</span>
                            </p>
                          </div>
                          <div className="grid gap-1 self-start">
                            <p className="text-sm font-medium leading-none">Acto</p>
                            <p className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                              {activity.act}
                            </p>
                          </div>
                          <div className="grid gap-1 self-start">
                            <p className="text-sm font-medium leading-none">Observaciones</p>
                            <p className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                              {activity.observations}
                            </p>
                          </div>
                          {/* <div className="grid gap-1 self-start">
                        <p className="text-sm font-medium leading-none">Archivo adjunto</p>
                        <p className="text-sm text-muted-foreground">{activity.attachedFile}</p>
                      </div> */}
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menú</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <Link to={`/edit-activity/${activity.id}`}>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4" />
                                <p className="ml-2">Editar</p>
                              </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <DeleteActivity activity={activity} />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          ) : (
            <p className="text-sm font-medium">No hay registros de actividades</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default LegalPersonDetailsPage
