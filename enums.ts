export const BIOMES = {
  BOREAL_FOREST: 'Boreal forest',
  TEMPERATE_FOREST: 'Temperate forest',
  TROPICAL_FOREST: 'Tropical forest',
  DESERT: 'Desert',
  SAVANNA: 'Savanna',
  TEMPERATE_GRASSLAND: 'Temperate grassland',
  MOUNTAINS: 'Mountain range',
  POLAR: 'Polar region',
  CAVES: 'Cave system',
  WORLD_BELOW: 'World Below'
}

export const LANG_MORPHOLOGY = {
  FUSIONAL: 'Fusional',
  ANALYTIC: 'Analytic',
  AGGLUTINATIVE: 'Agglutinative'
} as const

export const LANG_ORDER = {
  SOV: 'SOV',
  SVO: 'SVO',
  OSV: 'OSV',
  OVS: 'OVS',
  VSO: 'VSO',
  VOS: 'VOS'
} as const

export const LAYER = {
  SURFACE: 'S',
  NEAR_SURFACE: 'C',
  WORLD_BELOW: 'D'
} as const

export type Biome = typeof BIOMES[keyof typeof BIOMES]
export type LangMorphology = typeof LANG_MORPHOLOGY[keyof typeof LANG_MORPHOLOGY]
export type LangOrder = typeof LANG_ORDER[keyof typeof LANG_ORDER]
export type Layer = typeof LAYER[keyof typeof LAYER]
