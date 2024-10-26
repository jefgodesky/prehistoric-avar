import type { ISpeciesLanguagePreferences, ISpecies } from '../index.d.ts'
import {Biome, SpeciesName} from '../enums.ts'
import Fitness from './Fitness.ts'

class Species {
  name: SpeciesName | null
  ancestor: SpeciesName | null
  generation: number | null
  fitness: Fitness
  languagePreferences: ISpeciesLanguagePreferences | null

  constructor (data?: ISpecies) {
    this.name = data?.name ?? null
    this.ancestor = data?.ancestor ?? null
    this.generation = data?.generation ?? null
    this.fitness = new Fitness(data?.fitness, 3, -3)
    this.languagePreferences = data?.languagePreferences === undefined ? null : data?.languagePreferences
  }

  getFitness (biome: Biome): number {
    return this.fitness.get(biome)
  }

  canSpeak (): boolean {
    return this.languagePreferences !== null
  }

  toObject (): ISpecies {
    const obj: ISpecies = {
      name: this.name ?? '',
      generation: this.generation ?? -1,
      fitness: this.fitness.toObject()
    }
    if (this.ancestor) obj.ancestor = this.ancestor
    if (this.languagePreferences) obj.languagePreferences = this.languagePreferences
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
