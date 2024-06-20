import { LegalPersonDataSheet } from "@shared/types"
import db from "../sqlite-config"

const createLegalPerson = (data: LegalPersonDataSheet) => {
  const query = `
    INSERT INTO legal_person_data_sheets (
      businessName, CUIT, legalAddress, mainActivity, instrumentOfConstitution, registrationDate,
      registrationNumber, registeredOfficePhone, registeredOfficeAddress, registeredOfficeEmail, statuteCopy,
      proceedingsCopy, balanceCopy, representativeData
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

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
      id: info.lastInsertRowid,
      ...data
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

    return {
      id: info.lastInsertRowid,
      ...data
    }
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

const deleteLegalPerson = (id: number) => {
  const query = `DELETE FROM legal_person_data_sheets WHERE id = ?`

  try {
    const stmt = db.prepare(query)
    stmt.run(id)
  } catch (err) {
    console.error("Error deleting data: ", err)
    throw err
  }
}

const bulkDeleteLegalPersons = (ids: number[]) => {
  const placeholders = ids.map(() => "?").join(",")
  const query = `DELETE FROM legal_person_data_sheets WHERE id IN (${placeholders})`

  try {
    const stmt = db.prepare(query)
    stmt.run(...ids)
    return ids
  } catch (err) {
    console.error("Error bulk deleting data: ", err)
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
  bulkDeleteLegalPersons,
  createLegalPerson,
  deleteLegalPerson,
  getLegalPersonById,
  getLegalPersons,
  searchLegalPersons,
  updateLegalPerson
}
