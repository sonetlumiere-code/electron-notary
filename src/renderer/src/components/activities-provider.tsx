import { Activity } from "@shared/types"
import React, { createContext, useContext, useEffect, useState } from "react"

type ActivitiesProviderProps = {
  children: React.ReactNode
}

type ActivitiesProviderState = {
  activities: Activity[]
  addActivities: (newActivities: Activity[]) => void
  deleteActivities: (ids: number[]) => void
  clearActivities: () => void
  updateActivity: (id: number, updatedActivity: Partial<Activity>) => void
}

const initialActivitiesState: ActivitiesProviderState = {
  activities: [],
  addActivities: () => {},
  deleteActivities: () => {},
  clearActivities: () => {},
  updateActivity: () => {}
}

const ActivitiesContext = createContext<ActivitiesProviderState>(initialActivitiesState)

export const useActivities = () => useContext(ActivitiesContext)

export const ActivitiesProvider = ({ children }: ActivitiesProviderProps) => {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const getActivities = async () => {
      const res = await window.activityAPI.getActivities()
      setActivities(res || [])
    }

    getActivities()
  }, [])

  const addActivities = (newActivities: Activity[]) => {
    setActivities([...activities, ...newActivities])
  }

  const deleteActivities = (ids: number[]) => {
    setActivities(activities.filter((activity) => activity.id && !ids.includes(activity.id)))
  }

  const updateActivity = (id: number, updatedActivity: Partial<Activity>) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id ? { ...activity, ...updatedActivity } : activity
      )
    )
  }

  const clearActivities = () => {
    setActivities([])
  }

  const value: ActivitiesProviderState = {
    activities,
    addActivities,
    deleteActivities,
    updateActivity,
    clearActivities
  }

  return <ActivitiesContext.Provider value={value}>{children}</ActivitiesContext.Provider>
}
