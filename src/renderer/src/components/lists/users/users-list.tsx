import { User } from "@shared/types"
import { useEffect, useState } from "react"

const UsersList = () => {
  const [users, setUsers] = useState<User[] | null>(null)

  useEffect(() => {
    const getUsers = async () => {
      const res = await window.api.getUsers()
      setUsers(res)
      console.log(res)
    }

    getUsers()
  }, [])

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id} className="flex gap-5">
          <p>{user.id}</p>
          <h1>{user.name}</h1>
          <h2>{user.email}</h2>
        </div>
      ))}
    </div>
  )
}

export default UsersList
