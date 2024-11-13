import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Simulation from '../../classes/Simulation.ts'
import DragonQueen from './DragonQueen.ts'

describe('DragonQueen', () => {
  let sim: Simulation
  const region = 'MS06'

  beforeEach(() => {
    DragonQueen.reset()
    sim = new Simulation()
  })

  describe('Member methods', () => {
    describe('move', () => {
      it('moves to a region with dragons', () => {
        const queen = DragonQueen.instance(sim, region)
        queen.move()
        const origin = sim.world.regions.get(region)
        const dest = sim.world.regions.get(queen.region)
        expect(region === queen.region || !origin?.immortals.includes(queen.id)).toBe(true)
        expect(dest?.dragons.length).toBeGreaterThan(0)
        expect(dest?.immortals).toContain(queen.id)
      })
    })
  })
})
