import { sample } from '@std/collections'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import Simulation from '../../../classes/Simulation.ts'
import getChances from '../../get-chances.ts'
import uniqueEventCheck from './unique-event-check.ts'

const languageElta = (forceEvent?: boolean): void => {
  const event: string = EVENTS_GLOBAL_UNIQUE.LANG_ELTA
  const prerequisites: string[] = [EVENTS_GLOBAL_UNIQUE.LANG]
  if (!uniqueEventCheck(event, prerequisites)) return

  const { world, history, millennium } = Simulation.instance()
  const checks = [
    sample(getChances(1, 20)) ?? false,
    world.events.includes(EVENTS_GLOBAL_UNIQUE.LANG_HADAR)
      ? sample(getChances(1, 10)) ?? false
      : false,
    world.events.includes(EVENTS_GLOBAL_UNIQUE.LANG_TUAN)
      ? sample(getChances(1, 10)) ?? false
      : false,
    world.events.includes(EVENTS_GLOBAL_UNIQUE.LANG_SUN)
      ? sample(getChances(1, 10)) ?? false
      : false
  ]
  const fireEvent = forceEvent ?? checks.some(check => check)
  if (!fireEvent) return

  const description = `The Eltans adopt language.`
  world.events.push(event)
  history.add({ millennium, description, tags: ['Language', 'Eltans', 'Sphere of Time'] })
  world.dragons.interest.incr()
}

export default languageElta
