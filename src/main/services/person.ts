import { FileFormat, PersonDataSheet } from "@shared/types"
import fs from "fs"
import { parse } from "json2csv"
import path from "path"
import db from "../lib/sqlite/sqlite-config"

const createPerson = (data: PersonDataSheet) => {
  const query = `
    INSERT INTO person_data_sheets (
      name, lastName, gender, nationality, documentType, documentNumber, CUIT_L, birthdate, birthplace,
      maritalStatus, maritalStatusSpouseName, maritalStatusSpouseNumber, maritalStatusMarriageRegime, maritalStatusDivorceNumber, maritalStatusDivorceDate, maritalStatusDivorceCourt,
      maritalStatusDivorceAutos, maritalStatusDeceasedSpouseName, numberOfChildren, address, city, province, profession, phoneNumber,
      mobileNumber, email, isPoliticallyExposed, politicalPosition, originOfFunds, reasonForChoosing, referredBy
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `

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
      data.birthdate.toISOString(),
      data.birthplace,
      data.maritalStatus,
      data.maritalStatusSpouseName,
      data.maritalStatusSpouseNumber,
      data.maritalStatusMarriageRegime,
      data.maritalStatusDivorceNumber,
      data.maritalStatusDivorceDate ? data.maritalStatusDivorceDate.toISOString() : null,
      data.maritalStatusDivorceCourt,
      data.maritalStatusDivorceAutos,
      data.maritalStatusDeceasedSpouseName,
      data.numberOfChildren,
      data.address,
      data.city,
      data.province,
      data.profession,
      data.phoneNumber,
      data.mobileNumber,
      data.email,
      data.isPoliticallyExposed ? 1 : 0,
      data.politicalPosition,
      data.originOfFunds,
      data.reasonForChoosing,
      data.referredBy
    )

    return {
      id: info.lastInsertRowid,
      ...data
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

const getPersonById = (id: number): PersonDataSheet | null => {
  const query = `SELECT * FROM person_data_sheets WHERE id = ?`

  try {
    const stmt = db.prepare(query)
    const row = stmt.get(id)
    if (row) {
      return formatResponse(row)
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
      CUIT_L = ?, birthdate = ?, birthplace = ?, maritalStatus = ?, maritalStatusSpouseName = ?, maritalStatusSpouseNumber = ?,
      maritalStatusMarriageRegime = ?, maritalStatusDivorceNumber = ?, maritalStatusDivorceDate = ?, maritalStatusDivorceCourt = ?, maritalStatusDivorceAutos = ?,
      maritalStatusDeceasedSpouseName = ?, numberOfChildren = ?, address = ?, city = ?, province = ?, profession = ?,
      phoneNumber = ?, mobileNumber = ?, email = ?, isPoliticallyExposed = ?, politicalPosition = ?,
      originOfFunds = ?, reasonForChoosing = ?, referredBy = ?
    WHERE id = ?
  `

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
      data.birthdate.toISOString(),
      data.birthplace,
      data.maritalStatus,
      data.maritalStatusSpouseName,
      data.maritalStatusSpouseNumber,
      data.maritalStatusMarriageRegime,
      data.maritalStatusDivorceNumber,
      data.maritalStatusDivorceDate ? data.maritalStatusDivorceDate.toISOString() : null,
      data.maritalStatusDivorceCourt,
      data.maritalStatusDivorceAutos,
      data.maritalStatusDeceasedSpouseName,
      data.numberOfChildren,
      data.address,
      data.city,
      data.province,
      data.profession,
      data.phoneNumber,
      data.mobileNumber,
      data.email,
      data.isPoliticallyExposed ? 1 : 0,
      data.politicalPosition,
      data.originOfFunds,
      data.reasonForChoosing,
      data.referredBy,
      data.id
    )

    return {
      id: info.lastInsertRowid,
      ...data
    }
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
  if (filters.province) {
    query += ` AND province LIKE ?`
    params.push(`%${filters.province}%`)
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
  if (filters.reasonForChoosing) {
    query += ` AND reasonForChoosing LIKE ?`
    params.push(`%${filters.reasonForChoosing}%`)
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

const deletePerson = (id: number) => {
  const query = `DELETE FROM person_data_sheets WHERE id = ?`

  try {
    const stmt = db.prepare(query)
    stmt.run(id)
    return id
  } catch (err) {
    console.error("Error deleting data: ", err)
    throw err
  }
}

const bulkDeletePersons = (ids: number[]) => {
  const placeholders = ids.map(() => "?").join(",")
  const query = `DELETE FROM person_data_sheets WHERE id IN (${placeholders})`

  try {
    const stmt = db.prepare(query)
    stmt.run(...ids)
    return ids
  } catch (err) {
    console.error("Error bulk deleting data: ", err)
    throw err
  }
}

const importPersons = (filePath: string): PersonDataSheet[] => {
  try {
    const data = fs.readFileSync(filePath, "utf-8")
    const legalPersons: PersonDataSheet[] = JSON.parse(data)

    legalPersons.forEach((person) => {
      createPerson(person)
    })

    return legalPersons
  } catch (err) {
    console.error("Error importing persons: ", err)
    throw err
  }
}

const exportPersons = (directory: string, fileFormat: FileFormat): string => {
  try {
    const data: PersonDataSheet[] | null = getPersons()

    if (!data) {
      throw new Error("Failed to get persons")
    }

    let filePath: string
    let content: string

    switch (fileFormat) {
      case FileFormat.JSON: {
        const jsonFileName = `all_persons_${new Date().getTime()}.json`
        filePath = path.join(directory, jsonFileName)
        content = JSON.stringify(data, null, 2)
        break
      }

      case FileFormat.CSV: {
        const csvFileName = `all_persons_${new Date().getTime()}.csv`
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

    fs.writeFileSync(filePath, content)
    return filePath
  } catch (err) {
    console.error("Error exporting persons: ", err)
    throw err
  }
}

const bulkExportPersons = (directory: string, ids: number[], fileFormat: FileFormat): string => {
  try {
    const data: PersonDataSheet[] = searchPersons({ ids })

    let filePath: string
    let content: string

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

      default:
        throw new Error(
          `Unsupported file format: ${fileFormat}. Supported formats are 'json' and 'csv'.`
        )
    }

    fs.writeFileSync(filePath, content)
    return filePath
  } catch (err) {
    console.error("Error bulk exporting persons: ", err)
    throw err
  }
}

const formatResponse = (row: PersonDataSheet): PersonDataSheet => {
  return {
    ...row,
    birthdate: new Date(row.birthdate),
    maritalStatusDivorceDate: row.maritalStatusDivorceDate
      ? new Date(row.maritalStatusDivorceDate)
      : undefined,
    isPoliticallyExposed: Boolean(row.isPoliticallyExposed)
  }
}

export {
  bulkDeletePersons,
  bulkExportPersons,
  createPerson,
  deletePerson,
  exportPersons,
  getPersonById,
  getPersons,
  importPersons,
  searchPersons,
  updatePerson
}