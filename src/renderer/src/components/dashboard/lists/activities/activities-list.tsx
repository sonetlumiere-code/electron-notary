import { useActivities } from "@renderer/components/activities-provider"

const ActivitiesList = () => {
  const { activities } = useActivities()

  return (
    <div>
      ActivitiesList <div>{JSON.stringify(activities)}</div>
    </div>
  )
}

export default ActivitiesList
