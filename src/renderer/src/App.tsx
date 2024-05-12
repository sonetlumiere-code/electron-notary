import Nav from './components/layout/nav'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

function App(): JSX.Element {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r overflow-auto">
          <Nav />
        </aside>
        <main className="flex-1 overflow-auto min-h-[86vh] p-6 lg:p-8 bg-muted/40">
          <Button>click</Button>
          <Input type="text" />
        </main>
      </div>
    </div>
  )
}

export default App
