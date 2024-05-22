import { LegalPersonDataSheet, PersonDataSheet, User } from "src/main/types"

export interface IElectronAPI {
  createUserWithReply: (user: User) => Promise<User | null>
  getUsers: () => Promise<User[] | null>

  createPerson: (person: PersonDataSheet) => Promise<PersonDataSheet | null>
  getPersons: () => Promise<PersonDataSheet[] | null>
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
