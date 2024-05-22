import PersonsList from '@renderer/components/lists/persons/persons-list'

const HomePage = () => {
  return (
    <div className="space-y-12">
      Home page
      {/* <UsersList /> */}
      <PersonsList />
      {/* <LegalPersonsList /> */}
    </div>
  )
}

export default HomePage
