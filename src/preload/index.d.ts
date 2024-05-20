import { User } from 'src/types'

export interface IElectronAPI {
  createUser: (User) => Promise<void>
  createUserWithReply: ({ name: string }) => Promise<string>
  getUsers: () => Promise<User[]>
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
