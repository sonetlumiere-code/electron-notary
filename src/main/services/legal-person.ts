import legalPersonDocBuffer from "@/lib/docx/legal-person-docx"
import { FileFormat, LegalPersonDataSheet } from "@shared/types"
import csvParser from "csv-parser"
import fs from "fs"
import { parse } from "json2csv"
import path from "path"
import db from "../lib/sqlite/sqlite-config"

const createLegalPerson = (data: LegalPersonDataSheet) => {
  const query = `
    INSERT INTO legal_person_data_sheets (
      businessName, CUIT, legalAddress, mainActivity, instrumentOfConstitution, registrationDate,
      registrationNumber, registeredOfficePhone, registeredOfficeAddress, registeredOfficeEmail, statuteCopy,
      proceedingsCopy, balanceCopy, representativeData
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  if (typeof data.registrationDate === "string") {
    data.registrationDate = new Date(data.registrationDate)
  }

  try {
    const stmt = db.prepare(query)
    const info = stmt.run(
      data.businessName,
      data.CUIT,
      data.legalAddress,
      data.mainActivity,
      data.instrumentOfConstitution,
      data.registrationDate.toISOString(), // Convert Date to string
      data.registrationNumber,
      data.registeredOfficePhone,
      data.registeredOfficeAddress,
      data.registeredOfficeEmail,
      data.statuteCopy,
      data.proceedingsCopy,
      data.balanceCopy,
      data.representativeData
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

const getLegalPersons = (): LegalPersonDataSheet[] | null => {
  const query = `SELECT * FROM legal_person_data_sheets`

  try {
    const stmt = db.prepare(query)
    const rows = stmt.all()

    return rows.map((row: LegalPersonDataSheet) => formatResponse(row))
  } catch (err) {
    console.error("Error retrieving data: ", err)
    throw err
  }
}

const getLegalPersonById = (id: number): LegalPersonDataSheet | null => {
  const query = `SELECT * FROM legal_person_data_sheets WHERE id = ?`

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

const updateLegalPerson = (data: LegalPersonDataSheet) => {
  const query = `
    UPDATE legal_person_data_sheets SET
      businessName = ?, CUIT = ?, legalAddress = ?, mainActivity = ?, instrumentOfConstitution = ?,
      registrationDate = ?, registrationNumber = ?, registeredOfficePhone = ?, registeredOfficeAddress = ?,
      registeredOfficeEmail = ?, statuteCopy = ?, proceedingsCopy = ?, balanceCopy = ?, representativeData = ?
    WHERE id = ?
  `

  if (typeof data.registrationDate === "string") {
    data.registrationDate = new Date(data.registrationDate)
  }

  try {
    const stmt = db.prepare(query)
    const info = stmt.run(
      data.businessName,
      data.CUIT,
      data.legalAddress,
      data.mainActivity,
      data.instrumentOfConstitution,
      data.registrationDate.toISOString(), // Convert Date to string
      data.registrationNumber,
      data.registeredOfficePhone,
      data.registeredOfficeAddress,
      data.registeredOfficeEmail,
      data.statuteCopy,
      data.proceedingsCopy,
      data.balanceCopy,
      data.representativeData,
      data.id
    )

    return data
  } catch (err) {
    console.error("Error updating data: ", err)
    throw err
  }
}

const searchLegalPersons = (
  filters: Partial<LegalPersonDataSheet> & { ids?: number[] }
): LegalPersonDataSheet[] => {
  let query = `SELECT * FROM legal_person_data_sheets WHERE 1=1`
  const params: (string | number | Date | null)[] = []

  if (filters.ids && filters.ids.length > 0) {
    const placeholders = filters.ids.map(() => "?").join(",")
    query += ` AND id IN (${placeholders})`
    params.push(...filters.ids)
  }
  if (filters.businessName) {
    query += ` AND businessName LIKE ?`
    params.push(`%${filters.businessName}%`)
  }
  if (filters.CUIT) {
    query += ` AND CUIT = ?`
    params.push(filters.CUIT)
  }
  if (filters.legalAddress) {
    query += ` AND legalAddress LIKE ?`
    params.push(`%${filters.legalAddress}%`)
  }
  if (filters.mainActivity) {
    query += ` AND mainActivity LIKE ?`
    params.push(`%${filters.mainActivity}%`)
  }
  if (filters.instrumentOfConstitution) {
    query += ` AND instrumentOfConstitution LIKE ?`
    params.push(`%${filters.instrumentOfConstitution}%`)
  }
  if (filters.registrationDate) {
    query += ` AND registrationDate = ?`
    params.push(filters.registrationDate.toISOString())
  }
  if (filters.registrationNumber) {
    query += ` AND registrationNumber = ?`
    params.push(filters.registrationNumber)
  }
  if (filters.registeredOfficePhone) {
    query += ` AND registeredOfficePhone = ?`
    params.push(filters.registeredOfficePhone)
  }
  if (filters.registeredOfficeAddress) {
    query += ` AND registeredOfficeAddress LIKE ?`
    params.push(`%${filters.registeredOfficeAddress}%`)
  }
  if (filters.registeredOfficeEmail) {
    query += ` AND registeredOfficeEmail LIKE ?`
    params.push(`%${filters.registeredOfficeEmail}%`)
  }
  if (filters.statuteCopy) {
    query += ` AND statuteCopy LIKE ?`
    params.push(`%${filters.statuteCopy}%`)
  }
  if (filters.proceedingsCopy) {
    query += ` AND proceedingsCopy LIKE ?`
    params.push(`%${filters.proceedingsCopy}%`)
  }
  if (filters.balanceCopy) {
    query += ` AND balanceCopy LIKE ?`
    params.push(`%${filters.balanceCopy}%`)
  }
  if (filters.representativeData) {
    query += ` AND representativeData LIKE ?`
    params.push(`%${filters.representativeData}%`)
  }

  try {
    const stmt = db.prepare(query)
    const rows = stmt.all(...params)
    return rows.map((row: LegalPersonDataSheet) => formatResponse(row))
  } catch (err) {
    console.error("Error searching data: ", err)
    throw err
  }
}

const deleteLegalPersons = (ids: number[]) => {
  const placeholders = ids.map(() => "?").join(",")
  const query = `DELETE FROM legal_person_data_sheets WHERE id IN (${placeholders})`

  try {
    const stmt = db.prepare(query)
    stmt.run(...ids)
    return ids
  } catch (err) {
    console.error("Error deleting data: ", err)
    throw err
  }
}

const importLegalPersons = async (filePath: string): Promise<LegalPersonDataSheet[]> => {
  try {
    const ext = path.extname(filePath).toLowerCase()

    const data = fs.readFileSync(filePath, "utf-8")
    let importedLegalPersons: LegalPersonDataSheet[] = []

    if (ext === ".json") {
      importedLegalPersons = JSON.parse(data)
    } else if (ext === ".csv") {
      importedLegalPersons = await new Promise<LegalPersonDataSheet[]>((resolve, reject) => {
        const results: LegalPersonDataSheet[] = []
        fs.createReadStream(filePath)
          .pipe(csvParser())
          .on("data", (data: LegalPersonDataSheet) => results.push(data))
          .on("end", () => resolve(results))
          .on("error", (err) => reject(err))
      })
    } else {
      throw new Error("Unsupported file format")
    }

    const legalPersonsDB: LegalPersonDataSheet[] | null = getLegalPersons()

    const createdLegalPersons: LegalPersonDataSheet[] = []

    importedLegalPersons.forEach((legalPerson) => {
      const personExists = legalPersonsDB?.some(
        (dbLegalPerson) => dbLegalPerson.id === legalPerson.id
      )

      if (!personExists) {
        const newPerson = createLegalPerson(legalPerson)
        createdLegalPersons.push(newPerson)
      }
    })

    return createdLegalPersons
  } catch (err) {
    console.error("Error importing legal persons: ", err)
    throw err
  }
}

const exportLegalPersons = async (
  directory: string,
  ids: number[],
  fileFormat: FileFormat
): Promise<string> => {
  try {
    const data: LegalPersonDataSheet[] = searchLegalPersons({ ids })

    let filePath: string
    let content: string | Buffer

    switch (fileFormat) {
      case FileFormat.JSON: {
        const jsonFileName = `legal_persons_${new Date().getTime()}.json`
        filePath = path.join(directory, jsonFileName)
        content = JSON.stringify(data, null, 2)
        break
      }

      case FileFormat.CSV: {
        const csvFileName = `legal_persons_${new Date().getTime()}.csv`
        filePath = path.join(directory, csvFileName)
        const csvData = parse(data)
        content = csvData
        break
      }

      case FileFormat.WORD: {
        const wordFileName = `legal_persons_${new Date().getTime()}.docx`
        filePath = path.join(directory, wordFileName)
        content = await legalPersonDocBuffer(data)
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

const formatResponse = (row: LegalPersonDataSheet): LegalPersonDataSheet => {
  return {
    ...row,
    registrationDate: new Date(row.registrationDate)
  }
}

export {
  createLegalPerson,
  deleteLegalPersons,
  exportLegalPersons,
  getLegalPersonById,
  getLegalPersons,
  importLegalPersons,
  searchLegalPersons,
  updateLegalPerson
}
