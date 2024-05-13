export interface IElectronAPI {
  createUser: ({ name: string }) => Promise<void>
  createUserWithReply: ({ name: string }) => Promise<string>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
