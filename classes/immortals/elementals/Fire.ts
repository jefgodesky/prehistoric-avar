import { IImmortal } from '../../../index.d.ts'
import Simulation from '../../Simulation.ts'
import Elemental from './Elemental.ts'

class FireElemental extends Elemental {
  constructor (sim: Simulation, region: string, data?: IImmortal) {
    super(sim, region, 'Fire', data)
  }

  override desiredRegions(): string[] {
    return FireElemental.desiredRegions(this.simulation)
  }

  static desiredRegions (sim: Simulation): string[] {
    const all = sim.world.regions.values()
    const volcanic = all.filter(region => region.tags.includes('volcanic'))
    const hasPipes = all.filter(region => {
      const pipes = region.features.filter(feature => feature.description.startsWith('Volcanic pipe'))
      return pipes.length > 0
    })
    const hasFlameDragons = all.filter(region => region.dragons.includes('flame dragon'))
    const ids = [
      ...volcanic.map(region => region.id),
      ...hasPipes.map(region => region.id),
      ...hasFlameDragons.map(region => region.id)
    ]
    return [...new Set(ids)]
  }
}

export default FireElemental
