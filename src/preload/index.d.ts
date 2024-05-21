import { LegalPersonDataSheet, PersonDataSheet, User } from 'src/main/types'

export interface IElectronAPI {
  createUserWithReply: (user: User) => Promise<User>
  getUsers: () => Promise<User[] | null>

  createPerson: (person: PersonDataSheet) => Promise<void>
  getPersons: () => Promise<PersonDataSheet[] | null>

  createLegalPerson: (legalPerson: LegalPersonDataSheet) => Promise<void>
  getLegalPersons: () => Promise<LegalPersonDataSheet[] | null>
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
