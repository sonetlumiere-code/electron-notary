import db from './sqlite-config'

const createUser = async ({ name, email }: { name: string; email: string }) => {
  const query = `INSERT INTO users (name, email) VALUES (?, ?)`

  return new Promise((resolve, reject) => {
    db.run(query, [name, email], function (err) {
      if (err) {
        console.error('Error inserting data: ', err)
        reject(err)
      } else {
        resolve({
          id: this.lastID,
          name,
          email
        })
      }
    })
  })
}

const getUsers = async () => {
  const query = `SELECT * FROM users`

  return new Promise((resolve, reject) => {
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error('Error retrieving data: ', err)
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

const getUserById = async (id: number) => {
  const query = `SELECT * FROM users WHERE id = ?`

  return new Promise((resolve, reject) => {
    db.get(query, [id], (err, row) => {
      if (err) {
        console.error('Error retrieving data: ', err)
        reject(err)
      } else {
        resolve(row)
      }
    })
  })
}

const updateUser = async ({ id, name, email }: { id: number; name: string; email: string }) => {
  const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`

  return new Promise((resolve, reject) => {
    db.run(query, [name, email, id], function (err) {
      if (err) {
        console.error('Error updating data: ', err)
        reject(err)
      } else {
        resolve({
          id,
          name,
          email
        })
      }
    })
  })
}

const deleteUser = async (id: number) => {
  const query = `DELETE FROM users WHERE id = ?`

  return new Promise((resolve, reject) => {
    db.run(query, [id], function (err) {
      if (err) {
        console.error('Error deleting data: ', err)
        reject(err)
      } else {
        resolve({ id })
      }
    })
  })
}

export { createUser, deleteUser, getUserById, getUsers, updateUser }
