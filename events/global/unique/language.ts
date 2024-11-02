import { sample } from '@std/collections'
import { EVENTS_GLOBAL_UNIQUE, LANG_MORPHOLOGY, SPECIES_NAMES } from '../../../enums.ts'
import type Population from '../../../classes/Population.ts'
import type Region from '../../../classes/Region.ts'
import Simulation from '../../../classes/Simulation.ts'
import uniqueEventCheck from './unique-event-check.ts'
import Language from '../../../classes/Language.ts'

const language = (sim: Simulation, forceEvent?: boolean): void => {
  const event: string = EVENTS_GLOBAL_UNIQUE.LANG
  const prerequisites: string[] = [EVENTS_GLOBAL_UNIQUE.HUMANS]
  if (!uniqueEventCheck(sim, event, prerequisites)) return

  const chances: boolean[] = [true]
  for (let i = 0; i < 9; i++) chances.push(false)
  const fireEvent = forceEvent ?? sample(chances)
  if (!fireEvent) return

  const isHuman = (p: Population): boolean => p.species.name === SPECIES_NAMES.HUMAN
  const regions = Object.values(sim.world.regions).filter(region => {
    return region.populations.filter(isHuman).length > 0
  })

  const region = sample(regions) as Region
  const proto = new Language({ morphology: LANG_MORPHOLOGY.AGGLUTINATIVE })
  proto.name = `${region.id}-${sim.millennium.toString().padStart(3, '0')}`
  region.languages.push(proto)

  const description = `The first language (${proto.name}) develops among the humans of ${region.id}.`
  sim.world.events.push(event)
  sim.history.add({ millennium: sim.millennium, description, tags: ['Language', 'Invention', 'Humans', region.id] })
  sim.world.dragons.interest.incr()
}

export default language
