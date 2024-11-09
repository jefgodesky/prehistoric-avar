import { sample } from '@std/collections'
import { EVENTS_GLOBAL_UNIQUE, SPECIES_NAMES } from '../../../enums.ts'
import type Population from '../../../classes/Population.ts'
import type Region from '../../../classes/Region.ts'
import Simulation from '../../../classes/Simulation.ts'
import getChances from '../../get-chances.ts'
import uniqueEventCheck from './unique-event-check.ts'

const language = (sim: Simulation, forceEvent?: boolean): void => {
  const event: string = EVENTS_GLOBAL_UNIQUE.LANG
  const prerequisites: string[] = [EVENTS_GLOBAL_UNIQUE.HUMANS]
  if (!uniqueEventCheck(sim, event, prerequisites)) return

  const fireEvent = forceEvent ?? sample(getChances(1, 10))
  if (!fireEvent) return

  const isHuman = (p: Population): boolean => p.species.name === SPECIES_NAMES.HUMAN
  const regions = Object.values(sim.world.regions).filter(region => {
    return region.populations.filter(isHuman).length > 0
  })

  const region = sample(regions) as Region
  if (!region.society) return
  region.society.addLanguage()

  const description = `The first language (${region.society.language}) develops among the humans of ${region.id}.`
  sim.world.events.push(event)
  sim.history.add({ millennium: sim.millennium, description, tags: ['Language', 'Invention', 'Humans', region.id] })
  sim.world.dragons.interest.incr()
}

export default language
