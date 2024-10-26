import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import {BIOMES, DISPOSITIONS, SPECIES_NAMES} from '../enums.ts'
import {SamplePopulation, SampleTradition} from '../test-data.ts'
import Population from './Population.ts'
import Tradition from './Tradition.ts'

describe('Population', () => {
  describe('constructor', () => {
    it('creates a Population instance', () => {
      const p = new Population()
      expect(p).toBeInstanceOf(Population)
    })

    it('sets a default ID', () => {
      const p = new Population()
      expect(p.id).toBe('GS03-001WO')
    })

    it('defaults the species to Wosan', () => {
      const p = new Population()
      expect(p.species.name).toBe(SPECIES_NAMES.WOSAN)
    })

    it('defaults to a new tradition', () => {
      const p = new Population()
      expect(p.tradition.scrolls).toHaveLength(0)
      for (const biome of Object.values(BIOMES)) {
        expect(p.tradition.fitness.biomes[biome]).toBe(0)
      }
    })

    it('defaults to a size of 1', () => {
      const p = new Population()
      expect(p.size).toBe(1)
    })

    it('defaults viability to 1', () => {
      const p = new Population()
      expect(p.viability).toBe(1)
    })

    it('defaults to an empty array of relationships', () => {
      const p = new Population()
      expect(p.relationships).toHaveLength(0)
    })

    it('defaults to an empty array of scrolls', () => {
      const p = new Population()
      expect(p.scrolls).toHaveLength(0)
    })

    it('can set an ID', () => {
      const p = new Population(SamplePopulation)
      expect(p.id).toBe(SamplePopulation.id)
    })

    it('can set a species', () => {
      const p = new Population(SamplePopulation)
      expect(p.species.name).toBe(SamplePopulation.species)
    })

    it('can set tradition', () => {
      const p = new Population(SamplePopulation)
      expect(p.tradition.scrolls).toHaveLength(SamplePopulation.tradition.scrolls.length)
      for (const biome of Object.values(BIOMES)) {
        expect(p.tradition.fitness.biomes[biome]).toBe(SamplePopulation.tradition.fitness[biome])
      }
    })

    it('can set size', () => {
      const p = new Population(SamplePopulation)
      expect(p.size).toBe(SamplePopulation.size)
    })

    it('can set viability', () => {
      const p = new Population(SamplePopulation)
      expect(p.viability).toBe(SamplePopulation.viability)
    })

    it('can set relationships', () => {
      const p = new Population(SamplePopulation)
      expect(p.relationships).toHaveLength(SamplePopulation.relationships.length)
    })

    it('can set scrolls', () => {
      const p = new Population(SamplePopulation)
      expect(p.scrolls).toHaveLength(SamplePopulation.scrolls.length)
    })
  })

  describe('Member methods', () => {
    describe('getFitness', () => {
      it('returns the population fitness for a given biome', () => {
        const p = new Population(SamplePopulation)
        expect(p.getFitness(BIOMES.SAVANNA)).toBe(3)
      })
    })

    describe('adjustViability', () => {
      it('does quite a bit of random stuff', () => {
        const p = new Population(SamplePopulation)
        p.viability = 0.6
        p.adjustViability()
        expect(p.viability).toBeGreaterThanOrEqual(0)
        expect(p.viability).toBeLessThanOrEqual(1)
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const cpy = Object.assign({}, SamplePopulation)
        const p = new Population(SamplePopulation)
        cpy.scrolls = p.scrolls.map(scroll => scroll.toObject())
        cpy.tradition.scrolls = p.tradition.scrolls.map(scroll => scroll.toObject())
        expect(JSON.stringify(p.toObject())).toBe(JSON.stringify(cpy))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const p = new Population(SamplePopulation)
        expect(p.toString()).toBe(`Population: ${p.id}`)
      })
    })
  })
})
