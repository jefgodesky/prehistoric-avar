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

    it('defaults maximum value to null', () => {
      const fitness = new Fitness()
      expect(fitness.max).toBe(null)
    })

    it('defaults minimum value to null', () => {
      const fitness = new Fitness()
      expect(fitness.min).toBe(null)
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

    it('can set the maximum value', () => {
      const fitness = new Fitness({} as IFitness, 3)
      expect(fitness.max).toBe(3)
    })

    it('can set the minimum value', () => {
      const fitness = new Fitness({} as IFitness, 3, -3)
      expect(fitness.min).toBe(-3)
    })

    it('rounds values', () => {
      const biome = BIOMES.BOREAL_FOREST
      const init: IFitness = { [biome]: 3.1415 } as IFitness
      const fitness = new Fitness(init)
      expect(fitness.biomes[biome]).toBe(3)
    })

    it('won\'t allow values greater than the maximum', () => {
      const biome = BIOMES.BOREAL_FOREST
      const init: IFitness = { [biome]: 4 } as IFitness
      const fitness = new Fitness(init, 3)
      expect(fitness.biomes[biome]).toBe(3)
    })

    it('won\'t allow values less than the minimum', () => {
      const biome = BIOMES.BOREAL_FOREST
      const init: IFitness = { [biome]: -4 } as IFitness
      const fitness = new Fitness(init, 3, -3)
      expect(fitness.biomes[biome]).toBe(-3)
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

      it('won\'t allow values greater than the maximum', () => {
        const biome = BIOMES.BOREAL_FOREST
        const fitness = new Fitness({} as IFitness, 3)
        fitness.set(biome, 4)
        expect(fitness.biomes[biome]).toBe(3)
      })

      it('won\'t allow values less than the minimum', () => {
        const biome = BIOMES.BOREAL_FOREST
        const fitness = new Fitness({} as IFitness, 3, -3)
        fitness.set(biome, -4)
        expect(fitness.biomes[biome]).toBe(-3)
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

    describe('toString', () => {
      it('exports a string', () => {
        const fitness = new Fitness()
        expect(fitness.toString()).toEqual('0 0 0 0 0 0 0 0 0 0')
      })
    })
  })

  describe('Static methods', () => {
    describe('combine', () => {
      const biome = BIOMES.BOREAL_FOREST

      it('combines two or more fitness instances', () => {
        const instances = [
          new Fitness({ [biome]: 1 } as IFitness),
          new Fitness({ [biome]: 1 } as IFitness),
          new Fitness({ [biome]: 1 } as IFitness)
        ]
        const actual = Fitness.combine(...instances)
        expect(actual).toBeInstanceOf(Fitness)
        expect(actual.biomes[biome]).toBe(instances.length)
      })
    })
  })
})
