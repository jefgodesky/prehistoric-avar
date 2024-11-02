import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { SamplePopulation} from '../../test-examples.ts'
import Population from '../../classes/Population.ts'
import Region from '../../classes/Region.ts'
import Simulation from '../../classes/Simulation.ts'
import {
  getImpactRegion,
  getZone1,
} from './meteor.ts'

describe('Meteor', () => {
  let sim: Simulation
  let region: Region
  let population: Population

  beforeEach(() => {
    sim = new Simulation()
    region = sim.world.regions['MS06']
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
})
