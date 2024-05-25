import fs from "fs"
import { getPersons } from "../sqlite/models/person"

export const exportToJSON = (filePath: string) => {
  const data = getPersons()

  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    console.log(`Data successfully exported to ${filePath}`)
  } catch (err) {
    console.error("Error writing to file: ", err)
    throw err
  }
}
