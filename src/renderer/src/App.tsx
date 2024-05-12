import Header from './components/layout/header'
import MainContent from './components/layout/main-content'
import Nav from './components/layout/nav'

function App(): JSX.Element {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden lg:block w-64 border-r overflow-auto">
          <Nav />
        </aside>
        <main className="flex-1 overflow-auto min-h-[86vh] bg-muted/40">
          <Header />
          <MainContent />
        </main>
      </div>
    </div>
  )
}

export default App
