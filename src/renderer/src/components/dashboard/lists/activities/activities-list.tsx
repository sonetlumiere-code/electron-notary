import { useActivities } from "@renderer/components/activities-provider"
import { ActivitiesDataTable } from "./data-table/activities-data-table"

const ActivitiesList = () => {
  const { activities } = useActivities()

  return activities && <ActivitiesDataTable data={activities} />
}

export default ActivitiesList
