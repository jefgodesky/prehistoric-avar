import { Emitter, IFitness, ITradition } from '../index.d.ts'
import Fitness from './Fitness.ts'
import Scribe from './Scribe.ts'

class Tradition {
  fitness: Fitness
  scribe: Scribe

  constructor (emitter: Emitter, data?: ITradition) {
    const fit: IFitness | undefined = data?.fitness ?? undefined
    this.fitness = new Fitness(fit, 3, 0)
    this.scribe = new Scribe(emitter, ...(data?.scrolls ?? []))
  }

  toObject (): ITradition {
    return {
      fitness: this.fitness.toObject(),
      scrolls: this.scribe.toObject()
    }
  }

  toString (): string {
    return `Tradition: ${this.fitness.toString()}`
  }
}

export default Tradition
