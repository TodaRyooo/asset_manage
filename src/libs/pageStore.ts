import { create } from 'zustand'

export type pageValueType = {
  allocation: boolean
  expenses: boolean
  history: boolean
  settings: boolean
}

type stateType = {
  pageValue: pageValueType
  modifyPageValue: (state: pageValueType) => void
}

export const PageStore = create<stateType>((set) => ({
  pageValue: {
    allocation: true,
    expenses: false,
    history: false,
    settings: false,
  },
  modifyPageValue: (state) => set({ pageValue: state }),
}))
