import Database from 'better-sqlite3'

const db = new Database('./sqlite.db')

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS person_data_sheets (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      lastName TEXT NOT NULL,
      gender TEXT NOT NULL,
      nationality TEXT NOT NULL,
      documentType TEXT NOT NULL,
      documentNumber INTEGER NOT NULL,
      CUIT_L INTEGER NOT NULL,
      birthdate TEXT NOT NULL,
      birthplace TEXT NOT NULL,
      maritalStatus TEXT NOT NULL,
      numberOfChildren INTEGER,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      province TEXT NOT NULL,
      profession TEXT NOT NULL,
      phoneNumber TEXT NOT NULL,
      mobileNumber TEXT NOT NULL,
      email TEXT NOT NULL,
      isPoliticallyExposed INTEGER,
      politicalPosition TEXT,
      originOfFunds TEXT,
      reasonForChoosing TEXT NOT NULL,
      referredBy TEXT
    );

    CREATE TABLE IF NOT EXISTS marital_status_details (
      person_id TEXT NOT NULL,
      spouseName TEXT,
      spouseNumber INTEGER,
      marriageRegime TEXT,
      divorceNumber INTEGER,
      divorceDate TEXT,
      divorceCourt TEXT,
      divorceAutos TEXT,
      deceasedSpouseName TEXT,
      FOREIGN KEY(person_id) REFERENCES person_data_sheets(id)
    );

    CREATE TABLE IF NOT EXISTS legal_person_data_sheets (
      id TEXT PRIMARY KEY,
      businessName TEXT NOT NULL,
      CUIT INTEGER NOT NULL,
      legalAddress TEXT NOT NULL,
      mainActivity TEXT NOT NULL,
      instrumentOfConstitution TEXT NOT NULL,
      registrationDate TEXT NOT NULL,
      registrationNumber INTEGER NOT NULL,
      registeredOfficePhone INTEGER NOT NULL,
      registeredOfficeAddress TEXT NOT NULL,
      registeredOfficeEmail TEXT NOT NULL,
      statuteCopy TEXT NOT NULL,
      proceedingsCopy TEXT NOT NULL,
      balanceCopy TEXT NOT NULL,
      representativeData TEXT NOT NULL
    );
  `)
  console.log('Database opened and tables checked/created successfully')
} catch (error) {
  console.error('Database or table creation error: ', error)
}

export default db
