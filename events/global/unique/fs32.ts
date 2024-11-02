import { sample } from '@std/collections'
import { EVENTS_GLOBAL_UNIQUE, SPECIES_NAMES } from '../../../enums.ts'
import type Population from '../../../classes/Population.ts'
import type Region from '../../../classes/Region.ts'
import Simulation from '../../../classes/Simulation.ts'
import getChances from '../../get-chances.ts'
import uniqueEventCheck from './unique-event-check.ts'

const BIG_ENOUGH_POP = 5000 as const
const DEST_REGION_ID = 'FS32' as const

const fs32 = (sim: Simulation, forceEvent?: boolean): void => {
  const event: string = EVENTS_GLOBAL_UNIQUE.FS32_MIGRATION
  const prerequisites: string[] = [EVENTS_GLOBAL_UNIQUE.HUMANS]
  if (!uniqueEventCheck(sim, event, prerequisites)) return

  const fireEvent = forceEvent ?? sample(getChances(1, 20))
  if (!fireEvent) return

  const isCandidate = (p: Population): boolean => {
    const isHuman = p.species.name === SPECIES_NAMES.HUMAN
    const isBigEnough = p.size > BIG_ENOUGH_POP
    return isHuman && isBigEnough
  }

  const regions = Object.values(sim.world.regions).filter(region => {
    return region.populations.filter(isCandidate).length > 0
  })

  const srcRegion = sample(regions) as Region
  const src = sample(srcRegion.populations.filter(isCandidate)) as Population
  const transplants = src.split()
  if (transplants === null) return
  transplants.migrate(sim.world.regions[DEST_REGION_ID])

  const description = `The Wanderer transports ${transplants.size} humans from ${srcRegion.id} to ${DEST_REGION_ID}.`
  sim.world.events.push(event)
  sim.history.add({ millennium: sim.millennium, description, tags: ['Wanderer', 'Empyreans', srcRegion.id, DEST_REGION_ID] })
  if (sim.world.dragons.interest.value >= 50) sim.world.dragons.interest.incr()
}

export default fs32
export { BIG_ENOUGH_POP, DEST_REGION_ID }
