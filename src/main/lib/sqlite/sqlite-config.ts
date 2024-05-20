// import sqlite3 from 'sqlite3'

// const db = new sqlite3.Database('./sqlite.db', (err) => {
//   if (err) {
//     console.error('Database opening error: ', err)
//   } else {
//     console.log('Database opened successfully')
//   }
// })

// db.run(
//   `CREATE TABLE IF NOT EXISTS users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     email TEXT
//   )`,
//   (err) => {
//     if (err) {
//       console.error('Table creation error: ', err)
//     } else {
//       console.log('Table created or already exists')
//     }
//   }
// )

// export default db

import Database from 'better-sqlite3'

// Open the database
const db = new Database('./sqlite.db')

try {
  // Create the users table if it doesn't exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL
    )
  `)
  console.log('Database opened and table checked/created successfully')
} catch (error) {
  console.error('Database or table creation error: ', error)
}

export default db
