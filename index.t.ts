interface IRegion {
  'Carrying capacity score': number
  'Class names': string[]
  Species?: string
  Regions: string[]
}

interface IRegionData {
  [key: string]: {
    tags: string[]
    area: number
    capacity: number
    species?: string
    adjacent: string[]
  }
}

export type {
  IRegion,
  IRegionData
}
