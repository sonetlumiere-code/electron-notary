import { FileFormat, User } from "@shared/types"
import { LegalPersonDataSheet, PersonDataSheet } from "src/main/types"

export interface electronAPI {
  selectDirectory: () => Promise<string>
  selectFile: (params: { fileFormat: FileFormat }) => Promise<string>
}

export interface authAPI {
  logIn: (data: {
    username: string
    password: string
  }) => Promise<{ user?: Partial<User>; error?: string }>
}
export interface personAPI {
  createPerson: (person: PersonDataSheet) => Promise<PersonDataSheet | null>
  getPersons: () => Promise<PersonDataSheet[] | null>
  getPersonById: (id: number) => Promise<PersonDataSheet | null>
  searchPersons: (filters: Partial<PersonDataSheet>) => Promise<PersonDataSheet[] | null>
  updatePerson: (person: PersonDataSheet) => Promise<PersonDataSheet | null>
  deletePersons: (ids: number[]) => Promise<number[] | null>
  importPersons: (filePath: string) => Promise<PersonDataSheet[]>
  exportPersons: (params: {
    directory: string
    ids: number[]
    fileFormat: FileFormat
  }) => Promise<string>
}

export interface legalPersonAPI {
  createLegalPerson: (legalPerson: LegalPersonDataSheet) => Promise<LegalPersonDataSheet | null>
  getLegalPersons: () => Promise<LegalPersonDataSheet[] | null>
  getLegalPersonById: (id: number) => Promise<LegalPersonDataSheet | null>
  searchLegalPersons: (
    filters: Partial<LegalPersonDataSheet>
  ) => Promise<LegalPersonDataSheet[] | null>
  updateLegalPerson: (legalPerson: LegalPersonDataSheet) => Promise<LegalPersonDataSheet | null>
  deleteLegalPersons: (ids: number[]) => Promise<number[] | null>
  importLegalPersons: (filePath: string) => Promise<LegalPersonDataSheet[]>
  exportLegalPersons: (params: {
    directory: string
    ids: number[]
    fileFormat: FileFormat
  }) => Promise<string>
}

declare global {
  interface Window {
    electronAPI: electronAPI
    authAPI: authAPI
    personAPI: personAPI
    legalPersonAPI: legalPersonAPI
  }
}
