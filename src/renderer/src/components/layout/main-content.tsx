import { User } from '@prisma/client'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const MainContent = () => {
  const [users, setUsers] = useState<User[] | null>(null)
  // Pattern 1
  const renderToMain = async () => {
    window.api.createUser({ name: 'pattern1' })
  }

  // Pattern 2
  const renderToMain2Way = async () => {
    const userName = await window.api.createUserWithReply({ name: 'pattern2' })
    console.log(userName)
  }

  useEffect(() => {
    const getUsers = async () => {
      const res = await window.api.getUsers()
      setUsers(res)
    }

    getUsers()
  }, [])

  return (
    <div className="p-5">
      <Button onClick={renderToMain}>Renderer to Main</Button>

      <Button onClick={renderToMain2Way}>Renderer to Main 2 Ways</Button>
      <Input type="text" />

      {users?.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
        </div>
      ))}
    </div>
  )
}

export default MainContent
