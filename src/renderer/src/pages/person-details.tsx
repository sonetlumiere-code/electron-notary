import PersonActions from "@renderer/components/dashboard/lists/persons/actions/item-actions/person-actions"
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
import { Activity, PersonDataSheet } from "@shared/types"
import { format } from "date-fns"
import { Edit, MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const PersonDetailsPage = () => {
  const [person, setPerson] = useState<(PersonDataSheet & { activities: Activity[] }) | null>(null)

  const { id } = useParams()
  const personId = Number(id)

  useEffect(() => {
    const getPerson = async () => {
      const res = await window.personAPI.getPersonById(personId)
      setPerson(res)
    }

    getPerson()
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
              <Link to="/persons">Lista de personas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detalle de persona</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageTitle>Detalle de persona</PageTitle>

      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div className="space-y-2">
              <CardTitle>Persona</CardTitle>
              <CardDescription>Ficha de persona</CardDescription>
            </div>
            {person && (
              <PersonActions person={person} showEdit showActivity showExport showDelete />
            )}
          </div>
        </CardHeader>
        <CardContent>
          {person && (
            <div className="relative grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Nombre</p>
                <p className="text-sm text-muted-foreground">{person.name}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Apellido</p>
                <p className="text-sm text-muted-foreground">{person.lastName}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Sexo</p>
                <p className="text-sm text-muted-foreground">{person.gender}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Nacionalidad</p>
                <p className="text-sm text-muted-foreground">{person.nationality}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Tipo de Documento</p>
                <p className="text-sm text-muted-foreground">{person.documentType}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Número de Documento</p>
                <p className="text-sm text-muted-foreground">{person.documentNumber}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">CUIT_L</p>
                <p className="text-sm text-muted-foreground">{person.CUIT_L}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Fecha de Nacimiento</p>
                <p className="text-sm text-muted-foreground">
                  {format(person.birthdate, "dd/MM/yyyy")}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Lugar de Nacimiento</p>
                <p className="text-sm text-muted-foreground">{person.birthplace}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Estado Civil</p>
                <p className="text-sm text-muted-foreground">{person.maritalStatus}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Nombre del Padre</p>
                <p className="text-sm text-muted-foreground">
                  {person.fatherName ? person.fatherName : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Nombre de la Madre</p>
                <p className="text-sm text-muted-foreground">
                  {person.motherName ? person.motherName : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Nombre del Cónyuge</p>
                <p className="text-sm text-muted-foreground">
                  {person.spouseName ? person.spouseName : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Número de Núpcias</p>
                <p className="text-sm text-muted-foreground">
                  {person.marriageNumber !== undefined && person?.marriageNumber > 0
                    ? person.marriageNumber
                    : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Régimen Matrimonial</p>
                <p className="text-sm text-muted-foreground">
                  {person.marriageRegime ? person.marriageRegime : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Fecha de Sentencia</p>
                <p className="text-sm text-muted-foreground">
                  {person.divorceDate ? format(person.divorceDate, "dd/MM/yyyy") : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Juzgado de Divorcio</p>
                <p className="text-sm text-muted-foreground">
                  {person.divorceCourt ? person.divorceCourt : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Divorcio</p>
                <p className="text-sm text-muted-foreground">
                  {person.divorce ? person.divorce : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Número de Hijos</p>
                <p className="text-sm text-muted-foreground">{person.numberOfChildren ?? "N/A"}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Dirección</p>
                <p className="text-sm text-muted-foreground">{person.address}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Ciudad</p>
                <p className="text-sm text-muted-foreground">{person.city}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Profesión</p>
                <p className="text-sm text-muted-foreground">{person.profession}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Teléfono</p>
                <p className="text-sm text-muted-foreground">
                  {person.phoneNumber ? person.phoneNumber : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Número de Móvil</p>
                <p className="text-sm text-muted-foreground">
                  {person.mobileNumber ? person.mobileNumber : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Email</p>
                <p className="text-sm text-muted-foreground">{person.email}</p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Expuesto Políticamente</p>
                <p className="text-sm text-muted-foreground">
                  {person.isPoliticallyExposed ? "Sí" : "No"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Cargo Político</p>
                <p className="text-sm text-muted-foreground">
                  {person.politicalPosition ? person.politicalPosition : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Origen de Fondos</p>
                <p className="text-sm text-muted-foreground">
                  {person.originOfFunds ? person.originOfFunds : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Referido por</p>
                <p className="text-sm text-muted-foreground">
                  {person.referredBy ? person.referredBy : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Observaciones</p>
                <p className="text-sm text-muted-foreground">
                  {person.observations ? person.observations : "-"}
                </p>
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
          {person?.activities.length ? (
            <Accordion type="single" collapsible>
              {person.activities.map((activity) => (
                <AccordionItem key={activity.id} value={`item-${activity.id}`}>
                  <AccordionTrigger>
                    {format(new Date(activity.date), "dd/MM/yyyy")}
                  </AccordionTrigger>

                  <AccordionContent>
                    <div className="flex justify-between items-center">
                      <div className="relative w-5/6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div className="grid gap-1 self-start">
                          <p className="text-sm font-medium leading-none">Fecha</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(activity.date), "dd/MM/yyyy")}
                          </p>
                        </div>
                        <div className="grid gap-1 self-start">
                          <p className="text-sm font-medium leading-none">Acta</p>
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

export default PersonDetailsPage
