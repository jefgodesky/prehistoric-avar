import Emittery from 'emittery'
import { shuffle } from '@std/random'
import type { Emitter } from '../index.d.ts'
import { SIMULATION_STAGES } from '../enums.ts'
import History from './History.ts'
import Region from './Region.ts'
import World from './World.ts'

class Simulation {
  history: History
  millennium: number
  regions: Region[]
  stage: typeof SIMULATION_STAGES[keyof typeof SIMULATION_STAGES]
  world: World
  emitter: Emitter

  constructor () {
    this.emitter = new Emittery()
    this.history = new History(this.emitter)
    this.millennium = 1
    this.stage = SIMULATION_STAGES.REFRESH
    this.world = new World(this.emitter)
    this.regions = Object.values(this.world.regions)

    // Add our "inciting incident"
    this.history.add({
      description: 'Wosan discover fire',
      millennium: this.millennium,
      tags: ['GS03', 'Wosan', 'Invention']
    })
  }

  advance (): string {
    const stages = Object.values(SIMULATION_STAGES)
    const curr = stages.indexOf(this.stage)
    const next = (curr + 1) % stages.length
    this.stage = stages[next]
    if (next === 0) this.millennium++
    return `${this.stage} ${this.millennium}`
  }

  refresh (): void {
    this.world.restoreHabitability()
    this.regions = shuffle(this.regions)
  }
}

export default Simulation
