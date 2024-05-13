import { Button } from '../ui/button'
import { Input } from '../ui/input'

const MainContent = () => {
  const createUser = async () => {
    // window.electron.ipcRenderer.send('create-user', { name: 'wow' })

    // window.electronApi.createUser({ name: 'wow' })

    const userName = await window.electronApi.createUserWithReply({ name: 'wow' })
    console.log(userName)
  }

  return (
    <div className="p-5">
      <Button onClick={createUser}>create user</Button>
      <Input type="text" />
    </div>
  )
}

export default MainContent
