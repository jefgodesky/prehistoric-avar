import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { BIOMES } from '../enums.ts'
import { SampleTradition } from '../test-data.ts'
import Tradition from './Tradition.ts'

describe('Tradition', () => {
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
      const trad = new Tradition(SampleTradition)
      expect(trad.fitness.max).toBe(3)
      expect(trad.fitness.min).toBe(0)
      for (const biome of Object.values(BIOMES)) {
        expect(trad.fitness.biomes[biome]).toBe(SampleTradition.fitness[biome])
      }
    })

    it('can set scrolls', () => {
      const trad = new Tradition(SampleTradition)
      expect(trad.scrolls).toHaveLength(SampleTradition.scrolls.length)
    })
  })

  describe('Member methods', () => {
    describe('toObject', () => {
      it('exports an object', () => {
        const cpy = Object.assign({}, SampleTradition)
        const trad = new Tradition(SampleTradition)
        cpy.scrolls = trad.scrolls.map(scroll => scroll.toObject())
        expect(JSON.stringify(trad.toObject())).toBe(JSON.stringify(cpy))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const trad = new Tradition(SampleTradition)
        expect(trad.toString()).toBe('Tradition: 1 0 0 0 0 0 0 0 0 0')
      })
    })
  })
})
