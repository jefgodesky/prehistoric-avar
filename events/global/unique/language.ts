import { sample } from '@std/collections'
import { EVENTS_GLOBAL_UNIQUE, SPECIES_NAMES } from '../../../enums.ts'
import type Population from '../../../classes/Population.ts'
import type Region from '../../../classes/Region.ts'
import Simulation from '../../../classes/Simulation.ts'
import getChances from '../../get-chances.ts'
import uniqueEventCheck from './unique-event-check.ts'

const language = (forceEvent?: boolean): void => {
  const event: string = EVENTS_GLOBAL_UNIQUE.LANG
  const prerequisites: string[] = [EVENTS_GLOBAL_UNIQUE.HUMANS]
  if (!uniqueEventCheck(event, prerequisites)) return

  const fireEvent = forceEvent ?? sample(getChances(1, 10))
  if (!fireEvent) return

  const { world, history, millennium } = Simulation.instance()
  const isHuman = (p: Population): boolean => p.getSpecies().name === SPECIES_NAMES.HUMAN
  const populations = world.populations.values()
  const regions = world.regions.values().filter(region => {
    return populations.filter(p => region.populations.includes(p.id) && isHuman(p)).length > 0
  })

  const region = sample(regions) as Region
  if (!region.society) return
  const society = world.societies.get(region.society)
  if (!society) return
  society.addLanguage()

  const description = `The first language (${society.language}) develops among the humans of ${region.id}.`
  world.events.push(event)
  history.add({ millennium, description, tags: ['Language', 'Invention', 'Humans', region.id] })
  world.dragons.interest.incr()
}

export default language
