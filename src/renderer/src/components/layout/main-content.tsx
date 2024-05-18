import { Button } from '../ui/button'
import { Input } from '../ui/input'

const MainContent = () => {
  // Pattern 1
  const renderToMain = async () => {
    window.api.createUser({ name: 'pattern1' })
  }

  // Pattern 2
  const renderToMain2Way = async () => {
    const userName = await window.api.createUserWithReply({ name: 'pattern2' })
    console.log(userName)
  }

  return (
    <div className="p-5">
      <Button onClick={renderToMain}>Renderer to Main</Button>

      <Button onClick={renderToMain2Way}>Renderer to Main 2 Ways</Button>
      <Input type="text" />
    </div>
  )
}

export default MainContent
