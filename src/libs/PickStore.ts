import { create } from 'zustand'

export type pickValueType = {
  deposit: boolean
  food: boolean
  housing: boolean
  utilities: boolean
  water: boolean
  daily: boolean
  entertainment: boolean
  pass: boolean
  other: boolean
}

type stateType = {
  pickValue: pickValueType
  modifyPickValue: (state: pickValueType) => void
}

export const PickStore = create<stateType>((set) => ({
  pickValue: {
    deposit: false,
    food: false,
    housing: false,
    utilities: false,
    water: false,
    daily: false,
    entertainment: false,
    pass: false,
    other: false,
  },
  modifyPickValue: (state) => set({ pickValue: state }),
}))
