import { IImmortal } from '../../../index.d.ts'
import Simulation from '../../Simulation.ts'
import Elemental from './Elemental.ts'

class WaterElemental extends Elemental {
  constructor (sim: Simulation, region: string, data?: IImmortal) {
    super(sim, region, 'Water', data)
  }

  override desiredRegions(): string[] {
    return WaterElemental.desiredRegions(this.simulation)
  }

  static desiredRegions (sim: Simulation): string[] {
    const all = sim.world.regions.values()
    const coastal = all.filter(region => region.tags.includes('coastal'))
    const hasUndergroundSea = all.filter(region => {
      const seas = region.features.filter(feature => feature.description.startsWith('Underground sea'))
      return seas.length > 0
    })
    const hasStormDragons = all.filter(region => region.dragons.includes('storm dragon'))
    const ids = [
      ...coastal.map(region => region.id),
      ...hasUndergroundSea.map(region => region.id),
      ...hasStormDragons.map(region => region.id)
    ]
    return [...new Set(ids)]
  }
}

export default WaterElemental
