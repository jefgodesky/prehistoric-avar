import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import { Biome, SPECIES_NAMES } from '../enums.ts'
import type { Emitter, IPopulation } from '../index.d.ts'
import Fitness from './Fitness.ts'
import Relationship from './Relationship.ts'
import Scribe from './Scribe.ts'
import Species from './Species.ts'
import Tradition from './Tradition.ts'
import species from '../instances/species/index.ts'

class Population {
  id: string
  species: Species
  tradition: Tradition
  size: number
  viability: number
  scribe: Scribe
  relationships: Relationship[]
  private fitness: Fitness

  constructor (emitter: Emitter, data?: IPopulation) {
    const sp = data?.species ?? SPECIES_NAMES.WOSAN
    const relationships = data?.relationships ?? []

    this.id = data?.id ?? 'GS03-001WO'
    this.species = species[sp.toLowerCase()]
    this.tradition = new Tradition(emitter, data?.tradition ?? undefined)
    this.size = data?.size ?? 1
    this.viability = data?.viability ?? 1
    this.scribe = new Scribe(emitter, ...(data?.scrolls ?? []))
    this.relationships = relationships.map(rel => new Relationship(rel))
    this.fitness = Fitness.combine(this.species.fitness, this.tradition.fitness)
  }

  getFitness (biome: Biome): number {
    return this.fitness.get(biome)
  }

  adjustViability (): void {
    const generations = this.species.generation ?? 1
    for (let g = 0; g < generations; g++) { // High generations change more per tick
      const flip = Math.random() // High viability recovers; low can become death spiral
      const roll = new DiceRoll('1d3').total // Change between 1% and 3%
      const multiplier = flip >= this.viability ? -1 : 1 // 1% to 3% up or down, based on flip
      this.viability *= ((roll / 100) * multiplier) + 1 // +/- viability by percent determined
      if (this.viability > 0.95) this.viability = 1 // 95% rounds up to 100%
      if (this.viability < 0.5) this.viability = 0 // 5% rounds down to 0%
      this.viability = Math.min(Math.max(this.viability, 0), 1) // Clamp between 0 and 1
      if (this.viability === 0 || this.viability === 1) return // Stop looping if we hit extremes
    }
  }

  toObject (): IPopulation {
    return {
      id: this.id,
      species: this.species.name as string,
      tradition: this.tradition.toObject(),
      size: this.size,
      viability: this.viability,
      relationships: this.relationships.map(rel => rel.toObject()),
      scrolls: this.scribe.toObject()
    }
  }

  toString (): string {
    return `Population: ${this.id}`
  }
}

export default Population
