import { Button } from '@renderer/components/ui/button'

const CreatePersonPage = () => {
  const create = async () => {
    window.api.createUser({ name: 'pattern1', email: 'asd@123.com' })
  }

  return (
    <div>
      Create person
      <Button onClick={create}>Create user</Button>
    </div>
  )
}

export default CreatePersonPage
