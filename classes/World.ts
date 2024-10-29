import { Emitter, IHabitable, ISpecies, IWorld } from '../index.d.ts'
import { ROUND_HABITABILITY_TO_FULL } from '../constants.ts'
import Dragons from './Dragons.ts'
import Region from './Region.ts'
import Species from './Species.ts'
import { getRegions } from '../instances/regions/index.ts'
import species from '../instances/species/index.ts'


class World implements IHabitable {
  habitability: number
  events: string[]
  dragons: Dragons
  species: Record<string, Species>
  regions: Record<string, Region>

  constructor (emitter: Emitter) {
    this.habitability = 1
    this.events = []
    this.dragons = new Dragons()
    this.species = species
    this.regions = getRegions(emitter)
  }

  reduceHabitability (factor: number): void {
    this.habitability *= factor
  }

  restoreHabitability (): void {
    const gap = 1 - this.habitability
    this.habitability += gap / 2
    if (this.habitability >= ROUND_HABITABILITY_TO_FULL) this.habitability = 1
  }

  addEvent (event: string): void {
    this.events = [...this.events, event]
  }

  hasEvent (event: string): boolean {
    return this.events.includes(event)
  }

  toObject (): IWorld {
    const species: Record<string, ISpecies> = {}
    for (const sp in this.species) {
      species[sp] = this.species[sp].toObject()
    }

    return {
      habitability: this.habitability,
      dragons: this.dragons.toObject(),
      events: this.events,
      species,
      regions: Object.values(this.regions).map(region => region.toObject())
    }
  }

  toString (): string {
    const habitability = (this.habitability * 100).toFixed(0)
    return `World: ${habitability}% [${this.dragons.toString()}]`
  }
}

export default World
