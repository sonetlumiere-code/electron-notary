import { contextBridge, ipcRenderer } from "electron"
import { FileFormat, LegalPersonDataSheet, PersonDataSheet } from "../shared/types"

if (!process.contextIsolated) {
  throw new Error("contextIsolation must be enabled in the BrowserWindow")
}

// Custom APIs for renderer
const electronAPI = {
  selectDirectory: () => ipcRenderer.invoke("select-directory"),
  selectFile: (data: { fileFormat: FileFormat }) => ipcRenderer.invoke("select-file", data)
}

const authAPI = {
  logIn: (data: { username: string; password: string }) => ipcRenderer.invoke("log-in", data)
}

const personAPI = {
  createPerson: (person: PersonDataSheet) => ipcRenderer.invoke("create-person", person),
  getPersons: () => ipcRenderer.invoke("get-persons"),
  getPersonById: (id: number) => ipcRenderer.invoke("get-person-by-id", id),
  searchPersons: (filters: Partial<PersonDataSheet>) =>
    ipcRenderer.invoke("search-persons", filters),
  updatePerson: (person: PersonDataSheet) => ipcRenderer.invoke("update-person", person),
  deletePersons: (ids: number[]) => ipcRenderer.invoke("delete-persons", ids),
  importPersons: (filePath: string) => ipcRenderer.invoke("import-persons", filePath),
  exportPersons: (data: { directory: string; ids: number[]; fileFormat: FileFormat }) =>
    ipcRenderer.invoke("export-persons", data)
}

const legalPersonAPI = {
  createLegalPerson: (legalPerson: LegalPersonDataSheet) =>
    ipcRenderer.invoke("create-legal-person", legalPerson),
  getLegalPersons: () => ipcRenderer.invoke("get-legal-persons"),
  getLegalPersonById: (id: number) => ipcRenderer.invoke("get-legal-person-by-id", id),
  searchLegalPersons: (filters: Partial<LegalPersonDataSheet>) =>
    ipcRenderer.invoke("search-legal-persons", filters),
  updateLegalPerson: (legalPerson: LegalPersonDataSheet) =>
    ipcRenderer.invoke("update-legal-person", legalPerson),
  deleteLegalPersons: (ids: number[]) => ipcRenderer.invoke("delete-legal-persons", ids),
  importLegalPersons: (filePath: string) => ipcRenderer.invoke("import-legal-persons", filePath),
  exportLegalPersons: (data: { directory: string; ids: number[]; fileFormat: FileFormat }) =>
    ipcRenderer.invoke("export-legal-persons", data)
}

try {
  contextBridge.exposeInMainWorld("electronAPI", electronAPI)
  contextBridge.exposeInMainWorld("authAPI", authAPI)
  contextBridge.exposeInMainWorld("personAPI", personAPI)
  contextBridge.exposeInMainWorld("legalPersonAPI", legalPersonAPI)
} catch (error) {
  console.error(error)
}
