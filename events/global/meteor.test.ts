import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { SamplePopulation} from '../../test-examples.ts'
import History from '../../classes/History.ts'
import Population from '../../classes/Population.ts'
import Region from '../../classes/Region.ts'
import Simulation from '../../classes/Simulation.ts'
import World from '../../classes/World.ts'
import createPopulation from '../../factories/population.ts'
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
  recordFluidityMeteorElemental,
  recordWarmthMeteorRock,
  recordWarmthMeteorEntity,
  recordDeathMeteor,
  recordTimeMeteor,
  recordFallingStar
} from './meteor.ts'

describe('Meteor', () => {
  let history: History
  let region: Region
  let population: Population
  let world: World

  beforeEach(() => {
    const sim = Simulation.instance()
    world = sim.world
    history = sim.history
    region = world.regions.get('MS06')!
    region.markers = []
    population = createPopulation('MS06', SamplePopulation)
  })
  
  afterEach(() => {
    Simulation.reset()
  })

  describe('getImpactRegion', () => {
    it('returns a region or null, with probability based on area', () => {
      const actual = getImpactRegion()
      expect(actual === null || actual instanceof Region).toBe(true)
    })
  })

  describe('getZone1', () => {
    it('returns an array of regions adjacent to the impact region', () => {
      const actual = getZone1(region)
      expect(actual).toHaveLength(region.adjacentRegions.length)
      expect(actual.every(r => region.adjacentRegions.includes(r.id))).toBe(true)
    })
  })

  describe('getZone2', () => {
    it('returns an array of regions two regions out from the impact region', () => {
      const zone1 = getZone1(region)
      const actual = getZone2(region)
      expect(actual.length).toBeGreaterThan(0)
      expect(actual.every(r => !zone1.map(r => r.id).includes(r.id))).toBe(true)
    })
  })

  describe('impactLand', () => {
    it('hits the land', () => {
      impactLand()
      expect(world.habitability).toBeCloseTo(0.5)
    })
  })

  describe('impactSea', () => {
    it('hits the sea', () => {
      const coastalPop = createPopulation('FS11', SamplePopulation)
      coastalPop.size = 10000
      impactSea()
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
      const zone1 = getZone1(region)
      impactZone1(region)
      for (const region of zone1) {
        expect(region.habitability).toBeCloseTo(0.5)
      }
    })
  })

  describe('impactZone2', () => {
    it('hits each region in zone 2', () => {
      const zone2 = getZone2(region)
      impactZone2(region)
      for (const region of zone2) {
        expect(region.habitability).toBeCloseTo(0.75)
      }
    })
  })

  describe('recordFormMeteor', () => {
    it('records a meteor from the Sphere of Form hitting a region', () => {
      recordFormMeteor(region)
      expect(history.events).toHaveLength(2)
      expect(region.markers.length).toBeGreaterThanOrEqual(2)
    })

    it('records a meteor from the Sphere of Form hitting the sea', () => {
      recordFormMeteor(null)
      expect(history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })

  describe('recordOrderMeteorRock', () => {
    it('records a meteor from the Sphere of Order hitting a region', () => {
      recordOrderMeteorRock(region)
      expect(history.events).toHaveLength(2)
      expect(region.markers.length).toBe(2)
    })

    it('records a meteor from the Sphere of Order hitting the sea', () => {
      recordOrderMeteorRock(null)
      expect(history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })

  describe('recordOrderMeteorEmpyrean', () => {
    it('records an empyrean cast down from the Sphere of Order hitting a region', () => {
      recordOrderMeteorEmpyrean(region)
      expect(history.events).toHaveLength(2)
      expect(region.markers.length).toBe(1)
    })

    it('records an empyrean cast down from the Sphere of Order hitting the sea', () => {
      recordOrderMeteorEmpyrean(null)
      expect(history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })

  describe('recordFluidityMeteorRock', () => {
    it('records a meteor from the Sphere of Fluidity hitting a region', () => {
      recordFluidityMeteorRock(region)
      expect(history.events).toHaveLength(2)
      expect(region.markers.length).toBe(2)
    })

    it('records a meteor from the Sphere of Fluidity hitting the sea', () => {
      recordFluidityMeteorRock(null)
      expect(history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })

  describe('recordFluidityMeteorElemental', () => {
    it('records an elemental cast down from the Sphere of Fluidity hitting a region', () => {
      recordFluidityMeteorElemental(region)
      expect(history.events).toHaveLength(2)
      expect(region.markers.length).toBe(1)
      expect(region.immortals).toHaveLength(1)
    })

    it('records an elemental cast down from the Sphere of Fluidity hitting the sea', () => {
      recordFluidityMeteorElemental(null)
      expect(history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })

  describe('recordWarmthMeteorRock', () => {
    it('records a meteor from the Sphere of Warmth hitting a region', () => {
      recordWarmthMeteorRock(region)
      expect(history.events).toHaveLength(2)
      expect(region.markers.length).toBe(2)
    })

    it('records a meteor from the Sphere of Warmth hitting the sea', () => {
      recordWarmthMeteorRock(null)
      expect(history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })

  describe('recordWarmthMeteorEntity', () => {
    it('records a Solarian or Gelid cast down from the Sphere of Warmth hitting a region', () => {
      recordWarmthMeteorEntity(region)
      expect(history.events).toHaveLength(2)
      expect(region.markers.length).toBe(1)
    })

    it('records a Solarian or Gelid cast down from the Sphere of Warmth hitting the sea', () => {
      recordWarmthMeteorEntity(null)
      expect(history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })

  describe('recordDeathMeteor', () => {
    it('records a meteor from the Sphere of Death hitting a region', () => {
      recordDeathMeteor(region)
      expect(history.events).toHaveLength(2)
      expect(region.markers.length).toBe(2)
    })

    it('records a meteor from the Sphere of Death hitting the sea', () => {
      recordDeathMeteor(null)
      expect(history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })

  describe('recordTimeMeteor', () => {
    it('records a meteor from the Sphere of Time hitting a region', () => {
      recordTimeMeteor(region)
      expect(history.events).toHaveLength(2)
      expect(region.markers.length).toBe(2)
    })

    it('records a meteor from the Sphere of Time hitting the sea', () => {
      recordTimeMeteor(null)
      expect(history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })

  describe('recordFallingStar', () => {
    it('records a falling star from the Sphere of Space hitting a region', () => {
      recordFallingStar(region)
      expect(history.events).toHaveLength(2)
      expect(region.markers.length).toBe(1)
    })

    it('records a falling star from the Sphere of Space hitting the sea', () => {
      recordFallingStar(null)
      expect(history.events).toHaveLength(2)
      expect(region.markers).toHaveLength(0)
    })
  })
})
