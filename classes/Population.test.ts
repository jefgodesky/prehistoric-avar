import Emittery from 'emittery'
import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { BIOMES, SPECIES_NAMES } from '../enums.ts'
import { GS02 } from '../instances/regions/index.ts'
import { SamplePopulation } from '../test-examples.ts'
import Region from './Region.ts'
import Population from './Population.ts'

describe('Population', () => {
  const emitter = new Emittery()
  const home = new Region(emitter, GS02)

  describe('constructor', () => {
    it('creates a Population instance', () => {
      const p = new Population(emitter, home)
      expect(p).toBeInstanceOf(Population)
    })

    it('sets a default ID', () => {
      const p = new Population(emitter, home)
      expect(p.id).toBe('GS03-001WO')
    })

    it('defaults the species to Wosan', () => {
      const p = new Population(emitter, home)
      expect(p.species.name).toBe(SPECIES_NAMES.WOSAN)
    })

    it('defaults to a new tradition', () => {
      const p = new Population(emitter, home)
      expect(p.tradition.scribe.scrolls).toHaveLength(0)
      for (const biome of Object.values(BIOMES)) {
        expect(p.tradition.fitness.biomes[biome]).toBe(0)
      }
    })

    it('defaults to a size of 1', () => {
      const p = new Population(emitter, home)
      expect(p.size).toBe(1)
    })

    it('defaults viability to 1', () => {
      const p = new Population(emitter, home)
      expect(p.viability).toBe(1)
    })

    it('defaults to an empty array of relationships', () => {
      const p = new Population(emitter, home)
      expect(p.relationships).toHaveLength(0)
    })

    it('defaults to an empty array of scrolls', () => {
      const p = new Population(emitter, home)
      expect(p.scribe.scrolls).toHaveLength(0)
    })

    it('defaults to an empty array of markers', () => {
      const p = new Population(emitter, home)
      expect(p.markers).toHaveLength(0)
    })

    it('defaults not extinct', () => {
      const p = new Population(emitter, home)
      expect(p.extinct).toBe(false)
    })

    it('can set an ID', () => {
      const p = new Population(emitter, home, SamplePopulation)
      expect(p.id).toBe(SamplePopulation.id)
    })

    it('can set a species', () => {
      const p = new Population(emitter, home, SamplePopulation)
      expect(p.species.name).toBe(SamplePopulation.species)
    })

    it('can set tradition', () => {
      const p = new Population(emitter, home, SamplePopulation)
      expect(p.tradition.scribe.scrolls).toHaveLength(SamplePopulation.tradition.scrolls.length)
      for (const biome of Object.values(BIOMES)) {
        expect(p.tradition.fitness.biomes[biome]).toBe(SamplePopulation.tradition.fitness[biome])
      }
    })

    it('can set size', () => {
      const p = new Population(emitter, home, SamplePopulation)
      expect(p.size).toBe(SamplePopulation.size)
    })

    it('can set viability', () => {
      const p = new Population(emitter, home, SamplePopulation)
      expect(p.viability).toBe(SamplePopulation.viability)
    })

    it('can set relationships', () => {
      const p = new Population(emitter, home, SamplePopulation)
      expect(p.relationships).toHaveLength(SamplePopulation.relationships.length)
    })

    it('can set scrolls', () => {
      const p = new Population(emitter, home, SamplePopulation)
      expect(p.scribe.scrolls).toHaveLength(SamplePopulation.scrolls.length)
    })

    it('can set markers', () => {
      const p = new Population(emitter, home, SamplePopulation)
      expect(p.scribe.scrolls).toHaveLength(SamplePopulation.scrolls.length)
    })

    it('can set extinction data', () => {
      const data = Object.assign({}, SamplePopulation, { size: 0, extinct: true })
      const p = new Population(emitter, home, data)
      expect(p.extinct).toBe(true)
    })
  })

  describe('Member methods', () => {
    describe('getFitness', () => {
      it('returns the population fitness for a given biome', () => {
        const p = new Population(emitter, home, SamplePopulation)
        expect(p.getFitness(BIOMES.SAVANNA)).toBe(3)
      })
    })

    describe('adjustViability', () => {
      it('does quite a bit of random stuff', () => {
        const p = new Population(emitter, home, SamplePopulation)
        p.viability = 0.6
        p.adjustViability()
        expect(p.viability).toBeGreaterThanOrEqual(0)
        expect(p.viability).toBeLessThanOrEqual(1)
      })

      it('does nothing if the population is extinct', () => {
        const p = new Population(emitter, home, SamplePopulation)
        p.viability = 0.6
        p.adjustSize(p.size * -2)
        p.adjustViability()
        expect(p.viability).toBe(0.6)
      })
    })

    describe('adjustSize', () => {
      it('adds if given a positive number > 1', () => {
        const p = new Population(emitter, home, SamplePopulation)
        const before = p.size
        p.adjustSize(32.7)
        expect(p.size).toBe(before + 32)
      })

      it('subtracts if given a negative number < -1', () => {
        const p = new Population(emitter, home, SamplePopulation)
        const before = p.size
        p.adjustSize(-32.7)
        expect(p.size).toBe(before - 33)
      })

      it('increases by percent if given a positive number <= 1', () => {
        const p = new Population(emitter, home, SamplePopulation)
        const before = p.size
        p.adjustSize(0.1)
        expect(p.size).toBe(Math.round(before * 1.1))
      })

      it('decreases by percent if given a negative number >= -1', () => {
        const p = new Population(emitter, home, SamplePopulation)
        const before = p.size
        p.adjustSize(-0.1)
        expect(p.size).toBe(Math.round(before * 0.9))
      })

      it('marks extinct if driven below zero', () => {
        const p = new Population(emitter, home, SamplePopulation)
        p.adjustSize(p.size * -2)
        expect(p.size).toBe(0)
        expect(p.extinct).toBe(true)
      })

      it('cannot revive an extinct population', () => {
        const p = new Population(emitter, home, SamplePopulation)
        p.extinct = true
        p.size = 0
        p.adjustSize(100000)
        expect(p.size).toBe(0)
        expect(p.extinct).toBe(true)
      })
    })

    describe('split', () => {
      it('splits off a new population of the specified size', () => {
        const size = 5000
        const p = new Population(emitter, home, SamplePopulation)
        const before = p.size
        const n = p.split(size)
        expect(n).toBeInstanceOf(Population)
        expect(n?.home).toBe(p.home)
        expect(n?.tradition.toString()).toBe(p.tradition.toString())
        expect(n?.size).toBe(size)
        expect(p.size).toBe(before - size)
      })

      it('splits off 40%-60% if size is not specified', () => {
        const p = new Population(emitter, home, SamplePopulation)
        const n = p.split()
        const sizes = [p.size, n?.size ?? 0]
        const total = p.size + (n?.size ?? 0)
        for (const size of sizes) {
          expect(size / total).toBeGreaterThanOrEqual(0.4)
          expect(size / total).toBeLessThanOrEqual(0.6)
        }
      })

      it('returns null if population is extinct', () => {
        const p = new Population(emitter, home, SamplePopulation)
        p.adjustSize(p.size * -2)
        const n = p.split()
        expect(n).toBeNull()
      })

      it('returns null if the population is down to just one person', () => {
        const p = new Population(emitter, home, SamplePopulation)
        p.adjustSize((p.size - 1) * -1)
        const n = p.split()
        expect(n).toBeNull()
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const cpy = Object.assign({}, SamplePopulation, { extinct: false })
        const p = new Population(emitter, home, SamplePopulation)
        cpy.scrolls = p.scribe.toObject()
        cpy.tradition.scrolls = p.tradition.scribe.toObject()
        expect(JSON.stringify(p.toObject())).toBe(JSON.stringify(cpy))
      })

      it('reports on extinction', () => {
        const cpy = Object.assign({}, SamplePopulation, { size: 0, extinct: true })
        const p = new Population(emitter, home, SamplePopulation)
        p.size = 0;
        p.extinct = true
        cpy.scrolls = p.scribe.toObject()
        cpy.tradition.scrolls = p.tradition.scribe.toObject()
        expect(JSON.stringify(p.toObject())).toBe(JSON.stringify(cpy))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const p = new Population(emitter, home, SamplePopulation)
        expect(p.toString()).toBe(`Population: ${p.id}`)
      })
    })
  })
})
