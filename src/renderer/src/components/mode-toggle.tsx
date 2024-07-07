import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Button variant="ghost" size="icon" aria-label="Toggle Theme" onClick={toggleTheme}>
      {theme === "dark" && <Sun className="h-6 w-6" />}
      {theme === "light" && <Moon className="h-6 w-6" />}

      <span className="sr-only">Toggle Theme</span>
    </Button>
  )
}
