import type { Biome, LangMorphology, LangOrder, SpeciesName } from './enums.ts'

interface IBiome {
  'Carrying capacity score': number
  'Class names': string[]
  Species?: string
  Regions: string[]
}

interface IFitness {
  [key: Biome]: number
}

interface IHabitable {
  habitability: number
  reduceHabitability: (factor: number) => void
  restoreHabitability: () => void
}

interface ILanguage {
  name?: string
  order?: LangOrder
  morphology?: LangMorphology
}

interface IRegionData {
  [key: string]: {
    biome: Biome
    tags: string[]
    area: number
    capacity: number
    species?: string
    adjacent: string[]
  }
}

interface ISpeciesLangPrefs {
  order?: LangOrder[]
  typology?: LangMorphology[]
}

interface ISpecies {
  name: SpeciesName
  ancestor?: SpeciesName
  fitness: IFitness
  generation: number
  langPrefs?: ISpeciesLangPrefs
  appeared?: number
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
  IFitness,
  IHabitable,
  ILanguage,
  IRegionData,
  ISpecies,
  IWorld
}
