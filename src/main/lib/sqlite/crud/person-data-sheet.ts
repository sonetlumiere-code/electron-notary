import { PersonDataSheet } from '../../../../shared/types/index'
import db from '../sqlite-config'

const createPersonDataSheet = (data: PersonDataSheet) => {
  const query = `
    INSERT INTO person_data_sheets (
      name, lastName, gender, nationality, documentType, documentNumber, CUIT_L, birthdate, birthplace,
      maritalStatus, spouseName, spouseNumber, marriageRegime, divorceNumber, divorceDate, divorceCourt,
      divorceAutos, deceasedSpouseName, numberOfChildren, address, city, province, profession, phoneNumber,
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
      data.spouseName,
      data.spouseNumber,
      data.marriageRegime,
      data.divorceNumber,
      data.divorceDate,
      data.divorceCourt,
      data.divorceAutos,
      data.deceasedSpouseName,
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
    console.error('Error inserting data: ', err)
    throw err
  }
}

const getPersons = (): PersonDataSheet[] | null => {
  const query = `SELECT * FROM person_data_sheets`

  try {
    const stmt = db.prepare(query)
    const rows = stmt.all()
    return rows
  } catch (err) {
    console.error('Error retrieving data: ', err)
    throw err
  }
}

const getPersonDataSheetById = (id: number): PersonDataSheet | null => {
  const query = `SELECT * FROM person_data_sheets WHERE id = ?`

  try {
    const stmt = db.prepare(query)
    const row = stmt.get(id)
    if (row) {
      return {
        ...row,
        isPoliticallyExposed: Boolean(row.isPoliticallyExposed) // Convert integer to boolean
      }
    }
    return null
  } catch (err) {
    console.error('Error retrieving data: ', err)
    throw err
  }
}

const updatePersonDataSheet = (data: PersonDataSheet) => {
  const query = `
    UPDATE person_data_sheets SET
      name = ?, lastName = ?, gender = ?, nationality = ?, documentType = ?, documentNumber = ?,
      CUIT_L = ?, birthdate = ?, birthplace = ?, maritalStatus = ?, spouseName = ?, spouseNumber = ?,
      marriageRegime = ?, divorceNumber = ?, divorceDate = ?, divorceCourt = ?, divorceAutos = ?,
      deceasedSpouseName = ?, numberOfChildren = ?, address = ?, city = ?, province = ?, profession = ?,
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
      data.spouseName,
      data.spouseNumber,
      data.marriageRegime,
      data.divorceNumber,
      data.divorceDate ? data.divorceDate.toISOString() : null,
      data.divorceCourt,
      data.divorceAutos,
      data.deceasedSpouseName,
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
    console.error('Error updating data: ', err)
    throw err
  }
}

const deletePersonDataSheet = (id: number) => {
  const query = `DELETE FROM person_data_sheets WHERE id = ?`

  try {
    const stmt = db.prepare(query)
    stmt.run(id)
  } catch (err) {
    console.error('Error deleting data: ', err)
    throw err
  }
}

export {
  createPersonDataSheet,
  deletePersonDataSheet,
  getPersonDataSheetById,
  getPersons,
  updatePersonDataSheet
}
