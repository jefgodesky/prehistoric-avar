import type { IScroll } from '../index.d.ts'
import Scroll from './Scroll.ts'
import Simulation from './Simulation.ts'

class Scribe {
  scrolls: Scroll[]

  constructor (...scrolls: Array<Scroll | IScroll>) {
    this.scrolls = scrolls.map(scroll => {
      if (scroll instanceof Scroll) return scroll
      return new Scroll(scroll.text, scroll.seals)
    })
  }

  unseal (
    text: string,
    seals: number,
    onUnseal?: () => number,
    onOpen?: () => void
  ): void {
    const scroll = this.scrolls.find(scroll => scroll.text === text)
    if (scroll) scroll.unseal()
    if (!scroll) this.scrolls.push(new Scroll(text, seals, onUnseal, onOpen))
  }

  toObject (): IScroll[] {
    return this.scrolls.map(scroll => scroll.toObject())
  }
}

export default Scribe
