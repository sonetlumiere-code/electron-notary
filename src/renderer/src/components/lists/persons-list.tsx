import { PersonDataSheet } from '@shared/types'
import { useEffect, useState } from 'react'

const PersonsList = () => {
  const [persons, setPersons] = useState<PersonDataSheet[] | null>(null)

  useEffect(() => {
    const getPersons = async () => {
      const res = await window.api.getPersons()
      setPersons(res)
      console.log(res)
    }

    getPersons()
  }, [])

  return (
    <>
      <div>PersonsList</div>
      {persons?.map((person) => (
        <div key={person.id} className="flex gap-5">
          <p>{person.id}</p>
          <h1>{person.name}</h1>
          <h2>{person.email}</h2>
        </div>
      ))}
    </>
  )
}

export default PersonsList
