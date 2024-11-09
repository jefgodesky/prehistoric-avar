import { ISociety } from '../index.d.ts'
import Fitness from './Fitness.ts'
import Language from './Language.ts'
import Markable from './Markable.ts'
import Region from './Region.ts'
import Scribe from './Scribe.ts'

class Society extends Markable {
  fitness: Fitness
  language: Language | null
  region: Region
  scribe: Scribe

  constructor (region: Region, data?: ISociety) {
    super(region.simulation, data)

    this.fitness = new Fitness(data?.fitness ?? undefined)
    this.language = data?.language ? new Language(this, data.language) : null
    this.region = region
    this.scribe = new Scribe(region.simulation, ...(data?.scrolls ?? []))
  }

  addLanguage (): void {
    const { id, simulation } = this.region
    const { millennium } = simulation
    const name = `${id}-${millennium.toString().padStart(3, '0')}`
    this.language = new Language(this, { name })
  }

  toObject (): ISociety {
    const obj: ISociety = {
      fitness: this.fitness.toObject(),
      language: this.language?.toObject(),
      markers: this.markers,
      scrolls: this.scribe.toObject()
    }
    if (obj.language === undefined) delete obj.language
    return obj
  }

  override toString (): string {
    return `Society: ${this.id}`
  }
}

export default Society
