import { LegalPersonDataSheet } from "@shared/types"
import { useEffect, useState } from "react"

const LegalPersonsListPage = () => {
  const [legalPersons, setLegalPersons] = useState<LegalPersonDataSheet[] | null>(null)

  useEffect(() => {
    const getLegalPersons = async () => {
      const res = await window.legalPersonAPI.getLegalPersons()
      setLegalPersons(res)
      console.log(res)
    }

    getLegalPersons()
  }, [])

  return (
    <>
      <div>Legal Persons List</div>
      {legalPersons?.map((legalPerson) => (
        <div key={legalPerson.id} className="flex gap-5">
          <p>{legalPerson.id}</p>
          <h1>{legalPerson.CUIT}</h1>
          <h2>{legalPerson.mainActivity}</h2>
        </div>
      ))}
    </>
  )
}

export default LegalPersonsListPage
