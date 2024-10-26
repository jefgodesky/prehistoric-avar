import { IFitness, IScroll, ITradition } from '../index.d.ts'
import Fitness from './Fitness.ts'
import Scroll from './Scroll.ts'

class Tradition {
  fitness: Fitness
  scrolls: Scroll[]

  constructor (data?: ITradition) {
    const fit: IFitness | undefined = data?.fitness ?? undefined
    const scrolls: IScroll[] = data?.scrolls ?? []
    this.fitness = new Fitness(fit, 3, 0)
    this.scrolls = scrolls.map(scroll => new Scroll(scroll.text, scroll.seals))
  }

  toObject (): ITradition {
    return {
      fitness: this.fitness.toObject(),
      scrolls: this.scrolls.map(scroll => scroll.toObject())
    }
  }

  toString (): string {
    return `Tradition: ${this.fitness.toString()}`
  }
}

export default Tradition
