import { zodResolver } from "@hookform/resolvers/zod"
import LegalPersonActions from "@renderer/components/dashboard/lists/legal-persons/data-table/actions/item-actions/legal-person-actions"
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@renderer/components/ui/form"
import { Input } from "@renderer/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@renderer/components/ui/select"
import { ToastAction } from "@renderer/components/ui/toast"
import { toast } from "@renderer/components/ui/use-toast"
import {
  LegalPersonSchema,
  zodLegalPersonSchema
} from "@renderer/lib/validators/legal-person-validator"
import { LegalPersonDataSheet, RegistrationOffice } from "@shared/types"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"

const EditLegalPersonPage = () => {
  const [legalPerson, setLegalPerson] = useState<LegalPersonDataSheet | null>(null)

  const { id } = useParams()
  const legalPersonId = Number(id)
  const { updateLegalPerson } = useLegalPersons()
  const navigate = useNavigate()

  const form = useForm<LegalPersonSchema>({
    resolver: zodResolver(zodLegalPersonSchema)
  })

  useEffect(() => {
    const getLegalPerson = async () => {
      const res: LegalPersonDataSheet | null =
        await window.legalPersonAPI.getLegalPersonById(legalPersonId)
      if (res) {
        setLegalPerson(res)
        form.reset({
          businessName: res.businessName ?? "",
          CUIT: res.CUIT ?? 0,
          legalAddress: res.legalAddress ?? "",
          mainActivity: res.mainActivity ?? "",
          instrumentOfConstitution: res.instrumentOfConstitution ?? "",
          registrationDate: res.registrationDate ?? new Date(),
          registrationOffice: res.registrationOffice ?? undefined,
          registeredOfficePhone: res.registeredOfficePhone ?? 0,
          registeredOfficeAddress: res.registeredOfficeAddress ?? "",
          registeredOfficeEmail: res.registeredOfficeEmail ?? "",
          statuteCopy: res.statuteCopy ?? "",
          proceedingsCopy: res.proceedingsCopy ?? "",
          balanceCopy: res.balanceCopy ?? "",
          representativeData: res.representativeData ?? "",
          enrollment: res.enrollment ?? "",
          file: res.file ?? ""
        })
      }
    }

    getLegalPerson()
  }, [])

  const editLegalPerson = async (data: LegalPersonSchema) => {
    try {
      const res = await window.legalPersonAPI.updateLegalPerson({ id: legalPersonId, ...data })

      if (res) {
        updateLegalPerson(legalPersonId, res)
        navigate("/legal-persons")
        toast({
          title: "Ficha editada.",
          description: "La ficha de persona jurídica ha sido editada correctamente.",
          action: (
            <ToastAction altText="Ver" onClick={() => navigate(`/legal-person/${legalPersonId}`)}>
              Ver
            </ToastAction>
          )
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error editando la ficha de datos personales."
      })
    }
  }

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
              <Link to="/legal-persons">Lista de personas jurídicas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Editar persona jurídica</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageTitle>Editar persona jurídica</PageTitle>

      {legalPerson && (
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(editLegalPerson)}>
              <CardHeader>
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <CardTitle>Persona jurídica</CardTitle>
                    <CardDescription>
                      Formulario para editar ficha de persona jurídica
                    </CardDescription>
                  </div>
                  {legalPerson && (
                    <LegalPersonActions
                      legalPerson={legalPerson}
                      showView
                      showActivity
                      showExport
                      showDelete
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Razón social</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormDescription>Ingresa la razón social.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="CUIT"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>CUIT</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormDescription>Ingresa el CUIT.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="legalAddress"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Domicilio legal</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormDescription>Ingresa el domicilio legal.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mainActivity"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Actividad principal</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormDescription>Ingresa la actividad principal.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instrumentOfConstitution"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Instrumento de Constitución</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormDescription>Ingresa el instrumento de constitución.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registrationDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha de inscripción</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="date"
                            value={
                              field.value instanceof Date
                                ? field.value.toISOString().split("T")[0]
                                : field.value
                            }
                            disabled={form.formState.isSubmitting}
                          />
                        </FormControl>
                        <FormDescription>Selecciona la fecha de ingreso.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registrationOffice"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Lugar de inscripción</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value?.toString() || "false"}
                          disabled={form.formState.isSubmitting}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.entries(RegistrationOffice).map(([key, value]) => (
                              <SelectItem key={key} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>Selecciona el lugar de inscripción.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registeredOfficePhone"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Teléfono de la sede social</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormDescription>Ingresa el teléfono de la sede social.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registeredOfficeAddress"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Domicilio de la sede social</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormDescription>Ingresa el domicilio de la sede social.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registeredOfficeEmail"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Email de la sede social</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormDescription>Ingresa el email de la sede social.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="statuteCopy"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Copia del estatuto</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormDescription>Ingresa la copia del estatuto.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="proceedingsCopy"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Copia de las actas</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormDescription>Ingresa la copia de las actas.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="balanceCopy"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Copia del balance</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormDescription>Ingresa la copia del balance.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="representativeData"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Datos del representante</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormDescription>Ingresa los datos del representante.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="enrollment"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Matrícula</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormDescription>Ingresa la matrícula.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Legajo</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                        </FormControl>
                        <FormDescription>Ingresa el legajo.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  Crear
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}
    </div>
  )
}

export default EditLegalPersonPage
