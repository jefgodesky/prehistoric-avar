import { IImmortal } from '../../../index.d.ts'
import Simulation from '../../Simulation.ts'
import Elemental from './Elemental.ts'

class EarthElemental extends Elemental {
  constructor (sim: Simulation, region: string, data?: IImmortal) {
    super(sim, region, 'Earth', data)
  }

  override desiredRegions(): string[] {
    return EarthElemental.desiredRegions(this.simulation)
  }

  static desiredRegions (sim: Simulation): string[] {
    return sim.world.regions.values()
      .filter(region => region.tags.includes('near-surface'))
      .map(region => region.id)
  }
}

export default EarthElemental
