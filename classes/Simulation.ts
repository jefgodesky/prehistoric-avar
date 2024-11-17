import { shuffle } from '@std/random'
import { SIMULATION_STAGES } from '../enums.ts'
import History from './History.ts'
import Region from './Region.ts'
import World from './World.ts'
import Singleton from '../Singleton.ts'

const END_THRESHOLD = 100 as const

class BaseSimulation {
  history: History
  millennium: number
  regions: Region[]
  stage: typeof SIMULATION_STAGES[keyof typeof SIMULATION_STAGES]
  world: World

  constructor () {
    this.history = new History()
    this.millennium = 1
    this.stage = SIMULATION_STAGES.REFRESH
    this.world = new World()
    this.regions = this.world.regions.values()

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
    for (const region of this.regions) {
      region.populations = shuffle(region.populations)
      region.refresh()
    }
  }

  grow (): void {
    for (const region of this.regions) region.grow()
  }

  expand (): void {
    for (const region of this.regions) region.expand()
  }

  resolve (): void {
    // Unseal immortals' scrolls and run their move functions
    for (const immortal of this.world.immortals.values()) {
      for (const scroll of immortal.scribe.scrolls) {
        scroll.unseal()
      }
      immortal.move()
    }

    // Unseal populations' scrolls
    for (const p of this.world.populations.values()) {
      for (const scroll of p.scribe.scrolls) {
        scroll.unseal()
      }
    }

    // Unseal societies' scrolls
    for (const society of this.world.societies.values()) {
      for (const scroll of society.scribe.scrolls) {
        scroll.unseal()
      }
    }
  }

  end (): boolean {
    return this.world.dragons.sum() >= END_THRESHOLD
  }
}

const Simulation = Singleton(BaseSimulation)
export default Simulation
export type { BaseSimulation }
export { END_THRESHOLD }
