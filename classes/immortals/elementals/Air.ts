import { intersect } from '@std/collections/intersect'
import { sample } from '@std/random/sample'
import { IImmortal } from '../../../index.d.ts'
import Simulation from '../../Simulation.ts'
import Elemental from './Elemental.ts'
import World from '../../World.ts'

class AirElemental extends Elemental {
  constructor (world: World, region: string, data?: IImmortal) {
    super(world, region, 'Air', data)
  }

  override move (): void {
    const { world } = Simulation.instance()
    const region = world.regions.get(this.region)
    if (!region) return
    const desirable = this.desiredRegions()
    let candidates = intersect(region.adjacentRegions, desirable)
    if (candidates.length < 1) candidates = [...region.adjacentRegions]
    const destId = sample(candidates) ?? this.region

    const dest = world.regions.get(destId)
    if (!dest) return
    region.immortals = region.immortals.filter(id => id !== this.id)
    this.region = dest.id
    dest.immortals.push(this.id)
  }

  override desiredRegions(): string[] {
    return AirElemental.desiredRegions()
  }

  static desiredRegions (): string[] {
    const { world } = Simulation.instance()
    const all = world.regions.values()
    const surface = all.filter(region => region.tags.includes('surface'))
    const hasFrostDragons = all.filter(region => region.dragons.includes('frost dragon'))
    const ids = [
      ...surface.map(region => region.id),
      ...hasFrostDragons.map(region => region.id)
    ]
    return [...new Set(ids)]
  }
}

export default AirElemental
