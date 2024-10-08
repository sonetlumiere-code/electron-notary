import { zodResolver } from "@hookform/resolvers/zod"
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
import { ElectronFile, LegalPersonDataSheet, RegistrationOffice } from "@shared/types"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

const CreateLegalPersonPage = () => {
  const { addLegalPersons } = useLegalPersons()
  const navigate = useNavigate()

  const form = useForm<LegalPersonDataSheet>({
    resolver: zodResolver(zodLegalPersonSchema),
    defaultValues: {
      businessName: "",
      CUIT: 0,
      legalAddress: "",
      mainActivity: "",
      instrumentOfConstitution: "",
      registrationDate: undefined,
      registrationOffice: undefined,
      registeredOfficePhone: 0,
      registeredOfficeAddress: "",
      registeredOfficeEmail: "",
      statuteCopy: undefined,
      proceedingsCopy: undefined,
      balanceCopy: undefined,
      attachedFile: undefined,
      representativeData: "",
      enrollment: "",
      file: ""
    }
  })

  const createLegalPerson = async (data: LegalPersonSchema) => {
    const dataToSend: LegalPersonDataSheet = { ...data }

    const fileInputs = ["statuteCopy", "proceedingsCopy", "balanceCopy", "attachedFile"]

    for (const input of fileInputs) {
      const files =
        data[input] instanceof FileList ? (Array.from(data[input]) as ElectronFile[]) : []

      if (files.length > 0) {
        for (const file of files) {
          try {
            const result = await window.electronAPI.saveFiles([
              { filePath: file.path, fileName: file.name }
            ])

            if (result[0].status !== "success") {
              toast({
                variant: "destructive",
                title: `Error guardando archivo: ${file.name}`
              })
              return
            }

            dataToSend[input] = result[0].fileName
          } catch (error) {
            console.error("Error saving file:", error)
            toast({
              variant: "destructive",
              title: "Error guardando archivo."
            })
            return
          }
        }
      }
    }

    try {
      const res: LegalPersonDataSheet | null =
        await window.legalPersonAPI.createLegalPerson(dataToSend)
      if (res) {
        addLegalPersons([res])
        navigate("/legal-persons")
        toast({
          title: "Nueva ficha creada.",
          description: "La ficha de persona jurídica ha sido creada correctamente.",
          action: (
            <ToastAction altText="Ver" onClick={() => navigate(`/legal-person/${res.id}`)}>
              Ver
            </ToastAction>
          )
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error creando la ficha de persona jurídica."
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
            <BreadcrumbPage>Crear ficha de persona jurídica</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageTitle>Crear ficha de persona jurídica</PageTitle>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createLegalPerson)}>
            <CardHeader>
              <CardTitle>Ficha de persona jurídica</CardTitle>
              <CardDescription>
                Formulario para crear nueva ficha de persona jurídica
              </CardDescription>
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
                  name="statuteCopy"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Estatuto</FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps}
                          type="file"
                          onChange={(event) => onChange(event.target.files && event.target.files)}
                        />
                      </FormControl>
                      <FormDescription>Selecciona un archivo.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="proceedingsCopy"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Actas</FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps}
                          type="file"
                          onChange={(event) => onChange(event.target.files && event.target.files)}
                        />
                      </FormControl>
                      <FormDescription>Selecciona un archivo.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="balanceCopy"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Balance</FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps}
                          type="file"
                          onChange={(event) => onChange(event.target.files && event.target.files)}
                        />
                      </FormControl>
                      <FormDescription>Selecciona un archivo.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attachedFile"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Otros</FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps}
                          type="file"
                          onChange={(event) => onChange(event.target.files && event.target.files)}
                        />
                      </FormControl>
                      <FormDescription>Selecciona un archivo.</FormDescription>
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
    </div>
  )
}

export default CreateLegalPersonPage
