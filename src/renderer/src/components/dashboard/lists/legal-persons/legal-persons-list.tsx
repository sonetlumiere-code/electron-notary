import { useLegalPersons } from "@renderer/components/legal-persons-provider"
import { LegalPersonsDataTable } from "./data-table/legal-persons-data-table"

const LegalPersonsList = () => {
  const { legalPersons } = useLegalPersons()

  return legalPersons && <LegalPersonsDataTable data={legalPersons} />
}

export default LegalPersonsList
