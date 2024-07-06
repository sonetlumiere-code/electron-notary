import { ActivitiesProvider } from "./components/activities-provider"
import { AuthProvider } from "./components/auth-provider"
import { ConfirmationServiceProvider } from "./components/confirmation-provider"
import { LegalPersonProvider } from "./components/legal-persons-provider"
import { PersonProvider } from "./components/persons-provider"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/toaster"
import AppRoutes from "./routes/app-routes"

function App(): JSX.Element {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <ActivitiesProvider>
          <PersonProvider>
            <LegalPersonProvider>
              <ConfirmationServiceProvider>
                <AppRoutes />
                <Toaster />
              </ConfirmationServiceProvider>
            </LegalPersonProvider>
          </PersonProvider>
        </ActivitiesProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
