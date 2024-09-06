import db from "@/lib/sqlite/sqlite-config"
import { Activity, FileFormat } from "@shared/types"
import csvParser from "csv-parser"
import fs from "fs"
import { parse } from "json2csv"
import path from "path"

const createActivity = (data: Activity) => {
  const query = `
    INSERT INTO activity (date, act, bill, observations, attachedFiles, person_id, legal_person_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `

  if (typeof data.date === "string") {
    data.date = new Date(data.date)
  }

  const attachedFilesJson = JSON.stringify(data.attachedFiles)
  const billJson = JSON.stringify(data.bill)

  try {
    const stmt = db.prepare(query)
    const info = stmt.run(
      data.date.toISOString(),
      data.act,
      billJson,
      data.observations,
      attachedFilesJson,
      data.person_id || null,
      data.legal_person_id || null
    )

    return {
      ...data,
      id: info.lastInsertRowid
    }
  } catch (err) {
    console.error("Error inserting activity: ", err)
    throw err
  }
}

const getActivities = (): Activity[] | null => {
  const query = `SELECT * FROM activity ORDER BY date DESC`

  try {
    const stmt = db.prepare(query)
    const rows = stmt.all()

    return rows.map((row: Activity) => formatResponse(row))
  } catch (err) {
    console.error("Error retrieving activities: ", err)
    throw err
  }
}

const getActivityById = (id: number): Activity | null => {
  const query = `SELECT * FROM activity WHERE id = ?`

  try {
    const stmt = db.prepare(query)
    const row = stmt.get(id)
    if (row) {
      return formatResponse(row)
    }
    return null
  } catch (err) {
    console.error("Error retrieving activity: ", err)
    throw err
  }
}

const updateActivity = (data: Activity) => {
  const query = `
    UPDATE activity SET date = ?, act = ?, bill = ?, observations = ?, attachedFiles = ?, person_id = ?, legal_person_id = ? 
    WHERE id = ?
  `

  if (typeof data.date === "string") {
    data.date = new Date(data.date)
  }

  const attachedFilesJson = JSON.stringify(data.attachedFiles)
  const billJson = JSON.stringify(data.bill)

  try {
    const stmt = db.prepare(query)
    stmt.run(
      data.date.toISOString(),
      data.act,
      billJson,
      data.observations,
      attachedFilesJson,
      data.person_id || null,
      data.legal_person_id || null,
      data.id
    )

    return data
  } catch (err) {
    console.error("Error updating activity: ", err)
    throw err
  }
}

const searchActivities = (filters: Partial<Activity> & { ids?: number[] }): Activity[] => {
  let query = `SELECT * FROM activity WHERE 1=1`
  const params: (string | number | Date | null)[] = []

  if (filters.ids && filters.ids.length > 0) {
    const placeholders = filters.ids.map(() => "?").join(",")
    query += ` AND id IN (${placeholders})`
    params.push(...filters.ids)
  }
  if (filters.date) {
    query += ` AND date = ?`
    params.push(filters.date.toISOString())
  }
  if (filters.act) {
    query += ` AND act LIKE ?`
    params.push(`%${filters.act}%`)
  }
  if (filters.bill) {
    query += ` AND bill LIKE ?`
    params.push(`%${filters.bill}%`)
  }
  if (filters.observations) {
    query += ` AND observations LIKE ?`
    params.push(`%${filters.observations}%`)
  }
  if (filters.attachedFiles) {
    query += ` AND attachedFiles LIKE ?`
    params.push(`%${filters.attachedFiles}%`)
  }
  if (filters.person_id) {
    query += ` AND person_id = ?`
    params.push(filters.person_id)
  }
  if (filters.legal_person_id) {
    query += ` AND legal_person_id = ?`
    params.push(filters.legal_person_id)
  }

  try {
    const stmt = db.prepare(query)
    const rows = stmt.all(...params)
    return rows.map((row: Activity) => formatResponse(row))
  } catch (err) {
    console.error("Error searching activities: ", err)
    throw err
  }
}

const deleteActivities = (ids: number[]) => {
  const placeholders = ids.map(() => "?").join(",")
  const query = `DELETE FROM activity WHERE id IN (${placeholders})`

  try {
    const stmt = db.prepare(query)
    stmt.run(...ids)
    return ids
  } catch (err) {
    console.error("Error deleting activities: ", err)
    throw err
  }
}

const importActivities = async (filePath: string): Promise<Activity[]> => {
  try {
    const ext = path.extname(filePath).toLowerCase()

    const data = fs.readFileSync(filePath, "utf-8")
    let importedActivities: Activity[] = []

    if (ext === ".json") {
      importedActivities = JSON.parse(data)
    } else if (ext === ".csv") {
      importedActivities = await new Promise<Activity[]>((resolve, reject) => {
        const results: Activity[] = []
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on("data", (data: Activity) => results.push(data))
          .on("end", () => resolve(results))
          .on("error", (err) => reject(err))
      })
    } else {
      throw new Error("Unsupported file format")
    }

    const activitiesDB: Activity[] | null = getActivities()

    const createdActivities: Activity[] = []

    importedActivities.forEach((activity) => {
      const activityExists = activitiesDB?.some((dbActivity) => dbActivity.id === activity.id)

      if (!activityExists) {
        const newActivity = createActivity(activity)
        createdActivities.push(newActivity)
      }
    })

    return createdActivities
  } catch (err) {
    console.error("Error importing activities: ", err)
    throw err
  }
}

const exportActivities = async (
  directory: string,
  ids: number[],
  fileFormat: FileFormat
): Promise<string> => {
  try {
    const data: Activity[] = searchActivities({ ids })

    let filePath: string
    let content: string | Buffer

    switch (fileFormat) {
      case FileFormat.JSON: {
        const jsonFileName = `activities_${new Date().getTime()}.json`
        filePath = path.join(directory, jsonFileName)
        content = JSON.stringify(data, null, 2)
        break
      }

      case FileFormat.CSV: {
        const csvFileName = `activities_${new Date().getTime()}.csv`
        filePath = path.join(directory, csvFileName)
        const csvData = parse(data)
        content = csvData
        break
      }

      default:
        throw new Error(
          `Unsupported format: ${fileFormat}. Supported formats are 'json' and 'csv'.`
        )
    }

    if (typeof content === "string") {
      fs.writeFileSync(filePath, content)
    } else {
      fs.writeFileSync(filePath, new Uint8Array(content))
    }

    return filePath
  } catch (err) {
    console.error("Error exporting activities: ", err)
    throw err
  }
}

const formatResponse = (row: Activity): Activity => {
  return {
    ...row,
    date: new Date(row.date),
    attachedFiles: row.attachedFiles ? JSON.parse(row.attachedFiles as unknown as string) : [],
    bill: row.bill ? JSON.parse(row.bill as unknown as string) : []
  }
}

export {
  createActivity,
  deleteActivities,
  exportActivities,
  formatResponse,
  getActivities,
  getActivityById,
  importActivities,
  searchActivities,
  updateActivity
}
