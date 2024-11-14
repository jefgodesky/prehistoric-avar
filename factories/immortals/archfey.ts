import { IImmortal } from '../../index.d.ts'
import Archfey from '../../classes/immortals/Archfey.ts'
import Simulation from '../../classes/Simulation.ts'

const createArchfey = (region: string, data?: IImmortal): Archfey => {
  const { world } = Simulation.instance()
  return new Archfey(world, region, data)
}

export default createArchfey
