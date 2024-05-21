import LegalPersonsList from '@renderer/components/lists/legal-persons/legal-persons.list'
import PersonsList from '@renderer/components/lists/persons/persons-list'
import UsersList from '@renderer/components/lists/users/users-list'

const HomePage = () => {
  return (
    <div className="space-y-12">
      Home page
      <UsersList />
      <PersonsList />
      <LegalPersonsList />
    </div>
  )
}

export default HomePage
