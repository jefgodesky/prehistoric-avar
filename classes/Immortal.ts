import { IImmortal } from '../index.d.ts'
import { Disposition, DISPOSITIONS } from '../enums.ts'
import Quest from './Quest.ts'
import type Region from './Region.ts'
import Relationship from './Relationship.ts'
import Scribe from './Scribe.ts'
import Simulation from './Simulation.ts'

const TO_STRING_PREFIX = 'Immortal:' as const

class Immortal {
  id: string
  description: string
  disposition: Disposition
  impact: number
  relationships: Relationship[]
  scribe: Scribe
  slayable: Quest | false
  slain: boolean = false
  simulation: Simulation
  move: (sim: Simulation, current: Region) => Region | null

  constructor (sim: Simulation, data?: IImmortal) {
    const relationships = data?.relationships ?? []
    this.simulation = sim

    this.description = data?.description ?? 'Immortal'
    this.disposition = data?.disposition ?? DISPOSITIONS.INDIFFERENT
    this.impact = data?.impact ?? 0
    this.relationships = relationships.map(rel => new Relationship(this.simulation, rel))
    this.scribe = new Scribe(this.simulation, ...(data?.scrolls ?? []))
    this.slayable = data?.slayable ? new Quest(this.simulation, data.slayable) : false
    this.move = () => null

    this.id = sim.world.immortals.generateKey(this.description)
    sim.world.immortals.add(this)
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
    return `${TO_STRING_PREFIX} ${this.description}`
  }

  static find (sim: Simulation, q: string = ''): Immortal | null {
    const r = q.toLowerCase().startsWith(TO_STRING_PREFIX.toLowerCase())
      ? q.slice(TO_STRING_PREFIX.length).trim()
      : q
    const str = `${TO_STRING_PREFIX} ${r}`

    for (const region of sim.regions) {
      for (const immortal of region.immortals) {
        if (immortal.toString() === str) return immortal
      }
    }

    return null
  }
}

export default Immortal
