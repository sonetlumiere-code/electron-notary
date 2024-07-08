import { z } from "zod"

export const zodActivitySchema = z.object({
  date: z.date({ message: "Ingresa la fecha." }),
  act: z.string().min(1, { message: "Ingresa el acto." }),
  observations: z.string().optional(),
  attachedFile: z.string().optional()
})

export type ActivitySchema = z.infer<typeof zodActivitySchema>
