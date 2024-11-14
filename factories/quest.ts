import { IQuest } from '../index.d.ts'
import Quest from '../classes/Quest.ts'
import Simulation from '../classes/Simulation.ts'

const createQuest = (data?: IQuest): Quest => {
  const { world } = Simulation.instance()
  return new Quest(world, data)
}

export default createQuest
