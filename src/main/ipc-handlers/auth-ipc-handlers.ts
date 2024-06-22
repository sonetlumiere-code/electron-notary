import { logIn } from "@/services/auth"
import { ipcMain } from "electron"

export default function authIPCHandlers(): void {
  ipcMain.handle("log-in", (_event, data: { username: string; password: string }) => logIn(data))
}
