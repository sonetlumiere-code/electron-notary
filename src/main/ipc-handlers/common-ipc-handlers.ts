import { FileFormat } from "@shared/types"
import { app, dialog, ipcMain, shell } from "electron"
import fs from "fs"
import path from "path"

const DOCUMENTS_FOLDER = path.join(app.getPath("documents"), "notaryDocs")

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

  ipcMain.handle("save-file", async (_event, filePath: string, fileName: string) => {
    const saveDirectory = path.join(DOCUMENTS_FOLDER)

    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory)
    }

    const destinationPath = path.join(saveDirectory, fileName)

    try {
      fs.copyFileSync(filePath, destinationPath)
      return { status: "success", fileName }
    } catch (error) {
      console.error("Error copying file:", error)
      return { status: "failed" }
    }
  })

  ipcMain.handle("open-file", async (_event, fileName: string) => {
    const filePath = path.join(DOCUMENTS_FOLDER, fileName)
    try {
      await shell.openPath(filePath)
      return { status: "success" }
    } catch (error) {
      console.error("Error opening file:", error)
      return { status: "error" }
    }
  })
}
