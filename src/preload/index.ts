import { contextBridge, ipcRenderer } from 'electron'
import { LegalPersonDataSheet, PersonDataSheet, User } from '../shared/types'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

// Custom APIs for renderer
const api = {
  createUserWithReply: (user: User) => ipcRenderer.invoke('create-user', user),
  getUsers: () => ipcRenderer.invoke('get-users'),

  createPerson: (person: PersonDataSheet) => ipcRenderer.invoke('create-person', person),
  getPersons: () => ipcRenderer.invoke('get-persons'),

  createLegalPerson: (legalPerson: LegalPersonDataSheet) =>
    ipcRenderer.invoke('create-legal-person', legalPerson),
  getLegalPersons: () => ipcRenderer.invoke('get-legal-persons')
}

try {
  contextBridge.exposeInMainWorld('api', api)
} catch (error) {
  console.error(error)
}
