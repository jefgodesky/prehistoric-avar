import { IHabitable, ISpecies } from '../index.d.ts'
import { ROUND_HABITABILITY_TO_FULL } from '../constants.ts'
import Dragons from './Dragons.ts'
import Immortal from './Immortal.ts'
import Population from './Population.ts'
import Region from './Region.ts'
import type Simulation from './Simulation.ts'
import Species from './Species.ts'
import { getRegions } from '../instances/regions/index.ts'
import species from '../instances/species/index.ts'


class World implements IHabitable {
  habitability: number
  events: string[]
  dragons: Dragons
  immortals: Record<string, Immortal>
  populations: Record<string, Population>
  species: Record<string, Species>
  regions: Record<string, Region>

  constructor (sim: Simulation) {
    this.habitability = 1
    this.events = []
    this.dragons = new Dragons()
    this.immortals = {}
    this.populations = {}
    this.species = species
    this.regions = getRegions(sim)
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

  toString (): string {
    const habitability = (this.habitability * 100).toFixed(0)
    return `World: ${habitability}% [${this.dragons.toString()}]`
  }
}

export default World
