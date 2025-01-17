import personDocBuffer from "@/lib/docx/person-docx"
import db from "@/lib/sqlite/sqlite-config"
import { Activity, FileFormat, PersonDataSheet } from "@shared/types"
import csvParser from "csv-parser"
import fs from "fs"
import { parse } from "json2csv"
import path from "path"
import { formatResponse as formatActivityResponse } from "./activity"

const createPerson = (data: PersonDataSheet): PersonDataSheet => {
  const query = `
    INSERT INTO person_data_sheets (
      name, lastName, gender, nationality, documentType, documentNumber, CUIT_L, birthdate, birthplace,
      maritalStatus, fatherName, motherName, spouseName, marriageNumber, marriageRegime, divorceSpouseName, divorceDate, divorceCourt,
      divorce, widowNumber, numberOfChildren, address, city, profession, phoneNumber,
      mobileNumber, email, isPoliticallyExposed, politicalPosition, originOfFunds, referredBy, observations, document, affidavit, judgment, attachedFile
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `

  if (typeof data.birthdate === "string") {
    data.birthdate = new Date(data.birthdate)
  }
  if (data.divorceDate && typeof data.divorceDate === "string") {
    data.divorceDate = new Date(data.divorceDate)
  }

  try {
    const stmt = db.prepare(query)
    const info = stmt.run(
      data.name,
      data.lastName,
      data.gender,
      data.nationality,
      data.documentType,
      data.documentNumber,
      data.CUIT_L,
      data.birthdate ? data.birthdate.toISOString() : null,
      data.birthplace,
      data.maritalStatus,
      data.fatherName,
      data.motherName,
      data.spouseName,
      data.marriageNumber,
      data.marriageRegime,
      data.divorceSpouseName,
      data.divorceDate ? data.divorceDate.toISOString() : "",
      data.divorceCourt,
      data.divorce,
      data.widowNumber,
      data.numberOfChildren,
      data.address,
      data.city,
      data.profession,
      data.phoneNumber,
      data.mobileNumber,
      data.email,
      data.isPoliticallyExposed ? 1 : 0,
      data.politicalPosition,
      data.originOfFunds,
      data.referredBy,
      data.observations,
      data.document,
      data.affidavit,
      data.judgment,
      data.attachedFile
    )

    return {
      ...data,
      id: info.lastInsertRowid
    }
  } catch (err) {
    console.error("Error inserting data: ", err)
    throw err
  }
}

const getPersons = (): PersonDataSheet[] | null => {
  const query = `SELECT * FROM person_data_sheets`

  try {
    const stmt = db.prepare(query)
    const rows = stmt.all()
    return rows.map((row: PersonDataSheet) => formatResponse(row))
  } catch (err) {
    console.error("Error retrieving data: ", err)
    throw err
  }
}

const getPersonById = (id: number): (PersonDataSheet & { activities: Activity[] }) | null => {
  const personQuery = `SELECT * FROM person_data_sheets WHERE id = ?`
  const activitiesQuery = `SELECT * FROM activity WHERE person_id = ? ORDER BY date DESC`

  try {
    const stmtPerson = db.prepare(personQuery)
    const person = stmtPerson.get(id)

    if (person) {
      const stmtActivities = db.prepare(activitiesQuery)
      const activities = stmtActivities.all(id)

      return {
        ...formatResponse(person),
        activities: activities.map(formatActivityResponse)
      }
    }

    return null
  } catch (err) {
    console.error("Error retrieving data: ", err)
    throw err
  }
}

const updatePerson = (data: PersonDataSheet) => {
  const query = `
    UPDATE person_data_sheets SET
      name = ?, lastName = ?, gender = ?, nationality = ?, documentType = ?, documentNumber = ?,
      CUIT_L = ?, birthdate = ?, birthplace = ?, maritalStatus = ?, fatherName = ?, motherName = ?,
      spouseName = ?, marriageNumber = ?, marriageRegime = ?, divorceSpouseName = ?, divorceDate = ?, divorceCourt = ?, divorce = ?,
      widowNumber = ?, numberOfChildren = ?, address = ?, city = ?, profession = ?,
      phoneNumber = ?, mobileNumber = ?, email = ?, isPoliticallyExposed = ?, politicalPosition = ?,
      originOfFunds = ?, referredBy = ?, observations = ?, document = ?, affidavit = ?, judgment = ?, attachedFile = ?
    WHERE id = ?
  `

  if (typeof data.birthdate === "string") {
    data.birthdate = new Date(data.birthdate)
  }
  if (data.divorceDate && typeof data.divorceDate === "string") {
    data.divorceDate = new Date(data.divorceDate)
  }

  try {
    const stmt = db.prepare(query)
    stmt.run(
      data.name,
      data.lastName,
      data.gender,
      data.nationality,
      data.documentType,
      data.documentNumber,
      data.CUIT_L,
      data.birthdate ? data.birthdate.toISOString() : null,
      data.birthplace,
      data.maritalStatus,
      data.fatherName,
      data.motherName,
      data.spouseName,
      data.marriageNumber,
      data.marriageRegime,
      data.divorceSpouseName,
      data.divorceDate ? data.divorceDate.toISOString() : null,
      data.divorceCourt,
      data.divorce,
      data.widowNumber,
      data.numberOfChildren,
      data.address,
      data.city,
      data.profession,
      data.phoneNumber,
      data.mobileNumber,
      data.email,
      data.isPoliticallyExposed ? 1 : 0,
      data.politicalPosition,
      data.originOfFunds,
      data.referredBy,
      data.observations,
      data.document,
      data.affidavit,
      data.judgment,
      data.attachedFile,
      data.id
    )

    return data
  } catch (err) {
    console.error("Error updating data: ", err)
    throw err
  }
}

const searchPersons = (
  filters: Partial<PersonDataSheet> & { ids?: number[] }
): PersonDataSheet[] => {
  let query = `SELECT * FROM person_data_sheets WHERE 1=1`
  const params: (string | number | Date | null)[] = []

  if (filters.ids && filters.ids.length > 0) {
    const placeholders = filters.ids.map(() => "?").join(",")
    query += ` AND id IN (${placeholders})`
    params.push(...filters.ids)
  }
  if (filters.name) {
    query += ` AND name LIKE ?`
    params.push(`%${filters.name}%`)
  }
  if (filters.gender) {
    query += ` AND gender LIKE ?`
    params.push(`%${filters.gender}%`)
  }
  if (filters.nationality) {
    query += ` AND nationality LIKE ?`
    params.push(`%${filters.nationality}%`)
  }
  if (filters.documentType) {
    query += ` AND documentType = ?`
    params.push(filters.documentType)
  }
  if (filters.documentNumber) {
    query += ` AND documentNumber = ?`
    params.push(filters.documentNumber)
  }
  if (filters.birthplace) {
    query += ` AND birthplace LIKE ?`
    params.push(`%${filters.birthplace}%`)
  }
  if (filters.profession) {
    query += ` AND profession LIKE ?`
    params.push(`%${filters.profession}%`)
  }
  if (filters.phoneNumber) {
    query += ` AND phoneNumber = ?`
    params.push(filters.phoneNumber)
  }
  if (filters.mobileNumber) {
    query += ` AND mobileNumber LIKE ?`
    params.push(`%${filters.mobileNumber}%`)
  }
  if (filters.email) {
    query += ` AND email LIKE ?`
    params.push(`%${filters.email}%`)
  }
  if (filters.isPoliticallyExposed !== undefined) {
    query += ` AND isPoliticallyExposed = ?`
    params.push(filters.isPoliticallyExposed ? 1 : 0)
  }
  if (filters.politicalPosition) {
    query += ` AND politicalPosition LIKE ?`
    params.push(`%${filters.politicalPosition}%`)
  }
  if (filters.originOfFunds) {
    query += ` AND originOfFunds LIKE ?`
    params.push(`%${filters.originOfFunds}%`)
  }
  if (filters.referredBy) {
    query += ` AND referredBy LIKE ?`
    params.push(`%${filters.referredBy}%`)
  }

  try {
    const stmt = db.prepare(query)
    const rows = stmt.all(...params)
    return rows.map((row: PersonDataSheet) => formatResponse(row))
  } catch (err) {
    console.error("Error searching data: ", err)
    throw err
  }
}

const deletePersons = (ids: number[]) => {
  const placeholders = ids.map(() => "?").join(",")
  const query = `DELETE FROM person_data_sheets WHERE id IN (${placeholders})`

  try {
    const stmt = db.prepare(query)
    stmt.run(...ids)
    return ids
  } catch (err) {
    console.error("Error deleting data: ", err)
    throw err
  }
}

const importPersons = async (filePath: string): Promise<PersonDataSheet[]> => {
  try {
    const ext = path.extname(filePath).toLowerCase()

    const data = fs.readFileSync(filePath, "utf-8")
    let importedPersons: PersonDataSheet[] = []

    if (ext === ".json") {
      importedPersons = JSON.parse(data)
    } else if (ext === ".csv") {
      importedPersons = await new Promise<PersonDataSheet[]>((resolve, reject) => {
        const results: PersonDataSheet[] = []
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on("data", (data: PersonDataSheet) => results.push(data))
          .on("end", () => resolve(results))
          .on("error", (err) => reject(err))
      })
    } else {
      throw new Error("Unsupported file format")
    }

    const personsDB: PersonDataSheet[] | null = getPersons()

    const createdPersons: PersonDataSheet[] = []

    importedPersons.forEach((person) => {
      const personExists = personsDB?.some((dbPerson) => dbPerson.id === person.id)

      if (!personExists) {
        const newPerson = createPerson(person)
        createdPersons.push(newPerson)
      }
    })

    return createdPersons
  } catch (err) {
    console.error("Error importing persons: ", err)
    throw err
  }
}

const exportPersons = async (
  directory: string,
  ids: number[],
  fileFormat: FileFormat
): Promise<string> => {
  try {
    const data: PersonDataSheet[] = searchPersons({ ids })

    let filePath: string
    let content: string | Buffer

    switch (fileFormat) {
      case FileFormat.JSON: {
        const jsonFileName = `persons_${new Date().getTime()}.json`
        filePath = path.join(directory, jsonFileName)
        content = JSON.stringify(data, null, 2)
        break
      }

      case FileFormat.CSV: {
        const csvFileName = `persons_${new Date().getTime()}.csv`
        filePath = path.join(directory, csvFileName)
        const csvData = parse(data)
        content = csvData
        break
      }

      case FileFormat.WORD: {
        const wordFileName = `persons_${new Date().getTime()}.docx`
        filePath = path.join(directory, wordFileName)
        content = await personDocBuffer(data)
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
    console.error("Error exporting persons: ", err)
    throw err
  }
}

const formatResponse = (row: PersonDataSheet): PersonDataSheet => {
  return {
    ...row,
    birthdate: row.birthdate ? new Date(row.birthdate) : undefined,
    divorceDate: row.divorceDate ? new Date(row.divorceDate) : undefined,
    isPoliticallyExposed: Boolean(row.isPoliticallyExposed)
  }
}

export {
  createPerson,
  deletePersons,
  exportPersons,
  getPersonById,
  getPersons,
  importPersons,
  searchPersons,
  updatePerson
}
