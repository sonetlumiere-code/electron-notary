import { z } from "zod"

export const zodAuthSchema = z.object({
  username: z.string().min(1, { message: "Ingresa el usuario." }),
  password: z.string().min(1, { message: "Ingresa la contraseña" })
})

export type AuthSchema = z.infer<typeof zodAuthSchema>
