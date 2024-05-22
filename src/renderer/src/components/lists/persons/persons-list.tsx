import PageTitle from '@renderer/components/page-title'
import { PersonDataSheet } from '@shared/types'
import { useEffect, useState } from 'react'
import { PersonsDataTable } from './data-table/persons-data-table'

const PersonsList = () => {
  const [persons, setPersons] = useState<PersonDataSheet[] | null>(null)

  // useEffect(() => {
  //   const getPersons = async () => {
  //     const res = await window.api.getPersons()
  //     setPersons(res)
  //     console.log(res)
  //   }

  //   getPersons()
  // }, [])

  useEffect(() => {
    const getPersons = async () => {
      const res = await window.api.searchPersons({
        name: 'Al',
        email: 'alfio.doe@exampl'
      })
      setPersons(res)
      console.log(res)
    }

    getPersons()
  }, [])

  return (
    <div className="space-y-6">
      <PageTitle>Fichas personales</PageTitle>

      {persons && <PersonsDataTable data={persons} />}
    </div>
  )
}

export default PersonsList
