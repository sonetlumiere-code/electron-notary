import { DocumentType, Gender, MaritalStatus } from "@shared/types"
import { z } from "zod"

export const zodPersonSchema = z.object({
  name: z.string().min(1, { message: "Ingresa el nombre." }),
  lastName: z.string().trim().min(1, { message: "Ingresa el apellido." }),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({
      message: "Selecciona el género."
    })
  }),
  nationality: z.string().trim().min(1, { message: "Ingresa la nacionalidad." }),
  documentType: z.nativeEnum(DocumentType, {
    errorMap: () => ({
      message: "Selecciona el tipo de documento."
    })
  }),
  documentNumber: z.coerce.number().min(1, { message: "Ingresa el número de documento." }),
  CUIT_L: z.coerce.number().min(1, { message: "Ingresa el CUIT o CUIL." }),
  birthdate: z.date({ required_error: "Ingresa la fecha de nacimiento." }),
  birthplace: z.string().trim().min(1, { message: "Ingresa el lugar de nacimiento." }),
  maritalStatus: z.nativeEnum(MaritalStatus, {
    errorMap: () => ({
      message: "Selecciona el estado marital."
    })
  }),
  maritalStatusSpouseName: z.string().trim().optional(),
  maritalStatusSpouseNumber: z.coerce.number().optional(),
  maritalStatusMarriageRegime: z.string().trim().optional(),
  maritalStatusDivorceNumber: z.coerce.number().optional(),
  maritalStatusDivorceDate: z.date().optional(),
  maritalStatusDivorceCourt: z.string().trim().optional(),
  maritalStatusDivorceAutos: z.string().trim().optional(),
  maritalStatusDeceasedSpouseName: z.string().trim().optional(),
  numberOfChildren: z.coerce.number().optional(),
  address: z.string().trim().min(1, { message: "Ingresa la dirección." }),
  city: z.string().trim().min(1, { message: "Ingresa la ciudad." }),
  profession: z.string().trim().min(1, { message: "Ingresa la profesión." }),
  phoneNumber: z.coerce.number().min(1, { message: "Ingresa el número de teléfono." }),
  mobileNumber: z.coerce.number().min(1, { message: "Ingresa el número de móvil." }),
  email: z.string().email({ message: "Ingresa un correo electrónico válido." }),
  isPoliticallyExposed: z.boolean(),
  politicalPosition: z.string().trim().optional(),
  originOfFunds: z.string().trim().optional(),
  reasonForChoosing: z.string().trim().optional(),
  referredBy: z.string().trim().optional()
})

export type PersonSchema = z.infer<typeof zodPersonSchema>
