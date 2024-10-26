import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import {BIOMES, DISPOSITIONS, SPECIES_NAMES} from '../enums.ts'
import type { IPopulation } from '../index.d.ts'
import Population from './Population.ts'

describe('Population', () => {
  const data: IPopulation = {
    id: 'GS02-123HU',
    species: SPECIES_NAMES.HUMAN,
    tradition: {
      fitness: {
        [BIOMES.BOREAL_FOREST]: 0,
        [BIOMES.TEMPERATE_FOREST]: 0,
        [BIOMES.TROPICAL_FOREST]: 0,
        [BIOMES.DESERT]: 0,
        [BIOMES.SAVANNA]: 1,
        [BIOMES.TEMPERATE_GRASSLAND]: 1,
        [BIOMES.MOUNTAINS]: 0,
        [BIOMES.POLAR]: 0,
        [BIOMES.CAVES]: 0,
        [BIOMES.WORLD_BELOW]: 0
      },
      scrolls: [
        {
          text: 'We adapt to temperate grasslands',
          seals: 2
        },
        {
          text: 'We forget the ways of the savanna',
          seals: 3
        }
      ]
    },
    size: 54321,
    viability: 0.9,
    relationships: [
      {
        a: 'Population: GS02-123HU',
        b: 'Immortal: The Dragon Queen',
        disposition: DISPOSITIONS.HOSTILE,
        scrolls: []
      }
    ],
    scrolls: [
      {
        text: 'Example scroll',
        seals: 10
      }
    ]
  }

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
      const p = new Population(data)
      expect(p.id).toBe(data.id)
    })

    it('can set a species', () => {
      const p = new Population(data)
      expect(p.species.name).toBe(data.species)
    })

    it('can set tradition', () => {
      const p = new Population(data)
      expect(p.tradition.scrolls).toHaveLength(data.tradition.scrolls.length)
      for (const biome of Object.values(BIOMES)) {
        expect(p.tradition.fitness.biomes[biome]).toBe(data.tradition.fitness[biome])
      }
    })

    it('can set size', () => {
      const p = new Population(data)
      expect(p.size).toBe(data.size)
    })

    it('can set viability', () => {
      const p = new Population(data)
      expect(p.viability).toBe(data.viability)
    })

    it('can set relationships', () => {
      const p = new Population(data)
      expect(p.relationships).toHaveLength(data.relationships.length)
    })

    it('can set scrolls', () => {
      const p = new Population(data)
      expect(p.scrolls).toHaveLength(data.scrolls.length)
    })
  })

  describe('Member methods', () => {
    describe('getFitness', () => {
      it('returns the population fitness for a given biome', () => {
        const p = new Population(data)
        expect(p.getFitness(BIOMES.SAVANNA)).toBe(3)
      })
    })

    describe('adjustViability', () => {
      it('does quite a bit of random stuff', () => {
        const p = new Population(data)
        p.viability = 0.6
        p.adjustViability()
        expect(p.viability).toBeGreaterThanOrEqual(0)
        expect(p.viability).toBeLessThanOrEqual(1)
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const p = new Population(data)
        const obj = p.toObject()
        expect(JSON.stringify(obj)).toBe(JSON.stringify(data))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const p = new Population(data)
        expect(p.toString()).toBe(`Population: ${p.id}`)
      })
    })
  })
})
