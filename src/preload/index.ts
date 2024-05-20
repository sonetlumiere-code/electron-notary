// import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'
import { User } from '../main/types'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

// Custom APIs for renderer
const api = {
  createUser: (user: User) => ipcRenderer.send('create-user', user),

  createUserWithReply: (user: User) => ipcRenderer.invoke('create-user-with-reply', user),

  getUsers: () => ipcRenderer.invoke('get-users')
}

try {
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}
