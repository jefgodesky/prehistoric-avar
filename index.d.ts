import type { Biome, LangMorphology, LangOrder, SpeciesName } from './enums.ts'

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

interface ISpeciesYAML {
  [key: string]: {
    Generation: number
    Ancestor?: string
    Fitness: {
      'Boreal forest': number
      'Temperate forest': number
      'Tropical forest': number
      Desert: number
      Savanna: number
      'Temperate grassland': number
      'Mountain range': number
      'Polar region': number
      'Cave system': number
      'World Below': number
    }
    'Language preferences'?: {
      Typology?: LangMorphology[]
      'Word order'?: LangOrder[]
    }
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
  IFitness,
  IHabitable,
  ILanguage,
  IRegionData,
  IScroll,
  ISpecies,
  ISpeciesLangPrefs,
  ISpeciesYAML,
  IWorld
}
