import type { IScroll } from '../index.d.ts'
import { IWorld } from '../index.d.ts'
import Scroll from './Scroll.ts'
import Simulation from './Simulation.ts'

const SCROLL_EVENTS = {
  OPEN: 'Scroll.Open'
}

class Scribe {
  scrolls: Scroll[]

  constructor (sim: Simulation, ...scrolls: Array<Scroll | IScroll>) {
    this.scrolls = scrolls.map(scroll => {
      if (scroll instanceof Scroll) return scroll
      return new Scroll(scroll.text, scroll.seals)
    })
    sim.emitter.on('Scroll.Open', (data: IScroll) => this.handleScrollOpen(data))
  }

  unseal (
    text: string,
    seals: number,
    onUnseal?: (context?: IWorld) => number,
    onOpen?: (context?: IWorld) => void
  ): void {
    const scroll = this.scrolls.find(scroll => scroll.text === text)
    if (scroll) scroll.unseal()
    if (!scroll) this.scrolls.push(new Scroll(text, seals, onUnseal, onOpen))
  }

  toObject (): IScroll[] {
    return this.scrolls.map(scroll => scroll.toObject())
  }

  private handleScrollOpen (data: IScroll): void {
    this.scrolls = this.scrolls.filter(scroll => scroll.id !== data.id)
  }
}

export default Scribe
export { SCROLL_EVENTS }
