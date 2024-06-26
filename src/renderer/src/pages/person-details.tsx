import PersonActions from "@renderer/components/dashboard/lists/persons/actions/item-actions/person-actions"
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
import { PersonDataSheet } from "@shared/types"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const PersonDetailsPage = () => {
  const [person, setPerson] = useState<PersonDataSheet | null>(null)

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
              <Link to="/persons-list">Lista de personas</Link>
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
            {person && <PersonActions person={person} showEdit showExport showDelete />}
          </div>
        </CardHeader>
        <CardContent>
          {person && (
            <div className="grid gap-3">
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Nombre</dt>
                  <dd>{person.name}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Apellido</dt>
                  <dd>{person.lastName}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Sexo</dt>
                  <dd>{person.gender}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Nacionalidad</dt>
                  <dd>{person.nationality}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Tipo de Documento</dt>
                  <dd>{person.documentType}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Número de Documento</dt>
                  <dd>{person.documentNumber}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">CUIT_L</dt>
                  <dd>{person.CUIT_L}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Fecha de Nacimiento</dt>
                  <dd>{format(person.birthdate, "dd/MM/yyyy")}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Lugar de Nacimiento</dt>
                  <dd>{person.birthplace}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Estado Civil</dt>
                  <dd>{person.maritalStatus}</dd>
                </div>
                <Separator />
                {person.fatherName && (
                  <>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Nombre del Padre</dt>
                      <dd>{person.fatherName}</dd>
                    </div>
                    <Separator />
                  </>
                )}
                {person.motherName && (
                  <>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Nombre de la Madre</dt>
                      <dd>{person.motherName}</dd>
                    </div>
                    <Separator />
                  </>
                )}
                {person.spouseName && (
                  <>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Nombre del Cónyuge</dt>
                      <dd>{person.spouseName}</dd>
                    </div>
                    <Separator />
                  </>
                )}
                {person.marriageNumber !== undefined && person?.marriageNumber > 0 && (
                  <>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Número de Núpcias</dt>
                      <dd>{person.marriageNumber}</dd>
                    </div>
                    <Separator />
                  </>
                )}
                {person.marriageRegime && (
                  <>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Régimen Matrimonial</dt>
                      <dd>{person.marriageRegime}</dd>
                    </div>
                    <Separator />
                  </>
                )}
                {person.divorceNumber !== undefined && person.divorceNumber > 0 && (
                  <>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Número de Divorcio</dt>
                      <dd>{person.divorceNumber}</dd>
                    </div>
                    <Separator />
                  </>
                )}
                {person.divorceDate && (
                  <>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Fecha de Divorcio</dt>
                      <dd>{format(person.divorceDate, "dd/MM/yyyy")}</dd>
                    </div>
                    <Separator />
                  </>
                )}
                {person.divorceCourt && (
                  <>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Juzgado de Divorcio</dt>
                      <dd>{person.divorceCourt}</dd>
                    </div>
                    <Separator />
                  </>
                )}
                {person.divorceAutos && (
                  <>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Autos del Divorcio</dt>
                      <dd>{person.divorceAutos}</dd>
                    </div>
                    <Separator />
                  </>
                )}
                {person.deceasedSpouseName && (
                  <>
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Nombre del Cónyuge Fallecido</dt>
                      <dd>{person.deceasedSpouseName}</dd>
                    </div>
                    <Separator />
                  </>
                )}
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Número de Hijos</dt>
                  <dd>{person.numberOfChildren ?? "N/A"}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Dirección</dt>
                  <dd>{person.address}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Ciudad</dt>
                  <dd>{person.city}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Profesión</dt>
                  <dd>{person.profession}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Teléfono</dt>
                  <dd>{person.phoneNumber}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Número de Móvil</dt>
                  <dd>{person.mobileNumber}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>{person.email}</dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Expuesto Políticamente</dt>
                  <dd>{person.isPoliticallyExposed ? "Sí" : "No"}</dd>
                </div>
                {person.politicalPosition && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Cargo Político</dt>
                      <dd>{person.politicalPosition}</dd>
                    </div>
                  </>
                )}
                {person.originOfFunds && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Origen de Fondos</dt>
                      <dd>{person.originOfFunds}</dd>
                    </div>
                  </>
                )}
                {person.reasonForChoosing && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Motivo de Elección</dt>
                      <dd>{person.reasonForChoosing}</dd>
                    </div>
                  </>
                )}
                {person.referredBy && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <dt className="text-muted-foreground">Referido por</dt>
                      <dd>{person.referredBy}</dd>
                    </div>
                  </>
                )}
              </dl>
            </div>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  )
}

export default PersonDetailsPage
