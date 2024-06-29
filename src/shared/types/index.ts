export enum DocumentType {
  DNI = "DNI",
  LC = "LC",
  LE = "LE",
  PASAPORTE = "PASAPORTE",
  OTROS = "OTROS"
}

export enum MaritalStatus {
  SOLTERO = "SOLTERO",
  CASADO = "CASADO",
  DIVORCIADO = "DIVORCIADO",
  VIUDO = "VIUDO"
}

export enum Gender {
  MASCULINO = "MASCULINO",
  FEMENINO = "FEMENINO",
  OTRO = "OTRO"
}

export interface PersonDataSheet {
  id?: number
  name: string
  lastName: string
  gender: Gender
  nationality: string
  documentType: DocumentType
  documentNumber: number
  CUIT_L: number
  birthdate: Date
  birthplace: string
  maritalStatus: MaritalStatus
  fatherName?: string
  motherName?: string
  spouseName?: string
  marriageNumber?: number
  marriageRegime?: string
  divorceNumber?: number
  divorceSpouseName?: string
  divorceDate?: Date
  divorceCourt?: string
  divorceAutos?: string
  widowNumber?: number
  deceasedSpouseName?: string
  numberOfChildren?: number
  address: string
  city: string
  profession: string
  phoneNumber: number
  mobileNumber: number
  email: string
  isPoliticallyExposed?: boolean
  politicalPosition?: string
  originOfFunds?: string
  reasonForChoosing?: string
  referredBy?: string
}

export type LegalPersonDataSheet = {
  id?: number
  businessName: string
  CUIT: number
  legalAddress: string
  mainActivity: string
  instrumentOfConstitution: string
  registrationDate: Date
  registrationNumber: number
  registeredOfficePhone: number
  registeredOfficeAddress: string
  registeredOfficeEmail: string
  statuteCopy: string
  proceedingsCopy: string
  balanceCopy: string
  representativeData: string
}

export enum FileFormat {
  JSON = "json",
  CSV = "csv",
  WORD = "word"
}

export type User = {
  id: number
  username: string
  password: string
}
