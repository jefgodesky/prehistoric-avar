import { sample } from '@std/collections'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import Simulation from '../../../classes/Simulation.ts'
import getChances from '../../get-chances.ts'
import uniqueEventCheck from './unique-event-check.ts'

const death = (forceEvent?: boolean): void => {
  const event: string = EVENTS_GLOBAL_UNIQUE.DEATH
  const prerequisites: string[] = [EVENTS_GLOBAL_UNIQUE.LANG]
  if (!uniqueEventCheck(event, prerequisites)) return

  const fireEvent = forceEvent ?? sample(getChances(1, 3))
  if (!fireEvent) return

  const { world, history, millennium } = Simulation.instance()
  const description = 'Death emerges as a sentient being, the eternal, silent lord of Shol.'
  world.events.push(event)
  history.add({ millennium, description, tags: ['Shol', 'Sphere of Death'] })
  world.dragons.fear.mod(5)
}

export default death
