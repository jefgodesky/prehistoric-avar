import type { Emitter, IScroll } from '../index.d.ts'
import Scroll from './Scroll.ts'

const SCROLL_EVENTS = {
  OPEN: 'Scroll.Open'
}

class Scribe {
  scrolls: Scroll[]

  constructor (emitter: Emitter, ...scrolls: Array<Scroll | IScroll>) {
    this.scrolls = scrolls.map(scroll => {
      if (scroll instanceof Scroll) return scroll
      return new Scroll(scroll.text, scroll.seals)
    })
    emitter.on('Scroll.Open', (data: IScroll) => this.handleScrollOpen(data))
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
