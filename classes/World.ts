import { SPECIES_NAMES } from '../enums.ts'
import type { SpeciesName } from '../enums.ts'
import { IHabitable, ISpecies, IWorld } from '../index.d.ts'

const ROUND_HABITABILITY_TO_FULL = 0.95

class World implements IHabitable {
  habitability: number
  events: string[]
  dragons: {
    interest: number
    fear: number
  }

  constructor() {
    this.habitability = 1
    this.events = []
    this.dragons = {
      interest: 0,
      fear: 0
    }
  }

  incrDraconicInterest(): void {
    this.dragons.interest++
  }

  decrDraconicInterest(): void {
    const { interest } = this.dragons
    this.dragons.interest = Math.max(interest - 1, 0)
  }

  incrDraconicFear(): void {
    this.dragons.fear++
  }

  decrDraconicFear(): void {
    const { fear } = this.dragons
    this.dragons.fear = Math.max(fear - 1, 0)
  }

  reduceHabitability(factor: number): void {
    this.habitability *= factor
  }

  restoreHabitability(): void {
    const gap = 1 - this.habitability
    this.habitability += gap / 2
    if (this.habitability >= ROUND_HABITABILITY_TO_FULL) this.habitability = 1
  }

  addEvent(event: string): void {
    this.events = [...this.events, event]
  }

  hasEvent(event: string): boolean {
    return this.events.includes(event)
  }

  toObject(): IWorld {
    return {
      habitability: this.habitability,
      dragons: this.dragons,
      events: this.events
    }
  }
}

export default World
