export interface BasicList {
  eventKey: string
  name: string
  list: string[] | null
}

export type PickList = BasicList & {
  id: string
  owner: string
}

export type PickLists = {
  id: string
  eventKey: string
  name: string
}[]
