import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DISPOSITIONS } from '../../enums.ts'
import Simulation from '../../classes/Simulation.ts'
import Archfey from './Archfey.ts'

describe('Archfey', () => {
  let sim: Simulation
  const region = 'GS03'

  beforeEach(() => { sim = new Simulation() })

  describe('constructor', () => {
    it('creates an archfey', () => {
      const archfey = new Archfey(sim, region)
      expect(archfey).toBeInstanceOf(Archfey)
      expect(archfey.region).toBe(region)
      expect(archfey.disposition).toBe(DISPOSITIONS.INDIFFERENT)
      expect(archfey.description).toBe('Archfey Sovereign of GS03')
      expect(archfey.impact).toBe(-250)
      expect(archfey.slayable).not.toBe(false)
      expect(sim.world.regions.get(region)?.immortals).toContain(archfey.id)
    })
  })

  describe('Member methods', () => {
    describe('move', () => {
      it('does nothing', () => {
        const archfey = new Archfey(sim, region)
        archfey.move()
        expect(archfey.region).toBe(region)
        expect(sim.world.regions.get(region)?.immortals).toContain(archfey.id)
      })
    })
  })
})
