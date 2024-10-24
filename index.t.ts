const WORDORDER = {
  SOV: 'SOV',
  SVO: 'SVO',
  OSV: 'OSV',
  OVS: 'OVS',
  VSO: 'VSO',
  VOS: 'VOS'
} as const

const MORPHOLOGY = {
  FUSIONAL: 12,
  ANALYTIC: 4,
  AGGLUTINATIVE: 8
} as const

interface IBiome {
  'Carrying capacity score': number
  'Class names': string[]
  Species?: string
  Regions: string[]
}

interface ILanguage {
  name?: string
  order?: WordOrder
  morphology?: Morphology
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

type WordOrder = typeof WORDORDER[keyof typeof WORDORDER]
type Morphology = typeof MORPHOLOGY[keyof typeof MORPHOLOGY]

export { MORPHOLOGY, WORDORDER }
export type {
  Morphology,
  WordOrder,

  IBiome,
  ILanguage,
  IRegionData
}
