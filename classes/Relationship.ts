import { Disposition, DISPOSITIONS } from '../enums.ts'
import type { IRelationship } from '../index.d.ts'
import Scroll from './Scroll.ts'

class Relationship {
  a: string
  b: string
  disposition: Disposition
  scrolls: Scroll[]

  constructor (data?: IRelationship) {
    const scrolls = data?.scrolls ?? []
    this.a = data?.a ?? ''
    this.b = data?.b ?? ''
    this.disposition = data?.disposition ?? DISPOSITIONS.INDIFFERENT
    this.scrolls = scrolls.map(scroll => new Scroll(scroll.text, scroll.seals))
  }

  toObject (): IRelationship {
    return {
      a: this.a,
      b: this.b,
      disposition: this.disposition,
      scrolls: this.scrolls.map(scroll => scroll.toObject())
    }
  }

  toString (): string {
    return `${this.a} → ${this.b} [${this.disposition}]`
  }
}

export default Relationship
