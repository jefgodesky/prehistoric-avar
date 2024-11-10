import { sample } from '@std/collections'
import { IImmortal } from '../../index.d.ts'
import { DISPOSITIONS } from '../../enums.ts'
import Immortal from './Immortal.ts'
import Simulation from '../Simulation.ts'

class DragonQueen extends Immortal {
  private static queen: DragonQueen | null = null

  private constructor (sim: Simulation, region: string, data?: IImmortal) {
    const dragonQueenData: IImmortal = Object.assign({}, {
      description: 'The Dragon Queen',
      disposition: DISPOSITIONS.HOSTILE,
      impact: 500,
      slayable: false as false,
      relationships: [],
      scrolls: []
    }, data ?? {})

    super(sim, region, dragonQueenData)
  }

  override move (): void {
    const regions = this.simulation.world.regions.values()
      .filter(region => region.dragons.length > 0)
    const dest = sample(regions)
    if (!dest) return

    const origin = this.simulation.world.regions.get(this.region)
    if (!origin) return

    origin.immortals = origin.immortals.filter(id => id !== this.id)
    this.region = dest.id
    dest.immortals = [...new Set([...dest.immortals, this.id])]
  }

  public static create (sim: Simulation, region: string, data?: IImmortal): DragonQueen {
    if (DragonQueen.queen) return DragonQueen.queen
    DragonQueen.queen = new DragonQueen(sim, region, data)
    return DragonQueen.queen
  }

  public static get (): DragonQueen | null {
    return DragonQueen.queen ?? null
  }

  public static reset (): void {
    DragonQueen.queen = null
  }
}

export default DragonQueen
