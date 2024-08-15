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
          bill: res.bill ?? "",
          observations: res.observations ?? "",
          attachedFiles: res.attachedFiles ?? ""
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

    const fileInputs = ["bill", "attachedFiles"]

    // const files =
    //   data.attachedFiles instanceof FileList
    //     ? (Array.from(data.attachedFiles) as ElectronFile[])
    //     : []

    // if (files.length > 0) {
    //   try {
    //     const results = await window.electronAPI.saveFiles(
    //       files.map((file) => ({ filePath: file.path, fileName: file.name }))
    //     )
    //     const failedFiles = results.filter((result) => result.status !== "success")

    //     if (failedFiles.length > 0) {
    //       toast({
    //         variant: "destructive",
    //         title: "Error guardando archivo(s)."
    //       })
    //       return
    //     }

    //     dataToSend.attachedFiles = results.map((result) => result.fileName || "")
    //   } catch (error) {
    //     console.error("Error saving files:", error)
    //     toast({
    //       variant: "destructive",
    //       title: "Error guardando archivo(s)."
    //     })
    //     return
    //   }
    // }

    for (const input of fileInputs) {
      const files =
        data[input] instanceof FileList ? (Array.from(data[input]) as ElectronFile[]) : []

      if (files.length > 0) {
        const fileNames: string[] = []
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

            fileNames.push(result[0].fileName || "")
          } catch (error) {
            console.error("Error saving file:", error)
            toast({
              variant: "destructive",
              title: "Error guardando archivo."
            })
            return
          }
        }
        dataToSend[input] = fileNames
      }
    }

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
                  <CardTitle>Editar Actividad</CardTitle>
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

                  <FormField
                    control={form.control}
                    name="bill"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Factura</FormLabel>
                        <FormControl>
                          <Input
                            {...fieldProps}
                            type="file"
                            onChange={(event) => onChange(event.target.files && event.target.files)}
                          />
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
                      <FormItem className="flex flex-col">
                        <FormLabel>Archivos adjuntos</FormLabel>
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
