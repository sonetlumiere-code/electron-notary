import { ConfirmationServiceProvider } from "./components/confirmation-provider"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "./components/ui/toaster"
import AppRoutes from "./routes/app-routes"

function App(): JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ConfirmationServiceProvider>
        <AppRoutes />
        <Toaster />
      </ConfirmationServiceProvider>
    </ThemeProvider>
  )
}

export default App
