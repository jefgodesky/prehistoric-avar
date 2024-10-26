import type { Biome, Disposition, LangMorphology, LangOrder, SpeciesName } from './enums.ts'
import Species from './classes/Species.ts'

interface IBiome {
  'Carrying capacity score': number
  'Class names': string[]
  Species?: string
  Regions: string[]
}

type IFitness = Record<Biome, number>

interface IHabitable {
  habitability: number
  reduceHabitability: (factor: number) => void
  restoreHabitability: () => void
}

interface IImmortal {
  description: string
  disposition: Disposition
  impact: number
  scrolls: IScroll[]
  slayable: [number, number] | false
}

interface ILanguage {
  name?: string
  order?: LangOrder
  morphology?: LangMorphology
}

interface IPopulation {
  id: string
  species: SpeciesName
  tradition: ITradition
  size: number
  viability: number
  scrolls: IScroll[]
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

interface IRelationship {
  a: string
  b: string
  disposition: Disposition
  scrolls: IScroll[]
}

interface IScroll {
  text: string
  seals: number
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

interface ITradition {
  fitness: IFitness
  scrolls: IScroll[]
}

interface IWorld {
  habitability: number
  dragons: {
    interest: number
    fear: number
  }
  species: {
    [key: string]: ISpecies
  }
  events: string[]
}

export type {
  IBiome,
  IFitness,
  IHabitable,
  IImmortal,
  ILanguage,
  IPopulation,
  IRelationship,
  IRegionData,
  IScroll,
  ISpecies,
  ISpeciesLangPrefs,
  ITradition,
  IWorld
}
