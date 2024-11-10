import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { IRegionFeature } from '../../../index.d.ts'
import { DISPOSITIONS } from '../../../enums.ts'
import type Region from '../../Region.ts'
import Simulation from '../../../classes/Simulation.ts'
import FireElemental from './Fire.ts'

describe('FireElemental', () => {
  let sim: Simulation
  const region = 'GS03'

  beforeEach(() => { sim = new Simulation() })

  describe('constructor', () => {
    it('creates a powerful fire elemental', () => {
      const elemental = new FireElemental(sim, region)
      expect(elemental).toBeInstanceOf(FireElemental)
      expect(elemental.region).toBe(region)
      expect(elemental.disposition).toBe(DISPOSITIONS.INDIFFERENT)
      expect(elemental.description).toBe('Powerful Fire Elemental')
      expect(elemental.impact).toBe(250)
      expect(elemental.slayable).not.toBe(false)
      expect(sim.world.regions.get(region)?.immortals).toContain(elemental.id)
    })
  })

  describe('Member methods', () => {
    it('stays put if it\'s in a desired region', () => {
      const desired = FireElemental.desiredRegions(sim)
      const region = desired[0]
      const elemental = new FireElemental(sim, region)
      elemental.move()
      expect(elemental.region).toBe(region)
      expect(sim.world.regions.get(region)?.immortals).toContain(elemental.id)
    })

    it('moves to an adjacent desirable region', () => {
      const desired = FireElemental.desiredRegions(sim)
      const regions = sim.world.regions.values().filter(region => {
        const isNotDesired = !desired.includes(region.id)
        const isAdjacent = region.adjacentRegions.filter(adj => desired.includes(adj)).length > 0
        return isNotDesired && isAdjacent
      })
      const region = regions[0]
      const elemental = new FireElemental(sim, region.id)
      elemental.move()
      const dest = sim.world.regions.get(elemental.region)

      expect(elemental.region).not.toBe(region.id)
      expect(region.adjacentRegions).toContain(elemental.region)
      expect(desired).toContain(elemental.region)
      expect(region.immortals).not.toContain(elemental.id)
      expect(dest?.immortals).toContain(elemental.id)
    })

    it('moves to a random adjacent region if nothing desirable', () => {
      const desired = FireElemental.desiredRegions(sim)
      const regions = sim.world.regions.values().filter(region => {
        const isNotDesired = !desired.includes(region.id)
        const isNotAdjacent = region.adjacentRegions.filter(adj => desired.includes(adj)).length === 0
        return isNotDesired && isNotAdjacent
      })
      const region = regions[0]
      const elemental = new FireElemental(sim, region.id)
      elemental.move()
      const dest = sim.world.regions.get(elemental.region)

      expect(elemental.region).not.toBe(region.id)
      expect(region.adjacentRegions).toContain(elemental.region)
      expect(desired).not.toContain(elemental.region)
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

      it('includes volcanic regions', () => {
        const volcanic = regions.filter(region => region.tags.includes('volcanic'))
        const desired = FireElemental.desiredRegions(sim)
        for (const region of volcanic) {
          expect(desired).toContain(region.id)
        }
      })

      it('includes regions that have a volcanic pipe', () => {
        const pipeRegions = regions.filter(region => {
          const pipes = region.features.filter((feature: IRegionFeature) => feature.description.startsWith('Volcanic pipe'))
          return pipes.length > 0
        })
        const desired = FireElemental.desiredRegions(sim)
        for (const region of pipeRegions) {
          expect(desired).toContain(region.id)
        }
      })

      it('includes regions where flame dragons live', () => {
        const flameDragonRegions = regions.filter(region => region.dragons.includes('flame dragon'))
        const desired = FireElemental.desiredRegions(sim)
        for (const region of flameDragonRegions) {
          expect(desired).toContain(region.id)
        }
      })
    })
  })
})
