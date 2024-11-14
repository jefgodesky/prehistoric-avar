import { sample } from '@std/collections'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import Simulation from '../../../classes/Simulation.ts'
import getChances from '../../get-chances.ts'
import uniqueEventCheck from './unique-event-check.ts'

const languageTuan = (forceEvent?: boolean): void => {
  const event: string = EVENTS_GLOBAL_UNIQUE.LANG_TUAN
  const prerequisites: string[] = [EVENTS_GLOBAL_UNIQUE.LANG]
  if (!uniqueEventCheck(event, prerequisites)) return

  const fireEvent = forceEvent ?? sample(getChances(1, 3))
  if (!fireEvent) return

  const { world, history, millennium } = Simulation.instance()
  const description = `The elementals of Tuan adopt language.`
  world.events.push(event)
  history.add({ millennium, description, tags: ['Language', 'Tuan', 'Elementals', 'Sphere of Fluidity'] })
  world.dragons.interest.incr()
}

export default languageTuan
