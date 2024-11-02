import { sample } from '@std/collections'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import Simulation from '../../../classes/Simulation.ts'
import uniqueEventCheck from './unique-event-check.ts'

const languageTuan = (sim: Simulation, forceEvent?: boolean): void => {
  const event: string = EVENTS_GLOBAL_UNIQUE.LANG_HADAR
  const prerequisites: string[] = [EVENTS_GLOBAL_UNIQUE.LANG]
  if (!uniqueEventCheck(sim, event, prerequisites)) return

  const chances: boolean[] = [true, false, false]
  const fireEvent = forceEvent ?? sample(chances)
  if (!fireEvent) return

  const description = `The elementals of Tuan adopt language.`
  sim.world.events.push(event)
  sim.history.add({ millennium: sim.millennium, description, tags: ['Language', 'Tuan', 'Elementals'] })
  sim.world.dragons.interest.incr()
}

export default languageTuan
