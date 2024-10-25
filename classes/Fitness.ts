import { BIOMES } from '../enums.ts'
import type { Biome } from '../enums.ts'
import type { IFitness } from '../index.d.ts'

class Fitness {
  biomes: IFitness
  max: number | null

  constructor (data?: IFitness, max?: number) {
    this.max = max ?? null
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

  private clamp (value: number): number {
    return Math.min(Math.round(value), this.max ?? Number.MAX_VALUE)
  }

  static combine (a: Fitness, b: Fitness): Fitness {
    const data = {} as IFitness
    for (const biome of Object.values(BIOMES)) {
      data[biome] = (a.biomes[biome] ?? 0) + (b.biomes[biome] ?? 0)
    }
    return new Fitness(data)
  }
}

export default Fitness
