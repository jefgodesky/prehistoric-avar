import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { IRegionFeature } from '../../../index.d.ts'
import type Region from '../../Region.ts'
import Simulation from '../../../classes/Simulation.ts'
import World from '../../World.ts'
import FireElemental from './Fire.ts'

describe('FireElemental', () => {
  const region = 'GS03'
  let world: World

  beforeEach(() => {
    world = Simulation.instance().world
  })

  afterEach(() => {
    Simulation.reset()
  })

  describe('constructor', () => {
    it('creates a powerful fire elemental', () => {
      const elemental = new FireElemental(world, region)
      expect(elemental).toBeInstanceOf(FireElemental)
      expect(elemental.region).toBe(region)
      expect(elemental.description).toBe('Powerful Fire Elemental')
      expect(elemental.impact).toBe(250)
      expect(elemental.slayable).not.toBe(false)
      expect(world.regions.get(region)?.immortals).toContain(elemental.id)
    })
  })

  describe('Member methods', () => {
    it('stays put if it\'s in a desired region', () => {
      const desired = FireElemental.desiredRegions()
      const region = desired[0]
      const elemental = new FireElemental(world, region)
      elemental.move()
      expect(elemental.region).toBe(region)
      expect(world.regions.get(region)?.immortals).toContain(elemental.id)
    })

    it('moves to an adjacent desirable region', () => {
      const desired = FireElemental.desiredRegions()
      const regions = world.regions.values().filter(region => {
        const isNotDesired = !desired.includes(region.id)
        const isAdjacent = region.adjacentRegions.filter(adj => desired.includes(adj)).length > 0
        return isNotDesired && isAdjacent
      })
      const region = regions[0]
      const elemental = new FireElemental(world, region.id)
      elemental.move()
      const dest = world.regions.get(elemental.region)

      expect(elemental.region).not.toBe(region.id)
      expect(region.adjacentRegions).toContain(elemental.region)
      expect(desired).toContain(elemental.region)
      expect(region.immortals).not.toContain(elemental.id)
      expect(dest?.immortals).toContain(elemental.id)
    })

    it('moves to a random adjacent region if nothing desirable', () => {
      const desired = FireElemental.desiredRegions()
      const regions = world.regions.values().filter(region => {
        const isNotDesired = !desired.includes(region.id)
        const isNotAdjacent = region.adjacentRegions.filter(adj => desired.includes(adj)).length === 0
        return isNotDesired && isNotAdjacent
      })
      const region = regions[0]
      const elemental = new FireElemental(world, region.id)
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

      it('includes volcanic regions', () => {
        const volcanic = regions.filter(region => region.tags.includes('volcanic'))
        const desired = FireElemental.desiredRegions()
        for (const region of volcanic) {
          expect(desired).toContain(region.id)
        }
      })

      it('includes regions that have a volcanic pipe', () => {
        const pipeRegions = regions.filter(region => {
          const pipes = region.features.filter((feature: IRegionFeature) => feature.description.startsWith('Volcanic pipe'))
          return pipes.length > 0
        })
        const desired = FireElemental.desiredRegions()
        for (const region of pipeRegions) {
          expect(desired).toContain(region.id)
        }
      })

      it('includes regions where flame dragons live', () => {
        const flameDragonRegions = regions.filter(region => region.dragons.includes('flame dragon'))
        const desired = FireElemental.desiredRegions()
        for (const region of flameDragonRegions) {
          expect(desired).toContain(region.id)
        }
      })
    })
  })
})
