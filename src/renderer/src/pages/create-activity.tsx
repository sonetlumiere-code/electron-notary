import { zodResolver } from "@hookform/resolvers/zod"
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
import { Calendar } from "@renderer/components/ui/calendar"
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
import { Popover, PopoverContent, PopoverTrigger } from "@renderer/components/ui/popover"
import { Textarea } from "@renderer/components/ui/textarea"
import { toast } from "@renderer/components/ui/use-toast"
import { cn } from "@renderer/lib/utils"
import { ActivitySchema, zodActivitySchema } from "@renderer/lib/validators/activity-validator"
import { Activity } from "@shared/types"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"

const CreateActivityPage = () => {
  const { id } = useParams()
  const location = useLocation()

  const isPerson = location.pathname.includes("/create-activity/person")

  const navigate = useNavigate()

  const form = useForm<ActivitySchema>({
    resolver: zodResolver(zodActivitySchema),
    defaultValues: {
      date: new Date(),
      act: ""
    }
  })

  const createActivity = async (data: ActivitySchema) => {
    const dataToSend: Activity = { ...data }

    if (isPerson) {
      dataToSend.person_id = Number(id)
    } else {
      dataToSend.legal_person_id = Number(id)
    }

    try {
      const res: Activity | null = await window.activityAPI.createActivity(dataToSend)

      if (res) {
        if (isPerson) {
          navigate(`/person/${id}`)
        } else {
          navigate(`/legal-person/${id}`)
        }
        toast({
          title: "Nueva acta creada.",
          description: "El acta ha sido creada correctamente."
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error creando el acta."
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
            <BreadcrumbPage>Crear actividad</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageTitle>Crear actividad</PageTitle>

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createActivity)}>
            <CardHeader>
              <div className="space-y-2">
                <CardTitle>Actividad</CardTitle>
                <CardDescription>
                  Formulario para crear actividad de {isPerson ? "persona" : "persona jurídica"}
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
                      <Popover>
                        <PopoverTrigger asChild disabled={form.formState.isSubmitting}>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal hover:border-ring",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>Selecciona una fecha.</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            // disabled={(date) => date > new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Selecciona la fecha de acta.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="act"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Acta</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Ingresa el acta.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="attachedFile"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Archivo adjunto</FormLabel>
                      <FormControl>
                        <Input {...field} type="file" disabled={form.formState.isSubmitting} />
                      </FormControl>
                      <FormDescription>Adjunta un archivo.</FormDescription>
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
                Crear
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default CreateActivityPage
