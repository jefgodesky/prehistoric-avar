export type LanguageOrder = 'SOV' | 'SVO' | 'OSV' | 'OVS' | 'VSO' | 'VOS'
export type LanguageMorphology = 'Fusional' | 'Analytic' | 'Agglutinative'

interface IBiome {
  'Carrying capacity score': number
  'Class names': string[]
  Species?: string
  Regions: string[]
}

interface ILanguage {
  name?: string
  order?: LanguageOrder
  morphology?: LanguageMorphology
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

interface IWorld {
  habitability: number
  dragons: {
    interest: number
    fear: number
  }
  events: string[]
}

export type {
  IBiome,
  ILanguage,
  IRegionData,
  IWorld
}
