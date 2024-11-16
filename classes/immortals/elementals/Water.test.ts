import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { IRegionFeature } from '../../../index.d.ts'
import type Region from '../../Region.ts'
import Simulation from '../../../classes/Simulation.ts'
import World from '../../World.ts'
import WaterElemental from './Water.ts'

describe('WaterElemental', () => {
  const region = 'GS03'
  let world: World

  beforeEach(() => {
    world = Simulation.instance().world
  })

  afterEach(() => {
    Simulation.reset()
  })

  describe('constructor', () => {
    it('creates a powerful water elemental', () => {
      const elemental = new WaterElemental(world, region)
      expect(elemental).toBeInstanceOf(WaterElemental)
      expect(elemental.region).toBe(region)
      expect(elemental.description).toBe('Powerful Water Elemental')
      expect(elemental.impact).toBe(250)
      expect(elemental.slayable).not.toBe(false)
      expect(world.regions.get(region)?.immortals).toContain(elemental.id)
    })
  })

  describe('Member methods', () => {
    it('stays put if it\'s in a desired region', () => {
      const desired = WaterElemental.desiredRegions()
      const region = desired[0]
      const elemental = new WaterElemental(world, region)
      elemental.move()
      expect(elemental.region).toBe(region)
      expect(world.regions.get(region)?.immortals).toContain(elemental.id)
    })

    it('moves to an adjacent desirable region', () => {
      const desired = WaterElemental.desiredRegions()
      const regions = world.regions.values().filter(region => {
        const isNotDesired = !desired.includes(region.id)
        const isAdjacent = region.adjacentRegions.filter(adj => desired.includes(adj)).length > 0
        return isNotDesired && isAdjacent
      })
      const region = regions[0]
      const elemental = new WaterElemental(world, region.id)
      elemental.move()
      const dest = world.regions.get(elemental.region)

      expect(elemental.region).not.toBe(region.id)
      expect(region.adjacentRegions).toContain(elemental.region)
      expect(desired).toContain(elemental.region)
      expect(region.immortals).not.toContain(elemental.id)
      expect(dest?.immortals).toContain(elemental.id)
    })

    it('moves to a random adjacent region if nothing desirable', () => {
      const desired = WaterElemental.desiredRegions()
      const regions = world.regions.values().filter(region => {
        const isNotDesired = !desired.includes(region.id)
        const isNotAdjacent = region.adjacentRegions.filter(adj => desired.includes(adj)).length === 0
        return isNotDesired && isNotAdjacent
      })
      const region = regions[0]
      const elemental = new WaterElemental(world, region.id)
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

      it('includes coastal regions', () => {
        const volcanic = regions.filter(region => region.tags.includes('coastal'))
        const desired = WaterElemental.desiredRegions()
        for (const region of volcanic) {
          expect(desired).toContain(region.id)
        }
      })

      it('includes regions that have an underground seas', () => {
        const undergroundSeaRegions = regions.filter(region => {
          const seas = region.features.filter((feature: IRegionFeature) => feature.description.startsWith('Underground sea'))
          return seas.length > 0
        })
        const desired = WaterElemental.desiredRegions()
        for (const region of undergroundSeaRegions) {
          expect(desired).toContain(region.id)
        }
      })

      it('includes regions where storm dragons live', () => {
        const stormDragonRegions = regions.filter(region => region.dragons.includes('storm dragon'))
        const desired = WaterElemental.desiredRegions()
        for (const region of stormDragonRegions) {
          expect(desired).toContain(region.id)
        }
      })
    })
  })
})
