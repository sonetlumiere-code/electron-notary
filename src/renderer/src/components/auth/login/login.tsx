import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@renderer/components/auth-provider"
import FormError from "@renderer/components/auth/form-error"
import { Button } from "@renderer/components/ui/button"
import { Checkbox } from "@renderer/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@renderer/components/ui/form"
import { Input } from "@renderer/components/ui/input"
import { AuthSchema, zodAuthSchema } from "@renderer/lib/validators/auth-validator"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string>("")

  const { login } = useAuth()

  const form = useForm<AuthSchema>({
    resolver: zodResolver(zodAuthSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberSession: false
    }
  })

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form

  async function onSubmit(values: AuthSchema) {
    setError("")

    const res = await login(values)

    if (res.error) {
      setError(res.error)
    }
  }

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="usuario" disabled={isSubmitting} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="contraseña"
                        type={showPassword ? "text" : "password"}
                        autoCapitalize="none"
                        autoComplete="on"
                        disabled={isSubmitting}
                        {...field}
                      />
                      <span className="absolute inset-y-0 end-1">
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="hover:bg-transparent"
                          disabled={isSubmitting}
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          <span className="sr-only"></span>
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </Button>
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberSession"
              render={({ field }) => (
                <FormItem className="flex items-end space-x-2">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="m-0">Mantener sesión activa</FormLabel>
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Iniciar sesión</>}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default LoginForm
