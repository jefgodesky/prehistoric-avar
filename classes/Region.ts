import { Biome, BIOMES, SpeciesName } from '../enums.ts'
import { Emitter, IRegion, IRegionFeature } from '../index.d.ts'
import Immortal from './Immortal.ts'
import Language from './Language.ts'
import Markable from './Markable.ts'
import Population from './Population.ts'

class Region extends Markable {
  adjacentRegions: string[]
  area: number
  biome: Biome | null
  capacity: number
  dragons: string[]
  features: IRegionFeature[]
  feyInfluence: number
  habitability: number
  immortals: Immortal[]
  languages: Language[]
  ogrism: number
  populations: Population[]
  species?: SpeciesName
  tags: string[]

  constructor (emitter: Emitter, data?: IRegion) {
    super(emitter, data)

    const immortals = data?.immortals ?? []
    const languages = data?.languages ?? []
    const populations = data?.populations ?? []

    this.id = data?.id ?? ''
    this.adjacentRegions = data?.adjacentRegions ?? []
    this.area = data?.area ?? 0
    this.biome = data?.biome ?? null
    this.capacity = data?.capacity ?? 0
    this.dragons = data?.dragons ?? []
    this.features = data?.features ?? []
    this.feyInfluence = data?.feyInfluence ?? 0
    this.habitability = data?.habitability ?? 1
    this.immortals = immortals.map(immortal => new Immortal(emitter, immortal))
    this.languages = languages.map(lang => new Language(lang))
    this.ogrism = data?.ogrism ?? 0
    this.populations = populations.map(pop => new Population(emitter, pop))
    this.tags = data?.tags ?? []

    if (data?.species) this.species = data.species
  }

  toObject (): IRegion {
    const obj: IRegion = {
      id: this.id,
      adjacentRegions: this.adjacentRegions,
      area: this.area,
      biome: this.biome ?? BIOMES.WORLD_BELOW,
      capacity: this.capacity,
      dragons: this.dragons,
      features: this.features,
      feyInfluence: this.feyInfluence,
      habitability: this.habitability,
      immortals: this.immortals.map(immortal => immortal.toObject()),
      languages: this.languages.map(lang => lang.toObject()),
      markers: this.markers,
      ogrism: this.ogrism,
      populations: this.populations.map(pop => pop.toObject()),
      tags: this.tags
    }

    if (this.species) obj.species = this.species
    return obj
  }

  override toString (): string {
    return this.id
  }
}

export default Region
