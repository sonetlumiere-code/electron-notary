import { LegalPersonDataSheet, PersonDataSheet } from "src/main/types"

export interface IElectronAPI {
  createPerson: (person: PersonDataSheet) => Promise<PersonDataSheet | null>
  getPersons: () => Promise<PersonDataSheet[] | null>
  getPersonById: (id: number) => Promise<PromiseDataSheet | null>
  searchPersons: (filters: Partial<PersonDataSheet>) => Promise<PersonDataSheet[] | null>
  deletePerson: (id: number) => Promise<number | null>

  createLegalPerson: (legalPerson: LegalPersonDataSheet) => Promise<LegalPersonDataSheet | null>
  getLegalPersons: () => Promise<LegalPersonDataSheet[] | null>
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
