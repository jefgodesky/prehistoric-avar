import type { ISpecies } from '../index.d.ts'
import { Biome, SPECIES_NAMES, SpeciesName, SpeciesPlurals } from '../enums.ts'
import Fitness from './Fitness.ts'

class Species {
  name: SpeciesName | null
  ancestor: SpeciesName | null
  generation: number | null
  fitness: Fitness
  canSpeak: boolean

  constructor (data?: ISpecies) {
    this.name = data?.name ?? null
    this.ancestor = data?.ancestor ?? null
    this.generation = data?.generation ?? null
    this.fitness = new Fitness(data?.fitness, 3, -3)
    this.canSpeak = data?.canSpeak ?? false
  }

  getFitness (biome: Biome): number {
    return this.fitness.get(biome)
  }

  getCode (): string {
    return Species.getCode(this.name ?? SPECIES_NAMES.WOSAN)
  }

  getPlural (): string {
    return SpeciesPlurals[this.name ?? 'Wosan']
  }

  toObject (): ISpecies {
    const obj: ISpecies = {
      name: this.name ?? '',
      generation: this.generation ?? -1,
      canSpeak: this.canSpeak,
      fitness: this.fitness.toObject()
    }
    if (this.ancestor) obj.ancestor = this.ancestor
    return obj
  }

  toString (): string {
    return `Species: ${this.name}`
  }

  static getCode (name: SpeciesName): string {
    return name.slice(0, 2).toUpperCase()
  }
}

export default Species
