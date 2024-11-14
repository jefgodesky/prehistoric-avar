import { IImmortal } from '../../index.d.ts'
import { Disposition, DISPOSITIONS } from '../../enums.ts'
import Quest from '../Quest.ts'
import Relationship from '../Relationship.ts'
import Scribe from '../Scribe.ts'
import World from '../World.ts'

const TO_STRING_PREFIX = 'Immortal:' as const

class Immortal {
  id: string
  description: string
  disposition: Disposition
  impact: number
  region: string
  relationships: Relationship[]
  scribe: Scribe
  slayable: Quest | false
  slain: boolean = false

  constructor (world: World, region: string, data?: IImmortal) {
    const relationships = data?.relationships ?? []

    this.description = data?.description ?? 'Immortal'
    this.disposition = data?.disposition ?? DISPOSITIONS.INDIFFERENT
    this.impact = data?.impact ?? 0
    this.region = region
    this.relationships = relationships.map(rel => new Relationship(rel))
    this.scribe = new Scribe(...(data?.scrolls ?? []))
    this.slayable = data?.slayable ? new Quest(world, data.slayable) : false

    this.id = world.immortals.generateKey(this.description)
    world.immortals.add(this)

    const r = world.regions.get(region)
    if (r) r.immortals.push(this.id)
  }

  move (): void {
    return
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
}

export default Immortal
