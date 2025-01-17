export enum DocumentType {
  DNI = "DNI",
  LC = "LC",
  LE = "LE",
  PASAPORTE = "Pasaporte",
  OTRO = "Otro"
}

export enum MaritalStatus {
  SOLTERO = "Soltero",
  CASADO = "Casado",
  DIVORCIADO = "Divorciado",
  VIUDO = "Viudo"
}

export enum Gender {
  MASCULINO = "Masculino",
  FEMENINO = "Femenino",
  OTRO = "Otro"
}

export enum MaritalRegime {
  COMUNITY_OF_PROFIT = "Régimen de comunidad de ganancias",
  SEPARATION_OF_PROPERTY = "Régimen de separación de bienes"
}

export interface PersonDataSheet {
  id?: number
  name?: string
  lastName?: string
  gender?: Gender
  nationality?: string
  documentType?: DocumentType
  documentNumber?: number
  CUIT_L?: number
  birthdate?: Date
  birthplace?: string
  maritalStatus?: MaritalStatus
  fatherName?: string
  motherName?: string
  spouseName?: string
  marriageNumber?: number
  marriageRegime?: MaritalRegime
  divorceSpouseName?: string
  divorceDate?: Date
  divorceCourt?: string
  divorce?: string
  widowNumber?: number
  numberOfChildren?: number
  address?: string
  city?: string
  profession?: string
  phoneNumber?: number
  mobileNumber?: number
  email?: string
  isPoliticallyExposed?: boolean
  politicalPosition?: string
  originOfFunds?: string
  referredBy?: string
  observations?: string
  document?: string
  affidavit?: string
  judgment?: string
  attachedFile?: string
}

export enum RegistrationOffice {
  DPPJ = "DPPJ",
  IGJ = "IGJ"
}

export interface LegalPersonDataSheet {
  id?: number
  businessName?: string
  CUIT?: number
  legalAddress?: string
  mainActivity?: string
  instrumentOfConstitution?: string
  registrationDate?: Date
  registrationOffice?: RegistrationOffice
  registeredOfficePhone?: number
  registeredOfficeAddress?: string
  registeredOfficeEmail?: string
  statuteCopy?: string
  proceedingsCopy?: string
  balanceCopy?: string
  attachedFile?: string
  representativeData?: string
  enrollment?: string
  file?: string
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

export interface Activity {
  id?: number
  date?: Date
  act?: string
  bill?: string[]
  observations?: string
  attachedFiles?: string[]
  person_id?: number
  legal_person_id?: number
}

export type ElectronFile = File & {
  path: string
}
