import { sample } from '@std/collections'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import Simulation from '../../../classes/Simulation.ts'
import getChances from '../../get-chances.ts'
import uniqueEventCheck from './unique-event-check.ts'

const languageSun = (forceEvent?: boolean): void => {
  const event: string = EVENTS_GLOBAL_UNIQUE.LANG_SUN
  const prerequisites: string[] = [EVENTS_GLOBAL_UNIQUE.LANG]
  if (!uniqueEventCheck(event, prerequisites)) return

  const { world, history, millennium } = Simulation.instance()
  const checks = [
    sample(getChances(1, 20)) ?? false,
    world.events.includes(EVENTS_GLOBAL_UNIQUE.LANG_HADAR)
      ? sample(getChances(1, 10)) ?? false
      : false,
    world.events.includes(EVENTS_GLOBAL_UNIQUE.LANG_TUAN)
      ? sample(getChances(1, 5)) ?? false
      : false,
    world.events.includes(EVENTS_GLOBAL_UNIQUE.LANG_ELTA)
      ? sample(getChances(1, 10)) ?? false
      : false
  ]
  const fireEvent = forceEvent ?? checks.some(check => check)
  if (!fireEvent) return

  const solarians = 'Solarians'
  const gelids = 'Gelids'
  const side = sample([solarians, gelids]) ?? solarians
  const other = side === solarians ? gelids : solarians
  const description = `The ${side} bring language to the Sphere of Warmth. The ${other} adopt it as well soon after.`
  world.events.push(event)
  history.add({ millennium, description, tags: ['Language', side, other, 'Sphere of Warmth'] })
  world.dragons.interest.incr()
}

export default languageSun
