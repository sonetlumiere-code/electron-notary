declare global {
  interface Window {
    electronApi: {
      createUser: ({ name: string }) => void
      createUserWithReply: ({ name: string }) => string
    }
  }
}
