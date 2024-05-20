// import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

// Custom APIs for renderer
const api = {
  createUser: (user: { name: string; email: string }) => ipcRenderer.send('create-user', user),

  createUserWithReply: ({ name }: { name: string }) =>
    ipcRenderer.invoke('create-user-with-reply', { name }),

  getUsers: () => ipcRenderer.invoke('get-users')
}

try {
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}
