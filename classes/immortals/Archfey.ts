import { IImmortal } from '../../index.d.ts'
import { DISPOSITIONS } from '../../enums.ts'
import Immortal from './Immortal.ts'
import Simulation from '../Simulation.ts'

class Archfey extends Immortal {
  constructor (sim: Simulation, region: string, data?: IImmortal) {
    const archfeyData: IImmortal = Object.assign({}, {
      description: `Archfey Sovereign of ${region}`,
      disposition: DISPOSITIONS.INDIFFERENT,
      impact: -250,
      slayable: {
        id: `slay-archfey-${region}`,
        description: `Slay the Archfey Sovereign of ${region}`,
        courage: 0.001,
        skill: 0.0001,
        lethality: 0.1
      },
      relationships: [],
      scrolls: []
    }, data ?? {})

    super(sim, region, archfeyData)
  }
}

export default Archfey
