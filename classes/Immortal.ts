import { Emitter, IImmortal, IQuest } from '../index.d.ts'
import { Disposition, DISPOSITIONS } from '../enums.ts'
import Relationship from './Relationship.ts'
import Scribe from './Scribe.ts'

class Immortal {
  description: string
  disposition: Disposition
  impact: number
  relationships: Relationship[]
  scribe: Scribe
  slayable: IQuest | false

  constructor (emitter: Emitter, data?: IImmortal) {
    const relationships = data?.relationships ?? []

    this.description = data?.description ?? ''
    this.disposition = data?.disposition ?? DISPOSITIONS.INDIFFERENT
    this.impact = data?.impact ?? 0
    this.relationships = relationships.map(rel => new Relationship(emitter, rel))
    this.scribe = new Scribe(emitter, ...(data?.scrolls ?? []))
    this.slayable = data?.slayable ?? false
  }

  toObject (): IImmortal {
    return {
      description: this.description,
      disposition: this.disposition,
      impact: this.impact,
      relationships: this.relationships.map(rel => rel.toObject()),
      scrolls: this.scribe.toObject(),
      slayable: this.slayable
    }
  }

  toString (): string {
    return `Immortal: ${this.description}`
  }
}

export default Immortal
