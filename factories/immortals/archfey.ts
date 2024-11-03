import { nanoid } from 'nanoid'
import { DISPOSITIONS } from '../../enums.ts'
import Immortal from '../../classes/Immortal.ts'
import Quest from '../../classes/Quest.ts'
import type Region from '../../classes/Region.ts'
import Simulation from '../../classes/Simulation.ts'

const createArchfey = (sim: Simulation, region: Region): Immortal => {
  const description = `Archfey Sovereign of ${region.id}`
  const archfey = new Immortal(
    sim.emitter,
    {
      description,
      disposition: DISPOSITIONS.INDIFFERENT,
      impact: -250,
      slayable: new Quest(sim.emitter, {
        id: nanoid(),
        description: `Slay the ${description}`,
        courage: 0.001,
        skill: 0.0001,
        lethality: 0.1
      }),
      relationships: [],
      scrolls: [],
    }
  )

  archfey.move = () => null
  return archfey
}

export default createArchfey
