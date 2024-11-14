import { IPopulation } from '../index.d.ts'
import Population from '../classes/Population.ts'
import Simulation from '../classes/Simulation.ts'

const createPopulation = (region: string, data?: IPopulation): Population => {
  const { world } = Simulation.instance()
  return new Population(world, region, data)
}

export default createPopulation
