import { z } from "zod"

export const zodActivitySchema = z.object({
  date: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message: issue.code === "invalid_date" ? "Ingresa la fecha." : defaultError
      })
    })
    .optional(),
  act: z.string().min(1, { message: "Ingresa el acto." }).optional(),
  bill: z.any().optional(),
  observations: z.string().optional(),
  attachedFiles: z.any().optional()
})

export type ActivitySchema = z.infer<typeof zodActivitySchema>
