import { Disposition, DISPOSITIONS } from '../enums.ts'
import type { IRelationship } from '../index.d.ts'

class Relationship {
  a: string
  b: string
  disposition: Disposition

  constructor (data?: IRelationship) {
    this.a = data?.a ?? ''
    this.b = data?.b ?? ''
    this.disposition = data?.disposition ?? DISPOSITIONS.INDIFFERENT
  }

  toObject (): IRelationship {
    return {
      a: this.a,
      b: this.b,
      disposition: this.disposition
    }
  }

  toString (): string {
    return `${this.a} → ${this.b} [${this.disposition}]`
  }
}

export default Relationship
