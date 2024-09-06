import ActivitiesCard from "@renderer/components/activities-card"
import PersonActions from "@renderer/components/dashboard/lists/persons/actions/item-actions/person-actions"
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
import { Activity, PersonDataSheet } from "@shared/types"
import { format } from "date-fns"
import { toZonedTime } from "date-fns-tz"
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
              <Link to="/persons">Lista de personas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detalle de persona</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* <PageTitle>Detalle de persona</PageTitle> */}

      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div className="space-y-2">
              <CardTitle>
                {person?.name} {person?.lastName}
              </CardTitle>
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
                  {format(toZonedTime(person.birthdate, "UTC"), "dd/MM/yyyy")}
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
                  {person.divorceDate
                    ? format(toZonedTime(person.divorceDate, "UTC"), "dd/MM/yyyy")
                    : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Juzgado de Divorcio</p>
                <p className="text-sm text-muted-foreground">
                  {person.divorceCourt ? person.divorceCourt : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Carátula</p>
                <p className="text-sm text-muted-foreground">
                  {person.divorce ? person.divorce : "-"}
                </p>
              </div>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Cantidad de Hijos</p>
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

              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Documento</p>
                {person.document ? (
                  <Button
                    variant="link"
                    className="justify-start items-start p-0"
                    onClick={() => openFile(person.document as string)}
                  >
                    <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                      {person.document}
                    </span>
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                    -
                  </span>
                )}
              </div>

              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Declaración jurada</p>
                {person.affidavit ? (
                  <Button
                    variant="link"
                    className="justify-start items-start p-0"
                    onClick={() => openFile(person.affidavit as string)}
                  >
                    <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                      {person.affidavit}
                    </span>
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                    -
                  </span>
                )}
              </div>

              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Sentencia</p>
                {person.judgment ? (
                  <Button
                    variant="link"
                    className="justify-start items-start p-0"
                    onClick={() => openFile(person.judgment as string)}
                  >
                    <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                      {person.judgment}
                    </span>
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                    -
                  </span>
                )}
              </div>

              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Otros</p>
                {person.attachedFile ? (
                  <Button
                    variant="link"
                    className="justify-start items-start p-0"
                    onClick={() => openFile(person.attachedFile as string)}
                  >
                    <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                      {person.attachedFile}
                    </span>
                  </Button>
                ) : (
                  <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                    -
                  </span>
                )}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

      <ActivitiesCard isPerson={true} id={personId} />
    </div>
  )
}

export default PersonDetailsPage
