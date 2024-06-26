import {
  createPerson,
  deletePersons,
  exportPersons,
  getPersonById,
  getPersons,
  importPersons,
  searchPersons,
  updatePerson
} from "@/services/person"
import { ipcMain } from "electron"

export default function personIPCHandlers(): void {
  ipcMain.handle("create-person", (_event, data) => createPerson(data))
  ipcMain.handle("get-persons", () => getPersons())
  ipcMain.handle("get-person-by-id", (_event, id) => getPersonById(id))
  ipcMain.handle("search-persons", (_event, filters) => searchPersons(filters))
  ipcMain.handle("update-person", (_event, data) => updatePerson(data))
  ipcMain.handle("delete-persons", (_event, ids) => deletePersons(ids))
  ipcMain.handle("import-persons", async (_event, filePath) => importPersons(filePath))
  ipcMain.handle("export-persons", async (_event, { directory, ids, fileFormat }) =>
    exportPersons(directory, ids, fileFormat)
  )
}
