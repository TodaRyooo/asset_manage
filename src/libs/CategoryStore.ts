import { create } from 'zustand'

export type categoryValueType = {
  deposit: number
  food: number
  housing: number
  utilities: number
  water: number
  daily: number
  entertainment: number
  pass: number
  other: number
}

type stateType = {
  income: number
  categoryValue: categoryValueType
  remain: number
  categorySum: number
  modifyIncomeValue: (state: number) => void
  modifyCategoryValue: (state: categoryValueType) => void
  modifyRemainValue: (state: number) => void
  modifyCategorySumValue: (state: number) => void
}

export const CategoryStore = create<stateType>((set, get) => ({
  income: 0,
  categoryValue: {
    deposit: 0,
    food: 0,
    housing: 0,
    utilities: 0,
    water: 0,
    daily: 0,
    entertainment: 0,
    pass: 0,
    other: 0,
  },
  remain: 100,
  categorySum: 0,
  modifyIncomeValue: (state) => set({ income: state }),
  modifyCategoryValue: (state) => set({ categoryValue: state }),
  modifyRemainValue: (state) => set({ remain: state }),
  modifyCategorySumValue: (state) => set({ categorySum: state }),
}))
