import { NOTARY_DOCS } from "@/lib/sqlite/sqlite-config"
import { FileFormat } from "@shared/types"
import { dialog, ipcMain, shell } from "electron"
import fs from "fs"
import path from "path"

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

  ipcMain.handle("save-files", async (_event, files: { filePath: string; fileName: string }[]) => {
    const saveDirectory = path.join(NOTARY_DOCS)

    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory)
    }

    const results = files.map(({ filePath, fileName }) => {
      const uniqueFileName = `${Date.now()}-${fileName}`
      const destinationPath = path.join(saveDirectory, uniqueFileName)

      try {
        fs.copyFileSync(filePath, destinationPath)
        return { status: "success", fileName: uniqueFileName }
      } catch (error) {
        console.error("Error copying file:", error)
        return { status: "failed", fileName: uniqueFileName }
      }
    })

    return results
  })

  ipcMain.handle("open-file", async (_event, fileName: string) => {
    const filePath = path.join(NOTARY_DOCS, fileName)
    try {
      await shell.openPath(filePath)
      return { status: "success" }
    } catch (error) {
      console.error("Error opening file:", error)
      return { status: "error" }
    }
  })
}
