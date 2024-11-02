import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import { IHistoricalQuery } from '../../../index.d.ts'
import Simulation from '../../../classes/Simulation.ts'
import uniqueEventCheck from './unique-event-check.ts'

const languageHadar = (sim: Simulation): void => {
  const event: string = EVENTS_GLOBAL_UNIQUE.LANG_HADAR
  const prerequisites: string[] = [EVENTS_GLOBAL_UNIQUE.LANG]
  if (!uniqueEventCheck(sim, event, prerequisites)) return

  const q: IHistoricalQuery = { tags: ['Language', 'Invention'], logic: { tags: 'and' }}
  const results = sim.history.get(q)
  const when = results.length > 0 ? results[0].millennium : sim.millennium - 1
  if (when >= sim.millennium) return

  const description = `The empyreans of Hadar adopt language.`
  sim.world.events.push(event)
  sim.history.add({ millennium: sim.millennium, description, tags: ['Language', 'Hadar', 'Empyreans'] })
  sim.world.dragons.interest.incr()
}

export default languageHadar
