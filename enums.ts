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
} as const

export const DISPOSITIONS = {
  HOSTILE: 'Hostile',
  INDIFFERENT: 'Indifferent',
  FRIENDLY: 'Friendly'
} as const

export const EVENTS_GLOBAL_UNIQUE = {
  DWARVES: 'Dwarves Appear',
  ELVES: 'Elves Appear',
  GNOMES: 'Gnomes Appear',
  HALFLINGS: 'Halflings Appear',
  HUMANS: 'Humans Appear',
  ORCS: 'Orcs Appear',
  FS32_MIGRATION: 'Humans Taken to FS32',
  LANG: 'Language Appears',
  LANG_HADAR: 'Language Spreads to Hadar',
  LANG_TUAN: 'Language Spreads to Tuan',
  LANG_SUN: 'Language Spreads to the Sphere of Warmth',
  LANG_ELTA: 'Language Spreads to Elta',
  DRAGON_QUEEN: 'Rise of the Dragon Queen',
  DEATH: 'Rise of Death',
  NOVA_NORTH: 'A New Star: The North Star',
  NOVA_MORNING: 'A New Star: The Morning and Evening Stars',
  NOVA_BEAR: 'A New Star: The Bear Star',
  NOVA_HAND: 'A New Star: The Hand',
  NOVA_EYE: 'A New Star: The Crimson Eye',
  NOVA_KEEPER: 'A New Star: The Keeper',
  NOVA_SISTERS: 'A New Star: The Nine Sisters'
} as const

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

export const SIMULATION_STAGES = {
  REFRESH: 'Refresh',
  EVENT: 'Event',
  GROWTH: 'Growth',
  RESOLUTION: 'Resolution'
}

export const SPECIES_NAMES = {
  DWARF: 'Dwarf',
  ELF: 'Elf',
  GNOME: 'Gnome',
  HALFLING: 'Halfling',
  HUMAN: 'Human',
  ORC: 'Orc',
  WOSAN: 'Wosan'
}

export type Biome = typeof BIOMES[keyof typeof BIOMES]
export type Disposition = typeof DISPOSITIONS[keyof typeof DISPOSITIONS]
export type LangMorphology = typeof LANG_MORPHOLOGY[keyof typeof LANG_MORPHOLOGY]
export type LangOrder = typeof LANG_ORDER[keyof typeof LANG_ORDER]
export type Layer = typeof LAYER[keyof typeof LAYER]
export type SpeciesName = typeof SPECIES_NAMES[keyof typeof SPECIES_NAMES]
export type UniqueGlobalEvent = typeof EVENTS_GLOBAL_UNIQUE[keyof typeof EVENTS_GLOBAL_UNIQUE]
