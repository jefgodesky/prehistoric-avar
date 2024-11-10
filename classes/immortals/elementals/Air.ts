import { intersect } from '@std/collections/intersect'
import { sample } from '@std/random/sample'
import { IImmortal } from '../../../index.d.ts'
import Simulation from '../../Simulation.ts'
import Elemental from './Elemental.ts'

class AirElemental extends Elemental {
  constructor (sim: Simulation, region: string, data?: IImmortal) {
    super(sim, region, 'Air', data)
  }

  override move (): void {
    const region = this.simulation.world.regions.get(this.region)
    if (!region) return
    const desirable = this.desiredRegions()
    let candidates = intersect(region.adjacentRegions, desirable)
    if (candidates.length < 1) candidates = [...region.adjacentRegions]
    const destId = sample(candidates) ?? this.region

    const dest = this.simulation.world.regions.get(destId)
    if (!dest) return
    region.immortals = region.immortals.filter(id => id !== this.id)
    this.region = dest.id
    dest.immortals.push(this.id)
  }

  override desiredRegions(): string[] {
    return AirElemental.desiredRegions(this.simulation)
  }

  static desiredRegions (sim: Simulation): string[] {
    const all = sim.world.regions.values()
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
