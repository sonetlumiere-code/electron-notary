import { zodResolver } from "@hookform/resolvers/zod"
import { useActivities } from "@renderer/components/activities-provider"
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
import { Textarea } from "@renderer/components/ui/textarea"
import { toast } from "@renderer/components/ui/use-toast"
import { ActivitySchema, zodActivitySchema } from "@renderer/lib/validators/activity-validator"
import { Activity, ElectronFile } from "@shared/types"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"

const CreateActivityPage = () => {
  const { id } = useParams()
  const { addActivities } = useActivities()
  const location = useLocation()
  const navigate = useNavigate()

  const isPerson = location.pathname.includes("/create-activity/person")

  const form = useForm<ActivitySchema>({
    resolver: zodResolver(zodActivitySchema),
    defaultValues: {
      date: new Date(),
      act: "",
      observations: "",
      attachedFiles: undefined
    }
  })

  const createActivity = async (data: ActivitySchema) => {
    const dataToSend: Activity = { ...data }

    dataToSend[isPerson ? "person_id" : "legal_person_id"] = Number(id)

    const files =
      data.attachedFiles instanceof FileList
        ? (Array.from(data.attachedFiles) as ElectronFile[])
        : []

    let fileNames: string[] = []

    if (files.length > 0) {
      try {
        const results = await window.electronAPI.saveFiles(
          files.map((file) => ({ filePath: file.path, fileName: file.name }))
        )
        const failedFiles = results.filter((result) => result.status !== "success")

        if (failedFiles.length > 0) {
          toast({
            variant: "destructive",
            title: "Error guardando archivo(s)."
          })
          return
        }

        fileNames = results.map((result) => result.fileName || "")
      } catch (error) {
        console.error("Error saving files:", error)
        toast({
          variant: "destructive",
          title: "Error guardando archivo(s)."
        })
        return
      }
    }

    dataToSend.attachedFiles = fileNames

    try {
      const res: Activity | null = await window.activityAPI.createActivity(dataToSend)

      if (res) {
        addActivities([res])
        if (isPerson) {
          navigate(`/person/${id}`)
        } else {
          navigate(`/legal-person/${id}`)
        }
        toast({
          title: "Nuevo acto creado.",
          description: "El acto ha sido creada correctamente."
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error creando el acto."
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
            <Link to="/activities">Lista de actividades</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Agregar actividad</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageTitle>Agregar actividad</PageTitle>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createActivity)}>
            <CardHeader>
              <div className="space-y-2">
                <CardTitle>Agregar Actividad</CardTitle>
                <CardDescription>
                  Formulario para crear actividad de {isPerson ? "persona" : "persona jurídica"}{" "}
                  <Link to={`/${isPerson ? "person" : "legal-person"}/${id}`}>{`#${id}`}</Link>
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha</FormLabel>
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
                      <FormDescription>Selecciona la fecha de acto.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="act"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Acto</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el acto.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bill"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Factura</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa la factura.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="attachedFiles"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <FormItem>
                      <FormLabel>Archivo adjunto</FormLabel>
                      <FormControl>
                        <Input
                          {...fieldProps}
                          type="file"
                          multiple
                          onChange={(event) => onChange(event.target.files && event.target.files)}
                        />
                      </FormControl>
                      <FormDescription>Selecciona archivos.</FormDescription>
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
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Agregar
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default CreateActivityPage
