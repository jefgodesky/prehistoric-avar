import { sample } from '@std/collections'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import Simulation from '../../../classes/Simulation.ts'
import getChances from '../../get-chances.ts'
import uniqueEventCheck from './unique-event-check.ts'

const languageElta = (sim: Simulation, forceEvent?: boolean): void => {
  const event: string = EVENTS_GLOBAL_UNIQUE.LANG_ELTA
  const prerequisites: string[] = [EVENTS_GLOBAL_UNIQUE.LANG]
  if (!uniqueEventCheck(sim, event, prerequisites)) return

  const checks = [
    sample(getChances(1, 20)) ?? false,
    sim.world.events.includes(EVENTS_GLOBAL_UNIQUE.LANG_HADAR)
      ? sample(getChances(1, 10)) ?? false
      : false,
    sim.world.events.includes(EVENTS_GLOBAL_UNIQUE.LANG_TUAN)
      ? sample(getChances(1, 10)) ?? false
      : false,
    sim.world.events.includes(EVENTS_GLOBAL_UNIQUE.LANG_SUN)
      ? sample(getChances(1, 10)) ?? false
      : false
  ]
  const fireEvent = forceEvent ?? checks.some(check => check)
  if (!fireEvent) return

  const description = `The Eltans adopt language.`
  sim.world.events.push(event)
  sim.history.add({ millennium: sim.millennium, description, tags: ['Language', 'Eltans', 'Sphere of Time'] })
  sim.world.dragons.interest.incr()
}

export default languageElta
