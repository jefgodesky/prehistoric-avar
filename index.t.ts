interface IPoint {
  latitude: number
  longitude: number
}

interface IRegion {
  'Carrying capacity score': number
  'Class names': string[]
  Regions: string[]
}

interface IRegionData {
  [key: string]: {
    tags: string[]
    area: number
    carryingCapacity: number
  }
}

export type {
  IPoint,
  IRegion,
  IRegionData
}
