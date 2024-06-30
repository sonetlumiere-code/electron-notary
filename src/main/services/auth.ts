import db from "@/lib/sqlite/sqlite-config"
import bcrypt from "bcryptjs"

const logIn = ({ username, password }: { username: string; password: string }) => {
  const stmt = db.prepare("SELECT * FROM users WHERE username = ?")
  const user = stmt.get(username)

  if (!user) {
    return { error: "Usuario no existe." }
  }

  const passwordMatch = bcrypt.compareSync(password, user.password)
  if (!passwordMatch) {
    return { error: "Credenciales incorrectas." }
  }

  const userData = {
    id: user.id,
    username: user.username
  }

  return { user: userData }
}

export { logIn }
