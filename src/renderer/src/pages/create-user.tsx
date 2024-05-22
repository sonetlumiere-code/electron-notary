import { Button } from "@renderer/components/ui/button"
import { toast } from "@renderer/components/ui/use-toast"

const CreateUserPage = () => {
  const createWithReply = async () => {
    try {
      const newUser = await window.api.createUserWithReply({
        name: "w-repply",
        email: "qweqwe@2332.com"
      })
      console.log(newUser)
      toast({
        title: "New user created",
        description: newUser.name
      })
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error creating user",
        description: "Try again later."
      })
    }
  }

  return (
    <div>
      Create user page
      <Button onClick={createWithReply}>Create w reply</Button>
    </div>
  )
}

export default CreateUserPage
