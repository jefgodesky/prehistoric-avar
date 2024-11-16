import { ISociety } from '../index.d.ts'
import Fitness from './Fitness.ts'
import Markable from './Markable.ts'
import Scribe from './Scribe.ts'
import Simulation from './Simulation.ts'
import World from './World.ts'

class Society extends Markable {
  fitness: Fitness
  language: string | null
  region: string
  scribe: Scribe

  constructor (world: World, region: string, data?: ISociety) {
    super(data)

    this.fitness = new Fitness(data?.fitness ?? undefined)
    this.language = data?.language ?? null
    this.region = region
    this.scribe = new Scribe(...(data?.scrolls ?? []))

    const id = world.regions.get(region)?.generateSocietyId() ?? 'Society'
    this.id = world.societies.generateKey(id)
    world.societies.add(this)
  }

  advanceLanguage (): void {
    if (!this.language) return
    this.addLanguage(this.language)
  }

  addLanguage (ancestor: string | null = null): void {
    const { world } = Simulation.instance()
    this.language = world.regions.get(this.region)?.generateSocietyId() ?? this.id
    world.languages.add(this.language, ancestor)
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
