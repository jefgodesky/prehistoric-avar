import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DISPOSITIONS } from '../../enums.ts'
import Simulation from '../../classes/Simulation.ts'
import createDragonQueen from './dragon-queen.ts'

describe('createDragonQueen', () => {
  let sim: Simulation

  beforeEach(() => {
    sim = new Simulation()
  })

  it('creates the Dragon Queen', () => {
    const queen = createDragonQueen(sim)
    expect(queen.disposition).toBe(DISPOSITIONS.HOSTILE)
    expect(queen.description).toBe('The Dragon Queen')
    expect(queen.impact).toBe(500)
    expect(queen.slayable).toBe(false)
  })

  it('moves the Dragon Queen to a region with dragons', () => {
    const regions = sim.world.regions.values()
      .filter(region => region.dragons.length > 0)
    const ids = regions.map(region => region.id)
    const queen = createDragonQueen(sim)
    expect(ids).toContain(queen.move(sim, regions[0])?.id)
  })
})
