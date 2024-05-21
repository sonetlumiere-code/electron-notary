// Define the document type enum
export enum DocumentType {
  DNI = 'DNI',
  LC = 'LC',
  LE = 'LE',
  PASAPORTE = 'PASAPORTE'
}

export enum MaritalStatus {
  SOLTERO = 'SOLTERO',
  CASADO = 'CASADO',
  DIVORCIADO = 'DIVORCIADO',
  VIUDO = 'VIUDO'
}

// export interface MaritalStatusDetails {
//   id?: number
//   spouseName?: string
//   spouseNumber?: number
//   marriageRegime?: string
//   divorceNumber?: number
//   divorceDate?: Date
//   divorceCourt?: string
//   divorceAutos?: string
//   deceasedSpouseName?: string
// }

export interface PersonDataSheet {
  id?: number
  name: string
  lastName: string
  gender: string
  nationality: string
  documentType: DocumentType
  documentNumber: number
  CUIT_L: number
  birthdate: Date
  birthplace: string
  maritalStatus: MaritalStatus
  spouseName?: string
  spouseNumber?: number
  marriageRegime?: string
  divorceNumber?: number
  divorceDate?: Date
  divorceCourt?: string
  divorceAutos?: string
  deceasedSpouseName?: string
  numberOfChildren?: number
  address: string
  city: string
  province: string
  profession: string
  phoneNumber: string
  mobileNumber: string
  email: string
  isPoliticallyExposed?: boolean
  politicalPosition?: string
  originOfFunds?: string
  reasonForChoosing: string
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

export type User = {
  id?: number
  name: string
  email: string
}
