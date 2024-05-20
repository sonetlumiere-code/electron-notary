import { Button } from '@renderer/components/ui/button'
import { toast } from '@renderer/components/ui/use-toast'

const CreatePersonPage = () => {
  const create = async () => {
    window.api.createUser({ name: 'aswd', email: 'asd@123.com' })
  }

  const createWithReply = async () => {
    try {
      const newUser = await window.api.createUserWithReply({
        name: 'w-repply',
        email: 'qweqwe@2332.com'
      })
      console.log(newUser)
      toast({
        title: 'New user created',
        description: newUser.name
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error creating user',
        description: 'Try again later.'
      })
    }
  }

  return (
    <div>
      Create person
      <Button onClick={create}>Create user</Button>
      <Button onClick={createWithReply}>Create w reply</Button>
    </div>
  )
}

export default CreatePersonPage
