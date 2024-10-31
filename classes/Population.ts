import { DiceRoll } from '@dice-roller/rpg-dice-roller'
import { Biome, SPECIES_NAMES } from '../enums.ts'
import type { Emitter, IPopulation } from '../index.d.ts'
import type Region from './Region.ts'
import Fitness from './Fitness.ts'
import Relationship from './Relationship.ts'
import Markable from './Markable.ts'
import Scribe from './Scribe.ts'
import Species from './Species.ts'
import Tradition from './Tradition.ts'
import species from '../instances/species/index.ts'

class Population extends Markable {
  home: Region
  species: Species
  tradition: Tradition
  size: number
  viability: number
  scribe: Scribe
  relationships: Relationship[]
  extinct: boolean
  private fitness: Fitness

  constructor (emitter: Emitter, home: Region, data?: IPopulation) {
    super(emitter, data)

    const sp = data?.species ?? SPECIES_NAMES.WOSAN
    const relationships = data?.relationships ?? []

    this.home = home
    this.id = data?.id ?? 'GS03-001WO'
    this.species = species[sp.toLowerCase()]
    this.tradition = new Tradition(emitter, data?.tradition ?? undefined)
    this.size = data?.size ?? 1
    this.viability = data?.viability ?? 1
    this.scribe = new Scribe(emitter, ...(data?.scrolls ?? []))
    this.relationships = relationships.map(rel => new Relationship(emitter, rel))
    this.markers = data?.markers ?? []
    this.extinct = data?.extinct ?? false
    this.fitness = Fitness.combine(this.species.fitness, this.tradition.fitness)
  }

  getFitness (biome: Biome): number {
    return this.fitness.get(biome)
  }

  adjustSize (delta: number): void {
    if (this.extinct) return
    if (delta > 1 || delta < -1) {
      this.size += Math.floor(delta)
    } else {
      this.size *= 1 + delta
    }
    this.size = Math.max(Math.round(this.size), 0)
    if (this.size === 0) this.extinct = true
  }

  adjustViability (): void {
    if (this.extinct) return
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

  split (num?: number): Population | null {
    if (this.extinct || this.size < 2) return null
    const n = num ?? ((Math.random() * 0.2) + 0.4) * this.size
    this.size -= n
    const data = Object.assign({}, this.toObject(), { size: n })
    return new Population(this.emitter, this.home, data)
  }

  toObject (): IPopulation {
    return {
      id: this.id,
      species: this.species.name as string,
      tradition: this.tradition.toObject(),
      markers: this.markers,
      size: this.size,
      viability: this.viability,
      relationships: this.relationships.map(rel => rel.toObject()),
      scrolls: this.scribe.toObject(),
      extinct: this.extinct
    }
  }

  override toString (): string {
    return `Population: ${this.id}`
  }
}

export default Population
