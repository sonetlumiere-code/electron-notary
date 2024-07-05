import { usePersons } from "@renderer/components/persons-provider"
import { PersonsDataTable } from "./data-table/persons-data-table"

const PersonsList = () => {
  const { persons } = usePersons()

  return persons && <PersonsDataTable data={persons} />
}

export default PersonsList
