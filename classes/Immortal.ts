import {Emitter, IImmortal } from '../index.d.ts'
import { Disposition, DISPOSITIONS } from '../enums.ts'
import Quest from './Quest.ts'
import type Region from './Region.ts'
import Relationship from './Relationship.ts'
import Scribe from './Scribe.ts'
import Simulation from './Simulation.ts'

class Immortal {
  description: string
  disposition: Disposition
  impact: number
  relationships: Relationship[]
  scribe: Scribe
  slayable: Quest | false
  slain: boolean = false
  move: (sim: Simulation, current: Region) => Region | null

  constructor (emitter: Emitter, data?: IImmortal) {
    const relationships = data?.relationships ?? []

    this.description = data?.description ?? ''
    this.disposition = data?.disposition ?? DISPOSITIONS.INDIFFERENT
    this.impact = data?.impact ?? 0
    this.relationships = relationships.map(rel => new Relationship(emitter, rel))
    this.scribe = new Scribe(emitter, ...(data?.scrolls ?? []))
    this.slayable = data?.slayable ? new Quest(emitter, data.slayable) : false
    this.move = () => null
  }

  toObject (): IImmortal {
    return {
      description: this.description,
      disposition: this.disposition,
      impact: this.impact,
      relationships: this.relationships.map(rel => rel.toObject()),
      scrolls: this.scribe.toObject(),
      slayable: this.slayable === false ? false : this.slayable.toObject()
    }
  }

  toString (): string {
    return `Immortal: ${this.description}`
  }
}

export default Immortal
