import type { IImmortal } from '../../../index.d.ts'
import Immortal from '../Immortal.ts'
import Simulation from '../../Simulation.ts'
import World from '../../World.ts'
import { intersect } from "@std/collections/intersect";
import { sample } from "@std/random/sample";

abstract class Elemental extends Immortal {
  protected constructor (world: World, region: string, element: string, data?: IImmortal) {
    const elementalData: IImmortal = Object.assign({}, {
      description: `Powerful ${element} Elemental`,
      impact: 250,
      slayable: {
        id: `Slay the Powerful ${element} Elemental`,
        description: `Slay the Powerful ${element} Elemental`,
        courage: 0.001,
        skill: 0.0001,
        lethality: 0.25
      },
      scrolls: []
    }, data ?? {})

    super(world, region, elementalData)
  }

  override move (): void {
    const { world } = Simulation.instance()
    const region = world.regions.get(this.region)
    if (!region) return
    const desirable = this.desiredRegions()
    if (desirable.includes(this.region)) return

    let candidates = intersect(region.adjacentRegions, desirable)
    if (candidates.length < 1) candidates = [...region.adjacentRegions]
    const destId = sample(candidates) ?? this.region

    const dest = world.regions.get(destId)
    if (!dest) return
    region.immortals = region.immortals.filter(id => id !== this.id)
    this.region = dest.id
    dest.immortals.push(this.id)
  }

  abstract desiredRegions(): string[]
}

export default Elemental
