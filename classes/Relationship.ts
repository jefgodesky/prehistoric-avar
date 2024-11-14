import { Disposition, DISPOSITIONS } from '../enums.ts'
import type { IRelationship } from '../index.d.ts'
import Scribe from './Scribe.ts'

class Relationship {
  a: string
  b: string
  disposition: Disposition
  scribe: Scribe

  constructor (data?: IRelationship) {
    this.a = data?.a ?? ''
    this.b = data?.b ?? ''
    this.disposition = data?.disposition ?? DISPOSITIONS.INDIFFERENT
    this.scribe = new Scribe(...(data?.scrolls ?? []))
  }

  toObject (): IRelationship {
    return {
      a: this.a,
      b: this.b,
      disposition: this.disposition,
      scrolls: this.scribe.toObject()
    }
  }

  toString (): string {
    return `${this.a} → ${this.b} [${this.disposition}]`
  }
}

export default Relationship
