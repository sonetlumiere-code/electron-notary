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
  importPersons: () => ipcRenderer.invoke("import-persons"),
  exportPersons: (directory: string) => ipcRenderer.invoke("export-persons", directory),
  bulkExportPersons: ({ ids, directory }: { ids: number[]; directory: string }) =>
    ipcRenderer.invoke("bulk-export-persons", { ids, directory }),
  bulkDeletePersons: (ids: number[]) => ipcRenderer.invoke("bulk-delete-persons", ids)
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
  deleteLegalPerson: (id: number) => ipcRenderer.invoke("delete-legal-person", id),
  importLegalPersons: () => ipcRenderer.invoke("import-legal-persons"),
  exportLegalPersons: (directory: string) => ipcRenderer.invoke("export-legal-persons", directory),
  bulkExportLegalPersons: ({ ids, directory }: { ids: number[]; directory: string }) =>
    ipcRenderer.invoke("bulk-export-legal-persons", { ids, directory }),
  bulkDeleteLegalPersons: (ids: number[]) => ipcRenderer.invoke("bulk-delete-legal-persons", ids)
}

try {
  contextBridge.exposeInMainWorld("electronAPI", electronAPI)
  contextBridge.exposeInMainWorld("personAPI", personAPI)
  contextBridge.exposeInMainWorld("legalPersonAPI", legalPersonAPI)
} catch (error) {
  console.error(error)
}
