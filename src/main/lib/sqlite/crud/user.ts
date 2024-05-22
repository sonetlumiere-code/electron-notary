import db from "../sqlite-config"

const createUser = ({ name, email }: { name: string; email: string }) => {
  const query = `INSERT INTO users (name, email) VALUES (?, ?)`

  try {
    const stmt = db.prepare(query)
    const info = stmt.run(name, email)
    return {
      id: info.lastInsertRowid,
      name,
      email
    }
  } catch (err) {
    console.error("Error inserting data: ", err)
    throw err
  }
}

const getUsers = () => {
  const query = `SELECT * FROM users`

  try {
    const stmt = db.prepare(query)
    const rows = stmt.all()
    return rows
  } catch (err) {
    console.error("Error retrieving data: ", err)
    throw err
  }
}

const getUserById = (id: number) => {
  const query = `SELECT * FROM users WHERE id = ?`

  try {
    const stmt = db.prepare(query)
    const row = stmt.get(id)
    return row
  } catch (err) {
    console.error("Error retrieving data: ", err)
    throw err
  }
}

const updateUser = ({ id, name, email }: { id: number; name: string; email: string }) => {
  const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`

  try {
    const stmt = db.prepare(query)
    stmt.run(name, email, id)
    return {
      id,
      name,
      email
    }
  } catch (err) {
    console.error("Error updating data: ", err)
    throw err
  }
}

const deleteUser = (id: number) => {
  const query = `DELETE FROM users WHERE id = ?`

  try {
    const stmt = db.prepare(query)
    stmt.run(id)
    return { id }
  } catch (err) {
    console.error("Error deleting data: ", err)
    throw err
  }
}

export { createUser, deleteUser, getUserById, getUsers, updateUser }
