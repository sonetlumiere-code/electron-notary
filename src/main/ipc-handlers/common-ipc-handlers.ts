import { FileFormat } from "@shared/types"
import { dialog, ipcMain } from "electron"

export default function commonIPCHandlers(): void {
  ipcMain.handle("select-directory", async (_event) => {
    const result = await dialog.showOpenDialog({ properties: ["openDirectory"] })
    return result.filePaths[0]
  })

  ipcMain.handle("select-file", async (_event, { fileFormat }: { fileFormat: FileFormat }) => {
    const filters: { name: string; extensions: string[] }[] = []

    switch (fileFormat) {
      case FileFormat.JSON:
        filters.push({ name: "JSON Files", extensions: ["json"] })
        break

      case FileFormat.CSV:
        filters.push({ name: "CSV Files", extensions: ["csv"] })
        break

      default:
        filters.push({ name: "JSON Files", extensions: ["json"] })
        break
    }

    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters
    })
    return result.filePaths[0]
  })
}
