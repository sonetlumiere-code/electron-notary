import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./sqlite.db', (err) => {
  if (err) {
    console.error('Database opening error: ', err)
  } else {
    console.log('Database opened successfully')
  }
})

db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )`,
  (err) => {
    if (err) {
      console.error('Table creation error: ', err)
    } else {
      console.log('Table created or already exists')
    }
  }
)

export default db
