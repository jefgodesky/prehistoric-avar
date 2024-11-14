import { IImmortal } from '../../index.d.ts'
import Immortal from '../../classes/immortals/Immortal.ts'
import Simulation from '../../classes/Simulation.ts'

const createImmortal = (region: string, data?: IImmortal): Immortal => {
  const { world } = Simulation.instance()
  return new Immortal(world, region, data)
}

export default createImmortal
