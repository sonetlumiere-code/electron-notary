import { User } from 'src/types'

export interface IElectronAPI {
  createUser: (user: User) => Promise<void>
  createUserWithReply: ({ name: string, email: string }) => Promise<User>
  getUsers: () => Promise<User[]>
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
