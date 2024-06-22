import Database from "better-sqlite3"
import { seedDatabase } from "./seed-db"

const db = new Database("./sqlite.db")

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS person_data_sheets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      lastName TEXT NOT NULL,
      gender TEXT CHECK (gender IN ('MASCULINO', 'FEMENINO', 'OTRO')),
      nationality TEXT NOT NULL,
      documentType TEXT CHECK (documentType IN ('DNI', 'LC', 'LE', 'PASAPORTE')),
      documentNumber INTEGER NOT NULL,
      CUIT_L INTEGER NOT NULL,
      birthdate TEXT NOT NULL,
      birthplace TEXT NOT NULL,
      maritalStatus TEXT CHECK (maritalStatus IN ('SOLTERO', 'CASADO', 'DIVORCIADO', 'VIUDO')),
      maritalStatusSpouseName TEXT,
      maritalStatusSpouseNumber INTEGER,
      maritalStatusMarriageRegime TEXT,
      maritalStatusDivorceNumber INTEGER,
      maritalStatusDivorceDate TEXT,
      maritalStatusDivorceCourt TEXT,
      maritalStatusDivorceAutos TEXT,
      maritalStatusDeceasedSpouseName TEXT,
      numberOfChildren INTEGER,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      province TEXT NOT NULL,
      profession INTEGER,
      phoneNumber INTEGER,
      mobileNumber TEXT NOT NULL,
      email TEXT NOT NULL,
      isPoliticallyExposed INTEGER,
      politicalPosition TEXT,
      originOfFunds TEXT,
      reasonForChoosing TEXT NOT NULL,
      referredBy TEXT
    );

    CREATE TABLE IF NOT EXISTS legal_person_data_sheets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `)

  console.log("Database opened and tables checked/created successfully")

  seedDatabase()
} catch (error) {
  console.error("Database or table creation error: ", error)
}

export default db
