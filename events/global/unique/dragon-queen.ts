import { sample } from '@std/collections'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import DragonQueen from '../../../classes/immortals/DragonQueen.ts'
import Simulation from '../../../classes/Simulation.ts'
import getChances from '../../get-chances.ts'
import uniqueEventCheck from './unique-event-check.ts'

const OGRISM_THRESHOLD = 8 as const

const dragonQueen = (forceEvent?: boolean): void => {
  const { world, history, millennium } = Simulation.instance()
  const event: string = EVENTS_GLOBAL_UNIQUE.DRAGON_QUEEN
  const prerequisites: string[] = [EVENTS_GLOBAL_UNIQUE.LANG]
  if (!uniqueEventCheck(event, prerequisites)) return

  const regions = world.regions.values().filter(region => {
    if (region.dragons.length < 1) return false
    if (region.ogrism < OGRISM_THRESHOLD) return false
    return forceEvent ?? sample(getChances(1, 1000)) ?? false
  })
  const region = sample(regions)
  if (!region) return

  DragonQueen.instance(world, region.id)
  const description = `The Dragon Queen arises in ${region.id}.`
  world.events.push(event)
  history.add({ millennium, description, tags: ['Dragon Queen', 'Dragons', region.id] })
  world.dragons.fear.mod(5)
}

export default dragonQueen
export { OGRISM_THRESHOLD }
