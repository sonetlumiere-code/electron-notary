import { LegalPersonDataSheet } from "@shared/types"
import React, { createContext, useContext, useEffect, useState } from "react"

type LegalPersonProviderProps = {
  children: React.ReactNode
}

type LegalPersonProviderState = {
  legalPersons: LegalPersonDataSheet[]
  addLegalPersons: (newLegalPersons: LegalPersonDataSheet[]) => void
  deleteLegalPersons: (ids: number[]) => void
  clearLegalPersons: () => void
  updateLegalPerson: (id: number, updatedLegalPerson: Partial<LegalPersonDataSheet>) => void
}

const initialLegalPersonState: LegalPersonProviderState = {
  legalPersons: [],
  addLegalPersons: () => {},
  deleteLegalPersons: () => {},
  clearLegalPersons: () => {},
  updateLegalPerson: () => {}
}

const LegalPersonContext = createContext<LegalPersonProviderState>(initialLegalPersonState)

export const useLegalPersons = () => useContext(LegalPersonContext)

export const LegalPersonProvider = ({ children }: LegalPersonProviderProps) => {
  const [legalPersons, setLegalPersons] = useState<LegalPersonDataSheet[]>([])

  useEffect(() => {
    const getLegalPersons = async () => {
      const res = await window.legalPersonAPI.getLegalPersons()
      setLegalPersons(res || [])
    }

    getLegalPersons()
  }, [])

  const addLegalPersons = (newLegalPersons: LegalPersonDataSheet[]) => {
    setLegalPersons([...legalPersons, ...newLegalPersons])
  }

  const deleteLegalPersons = (ids: number[]) => {
    setLegalPersons(
      legalPersons.filter((legalPerson) => legalPerson.id && !ids.includes(legalPerson.id))
    )
  }

  const updateLegalPerson = (id: number, updatedLegalPerson: Partial<LegalPersonDataSheet>) => {
    setLegalPersons(
      legalPersons.map((legalPerson) =>
        legalPerson.id === id ? { ...legalPerson, ...updatedLegalPerson } : legalPerson
      )
    )
  }

  const clearLegalPersons = () => {
    setLegalPersons([])
  }

  const value: LegalPersonProviderState = {
    legalPersons,
    addLegalPersons,
    deleteLegalPersons,
    updateLegalPerson,
    clearLegalPersons
  }

  return <LegalPersonContext.Provider value={value}>{children}</LegalPersonContext.Provider>
}
