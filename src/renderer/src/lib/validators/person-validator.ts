import { DocumentType, Gender, MaritalRegime, MaritalStatus } from "@shared/types"
import { z } from "zod"

export const zodPersonSchema = z.object({
  name: z.string().min(1, { message: "Ingresa el nombre." }),
  lastName: z.string().trim().min(1, { message: "Ingresa el apellido." }),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({
      message: "Selecciona el sexo."
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
  birthdate: z.date({ message: "Ingresa la fecha de nacimiento." }),
  birthplace: z.string().trim().min(1, { message: "Ingresa el lugar de nacimiento." }),
  maritalStatus: z.nativeEnum(MaritalStatus, {
    errorMap: () => ({
      message: "Selecciona el estado marital."
    })
  }),
  fatherName: z.string().trim().optional(),
  motherName: z.string().trim().optional(),
  spouseName: z.string().trim().optional(),
  marriageNumber: z.coerce.number().optional(),
  marriageRegime: z.nativeEnum(MaritalRegime).optional(),
  divorceSpouseName: z.string().trim().optional(),
  divorceDate: z.date().optional(),
  divorceCourt: z.string().trim().optional(),
  divorceAutos: z.string().trim().optional(),
  widowNumber: z.number().optional(),
  deceasedSpouseName: z.string().trim().optional(),
  numberOfChildren: z.coerce.number().optional(),
  address: z.string().trim().min(1, { message: "Ingresa la dirección." }),
  city: z.string().trim().min(1, { message: "Ingresa la ciudad." }),
  profession: z.string().trim().min(1, { message: "Ingresa la profesión." }),
  phoneNumber: z.coerce.number(),
  mobileNumber: z.coerce.number(),
  email: z.string().email({ message: "Ingresa un correo electrónico válido." }),
  isPoliticallyExposed: z.boolean().optional(),
  politicalPosition: z.string().trim().optional(),
  originOfFunds: z.string().trim().optional(),
  reasonForChoosing: z.string().trim().optional(),
  referredBy: z.string().trim().optional()
})

export type PersonSchema = z.infer<typeof zodPersonSchema>
