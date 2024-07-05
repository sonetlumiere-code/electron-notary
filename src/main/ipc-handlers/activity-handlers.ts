import {
  createActivity,
  deleteActivities,
  getActivities,
  getActivityById,
  searchActivities,
  updateActivity
} from "@/services/activity"
import { ipcMain } from "electron"

export default function activityIPCHandlers(): void {
  ipcMain.handle("create-activity", (_event, data) => createActivity(data))
  ipcMain.handle("get-activities", () => getActivities())
  ipcMain.handle("get-activity-by-id", (_event, id) => getActivityById(id))
  ipcMain.handle("search-activities", (_event, filters) => searchActivities(filters))
  ipcMain.handle("update-activity", (_event, data) => updateActivity(data))
  ipcMain.handle("delete-activity", (_event, ids) => deleteActivities(ids))
}
