import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@renderer/components/ui/accordion"
import { Button } from "@renderer/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
import { format } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import { Edit, MoreHorizontal, PlusIcon } from "lucide-react"
import { Link } from "react-router-dom"
import { useActivities } from "./activities-provider"
import DeleteActivity from "./dashboard/lists/activities/actions/item-actions/delete-activity"
import { toast } from "./ui/use-toast"

type ActivitiesCardProp = {
  isPerson: boolean
  id: number
}

const ActivitiesCard = ({ isPerson, id }: ActivitiesCardProp) => {
  const { activities } = useActivities()

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
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="space-y-2">
            <CardTitle>Actividades</CardTitle>
            <CardDescription>Historial de actividades</CardDescription>
          </div>
          <Button asChild>
            <Link to={`/create-activity/${isPerson ? "person" : "legal-person"}/${id}`}>
              <PlusIcon className="w-4 h-4 mr-2" />
              Agregar
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {activities.length ? (
          <Accordion type="single" collapsible>
            {activities
              .filter((activity) =>
                isPerson ? activity.person_id === id : activity.legal_person_id === id
              )
              .map((activity) => (
                <AccordionItem key={activity.id} value={`item-${activity.id}`}>
                  <AccordionTrigger>
                    <div className="space-x-5">
                      <span>
                        {activity.date
                          ? format(toZonedTime(activity.date, "UTC"), "dd/MM/yyyy")
                          : "N/A"}
                      </span>

                      <span>{activity.act}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-between items-center">
                      <div className="relative w-5/6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <div className="grid gap-1 self-start">
                          <p className="text-sm font-medium leading-none">Fecha</p>
                          <p className="text-sm text-muted-foreground">
                            <span>
                              {activity.date
                                ? format(toZonedTime(activity.date, "UTC"), "dd/MM/yyyy")
                                : "N/A"}
                            </span>
                          </p>
                        </div>
                        <div className="grid gap-1 self-start">
                          <p className="text-sm font-medium leading-none">Acto</p>
                          <p className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                            {activity.act ? activity.act : "-"}
                          </p>
                        </div>
                        <div className="grid gap-1 self-start">
                          <p className="text-sm font-medium leading-none">Factura</p>
                          {activity.bill && activity.bill.length > 0 ? (
                            activity.bill.map((fileName, index) => (
                              <Button
                                key={index}
                                variant="link"
                                className="justify-start items-start p-0"
                                onClick={() => openFile(fileName)}
                              >
                                <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                                  {fileName}
                                </span>
                              </Button>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                              -
                            </span>
                          )}
                        </div>
                        <div className="grid gap-1 self-start">
                          <p className="text-sm font-medium leading-none">Observaciones</p>
                          <p className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                            {activity.observations ? activity.observations : "-"}
                          </p>
                        </div>
                        <div className="grid gap-1 self-start">
                          <p className="text-sm font-medium leading-none">Archivos adjuntos</p>
                          {activity.attachedFiles && activity.attachedFiles.length > 0 ? (
                            activity.attachedFiles.map((fileName, index) => (
                              <Button
                                key={index}
                                variant="link"
                                className="justify-start items-start p-0"
                                onClick={() => openFile(fileName)}
                              >
                                <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                                  {fileName}
                                </span>
                              </Button>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground max-w-full overflow-hidden text-ellipsis break-words">
                              -
                            </span>
                          )}
                        </div>
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
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <DeleteActivity activity={activity} />
                          </DropdownMenuItem>
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
  )
}

export default ActivitiesCard
