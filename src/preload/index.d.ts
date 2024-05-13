declare global {
  interface Window {
    ipcApi: {
      createUser: ({ name: string }) => void
      createUserWithReply: ({ name: string }) => string
    }
  }
}
