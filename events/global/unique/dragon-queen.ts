import { sample } from '@std/collections'
import { DISPOSITIONS, EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import Immortal from '../../../classes/Immortal.ts'
import Simulation from '../../../classes/Simulation.ts'
import getChances from '../../get-chances.ts'
import uniqueEventCheck from './unique-event-check.ts'

const OGRISM_THRESHOLD = 8 as const

const dragonQueen = (sim: Simulation, forceEvent?: boolean): void => {
  const event: string = EVENTS_GLOBAL_UNIQUE.DRAGON_QUEEN
  const prerequisites: string[] = [EVENTS_GLOBAL_UNIQUE.LANG]
  if (!uniqueEventCheck(sim, event, prerequisites)) return

  const regions = Object.values(sim.world.regions).filter(region => {
    if (region.dragons.length < 1) return false
    if (region.ogrism < OGRISM_THRESHOLD) return false
    return forceEvent ?? sample(getChances(1, 1000)) ?? false
  })
  const region = sample(regions)
  if (!region) return

  region.immortals.push(new Immortal(
    sim.emitter,
    {
      description: 'The Dragon Queen',
      disposition: DISPOSITIONS.HOSTILE,
      impact: 500,
      slayable: false,
      relationships: [],
      scrolls: []
    }
  ))

  const description = `The Dragon Queen arises in ${region.id}.`
  sim.world.events.push(event)
  sim.history.add({ millennium: sim.millennium, description, tags: ['Dragon Queen', 'Dragons', region.id] })
  sim.world.dragons.fear.mod(5)
}

export default dragonQueen
export { OGRISM_THRESHOLD }
