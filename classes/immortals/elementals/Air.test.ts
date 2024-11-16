import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import type Region from '../../Region.ts'
import Simulation from '../../../classes/Simulation.ts'
import World from '../../World.ts'
import AirElemental from './Air.ts'

describe('AirElemental', () => {
  const region = 'GS03'
  let world: World

  beforeEach(() => {
    world = Simulation.instance().world
  })

  afterEach(() => {
    Simulation.reset()
  })

  describe('constructor', () => {
    it('creates a powerful air elemental', () => {
      const elemental = new AirElemental(world, region)
      expect(elemental).toBeInstanceOf(AirElemental)
      expect(elemental.region).toBe(region)
      expect(elemental.description).toBe('Powerful Air Elemental')
      expect(elemental.impact).toBe(250)
      expect(elemental.slayable).not.toBe(false)
      expect(world.regions.get(region)?.immortals).toContain(elemental.id)
    })
  })

  describe('Member methods', () => {
    it('moves to another, adjacent, desired region even if it\'s already in a desired region', () => {
      const desired = AirElemental.desiredRegions()
      const region = world.regions.get(desired[0])!
      const elemental = new AirElemental(world, region.id)
      elemental.move()
      const dest = world.regions.get(elemental.region)

      expect(elemental.region).not.toBe(region.id)
      expect(region.adjacentRegions).toContain(elemental.region)
      expect(desired).toContain(elemental.region)
      expect(region.immortals).not.toContain(elemental.id)
      expect(dest?.immortals).toContain(elemental.id)
    })

    it('moves to an adjacent desirable region', () => {
      const desired = AirElemental.desiredRegions()
      const regions = world.regions.values().filter(region => {
        const isNotDesired = !desired.includes(region.id)
        const isAdjacent = region.adjacentRegions.filter(adj => desired.includes(adj)).length > 0
        return isNotDesired && isAdjacent
      })
      const region = regions[0]
      const elemental = new AirElemental(world, region.id)
      elemental.move()
      const dest = world.regions.get(elemental.region)

      expect(elemental.region).not.toBe(region.id)
      expect(region.adjacentRegions).toContain(elemental.region)
      expect(desired).toContain(elemental.region)
      expect(region.immortals).not.toContain(elemental.id)
      expect(dest?.immortals).toContain(elemental.id)
    })

    it('moves to a random adjacent region if nothing desirable', () => {
      const desired = AirElemental.desiredRegions()
      const regions = world.regions.values().filter(region => {
        const isNotDesired = !desired.includes(region.id)
        const isNotAdjacent = region.adjacentRegions.filter(adj => desired.includes(adj)).length === 0
        return isNotDesired && isNotAdjacent
      })
      const region = regions[0]
      const elemental = new AirElemental(world, region.id)
      elemental.move()
      const dest = world.regions.get(elemental.region)

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
        regions = world.regions.values()
      })

      it('includes surface regions', () => {
        const surface = regions.filter(region => region.tags.includes('surface'))
        const desired = AirElemental.desiredRegions()
        for (const region of surface) {
          expect(desired).toContain(region.id)
        }
      })

      it('includes regions where frost dragons live', () => {
        const frostDragonRegions = regions.filter(region => region.dragons.includes('frost dragon'))
        const desired = AirElemental.desiredRegions()
        for (const region of frostDragonRegions) {
          expect(desired).toContain(region.id)
        }
      })
    })
  })
})
