import { IImmortal } from '../../index.d.ts'
import { TerrestrialElement, TERRESTRIAL_ELEMENTS } from '../../enums.ts'
import AirElemental from '../../classes/immortals/elementals/Air.ts'
import EarthElemental from '../../classes/immortals/elementals/Earth.ts'
import FireElemental from '../../classes/immortals/elementals/Fire.ts'
import WaterElemental from '../../classes/immortals/elementals/Water.ts'
import type Elemental from '../../classes/immortals/elementals/Elemental.ts'
import Simulation from '../../classes/Simulation.ts'

const createElemental = (region: string, element: TerrestrialElement, data?: IImmortal): Elemental => {
  const { world } = Simulation.instance()
  switch (element) {
    case TERRESTRIAL_ELEMENTS.AIR: return new AirElemental(world, region, data)
    case TERRESTRIAL_ELEMENTS.FIRE: return new FireElemental(world, region, data)
    case TERRESTRIAL_ELEMENTS.WATER: return new WaterElemental(world, region, data)
    default: return new EarthElemental(world, region, data)
  }
}

export default createElemental
