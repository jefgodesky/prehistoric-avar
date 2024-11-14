import { IImmortal } from '../../../index.d.ts'
import Simulation from '../../Simulation.ts'
import Elemental from './Elemental.ts'
import World from '../../World.ts'

class EarthElemental extends Elemental {
  constructor (world: World, region: string, data?: IImmortal) {
    super(world, region, 'Earth', data)
  }

  override desiredRegions(): string[] {
    return EarthElemental.desiredRegions()
  }

  static desiredRegions (): string[] {
    const { world } = Simulation.instance()
    return world.regions.values()
      .filter(region => region.tags.includes('near-surface'))
      .map(region => region.id)
  }
}

export default EarthElemental
