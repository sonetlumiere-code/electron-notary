import db from './sqlite-config'

const createUser = ({ name, email }: { name: string; email: string }) => {
  const query = `INSERT INTO users (name, email) VALUES (?, ?)`

  db.run(query, [name, email], function (err) {
    if (err) {
      console.error('Error inserting data: ', err)
    } else {
      console.log(`A row has been inserted with rowid ${this.lastID}`)
    }
  })
}

const getUsers = () => {
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
