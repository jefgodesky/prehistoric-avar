import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { BIOMES, SPECIES_NAMES } from '../enums.ts'
import { SamplePopulation, SampleSociety } from '../test-examples.ts'
import Simulation from './Simulation.ts'
import Society from './Society.ts'
import Species from './Species.ts'
import Population from './Population.ts'
import Region from './Region.ts'

describe('Population', () => {
  let sim: Simulation
  const home = 'GS02'
  
  beforeEach(() => {
    sim = new Simulation()
    const region = sim.world.regions.get(home)!
    region.society = new Society(sim, home, SampleSociety).id
  })

  describe('constructor', () => {
    it('creates a Population instance', () => {
      const p = new Population(sim, home)
      expect(p).toBeInstanceOf(Population)
    })

    it('sets a default ID', () => {
      const p = new Population(sim, home)
      expect(p.id).toBe('GS02-WO001')
    })

    it('defaults the species to Wosan', () => {
      const p = new Population(sim, home)
      expect(p.species).toBe(SPECIES_NAMES.WOSAN)
    })

    it('defaults to a size of 1', () => {
      const p = new Population(sim, home)
      expect(p.size).toBe(1)
    })

    it('defaults viability to 1', () => {
      const p = new Population(sim, home)
      expect(p.viability).toBe(1)
    })

    it('defaults to an empty array of relationships', () => {
      const p = new Population(sim, home)
      expect(p.relationships).toHaveLength(0)
    })

    it('defaults to an empty array of scrolls', () => {
      const p = new Population(sim, home)
      expect(p.scribe.scrolls).toHaveLength(0)
    })

    it('defaults to an empty array of markers', () => {
      const p = new Population(sim, home)
      expect(p.markers).toHaveLength(0)
    })

    it('defaults not extinct', () => {
      const p = new Population(sim, home)
      expect(p.extinct).toBe(false)
    })

    it('can set a species', () => {
      const p = new Population(sim, home, SamplePopulation)
      expect(p.species).toBe(SamplePopulation.species)
    })

    it('can set size', () => {
      const p = new Population(sim, home, SamplePopulation)
      expect(p.size).toBe(SamplePopulation.size)
    })

    it('can set viability', () => {
      const p = new Population(sim, home, SamplePopulation)
      expect(p.viability).toBe(SamplePopulation.viability)
    })

    it('can set relationships', () => {
      const p = new Population(sim, home, SamplePopulation)
      expect(p.relationships).toHaveLength(SamplePopulation.relationships.length)
    })

    it('can set scrolls', () => {
      const p = new Population(sim, home, SamplePopulation)
      expect(p.scribe.scrolls).toHaveLength(SamplePopulation.scrolls.length)
    })

    it('can set markers', () => {
      const p = new Population(sim, home, SamplePopulation)
      expect(p.scribe.scrolls).toHaveLength(SamplePopulation.scrolls.length)
    })

    it('can set extinction data', () => {
      const data = Object.assign({}, SamplePopulation, { size: 0, extinct: true })
      const p = new Population(sim, home, data)
      expect(p.extinct).toBe(true)
    })
  })

  describe('Member methods', () => {
    describe('getFitness', () => {
      it('returns the population fitness for a given biome', () => {
        const p = new Population(sim, home, SamplePopulation)
        const actual = [BIOMES.SAVANNA, BIOMES.BOREAL_FOREST].map(biome => p.getFitness(biome))
        expect(actual).toEqual([2, 1])
      })
    })

    describe('getSpecies', () => {
      it('returns the species instance', () => {
        const p = new Population(sim, home, SamplePopulation)
        const actual = p.getSpecies()
        expect(actual).toBeInstanceOf(Species)
        expect(p.species.toLowerCase()).toBe(actual.name?.toLowerCase())
      })
    })

    describe('getHome', () => {
      it('returns the region instance', () => {
        const p = new Population(sim, home, SamplePopulation)
        const actual = p.getHome()
        expect(actual).toBeInstanceOf(Region)
        expect(actual.id).toBe(home)
      })
    })

    describe('adjustViability', () => {
      it('does quite a bit of random stuff', () => {
        const p = new Population(sim, home, SamplePopulation)
        p.viability = 0.6
        p.adjustViability()
        expect(p.viability).toBeGreaterThanOrEqual(0)
        expect(p.viability).toBeLessThanOrEqual(1)
      })

      it('does nothing if the population is extinct', () => {
        const p = new Population(sim, home, SamplePopulation)
        p.viability = 0.6
        p.adjustSize(p.size * -2)
        p.adjustViability()
        expect(p.viability).toBe(0.6)
      })
    })

    describe('adjustSize', () => {
      it('adds if given a positive number > 1', () => {
        const p = new Population(sim, home, SamplePopulation)
        const before = p.size
        p.adjustSize(32.7)
        expect(p.size).toBe(before + 32)
      })

      it('subtracts if given a negative number < -1', () => {
        const p = new Population(sim, home, SamplePopulation)
        const before = p.size
        p.adjustSize(-32.7)
        expect(p.size).toBe(before - 33)
      })

      it('increases by percent if given a positive number <= 1', () => {
        const p = new Population(sim, home, SamplePopulation)
        const before = p.size
        p.adjustSize(0.1)
        expect(p.size).toBe(Math.round(before * 1.1))
      })

      it('decreases by percent if given a negative number >= -1', () => {
        const p = new Population(sim, home, SamplePopulation)
        const before = p.size
        p.adjustSize(-0.1)
        expect(p.size).toBe(Math.round(before * 0.9))
      })

      it('marks extinct if driven below zero', () => {
        const p = new Population(sim, home, SamplePopulation)
        p.adjustSize(p.size * -2)
        expect(p.size).toBe(0)
        expect(p.extinct).toBe(true)
      })

      it('removes region\'s society if last population goes extinct', () => {
        const p = new Population(sim, home, SamplePopulation)
        const region = p.getHome()
        const id = region.society
        expect(id).toBeDefined()
        expect(sim.world.societies.has(id ?? '')).toBe(true)

        p.adjustSize(p.size * -2)
        expect(region.society).toBeNull()
        expect(sim.world.regions.has(id ?? '')).toBe(false)
      })

      it('cannot revive an extinct population', () => {
        const p = new Population(sim, home, SamplePopulation)
        p.extinct = true
        p.size = 0
        p.adjustSize(100000)
        expect(p.size).toBe(0)
        expect(p.extinct).toBe(true)
      })
    })

    describe('absorb', () => {
      it('absorbs some number of new individuals with different viability', () => {
        const p = new Population(sim, home, SamplePopulation)
        p.absorb(SamplePopulation.size, 0.8)
        expect(p.size).toBe(SamplePopulation.size * 2)
        expect(p.viability).toBeCloseTo(0.85)
      })
    })

    describe('migrate', () => {
      it('takes some people form one population to create a new one somewhere else', () => {
        const n = 2000
        const src = sim.world.regions.get('GS02')!
        const dest = sim.world.regions.get('GS03')!
        const p = new Population(sim, src.id, SamplePopulation)
        const tags = ['Migration', 'GS02', 'GS03']
        const q = { tags, logic: { tags: 'and' as const } }
        p.migrate(dest.id, n)
        expect(sim.world.populations.size()).toBe(2)
        expect(src.populations).toHaveLength(1)
        expect(dest.populations).toHaveLength(1)
        expect(sim.world.populations.get(dest.populations[0])?.size).toBe(n)
        expect(sim.world.populations.get(src.populations[0])?.size).toBe(SamplePopulation.size - n)
        expect(sim.history.get(q)).toHaveLength(1)
      })

      it('merges migrants into existing population', () => {
        const n = 2000
        const { size } = SamplePopulation
        const src = sim.world.regions.get('GS02')!
        const dest = sim.world.regions.get('GS03')!
        const tags = ['Migration', 'GS02', 'GS03']
        const q = { tags, logic: { tags: 'and' as const } }
        const p = new Population(sim, src.id, SamplePopulation)
        new Population(sim, dest.id, SamplePopulation)
        p.migrate(dest.id, n)
        expect(sim.world.populations.size()).toBe(2)
        expect(src.populations).toHaveLength(1)
        expect(dest.populations).toHaveLength(1)
        expect(sim.world.populations.get(dest.populations[0])?.size).toBe(size + n)
        expect(sim.world.populations.get(src.populations[0])?.size).toBe(size - n)
        expect(sim.history.get(q)).toHaveLength(1)
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const cpy = Object.assign({}, SamplePopulation, { extinct: false })
        const p = new Population(sim, home, SamplePopulation)
        cpy.id = p.id
        cpy.scrolls = p.scribe.toObject()
        expect(JSON.stringify(p.toObject())).toBe(JSON.stringify(cpy))
      })

      it('reports on extinction', () => {
        const cpy = Object.assign({}, SamplePopulation, { size: 0, extinct: true })
        const p = new Population(sim, home, SamplePopulation)
        p.size = 0;
        p.extinct = true
        cpy.id = p.id
        cpy.scrolls = p.scribe.toObject()
        expect(JSON.stringify(p.toObject())).toBe(JSON.stringify(cpy))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const p = new Population(sim, home, SamplePopulation)
        expect(p.toString()).toBe(`Population: ${p.id}`)
      })
    })
  })
})
