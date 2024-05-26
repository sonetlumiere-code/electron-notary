import { LegalPersonDataSheet, PersonDataSheet } from "src/main/types"

export interface electronAPI {
  selectDirectory: () => Promise<string>
}

export interface personAPI {
  createPerson: (person: PersonDataSheet) => Promise<PersonDataSheet | null>
  getPersons: () => Promise<PersonDataSheet[] | null>
  getPersonById: (id: number) => Promise<PromiseDataSheet | null>
  searchPersons: (filters: Partial<PersonDataSheet>) => Promise<PersonDataSheet[] | null>
  updatePerson: (person: PersonDataSheet) => Promise<PersonDataSheet | null>
  deletePerson: (id: number) => Promise<number | null>
  importPersons: () => Promise<PersonDataSheet[]>
  exportPersons: (params: { directory: string; fileName: string }) => Promise<string>
  bulkExportPersons: (params: { ids: number[]; directory: string }) => Promise<string>
  bulkDeletePersons: (ids: number[]) => Promise<number[] | null>
}

export interface legalPersonAPI {
  createLegalPerson: (legalPerson: LegalPersonDataSheet) => Promise<LegalPersonDataSheet | null>
  getLegalPersons: () => Promise<LegalPersonDataSheet[] | null>
}

declare global {
  interface Window {
    electronAPI: electronAPI
    personAPI: personAPI
    legalPersonAPI: legalPersonAPI
  }
}
