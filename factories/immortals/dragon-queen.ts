import { IImmortal } from '../../index.d.ts'
import DragonQueen, { DragonOgre } from '../../classes/immortals/DragonQueen.ts'
import Simulation from '../../classes/Simulation.ts'

const createDragonQueen = (region: string, data?: IImmortal): DragonOgre => {
  const { world } = Simulation.instance()
  return DragonQueen.instance(world, region, data)
}

export default createDragonQueen
