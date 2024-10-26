import { IImmortal } from '../index.d.ts'
import { Disposition, DISPOSITIONS } from '../enums.ts'
import Relationship from './Relationship.ts'
import Scroll from './Scroll.ts'

class Immortal {
  description: string
  disposition: Disposition
  impact: number
  relationships: Relationship[]
  scrolls: Scroll[]
  slayable: [number, number] | false

  constructor (data?: IImmortal) {
    const scrolls = data?.scrolls ?? []
    const relationships = data?.relationships ?? []

    this.description = data?.description ?? ''
    this.disposition = data?.disposition ?? DISPOSITIONS.INDIFFERENT
    this.impact = data?.impact ?? 0
    this.relationships = relationships.map(rel => new Relationship(rel))
    this.scrolls = scrolls.map(d => new Scroll(d.text, d.seals))
    this.slayable = data?.slayable ?? false
  }

  toObject (): IImmortal {
    return {
      description: this.description,
      disposition: this.disposition,
      impact: this.impact,
      relationships: this.relationships.map(rel => rel.toObject()),
      scrolls: this.scrolls.map(scroll => scroll.toObject()),
      slayable: this.slayable
    }
  }

  toString (): string {
    return `Immortal: ${this.description}`
  }
}

export default Immortal
