import { BIOMES } from '../enums.ts'
import type { Biome } from '../enums.ts'
import type { IFitness } from '../index.d.ts'

class Fitness {
  biomes: IFitness
  max: number | null
  min: number | null

  constructor (data?: IFitness, max?: number, min?: number) {
    this.max = max ?? null
    this.min = min ?? null
    this.biomes = {} as IFitness
    for (const biome of Object.values(BIOMES)) {
      this.biomes[biome] = data && data[biome] ? this.clamp(data[biome]) : 0
    }
  }

  get (biome: Biome): number {
    return this.biomes[biome]
  }

  set (biome: Biome, value: number): void {
    this.biomes[biome] = this.clamp(value)
  }

  toObject (): IFitness {
    return this.biomes
  }

  toString (): string {
    const values = [
      this.biomes[BIOMES.BOREAL_FOREST],
      this.biomes[BIOMES.TEMPERATE_FOREST],
      this.biomes[BIOMES.TROPICAL_FOREST],
      this.biomes[BIOMES.DESERT],
      this.biomes[BIOMES.SAVANNA],
      this.biomes[BIOMES.TEMPERATE_GRASSLAND],
      this.biomes[BIOMES.MOUNTAINS],
      this.biomes[BIOMES.POLAR],
      this.biomes[BIOMES.CAVES],
      this.biomes[BIOMES.WORLD_BELOW]
    ]
    return values.join(' ')
  }

  private clamp (value: number): number {
    const max = this.max ?? Number.MAX_SAFE_INTEGER
    const min = this.min ?? Number.MIN_SAFE_INTEGER
    return Math.max(Math.min(Math.round(value), max), min)
  }

  static combine (...instances: Fitness[]): Fitness {
    const data = {} as IFitness
    for (const biome of Object.values(BIOMES)) {
      data[biome] = instances.reduce((acc, curr) => acc + curr.biomes[biome], 0)
    }
    return new Fitness(data)
  }
}

export default Fitness
