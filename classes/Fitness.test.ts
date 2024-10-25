import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { BIOMES } from '../enums.ts'
import type { IFitness } from '../index.d.ts'
import Fitness from './Fitness.ts'

describe('Fitness', () => {
  describe('constructor', () => {
    it('creates a Fitness instance', () => {
      const fitness = new Fitness()
      expect(fitness).toBeInstanceOf(Fitness)
    })

    it('defaults each biome\'s value to 0', () => {
      const fitness = new Fitness()
      for (const biome of Object.values(BIOMES)) {
        expect(fitness.biomes[biome]).toBe(0)
      }
    })

    it('can set each biome\'s value', () => {
      for (const biome of Object.values(BIOMES)) {
        const init: IFitness = { [biome]: 3 } as IFitness
        const fitness = new Fitness(init)
        expect(fitness.biomes[biome]).toBe(init[biome])
      }
    })

    it('rounds values', () => {
      const biome = BIOMES.BOREAL_FOREST
      const init: IFitness = { [biome]: 3.1415 } as IFitness
      const fitness = new Fitness(init)
      expect(fitness.biomes[biome]).toBe(3)
    })
  })

  describe('Member methods', () => {
    describe('get', () => {
      it('returns the value for any biome', () => {
        const fitness = new Fitness()
        for (const biome of Object.values(BIOMES)) {
          expect(fitness.get(biome)).toBe(fitness.biomes[biome])
        }
      })
    })

    describe('set', () => {
      it('sets the value for any biome', () => {
        const fitness = new Fitness()
        for (const biome of Object.values(BIOMES)) {
          fitness.set(biome, 1)
          expect(fitness.biomes[biome]).toBe(1)
        }
      })

      it('rounds numbers', () => {
        const biome = BIOMES.BOREAL_FOREST
        const fitness = new Fitness()
        fitness.set(biome, 3.1415)
        expect(fitness.biomes[biome]).toBe(3)
      })
    })

    describe('toObject', () => {
      it('exports to an object', () => {
        const fitness = new Fitness()
        const actual = fitness.toObject()
        for (const biome of Object.values(BIOMES)) {
          expect(actual[biome]).toEqual(fitness.biomes[biome])
        }
      })
    })
  })

  describe('Static methods', () => {
    describe('combine', () => {
      it('combines two fitness instances', () => {
        const a = new Fitness({ [BIOMES.BOREAL_FOREST]: 1 } as IFitness)
        const b = new Fitness({ [BIOMES.BOREAL_FOREST]: 2 } as IFitness)
        const c = Fitness.combine(a, b)
        const expected = a.biomes[BIOMES.BOREAL_FOREST] + b.biomes[BIOMES.BOREAL_FOREST]
        expect(c).toBeInstanceOf(Fitness)
        expect(c.biomes[BIOMES.BOREAL_FOREST]).toBe(expected)
      })
    })
  })
})
