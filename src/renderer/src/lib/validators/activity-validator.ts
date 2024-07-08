import { z } from "zod"

export const zodActivitySchema = z.object({
  date: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message: issue.code === "invalid_date" ? "Ingresa la fecha." : defaultError
    })
  }),
  act: z.string().min(1, { message: "Ingresa el acto." }),
  observations: z.string().optional(),
  attachedFile: z.any()
})

export type ActivitySchema = z.infer<typeof zodActivitySchema>
