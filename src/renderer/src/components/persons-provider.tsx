import { PersonDataSheet } from "@shared/types"
import React, { createContext, useContext, useEffect, useState } from "react"

type PersonProviderProps = {
  children: React.ReactNode
}

type PersonProviderState = {
  persons: PersonDataSheet[]
  addPersons: (newPersons: PersonDataSheet[]) => void
  deletePersons: (ids: number[]) => void
  clearPersons: () => void
  updatePerson: (id: number, updatedPerson: Partial<PersonDataSheet>) => void
}

const initialPersonState: PersonProviderState = {
  persons: [],
  addPersons: () => {},
  deletePersons: () => {},
  clearPersons: () => {},
  updatePerson: () => {}
}

const PersonContext = createContext<PersonProviderState>(initialPersonState)

export const usePersons = () => useContext(PersonContext)

export const PersonProvider = ({ children }: PersonProviderProps) => {
  const [persons, setPersons] = useState<PersonDataSheet[]>([])

  useEffect(() => {
    const getPersons = async () => {
      const res = await window.personAPI.getPersons()
      setPersons(res || [])
    }

    getPersons()
  }, [])

  const addPersons = (newPersons: PersonDataSheet[]) => {
    setPersons([...persons, ...newPersons])
  }

  const deletePersons = (ids: number[]) => {
    setPersons(persons.filter((person) => person.id && !ids.includes(person.id)))
  }

  const updatePerson = (id: number, updatedPerson: Partial<PersonDataSheet>) => {
    setPersons(
      persons.map((person) => (person.id === id ? { ...person, ...updatedPerson } : person))
    )
  }

  const clearPersons = () => {
    setPersons([])
  }

  const value: PersonProviderState = {
    persons,
    addPersons,
    deletePersons,
    updatePerson,
    clearPersons
  }

  return <PersonContext.Provider value={value}>{children}</PersonContext.Provider>
}
