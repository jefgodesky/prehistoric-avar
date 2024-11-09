import { ISociety } from '../index.d.ts'
import Fitness from './Fitness.ts'
import Markable from './Markable.ts'
import Scribe from './Scribe.ts'
import Simulation from './Simulation.ts'

class Society extends Markable {
  fitness: Fitness
  language: string | null
  region: string
  scribe: Scribe

  constructor (sim: Simulation, region: string, data?: ISociety) {
    super(sim, data)

    this.fitness = new Fitness(data?.fitness ?? undefined)
    this.language = data?.language ?? null
    this.region = region
    this.scribe = new Scribe(this.simulation, ...(data?.scrolls ?? []))
  }

  addLanguage (): void {
    this.language = this.simulation.world.regions[this.region].generateId()
    this.simulation.world.languages[this.language] = null
  }

  toObject (): ISociety {
    const obj: ISociety = {
      fitness: this.fitness.toObject(),
      markers: this.markers,
      scrolls: this.scribe.toObject()
    }
    if (this.language) obj.language = this.language
    return obj
  }

  override toString (): string {
    return `Society: ${this.id}`
  }
}

export default Society
