import { sample } from '@std/collections'
import { IImmortal } from '../../index.d.ts'
import { DISPOSITIONS } from '../../enums.ts'
import Immortal from './Immortal.ts'
import Simulation from '../Simulation.ts'
import Singleton from '../../Singleton.ts'
import World from '../World.ts'

class DragonOgre extends Immortal {
  constructor (world: World, region: string, data?: IImmortal) {
    const dragonQueenData: IImmortal = Object.assign({}, {
      description: 'The Dragon Queen',
      disposition: DISPOSITIONS.HOSTILE,
      impact: 500,
      slayable: false as false,
      relationships: [],
      scrolls: []
    }, data ?? {})

    super(world, region, dragonQueenData)
  }

  override move (): void {
    const { world } = Simulation.instance()
    const regions = world.regions.values()
      .filter(region => region.dragons.length > 0)
    const dest = sample(regions)
    if (!dest) return

    const origin = world.regions.get(this.region)
    if (!origin) return

    origin.immortals = origin.immortals.filter(id => id !== this.id)
    this.region = dest.id
    dest.immortals = [...new Set([...dest.immortals, this.id])]
  }
}

const DragonQueen = Singleton(DragonOgre)
export default DragonQueen
