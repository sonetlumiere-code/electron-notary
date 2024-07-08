import { RegistrationOffice } from "@shared/types"
import { z } from "zod"

export const zodLegalPersonSchema = z.object({
  businessName: z.string().min(1, { message: "Ingresa la razón social." }),
  CUIT: z.coerce.number().min(1, { message: "Ingresa un CUIT válido." }),
  legalAddress: z.string().min(1, { message: "Ingresa el domicilio legal." }),
  mainActivity: z.string().min(1, { message: "Ingresa la actividad principal." }),
  instrumentOfConstitution: z
    .string()
    .min(1, { message: "Ingresa el instrumento de constitución." }),
  registrationDate: z.coerce.date({
    errorMap: (issue, { defaultError }) => ({
      message:
        issue.code === "invalid_date" ? "Ingresa una fecha de inscripción válida." : defaultError
    })
  }),
  registrationOffice: z.nativeEnum(RegistrationOffice),
  registeredOfficePhone: z.coerce
    .number()
    .min(1, { message: "Ingresa un número de teléfono válido." }),
  registeredOfficeAddress: z
    .string()
    .min(1, { message: "Ingresa el domicilio de la sede social." }),
  registeredOfficeEmail: z.string().email({ message: "Ingresa un correo electrónico válido." }),
  statuteCopy: z.string().min(1, { message: "Ingresa la copia del estatuto." }),
  proceedingsCopy: z.string().min(1, { message: "Ingresa la copia de las actas." }),
  balanceCopy: z.string().min(1, { message: "Ingresa la copia del balance." }),
  representativeData: z.string().min(1, { message: "Ingresa los datos del representante." }),
  enrollment: z.string().min(1, { message: "Ingresa la matrícula." }),
  file: z.string().min(1, { message: "Ingresa el legajo." })
})

export type LegalPersonSchema = z.infer<typeof zodLegalPersonSchema>
