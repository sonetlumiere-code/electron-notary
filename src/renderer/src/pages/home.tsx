import LegalPersonsList from '@renderer/components/lists/legal-persons.list'
import PersonsList from '@renderer/components/lists/persons-list'
import UsersList from '@renderer/components/lists/users-list'

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
