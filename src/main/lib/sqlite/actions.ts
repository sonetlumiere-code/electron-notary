// import db from './sqlite-config'

// const createUser = async ({ name, email }: { name: string; email: string }) => {
//   const query = `INSERT INTO users (name, email) VALUES (?, ?)`

//   return new Promise((resolve, reject) => {
//     db.run(query, [name, email], function (err) {
//       if (err) {
//         console.error('Error inserting data: ', err)
//         reject(err)
//       } else {
//         resolve({
//           id: this.lastID,
//           name,
//           email
//         })
//       }
//     })
//   })
// }

// const getUsers = async () => {
//   const query = `SELECT * FROM users`

//   return new Promise((resolve, reject) => {
//     db.all(query, [], (err, rows) => {
//       if (err) {
//         console.error('Error retrieving data: ', err)
//         reject(err)
//       } else {
//         resolve(rows)
//       }
//     })
//   })
// }

// const getUserById = async (id: number) => {
//   const query = `SELECT * FROM users WHERE id = ?`

//   return new Promise((resolve, reject) => {
//     db.get(query, [id], (err, row) => {
//       if (err) {
//         console.error('Error retrieving data: ', err)
//         reject(err)
//       } else {
//         resolve(row)
//       }
//     })
//   })
// }

// const updateUser = async ({ id, name, email }: { id: number; name: string; email: string }) => {
//   const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`

//   return new Promise((resolve, reject) => {
//     db.run(query, [name, email, id], function (err) {
//       if (err) {
//         console.error('Error updating data: ', err)
//         reject(err)
//       } else {
//         resolve({
//           id,
//           name,
//           email
//         })
//       }
//     })
//   })
// }

// const deleteUser = async (id: number) => {
//   const query = `DELETE FROM users WHERE id = ?`

//   return new Promise((resolve, reject) => {
//     db.run(query, [id], function (err) {
//       if (err) {
//         console.error('Error deleting data: ', err)
//         reject(err)
//       } else {
//         resolve({ id })
//       }
//     })
//   })
// }

// export { createUser, deleteUser, getUserById, getUsers, updateUser }

import db from './sqlite-config'

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
    console.error('Error inserting data: ', err)
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
    console.error('Error retrieving data: ', err)
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
    console.error('Error retrieving data: ', err)
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
    console.error('Error updating data: ', err)
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
    console.error('Error deleting data: ', err)
    throw err
  }
}

export { createUser, deleteUser, getUserById, getUsers, updateUser }
