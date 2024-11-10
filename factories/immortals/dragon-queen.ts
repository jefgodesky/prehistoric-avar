import { sample } from '@std/collections'
import { DISPOSITIONS } from '../../enums.ts'
import Immortal from '../../classes/immortals/Immortal.ts'
import type Region from '../../classes/Region.ts'
import Simulation from '../../classes/Simulation.ts'

const createDragonQueen = (sim: Simulation): Immortal => {
  return new Immortal(
    sim,
    {
      description: 'The Dragon Queen',
      disposition: DISPOSITIONS.HOSTILE,
      impact: 500,
      slayable: false,
      relationships: [],
      scrolls: [],
    }
  )

  /* dragonQueen.move = (sim: Simulation): Region | null => {
    const dragonRegions = sim.world.regions.values()
      .filter(region => region.dragons.length > 0)
    const region = sample(dragonRegions)
    return region ?? null
  } */
}

export default createDragonQueen
