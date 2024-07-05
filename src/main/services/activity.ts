import db from "@/lib/sqlite/sqlite-config"
import { Activity } from "@shared/types"

const createActivity = (data: Activity) => {
  const query = `
    INSERT INTO activity (date, act, observations, attachedFile, person_id, legal_person_id) 
    VALUES (?, ?, ?, ?, ?, ?)
  `

  if (typeof data.date === "string") {
    data.date = new Date(data.date)
  }

  try {
    const stmt = db.prepare(query)
    const info = stmt.run(
      data.date.toISOString(),
      data.act,
      data.observations,
      data.attachedFile,
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
  const query = `SELECT * FROM activity`

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
    UPDATE activity SET date = ?, act = ?, observations = ?, attachedFile = ?, person_id = ?, legal_person_id = ? 
    WHERE id = ?
  `

  if (typeof data.date === "string") {
    data.date = new Date(data.date)
  }

  try {
    const stmt = db.prepare(query)
    const info = stmt.run(
      data.date.toISOString(),
      data.act,
      data.observations,
      data.attachedFile,
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
  if (filters.observations) {
    query += ` AND observations LIKE ?`
    params.push(`%${filters.observations}%`)
  }
  if (filters.attachedFile) {
    query += ` AND attachedFile LIKE ?`
    params.push(`%${filters.attachedFile}%`)
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

const formatResponse = (row: Activity): Activity => {
  return {
    ...row,
    date: new Date(row.date)
  }
}

export {
  createActivity,
  deleteActivities,
  getActivities,
  getActivityById,
  searchActivities,
  updateActivity
}
