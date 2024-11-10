import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DISPOSITIONS } from '../../../enums.ts'
import type Region from '../../Region.ts'
import Simulation from '../../../classes/Simulation.ts'
import EarthElemental from './Earth.ts'

describe('EarthElemental', () => {
  let sim: Simulation
  const region = 'GS03'

  beforeEach(() => { sim = new Simulation() })

  describe('constructor', () => {
    it('creates a powerful earth elemental', () => {
      const elemental = new EarthElemental(sim, region)
      expect(elemental).toBeInstanceOf(EarthElemental)
      expect(elemental.region).toBe(region)
      expect(elemental.disposition).toBe(DISPOSITIONS.INDIFFERENT)
      expect(elemental.description).toBe('Powerful Earth Elemental')
      expect(elemental.impact).toBe(250)
      expect(elemental.slayable).not.toBe(false)
      expect(sim.world.regions.get(region)?.immortals).toContain(elemental.id)
    })
  })

  describe('Member methods', () => {
    it('stays put if it\'s in a desired region', () => {
      const desired = EarthElemental.desiredRegions(sim)
      const region = desired[0]
      const elemental = new EarthElemental(sim, region)
      elemental.move()
      expect(elemental.region).toBe(region)
      expect(sim.world.regions.get(region)?.immortals).toContain(elemental.id)
    })

    it('moves to an adjacent desirable region', () => {
      const desired = EarthElemental.desiredRegions(sim)
      const regions = sim.world.regions.values().filter(region => {
        const isNotDesired = !desired.includes(region.id)
        const isAdjacent = region.adjacentRegions.filter(adj => desired.includes(adj)).length > 0
        return isNotDesired && isAdjacent
      })
      const region = regions[0]
      const elemental = new EarthElemental(sim, region.id)
      elemental.move()
      const dest = sim.world.regions.get(elemental.region)

      expect(elemental.region).not.toBe(region.id)
      expect(region.adjacentRegions).toContain(elemental.region)
      expect(desired).toContain(elemental.region)
      expect(region.immortals).not.toContain(elemental.id)
      expect(dest?.immortals).toContain(elemental.id)
    })
  })

  describe('Static methods', () => {
    describe('desiredRegions', () => {
      let regions: Region[]

      beforeEach(() => {
        regions = sim.world.regions.values()
      })

      it('includes cave regions', () => {
        const caves = regions.filter(region => region.tags.includes('near-surface'))
        const desired = EarthElemental.desiredRegions(sim)
        for (const region of caves) {
          expect(desired).toContain(region.id)
        }
      })
    })
  })
})
