import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import { IHistoricalQuery } from '../../../index.d.ts'
import Simulation from '../../../classes/Simulation.ts'
import uniqueEventCheck from './unique-event-check.ts'

const languageHadar = (): void => {
  const event: string = EVENTS_GLOBAL_UNIQUE.LANG_HADAR
  const prerequisites: string[] = [EVENTS_GLOBAL_UNIQUE.LANG]
  if (!uniqueEventCheck(event, prerequisites)) return

  const { world, history, millennium } = Simulation.instance()
  const q: IHistoricalQuery = { tags: ['Language', 'Invention'], logic: { tags: 'and' }}
  const results = history.get(q)
  const when = results.length > 0 ? results[0].millennium : millennium - 1
  if (when >= millennium) return

  const description = `The empyreans of Hadar adopt language.`
  world.events.push(event)
  history.add({ millennium, description, tags: ['Language', 'Hadar', 'Empyreans', 'Sphere of Order'] })
  world.dragons.interest.incr()
}

export default languageHadar
