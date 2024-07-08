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
import { Label } from "@renderer/components/ui/label"
import { Textarea } from "@renderer/components/ui/textarea"
import { toast } from "@renderer/components/ui/use-toast"
import { ActivitySchema, zodActivitySchema } from "@renderer/lib/validators/activity-validator"
import { Activity, ElectronFile } from "@shared/types"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"

const EditActivityPage = () => {
  const [activity, setActivity] = useState<Activity | null>(null)

  const { id } = useParams()
  const activityId = Number(id)
  const { updateActivity } = useActivities()
  const navigate = useNavigate()

  const form = useForm<ActivitySchema>({
    resolver: zodResolver(zodActivitySchema)
  })

  useEffect(() => {
    const getActivity = async () => {
      const res: Activity | null = await window.activityAPI.getActivityById(activityId)
      if (res) {
        setActivity(res)
        form.reset({
          date: res.date,
          act: res.act,
          observations: res.observations ?? "",
          attachedFile: res.attachedFile ?? ""
        })
      }
    }

    getActivity()
  }, [])

  const editActivity = async (data: ActivitySchema) => {
    const dataToSend: Activity = {
      ...data,
      id: activityId,
      person_id: activity?.person_id,
      legal_person_id: activity?.legal_person_id
    }

    const file =
      data.attachedFile instanceof FileList ? (data.attachedFile[0] as ElectronFile) : null

    if (file) {
      try {
        const result = await window.electronAPI.saveFile(file.path, file.name)
        if (result.status === "success") {
          dataToSend.attachedFile = result.fileName || ""
        } else {
          toast({
            variant: "destructive",
            title: "Error guardando archivo."
          })
          return
        }
      } catch (error) {
        console.error("Error saving file:", error)
        toast({
          variant: "destructive",
          title: "Error guardando archivo."
        })
        return
      }
    }

    console.log(dataToSend)

    try {
      const res = await window.activityAPI.updateActivity(dataToSend)

      if (res) {
        updateActivity(activityId, res)
        navigate("/activities")
        toast({
          title: "Actividad editada.",
          description: "La actividad ha sido editada correctamente."
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error editando la actividad."
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
            <BreadcrumbPage>Editar actividad</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PageTitle>Editar actividad</PageTitle>

      {activity && (
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(editActivity)}>
              <CardHeader>
                <div className="space-y-2">
                  <CardTitle>Actividad</CardTitle>
                  <CardDescription>Formulario para editar actividad</CardDescription>
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

                  <div className="flex flex-col space-y-2 ">
                    <Label>Archivo adjunto</Label>
                    <Input
                      type="file"
                      disabled={form.formState.isSubmitting}
                      {...form.register("attachedFile")}
                    />
                    <FormDescription>Selecciona un archivo.</FormDescription>
                  </div>

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
                  Editar
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      )}
    </div>
  )
}

export default EditActivityPage
