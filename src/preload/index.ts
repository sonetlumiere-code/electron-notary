// import { electronAPI } from '@electron-toolkit/preload'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

// Custom APIs for renderer
const api = {
  createUser: ({ name }: { name: string }) => ipcRenderer.send('create-user', { name }),
  createUserWithReply: ({ name }: { name: string }) =>
    ipcRenderer.invoke('create-user-with-reply', { name })
}

try {
  contextBridge.exposeInMainWorld('electronApi', api)
} catch (error) {
  console.error(error)
}
