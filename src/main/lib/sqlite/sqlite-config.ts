import Database from "better-sqlite3"
import { seedDatabase } from "./seed-db"

const db = new Database("./sqlite.db")

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS person_data_sheets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      lastName TEXT NOT NULL,
      gender TEXT CHECK (gender IN ('Masculino', 'Femenino', 'Otro')),
      nationality TEXT NOT NULL,
      documentType TEXT CHECK (documentType IN ('DNI', 'LC', 'LE', 'Pasaporte', 'Otro')),
      documentNumber INTEGER NOT NULL,
      CUIT_L INTEGER NOT NULL,
      birthdate TEXT NOT NULL,
      birthplace TEXT NOT NULL,
      maritalStatus TEXT CHECK (maritalStatus IN ('Soltero', 'Casado', 'Divorciado', 'Viudo')),
      fatherName TEXT,
      motherName TEXT,
      spouseName TEXT,
      marriageNumber INTEGER,
      marriageRegime TEXT CHECK (marriageRegime IN ('Régimen de comunidad de ganancias', 'Régimen de separación de bienes')),
      divorceSpouseName TEXT,
      divorceDate TEXT,
      divorceCourt TEXT,
      divorce TEXT,
      widowNumber INTEGER,
      numberOfChildren INTEGER,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      profession TEXT NOT NULL,
      phoneNumber INTEGER,
      mobileNumber INTEGER,
      email TEXT NOT NULL,
      isPoliticallyExposed INTEGER CHECK (isPoliticallyExposed IN (0, 1)),
      politicalPosition TEXT,
      originOfFunds TEXT,
      referredBy TEXT,
      observations TEXT
    );

    CREATE TABLE IF NOT EXISTS legal_person_data_sheets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      businessName TEXT NOT NULL,
      CUIT INTEGER NOT NULL,
      legalAddress TEXT NOT NULL,
      mainActivity TEXT NOT NULL,
      instrumentOfConstitution TEXT NOT NULL,
      registrationDate TEXT NOT NULL,
      registrationOffice TEXT CHECK (registrationOffice IN ('DPPJ', 'IGJ')),
      registeredOfficePhone INTEGER NOT NULL,
      registeredOfficeAddress TEXT NOT NULL,
      registeredOfficeEmail TEXT NOT NULL,
      statuteCopy TEXT NOT NULL,
      proceedingsCopy TEXT NOT NULL,
      balanceCopy TEXT NOT NULL,
      representativeData TEXT NOT NULL,
      enrollment TEXT NOT NULL,
      file TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS activity (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      act TEXT NOT NULL,
      observations TEXT,
      attachedFile TEXT,
      person_id INTEGER,
      legal_person_id INTEGER,
      FOREIGN KEY (person_id) REFERENCES person_data_sheets(id),
      FOREIGN KEY (legal_person_id) REFERENCES legal_person_data_sheets(id)
      CHECK (person_id IS NOT NULL AND legal_person_id IS NULL OR person_id IS NULL AND legal_person_id IS NOT NULL)
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
