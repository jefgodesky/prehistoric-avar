import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import { Biome, SPECIES_NAMES } from '../enums.ts'
import type { IPopulation } from '../index.d.ts'
import Scroll from './Scroll.ts'
import Species from './Species.ts'
import Tradition from './Tradition.ts'
import species from '../instances/species/index.ts'
import Fitness from './Fitness.ts'

class Population {
  id: string
  species: Species
  tradition: Tradition
  size: number
  viability: number
  scrolls: Scroll[]
  private fitness: Fitness

  constructor (data?: IPopulation) {
    const sp = data?.species ?? SPECIES_NAMES.WOSAN
    const scrolls = data?.scrolls ?? []
    this.id = data?.id ?? 'GS03-001WO'
    this.species = species[sp.toLowerCase()]
    this.tradition = new Tradition(data?.tradition ?? undefined)
    this.size = data?.size ?? 1
    this.viability = data?.viability ?? 1
    this.scrolls = scrolls.map(scroll => new Scroll(scroll.text, scroll.seals))
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
      scrolls: this.scrolls.map(scroll => scroll.toObject())
    }
  }

  toString (): string {
    return `Population: ${this.id}`
  }
}

export default Population
