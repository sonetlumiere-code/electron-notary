// import { useEffect } from 'react'
import { useEffect } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const MainContent = () => {
  const createUser = () => {
    window.electron.ipcRenderer.send('create-user', { name: 'wow' })
  }

  useEffect(() => {
    const handleUserCreated = (_event, data) => {
      console.log(data)
    }

    window.electron.ipcRenderer.on('user-created', handleUserCreated)

    return () => {
      window.electron.ipcRenderer.removeListener('user-created', handleUserCreated)
    }
  }, [])

  return (
    <div className="p-5">
      <Button onClick={createUser}>create user</Button>
      <Input type="text" />
    </div>
  )
}

export default MainContent
