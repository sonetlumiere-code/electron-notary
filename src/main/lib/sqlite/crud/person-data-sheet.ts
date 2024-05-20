import { PersonDataSheet } from '../../../types/index'
import db from '../sqlite-config'

const createPersonDataSheet = (data: PersonDataSheet) => {
  const query = `
    INSERT INTO person_data_sheets (
      id, name, lastName, gender, nationality, documentType, documentNumber, CUIT_L, birthdate, birthplace,
      maritalStatus, numberOfChildren, address, city, province, profession, phoneNumber, mobileNumber, email,
      isPoliticallyExposed, politicalPosition, originOfFunds, reasonForChoosing, referredBy
    ) VALUES (
      @id, @name, @lastName, @gender, @nationality, @documentType, @documentNumber, @CUIT_L, @birthdate, @birthplace,
      @maritalStatus, @numberOfChildren, @address, @city, @province, @profession, @phoneNumber, @mobileNumber, @email,
      @isPoliticallyExposed, @politicalPosition, @originOfFunds, @reasonForChoosing, @referredBy
    )
  `

  try {
    const stmt = db.prepare(query)
    stmt.run({
      ...data,
      birthdate: data.birthdate.toISOString(), // Convert Date to string
      isPoliticallyExposed: data.isPoliticallyExposed ? 1 : 0 // Convert boolean to integer
    })
  } catch (err) {
    console.error('Error inserting data: ', err)
    throw err
  }
}

const getPersonDataSheetById = (id: string): PersonDataSheet | null => {
  const query = `SELECT * FROM person_data_sheets WHERE id = ?`

  try {
    const stmt = db.prepare(query)
    const row = stmt.get(id)
    if (row) {
      return {
        ...row,
        birthdate: new Date(row.birthdate), // Convert string to Date
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
      name = @name,
      lastName = @lastName,
      gender = @gender,
      nationality = @nationality,
      documentType = @documentType,
      documentNumber = @documentNumber,
      CUIT_L = @CUIT_L,
      birthdate = @birthdate,
      birthplace = @birthplace,
      maritalStatus = @maritalStatus,
      numberOfChildren = @numberOfChildren,
      address = @address,
      city = @city,
      province = @province,
      profession = @profession,
      phoneNumber = @phoneNumber,
      mobileNumber = @mobileNumber,
      email = @email,
      isPoliticallyExposed = @isPoliticallyExposed,
      politicalPosition = @politicalPosition,
      originOfFunds = @originOfFunds,
      reasonForChoosing = @reasonForChoosing,
      referredBy = @referredBy
    WHERE id = @id
  `

  try {
    const stmt = db.prepare(query)
    stmt.run({
      ...data,
      birthdate: data.birthdate.toISOString(),
      isPoliticallyExposed: data.isPoliticallyExposed ? 1 : 0
    })
  } catch (err) {
    console.error('Error updating data: ', err)
    throw err
  }
}

const deletePersonDataSheet = (id: string) => {
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
  updatePersonDataSheet
}
