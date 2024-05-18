import { User } from '@prisma/client'

export interface IElectronAPI {
  createUser: ({ name: string }) => Promise<void>
  createUserWithReply: ({ name: string }) => Promise<string>
  getUsers: () => Promise<User[]>
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
