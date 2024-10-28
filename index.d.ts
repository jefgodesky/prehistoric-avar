import Emittery from 'emittery'
import type { DatalessEventNames, OmnipresentEventData } from 'emittery'
import type {
  Biome,
  Disposition,
  LangMorphology,
  LangOrder,
  SpeciesName
} from './enums.ts'

// deno-lint-ignore no-explicit-any
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

interface IHistoricalRecord {
  millennium: number
  description: string
  tags: string[]
}

interface IHistoricalQuery {
  millennium?: number
  tags?: string[]
  logic?: {
    tags?: 'and' | 'or'
    query?: 'and' | 'or'
  }
}

interface IImmortal {
  description: string
  disposition: Disposition
  impact: number
  relationships: IRelationship[]
  scrolls: IScroll[]
  slayable: IQuest | false
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
  markers: string[]
}

interface IQuest {
  id: string
  description: string
  courage: number
  skill: number
  lethality: number
}

interface IQuestCall {
  scope: string
  quest: IQuest
}

interface IQuestReport {
  quest: IQuest
  attempted: number
  abandoned: number
  killed: number
  success: boolean
}

interface IRegionFeature {
  description: string
  impact: number
}

interface IRegion {
  id: string
  adjacentRegions: string[]
  area: number
  biome: Biome
  capacity: number
  dragons: string[]
  features: IRegionFeature[]
  feyInfluence: number
  habitability: number
  immortals: IImmortal[]
  languages: ILanguage[]
  markers: string[]
  ogrism: number
  populations: IPopulation[]
  species?: SpeciesName
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
  regions: IRegion[]
}

export type {
  Emitter,
  IBiome,
  IFitness,
  IHabitable,
  IHistoricalQuery,
  IHistoricalRecord,
  IImmortal,
  ILanguage,
  IPopulation,
  IQuest,
  IQuestCall,
  IQuestReport,
  IRelationship,
  IRegion,
  IRegionFeature,
  IRegionData,
  IScroll,
  ISpecies,
  ISpeciesLanguagePreferences,
  ITradition,
  IWorld
}
