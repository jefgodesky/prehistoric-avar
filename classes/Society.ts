import { Emitter, ISociety } from '../index.d.ts'
import Fitness from './Fitness.ts'
import Language from './Language.ts'
import Markable from './Markable.ts'
import Scribe from './Scribe.ts'

class Society extends Markable {
  fitness: Fitness
  language: Language | null
  scribe: Scribe

  constructor (emitter: Emitter, data?: ISociety) {
    super(emitter, data)

    this.fitness = new Fitness(data?.fitness ?? undefined)
    this.language = data?.language ? new Language(data.language) : null
    this.scribe = new Scribe(emitter, ...(data?.scrolls ?? []))
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
