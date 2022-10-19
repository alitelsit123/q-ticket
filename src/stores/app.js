import {atom} from 'jotai'

export const user = atom(null)
export const inspectNetwork = atom([])
export const otk = atom([])
export const dialog = atom({
  open: false,
  title: null,
  type: null,
  data: []
})
export const baseDialog = atom({
  open: false,
  type: null,
  title: ''
})