import type { IImmortal } from '../../../index.d.ts'
import { DISPOSITIONS } from '../../../enums.ts'
import Immortal from '../Immortal.ts'
import type Simulation from '../../Simulation.ts'
import { intersect } from "@std/collections/intersect";
import { sample } from "@std/random/sample";

abstract class Elemental extends Immortal {
  protected constructor (sim: Simulation, region: string, element: string, data?: IImmortal) {
    const elementalData: IImmortal = Object.assign({}, {
      description: `Powerful ${element} Elemental`,
      disposition: DISPOSITIONS.INDIFFERENT,
      impact: 250,
      slayable: {
        id: `Slay the Powerful ${element} Elemental`,
        description: `Slay the Powerful ${element} Elemental`,
        courage: 0.001,
        skill: 0.0001,
        lethality: 0.25
      },
      relationships: [],
      scrolls: []
    }, data ?? {})

    super(sim, region, elementalData)
  }

  override move (): void {
    const region = this.simulation.world.regions.get(this.region)
    if (!region) return
    const desirable = this.desiredRegions()
    if (desirable.includes(this.region)) return

    let candidates = intersect(region.adjacentRegions, desirable)
    if (candidates.length < 1) candidates = [...region.adjacentRegions]
    const destId = sample(candidates) ?? this.region

    const dest = this.simulation.world.regions.get(destId)
    if (!dest) return
    region.immortals = region.immortals.filter(id => id !== this.id)
    this.region = dest.id
    dest.immortals.push(this.id)
  }

  abstract desiredRegions(): string[]
}

export default Elemental
