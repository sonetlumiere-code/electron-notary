import { contextBridge, ipcRenderer } from "electron"
import { LegalPersonDataSheet, PersonDataSheet } from "../shared/types"

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow")
}

// Custom APIs for renderer
const electronAPI = {
  selectDirectory: () => ipcRenderer.invoke("select-directory")
}

const personAPI = {
  createPerson: (person: PersonDataSheet) => ipcRenderer.invoke("create-person", person),
  getPersons: () => ipcRenderer.invoke("get-persons"),
  getPersonById: (id: number) => ipcRenderer.invoke("get-person-by-id", id),
  searchPersons: (filters: Partial<PersonDataSheet>) =>
    ipcRenderer.invoke("search-persons", filters),
  updatePerson: (person: PersonDataSheet) => ipcRenderer.invoke("update-person", person),
  deletePerson: (id: number) => ipcRenderer.invoke("delete-person", id),
  exportPersons: ({ directory, fileName }: { directory: string; fileName: string }) =>
    ipcRenderer.invoke("export-persons", { directory, fileName }),
  exportPersonsByIds: ({
    directory,
    fileName,
    ids
  }: {
    directory: string
    fileName: string
    ids: number[]
  }) => ipcRenderer.invoke("export-persons-by-ids", { directory, fileName, ids })
}

const legalPersonAPI = {
  createLegalPerson: (legalPerson: LegalPersonDataSheet) =>
    ipcRenderer.invoke("create-legal-person", legalPerson),
  getLegalPersons: () => ipcRenderer.invoke("get-legal-persons")
}

try {
  contextBridge.exposeInMainWorld("electronAPI", electronAPI)
  contextBridge.exposeInMainWorld("personAPI", personAPI)
  contextBridge.exposeInMainWorld("legalPersonAPI", legalPersonAPI)
} catch (error) {
  console.error(error)
}
