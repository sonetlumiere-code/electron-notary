import { dialog, ipcMain } from "electron"

export default function commonIPCHandlers(): void {
  ipcMain.handle("select-directory", async (_event) => {
    const result = await dialog.showOpenDialog({ properties: ["openDirectory"] })
    return result.filePaths[0]
  })
}
