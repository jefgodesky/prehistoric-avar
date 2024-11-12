import { sample } from '@std/collections'
import { EVENTS_GLOBAL_UNIQUE, SPECIES_NAMES } from '../../../enums.ts'
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

  const isCandidate = (id: string): boolean => {
    const population = sim.world.populations.get(id)
    const isHuman = population?.getSpecies().name === SPECIES_NAMES.HUMAN
    const isBigEnough = (population?.size ?? 0) > BIG_ENOUGH_POP
    return isHuman && isBigEnough
  }

  const regions = sim.world.regions.values().filter(region => {
    return region.populations.filter(isCandidate).length > 0
  })

  const srcRegion = sample(regions)
  if (!srcRegion) return
  const srcId = sample(srcRegion.populations.filter(isCandidate))
  const src = srcId ? sim.world.populations.get(srcId) : null
  if (!src) return
  const percent =(Math.random() * 0.2) + 0.4 // 40%-60%, randomized
  const n =  Math.round(percent * src.size)
  src.migrate(DEST_REGION_ID, n, false)

  const description = `The Wanderer transports ${n} humans from ${srcRegion.id} to ${DEST_REGION_ID}.`
  sim.world.events.push(event)
  sim.history.add({ millennium: sim.millennium, description, tags: ['Wanderer', 'Empyreans', srcRegion.id, DEST_REGION_ID] })
  if (sim.world.dragons.interest.value >= 50) sim.world.dragons.interest.incr()
}

export default fs32
export { BIG_ENOUGH_POP, DEST_REGION_ID }
