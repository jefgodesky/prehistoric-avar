import { BIOMES } from '../enums.ts'
import type { Biome } from '../enums.ts'
import type { IFitness } from '../index.d.ts'

class Fitness {
  biomes: IFitness

  constructor (data?: IFitness) {
    this.biomes = {} as IFitness
    for (const biome of Object.values(BIOMES)) {
      this.biomes[biome] = data && data[biome] ? Math.round(data[biome]) : 0
    }
  }

  get (biome: Biome): number {
    return this.biomes[biome]
  }

  set (biome: Biome, value: number): void {
    this.biomes[biome] = Math.round(value)
  }

  toObject (): IFitness {
    return this.biomes
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
