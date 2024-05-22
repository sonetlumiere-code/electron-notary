import { DocumentType, MaritalStatus } from "@shared/types"
import { z } from "zod"

export const zodPersonSchema = z.object({
  id: z.number().optional(),
  name: z.string().trim().min(1, { message: "Ingresa el nombre." }),
  lastName: z.string().trim().min(1, { message: "Ingresa el apellido." }),
  gender: z.string().trim().min(1, { message: "Ingresa el género." }),
  nationality: z.string().trim().min(1, { message: "Ingresa la nacionalidad." }),
  // documentType: z.enum(["DNI", "LC", "LE", "PASAPORTE"]),
  documentType: z.nativeEnum(DocumentType, {
    errorMap: () => ({
      message: "Selecciona el tipo de documento."
    })
  }),
  documentNumber: z.number(),
  CUIT_L: z.number(),
  birthdate: z.date({ required_error: "Ingresa la fecha de nacimiento." }),
  birthplace: z.string().trim().min(1, { message: "Ingresa el lugar de nacimiento." }),
  // maritalStatus: z.enum(["SOLTERO", "CASADO", "DIVORCIADO", "VIUDO"]),
  maritalStatus: z.nativeEnum(MaritalStatus, {
    errorMap: () => ({
      message: "Selecciona el estado marital."
    })
  }),
  spouseName: z.string().trim().optional(),
  spouseNumber: z.number().optional(),
  marriageRegime: z.string().trim().optional(),
  divorceNumber: z.number().optional(),
  divorceDate: z.date().optional(),
  divorceCourt: z.string().trim().optional(),
  divorceAutos: z.string().trim().optional(),
  deceasedSpouseName: z.string().trim().optional(),
  numberOfChildren: z.number().optional(),
  address: z.string().trim().min(1, { message: "Ingresa la dirección." }),
  city: z.string().trim().min(1, { message: "Ingresa la ciudad." }),
  province: z.string().trim().min(1, { message: "Ingresa la provincia." }),
  profession: z.string().trim().min(1, { message: "Ingresa la profesión." }),
  phoneNumber: z.string().trim().min(1, { message: "Ingresa el número de teléfono." }),
  mobileNumber: z.string().trim().min(1, { message: "Ingresa el número de móvil." }),
  email: z.string().email({ message: "Ingresa un correo electrónico válido." }),
  isPoliticallyExposed: z.boolean().optional(),
  politicalPosition: z.string().trim().optional(),
  originOfFunds: z.string().trim().optional(),
  reasonForChoosing: z.string().trim().optional(),
  referredBy: z.string().trim().optional()
})

export type PersonSchema = z.infer<typeof zodPersonSchema>
