import {
  bulkDeleteLegalPersons,
  bulkExportLegalPersons,
  createLegalPerson,
  deleteLegalPerson,
  exportLegalPersons,
  getLegalPersonById,
  getLegalPersons,
  importLegalPersons,
  searchLegalPersons,
  updateLegalPerson
} from "@/services/legal-person"
import { ipcMain } from "electron"

export default function legalPersonIPCHandlers(): void {
  ipcMain.handle("create-legal-person", (_event, data) => createLegalPerson(data))
  ipcMain.handle("get-legal-persons", () => getLegalPersons())
  ipcMain.handle("get-legal-person-by-id", (_event, id) => getLegalPersonById(id))
  ipcMain.handle("search-legal-persons", (_event, filters) => searchLegalPersons(filters))
  ipcMain.handle("update-legal-person", (_event, data) => updateLegalPerson(data))
  ipcMain.handle("delete-legal-person", (_event, id) => deleteLegalPerson(id))
  ipcMain.handle("bulk-delete-legal-persons", async (_event, ids) => bulkDeleteLegalPersons(ids))
  ipcMain.handle("import-legal-persons", async (_event, filePath) => importLegalPersons(filePath))
  ipcMain.handle("export-legal-persons", async (_event, { directory, fileFormat }) =>
    exportLegalPersons(directory, fileFormat)
  )
  ipcMain.handle("bulk-export-legal-persons", async (_event, { directory, ids, fileFormat }) =>
    bulkExportLegalPersons(directory, ids, fileFormat)
  )
}
