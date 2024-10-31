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
    })

    describe('split', () => {
      it('splits off a new population of the specified size', () => {
        const size = 5000
        const p = new Population(emitter, home, SamplePopulation)
        const before = p.size
        const n = p.split(size)
        expect(n).toBeInstanceOf(Population)
        expect(n.home).toBe(p.home)
        expect(n.tradition.toString()).toBe(p.tradition.toString())
        expect(n.size).toBe(size)
        expect(p.size).toBe(before - size)
      })

      it('splits off 40%-60% if size is not specified', () => {
        const p = new Population(emitter, home, SamplePopulation)
        const n = p.split()
        const sizes = [p.size, n.size]
        const total = p.size + n.size
        for (const size of sizes) {
          expect(size / total).toBeGreaterThanOrEqual(0.4)
          expect(size / total).toBeLessThanOrEqual(0.6)
        }
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const cpy = Object.assign({}, SamplePopulation)
        const p = new Population(emitter, home, SamplePopulation)
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
