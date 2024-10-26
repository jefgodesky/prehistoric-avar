import Emittery from 'emittery'
import type { DatalessEventNames, OmnipresentEventData } from 'emittery'
import type {
  Biome,
  Disposition,
  LangMorphology,
  LangOrder,
  SpeciesName
} from './enums.ts'

type Emitter = Emittery<Record<PropertyKey, any>, Record<PropertyKey, any> & OmnipresentEventData, DatalessEventNames<Record<PropertyKey, any>>>

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
  relationships: IRelationship[]
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
  relationships: IRelationship[]
  scrolls: IScroll[]
}

interface IRegion {
  id: string
  adjacentRegions: string[]
  area: number
  biome: Biome
  capacity: number
  dragons: string[]
  features: [
    {
      description: string
      impact: number
    }
  ]
  feyInfluence: number
  habitability: number
  immortals: IImmortal[]
  languages: ILanguage[]
  ogrism: number
  populations: IPopulation[]
  scrolls: IScroll[]
  species: SpeciesName
  tags: string[]
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
  id?: string
  text: string
  seals: number
}

interface ISpeciesLanguagePreferences {
  order?: LangOrder[]
  typology?: LangMorphology[]
}

interface ISpecies {
  name: SpeciesName
  ancestor?: SpeciesName
  fitness: IFitness
  generation: number
  languagePreferences?: ISpeciesLanguagePreferences
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
  Emitter,
  IBiome,
  IFitness,
  IHabitable,
  IImmortal,
  ILanguage,
  IPopulation,
  IRelationship,
  IRegion,
  IRegionData,
  IScroll,
  ISpecies,
  ISpeciesLanguagePreferences,
  ITradition,
  IWorld
}
