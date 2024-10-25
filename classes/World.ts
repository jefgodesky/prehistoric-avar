import { SPECIES_NAMES } from '../enums.ts'
import type { SpeciesName } from '../enums.ts'
import { IHabitable, ISpecies, IWorld } from '../index.d.ts'
import {
  getElf,
  getDwarf,
  getGnome,
  getHalfling,
  getHuman,
  getOrc,
  getWosan
} from '../get-species.ts'

const ROUND_HABITABILITY_TO_FULL = 0.95

class World implements IHabitable {
  habitability: number
  events: string[]
  dragons: {
    interest: number
    fear: number
  }
  species: {
    [key: SpeciesName]: ISpecies
  }

  constructor() {
    this.habitability = 1
    this.events = []
    this.dragons = {
      interest: 0,
      fear: 0
    }

    this.species = {}
    this.species[SPECIES_NAMES.ELF] = getElf()
    this.species[SPECIES_NAMES.DWARF] = getDwarf()
    this.species[SPECIES_NAMES.GNOME] = getGnome()
    this.species[SPECIES_NAMES.HALFLING] = getHalfling()
    this.species[SPECIES_NAMES.HUMAN] = getHuman()
    this.species[SPECIES_NAMES.ORC] = getOrc()
    this.species[SPECIES_NAMES.WOSAN] = getWosan()
    this.species[SPECIES_NAMES.WOSAN].appeared = 1
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
      events: this.events,
      species: this.species
    }
  }
}

export default World
