import { CircleAlert } from "lucide-react"

type FormErrorProps = {
  message: string
}

const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null

  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-destructive text-sm">
      <CircleAlert className="w-4 h-4" />
      {message}
    </div>
  )
}

export default FormError
