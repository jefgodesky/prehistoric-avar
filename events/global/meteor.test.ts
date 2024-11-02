import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { SamplePopulation} from '../../test-examples.ts'
import Population from '../../classes/Population.ts'
import Region from '../../classes/Region.ts'
import Simulation from '../../classes/Simulation.ts'
import {
  getImpactRegion,
  getZone1,
  getZone2,
  impactLand,
  impactSea,
  impactZone0,
  impactZone1,
  impactZone2,
  recordFormMeteor,
  recordOrderMeteorRock,
  recordOrderMeteorEmpyrean,
  recordFluidityMeteorRock,
  recordFluidityMeteorElemental
} from './meteor.ts'

describe('Meteor', () => {
  let sim: Simulation
  let region: Region
  let population: Population

  beforeEach(() => {
    sim = new Simulation()
    region = sim.world.regions['MS06']
    region.markers = []
    population = new Population(sim.emitter, region, SamplePopulation)
    region.introduce(population)
  })

  describe('getImpactRegion', () => {
    it('returns a region or null, with probability based on area', () => {
      const actual = getImpactRegion(sim)
      expect(actual === null || actual instanceof Region).toBe(true)
    })
  })

  describe('getZone1', () => {
    it('returns an array of regions adjacent to the impact region', () => {
      const actual = getZone1(sim, region)
      expect(actual).toHaveLength(region.adjacentRegions.length)
      expect(actual.every(r => region.adjacentRegions.includes(r.id))).toBe(true)
    })
  })

  describe('getZone2', () => {
    it('returns an array of regions two regions out from the impact region', () => {
      const zone1 = getZone1(sim, region)
      const actual = getZone2(sim, region)
      expect(actual.length).toBeGreaterThan(0)
      expect(actual.every(r => !zone1.map(r => r.id).includes(r.id))).toBe(true)
    })
  })

  describe('impactLand', () => {
    it('hits the land', () => {
      impactLand(sim)
      expect(sim.world.habitability).toBeCloseTo(0.5)
    })
  })

  describe('impactSea', () => {
    it('hits the sea', () => {
      const coastal = sim.world.regions['FS11']
      const coastalPop = new Population(sim.emitter, coastal, SamplePopulation)
      coastalPop.size = 10000
      coastal.introduce(coastalPop)
      impactSea(sim)
      expect(coastalPop.size).toBe(9000)
    })
  })

  describe('impactZone0', () => {
    it('hits zone 0', () => {
      impactZone0(region)
      expect(region.habitability).toBeCloseTo(0.1)
      expect(region.isPopulated()).toBe(false)
      expect(population.extinct).toBe(true)
    })
  })

  describe('impactZone1', () => {
    it('hits each region in zone 1', () => {
      const zone1 = getZone1(sim, region)
      impactZone1(sim, region)
      for (const region of zone1) {
        expect(region.habitability).toBeCloseTo(0.5)
      }
    })
  })

  describe('impactZone2', () => {
    it('hits each region in zone 2', () => {
      const zone2 = getZone2(sim, region)
      impactZone2(sim, region)
      for (const region of zone2) {
        expect(region.habitability).toBeCloseTo(0.75)
      }
    })
  })

  describe('recordFormMeteor', () => {
    it('records a meteor from the Sphere of Form hitting a region', async () => {
      await recordFormMeteor(sim, region)
      expect(sim.history.events).toHaveLength(2)
      expect(region.markers.length).toBeGreaterThanOrEqual(2)
    })

    it('records a meteor from the Sphere of Form hitting the sea', async () => {
      await recordFormMeteor(sim, null)
      expect(sim.history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })

  describe('recordOrderMeteorRock', () => {
    it('records a meteor from the Sphere of Order hitting a region', async () => {
      await recordOrderMeteorRock(sim, region)
      expect(sim.history.events).toHaveLength(2)
      expect(region.markers.length).toBe(2)
    })

    it('records a meteor from the Sphere of Order hitting the sea', async () => {
      await recordOrderMeteorRock(sim, null)
      expect(sim.history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })

  describe('recordOrderMeteorEmpyrean', () => {
    it('records an empyrean cast down from the Sphere of Order hitting a region', async () => {
      await recordOrderMeteorEmpyrean(sim, region)
      expect(sim.history.events).toHaveLength(2)
      expect(region.markers.length).toBe(1)
    })

    it('records an empyrean cast down from the Sphere of Order hitting the sea', async () => {
      await recordOrderMeteorEmpyrean(sim, null)
      expect(sim.history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })

  describe('recordFluidityMeteorRock', () => {
    it('records a meteor from the Sphere of Fluidity hitting a region', async () => {
      await recordFluidityMeteorRock(sim, region)
      expect(sim.history.events).toHaveLength(2)
      expect(region.markers.length).toBe(2)
    })

    it('records a meteor from the Sphere of Fluidity hitting the sea', async () => {
      await recordFluidityMeteorRock(sim, null)
      expect(sim.history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })

  describe('recordFluidityMeteorElemental', () => {
    it('records an elemental cast down from the Sphere of Fluidity hitting a region', async () => {
      await recordFluidityMeteorElemental(sim, region)
      expect(sim.history.events).toHaveLength(2)
      expect(region.markers.length).toBe(1)
      expect(region.immortals).toHaveLength(1)
    })

    it('records an elemental cast down from the Sphere of Fluidity hitting the sea', async () => {
      await recordFluidityMeteorElemental(sim, null)
      expect(sim.history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })
})
