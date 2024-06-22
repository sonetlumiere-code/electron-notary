import { AuthProvider } from "./components/auth-provider"
import { ConfirmationServiceProvider } from "./components/confirmation-provider"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/toaster"
import AppRoutes from "./routes/app-routes"

function App(): JSX.Element {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <ConfirmationServiceProvider>
          <AppRoutes />
          <Toaster />
        </ConfirmationServiceProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
