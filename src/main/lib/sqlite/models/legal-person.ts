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
    return rows
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
      return {
        ...row,
        registrationDate: new Date(row.registrationDate) // Convert string to Date
      }
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
export {
  createLegalPerson,
  deleteLegalPerson,
  getLegalPersonById,
  getLegalPersons,
  updateLegalPerson
}
