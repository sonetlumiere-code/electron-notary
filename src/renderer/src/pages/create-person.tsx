import { zodResolver } from "@hookform/resolvers/zod"
import PageTitle from "@renderer/components/page-title"
import { usePersons } from "@renderer/components/persons-provider"
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
import { Textarea } from "@renderer/components/ui/textarea"
import { ToastAction } from "@renderer/components/ui/toast"
import { toast } from "@renderer/components/ui/use-toast"
import { PersonSchema, zodPersonSchema } from "@renderer/lib/validators/person-validator"
import {
  DocumentType,
  ElectronFile,
  Gender,
  MaritalRegime,
  MaritalStatus,
  PersonDataSheet
} from "@shared/types"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

const CreatePersonPage = () => {
  const { addPersons } = usePersons()
  const navigate = useNavigate()

  const form = useForm<PersonSchema>({
    resolver: zodResolver(zodPersonSchema),
    defaultValues: {
      name: "",
      lastName: "",
      gender: undefined,
      nationality: "",
      documentType: undefined,
      documentNumber: 0,
      document: undefined,
      affidavit: undefined,
      judgment: undefined,
      attachedFile: undefined,
      CUIT_L: 0,
      birthdate: undefined,
      birthplace: "",
      maritalStatus: undefined,
      fatherName: "",
      motherName: "",
      spouseName: "",
      marriageNumber: 0,
      marriageRegime: undefined,
      divorceSpouseName: "",
      divorceDate: undefined,
      divorceCourt: "",
      divorce: "",
      widowNumber: 0,
      numberOfChildren: 0,
      address: "",
      city: "",
      profession: "",
      phoneNumber: 0,
      mobileNumber: 0,
      email: "",
      isPoliticallyExposed: false,
      politicalPosition: "",
      originOfFunds: "",
      referredBy: ""
    }
  })

  const createPerson = async (data: PersonSchema) => {
    const dataToSend: PersonDataSheet = { ...data }

    const fileInputs = ["document", "affidavit", "judgment", "attachedFile"]

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
      const res: PersonDataSheet | null = await window.personAPI.createPerson(dataToSend)
      if (res) {
        addPersons([res])
        navigate("/persons")
        toast({
          title: "Nueva ficha creada.",
          description: "La ficha de datos personales ha sido creada correctamente.",
          action: (
            <ToastAction altText="Ver" onClick={() => navigate(`/person/${res.id}`)}>
              Ver
            </ToastAction>
          )
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error creando la ficha de datos personales."
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
              <Link to="/persons">Lista de personas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Crear ficha de persona</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageTitle>Crear ficha de persona</PageTitle>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createPerson)}>
            <CardHeader>
              <CardTitle>Ficha de persona</CardTitle>
              <CardDescription>Formulario para crear nueva ficha de persona</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el nombre.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Apellido</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el apellido.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Sexo</FormLabel>
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
                          {Object.entries(Gender).map(([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Selecciona el sexo.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nacionalidad</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa la nacionalidad.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tipo de documento</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={form.formState.isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(DocumentType).map(([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Selecciona el tipo de documento.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="documentNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Número de Documento</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el número de documento.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="CUIT_L"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>CUIT o CUIL</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el CUIT_L.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthdate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de nacimiento</FormLabel>
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
                      <FormDescription>Selecciona la fecha de nacimiento.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthplace"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Lugar de Nacimiento</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el lugar de nacimiento.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Estado Civil</FormLabel>
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
                          {Object.entries(MaritalStatus).map(([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Selecciona el estado civil.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nombre del padre</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el nombre del padre.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="motherName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nombre de la madre</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el nombre de la madre.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marriageNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Número de Núpcias</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el número de núpcias.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="spouseName"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Nombre del Cónyuge</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el nombre del cónyuge.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marriageRegime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Régimen matrimonial</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={form.formState.isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(MaritalRegime).map(([key, value]) => (
                            <SelectItem key={key} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Selecciona el régimen matrimonial.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="divorceDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de sentencia</FormLabel>
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
                      <FormDescription>Selecciona la fecha de sentencia.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="divorceCourt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Juzgado de Divorcio</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el juzgado de divorcio.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="divorce"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Carátula</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Carátula.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfChildren"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Cantidad de Hijos</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa la cantidad de hijos.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Dirección</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa la dirección.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Ciudad</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa la ciudad.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Profesión</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa la profesión.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el teléfono.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Móvil</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el número móvil.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el email.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isPoliticallyExposed"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>¿Es Persona Políticamente Expuesta?</FormLabel>
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(value === "true")}
                        disabled={form.formState.isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[
                            { key: "Si", value: true },
                            { key: "No", value: false }
                          ].map(({ key, value }) => (
                            <SelectItem key={key} value={value.toString()}>
                              {key}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Selecciona si la persona es políticamente expuesta.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="politicalPosition"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Cargo Político</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el cargo político.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="originOfFunds"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Origen de Fondos</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el origen de fondos.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="referredBy"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Referido por</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa la persona que refirió.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="observations"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Observaciones</FormLabel>
                      <FormControl>
                        <Textarea {...field} disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa las observaciones.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="document"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Documento</FormLabel>
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
                  name="affidavit"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Declaración jurada</FormLabel>
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
                  name="judgment"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Sentencia</FormLabel>
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

export default CreatePersonPage
