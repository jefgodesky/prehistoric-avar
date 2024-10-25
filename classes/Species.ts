import type { ISpeciesLangPrefs, ISpecies } from '../index.d.ts'
import type { Biome } from '../enums.ts'
import Fitness from './Fitness.ts'

class Species {
  name: string | null
  ancestor: string | null
  generation: number | null
  fitness: Fitness
  langPrefs: ISpeciesLangPrefs | null

  constructor (data?: ISpecies) {
    this.name = data?.name ?? null
    this.ancestor = data?.ancestor ?? null
    this.generation = data?.generation ?? null
    this.fitness = new Fitness(data?.fitness)
    this.langPrefs = data?.langPrefs === undefined ? null : data?.langPrefs
  }

  getFitness (biome: Biome): number {
    return this.fitness.get(biome)
  }

  canSpeak (): boolean {
    return this.langPrefs !== null
  }
}

export default Species
