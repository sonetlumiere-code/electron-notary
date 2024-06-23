import { AuthProvider } from "./components/auth-provider"
import { ConfirmationServiceProvider } from "./components/confirmation-provider"
import { PersonProvider } from "./components/persons-provider"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/toaster"
import AppRoutes from "./routes/app-routes"

function App(): JSX.Element {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <PersonProvider>
          <ConfirmationServiceProvider>
            <AppRoutes />
            <Toaster />
          </ConfirmationServiceProvider>
        </PersonProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
