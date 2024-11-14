import { IImmortal } from '../../../index.d.ts'
import Simulation from '../../Simulation.ts'
import Elemental from './Elemental.ts'
import World from '../../World.ts'

class WaterElemental extends Elemental {
  constructor (world: World, region: string, data?: IImmortal) {
    super(world, region, 'Water', data)
  }

  override desiredRegions(): string[] {
    return WaterElemental.desiredRegions()
  }

  static desiredRegions (): string[] {
    const { world } = Simulation.instance()
    const all = world.regions.values()
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
