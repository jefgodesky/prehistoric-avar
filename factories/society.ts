import { ISociety } from '../index.d.ts'
import Simulation from '../classes/Simulation.ts'
import Society from '../classes/Society.ts'

const createSociety = (region: string, data?: ISociety): Society => {
  const { world } = Simulation.instance()
  return new Society(world, region, data)
}

export default createSociety
