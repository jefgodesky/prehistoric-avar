import { IImmortal } from '../../index.d.ts'
import Immortal from './Immortal.ts'
import World from '../World.ts'

class Archfey extends Immortal {
  constructor (world: World, region: string, data?: IImmortal) {
    const archfeyData: IImmortal = Object.assign({}, {
      description: `Archfey Sovereign of ${region}`,
      impact: -250,
      slayable: {
        id: `slay-archfey-${region}`,
        description: `Slay the Archfey Sovereign of ${region}`,
        courage: 0.001,
        skill: 0.0001,
        lethality: 0.1
      },
      scrolls: []
    }, data ?? {})

    super(world, region, archfeyData)
  }
}

export default Archfey
