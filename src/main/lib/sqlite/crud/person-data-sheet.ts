import { PersonDataSheet } from "@shared/types"
import db from "../sqlite-config"

const createPerson = (data: PersonDataSheet) => {
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
    console.error("Error inserting data: ", err)
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
      return {
        ...row,
        isPoliticallyExposed: Boolean(row.isPoliticallyExposed) // Convert integer to boolean
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
    console.error("Error updating data: ", err)
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

const searchPersons = (filters: Partial<PersonDataSheet>): PersonDataSheet[] => {
  let query = `SELECT * FROM person_data_sheets WHERE 1=1`
  const params: (string | number | Date | null)[] = []

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
    return rows.map((row: PersonDataSheet) => ({
      ...row,
      birthdate: new Date(row.birthdate),
      divorceDate: row.divorceDate ? new Date(row.divorceDate) : null,
      isPoliticallyExposed: Boolean(row.isPoliticallyExposed)
    }))
  } catch (err) {
    console.error("Error searching data: ", err)
    throw err
  }
}

export { createPerson, deletePerson, getPersonById, getPersons, searchPersons, updatePerson }
