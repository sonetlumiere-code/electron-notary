import { LegalPersonDataSheet } from '../../../types'
import db from '../sqlite-config'

const createLegalPersonDataSheet = (data: LegalPersonDataSheet) => {
  const query = `
    INSERT INTO legal_person_data_sheets (
      id, businessName, CUIT, legalAddress, mainActivity, instrumentOfConstitution, registrationDate,
      registrationNumber, registeredOfficePhone, registeredOfficeAddress, registeredOfficeEmail, statuteCopy,
      proceedingsCopy, balanceCopy, representativeData
    ) VALUES (
      @id, @businessName, @CUIT, @legalAddress, @mainActivity, @instrumentOfConstitution, @registrationDate,
      @registrationNumber, @registeredOfficePhone, @registeredOfficeAddress, @registeredOfficeEmail, @statuteCopy,
      @proceedingsCopy, @balanceCopy, @representativeData
    )
  `

  try {
    const stmt = db.prepare(query)
    stmt.run({
      ...data,
      registrationDate: data.registrationDate.toISOString() // Convert Date to string
    })
  } catch (err) {
    console.error('Error inserting data: ', err)
    throw err
  }
}

const getLegalPersonDataSheetById = (id: string): LegalPersonDataSheet | null => {
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
    console.error('Error retrieving data: ', err)
    throw err
  }
}

const updateLegalPersonDataSheet = (data: LegalPersonDataSheet) => {
  const query = `
    UPDATE legal_person_data_sheets SET
      businessName = @businessName,
      CUIT = @CUIT,
      legalAddress = @legalAddress,
      mainActivity = @mainActivity,
      instrumentOfConstitution = @instrumentOfConstitution,
      registrationDate = @registrationDate,
      registrationNumber = @registrationNumber,
      registeredOfficePhone = @registeredOfficePhone,
      registeredOfficeAddress = @registeredOfficeAddress,
      registeredOfficeEmail = @registeredOfficeEmail,
      statuteCopy = @statuteCopy,
      proceedingsCopy = @proceedingsCopy,
      balanceCopy = @balanceCopy,
      representativeData = @representativeData
    WHERE id = @id
  `

  try {
    const stmt = db.prepare(query)
    stmt.run({
      ...data,
      registrationDate: data.registrationDate.toISOString()
    })
  } catch (err) {
    console.error('Error updating data: ', err)
    throw err
  }
}

const deleteLegalPersonDataSheet = (id: string) => {
  const query = `DELETE FROM legal_person_data_sheets WHERE id = ?`

  try {
    const stmt = db.prepare(query)
    stmt.run(id)
  } catch (err) {
    console.error('Error deleting data: ', err)
    throw err
  }
}

export {
  createLegalPersonDataSheet,
  deleteLegalPersonDataSheet,
  getLegalPersonDataSheetById,
  updateLegalPersonDataSheet
}
