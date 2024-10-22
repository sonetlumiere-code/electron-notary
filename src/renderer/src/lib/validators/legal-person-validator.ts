import { RegistrationOffice } from "@shared/types"
import { z } from "zod"

export const zodLegalPersonSchema = z.object({
  businessName: z.string().min(1, { message: "Ingresa la razón social." }).optional(),
  CUIT: z.coerce.number().min(1, { message: "Ingresa un CUIT válido." }).optional(),
  legalAddress: z.string().min(1, { message: "Ingresa el domicilio legal." }).optional(),
  mainActivity: z.string().min(1, { message: "Ingresa la actividad principal." }).optional(),
  instrumentOfConstitution: z
    .string()
    .min(1, { message: "Ingresa el instrumento de constitución." })
    .optional(),
  registrationDate: z.coerce
    .date({
      errorMap: (issue, { defaultError }) => ({
        message:
          issue.code === "invalid_date" ? "Ingresa una fecha de inscripción válida." : defaultError
      })
    })
    .optional(),
  registrationOffice: z
    .nativeEnum(RegistrationOffice, {
      errorMap: () => ({
        message: "Selecciona el lugar de inscripción."
      })
    })
    .optional(),
  registeredOfficePhone: z.coerce.number().optional(),
  registeredOfficeAddress: z.string().optional(),
  registeredOfficeEmail: z
    .string()
    .email({ message: "Ingresa un correo electrónico válido." })
    .optional(),
  statuteCopy: z.any().optional(),
  proceedingsCopy: z.any().optional(),
  balanceCopy: z.any().optional(),
  attachedFile: z.any().optional(),
  representativeData: z
    .string()
    .min(1, { message: "Ingresa los datos del representante." })
    .optional(),
  enrollment: z.string().min(1, { message: "Ingresa la matrícula." }).optional(),
  file: z.string().min(1, { message: "Ingresa el legajo." }).optional()
})

export type LegalPersonSchema = z.infer<typeof zodLegalPersonSchema>
