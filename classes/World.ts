import { customAlphabet } from 'nanoid'
import { IHabitable } from '../index.d.ts'
import { ROUND_HABITABILITY_TO_FULL } from '../constants.ts'
import Dragons from './Dragons.ts'
import Immortal from './Immortal.ts'
import Population from './Population.ts'
import Quest from './Quest.ts'
import Region from './Region.ts'
import type Simulation from './Simulation.ts'
import Society from './Society.ts'
import Species from './Species.ts'
import { getRegions } from '../instances/regions/index.ts'
import species from '../instances/species/index.ts'


class World implements IHabitable {
  habitability: number
  events: string[]
  dragons: Dragons
  immortals: Record<string, Immortal>
  languages: Record<string, string | null>
  populations: Record<string, Population>
  quests: Record<string, Quest>
  societies: Record<string, Society>
  species: Record<string, Species>
  regions: Record<string, Region>

  constructor (sim: Simulation) {
    this.habitability = 1
    this.events = []
    this.dragons = new Dragons()
    this.immortals = {}
    this.languages = {}
    this.populations = {}
    this.quests = {}
    this.societies = {}
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

  makeUnique (id: string, dict: Record<string, unknown>): string {
    let candidate = id
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lower = upper.toUpperCase()
    const numerals = '0123456789'
    const nanoid = customAlphabet(upper + lower + numerals, 6)
    while (candidate in dict) {
      candidate = `${id} (${nanoid()})`
    }
    return candidate
  }

  toString (): string {
    const habitability = (this.habitability * 100).toFixed(0)
    return `World: ${habitability}% [${this.dragons.toString()}]`
  }
}

export default World
