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

export { createUser, getUsers }
