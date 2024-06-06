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
      <Moon className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Sun className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  )
}
