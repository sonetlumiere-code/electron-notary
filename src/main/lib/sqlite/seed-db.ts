import db from "./sqlite-config"

const seedAdminUser = async () => {
  const username = "Delfina"
  const hashedPassword = "$2a$10$i5X6XVd3nRaQgG9Tgow7FuZO/p5y6ADZZQV2kWwElnXMJNa5NQDDq"

  const stmt = db.prepare("SELECT COUNT(*) AS count FROM users WHERE username = ?")
  const row = stmt.get(username)

  if (row.count === 0) {
    const insertStmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)")
    insertStmt.run(username, hashedPassword)
    console.log("Admin user seeded successfully")
  } else {
    console.log("Admin user already exists")
  }
}

export const seedDatabase = () => {
  seedAdminUser()
}
