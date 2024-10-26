import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { BIOMES } from '../enums.ts'
import { ITradition } from '../index.d.ts'
import Tradition from './Tradition.ts'

describe('Tradition', () => {
  const example: ITradition = {
    fitness: {
      [BIOMES.BOREAL_FOREST]: 1,
      [BIOMES.TEMPERATE_FOREST]: 0,
      [BIOMES.TROPICAL_FOREST]: 0,
      [BIOMES.DESERT]: 0,
      [BIOMES.SAVANNA]: 0,
      [BIOMES.TEMPERATE_GRASSLAND]: 0,
      [BIOMES.MOUNTAINS]: 0,
      [BIOMES.POLAR]: 0,
      [BIOMES.CAVES]: 0,
      [BIOMES.WORLD_BELOW]: 0
    },
    scrolls: [
      {
        text: `We better adapt to ${BIOMES.BOREAL_FOREST}`,
        seals: 2
      },
      {
        text: 'We remember the heroes who slew the ogre bear',
        seals: 150
      }
    ]
  }

  describe('constructor', () => {
    it('creates a Tradition instance', () => {
      const trad = new Tradition()
      expect(trad).toBeInstanceOf(Tradition)
    })

    it('defaults fitness for each biome to zero', () => {
      const trad = new Tradition()
      expect(trad.fitness.max).toBe(3)
      expect(trad.fitness.min).toBe(0)
      for (const biome of Object.values(BIOMES)) {
        expect(trad.fitness.biomes[biome]).toBe(0)
      }
    })

    it('defaults scrolls to an empty list', () => {
      const trad = new Tradition()
      expect(trad.scrolls).toHaveLength(0)
    })

    it('can set fitness for each biome', () => {
      const trad = new Tradition(example)
      expect(trad.fitness.max).toBe(3)
      expect(trad.fitness.min).toBe(0)
      for (const biome of Object.values(BIOMES)) {
        expect(trad.fitness.biomes[biome]).toBe(example.fitness[biome])
      }
    })

    it('can set scrolls', () => {
      const trad = new Tradition(example)
      expect(trad.scrolls).toHaveLength(example.scrolls.length)
    })
  })

  describe('Member methods', () => {
    describe('toObject', () => {
      it('exports an object', () => {
        const trad = new Tradition(example)
        const obj = trad.toObject()
        expect(JSON.stringify(obj)).toBe(JSON.stringify(example))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const trad = new Tradition(example)
        expect(trad.toString()).toBe('Tradition: 1 0 0 0 0 0 0 0 0 0')
      })
    })
  })
})
