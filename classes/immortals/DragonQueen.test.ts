import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DISPOSITIONS } from '../../enums.ts'
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
        const queen = DragonQueen.create(sim, region)
        queen.move()
        const origin = sim.world.regions.get(region)
        const dest = sim.world.regions.get(queen.region)
        expect(region === queen.region || !origin?.immortals.includes(queen.id)).toBe(true)
        expect(dest?.dragons.length).toBeGreaterThan(0)
        expect(dest?.immortals).toContain(queen.id)
      })
    })
  })

  describe('Static methods', () => {
    describe('create', () => {
      it('creates the Dragon Queen', () => {
        const queen = DragonQueen.create(sim, region)
        expect(queen.region).toBe(region)
        expect(queen.disposition).toBe(DISPOSITIONS.HOSTILE)
        expect(queen.description).toBe('The Dragon Queen')
        expect(queen.impact).toBe(500)
        expect(queen.slayable).toBe(false)
        expect(sim.world.regions.get(region)?.immortals).toContain(queen.id)
      })

      it('is a singleton', () => {
        const q1 = DragonQueen.create(sim, region)
        const q2 = DragonQueen.create(sim, region)
        expect(q1).toBe(q2)
      })
    })

    describe('get', () => {
      it('returns null if the Dragon Queen has not yet been created', () => {
        expect(DragonQueen.get()).toBeNull()
      })

      it('returns the Dragon Queen if she has been created', () => {
        DragonQueen.create(sim, region)
        expect(DragonQueen.get()).not.toBeNull()
      })
    })
  })
})
