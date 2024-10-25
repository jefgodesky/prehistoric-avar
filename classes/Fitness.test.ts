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

    it('defaults boreal forest to 0', () => {
      const fitness = new Fitness()
      expect(fitness.biomes[BIOMES.BOREAL_FOREST]).toBe(0)
    })

    it('defaults temperate forest to 0', () => {
      const fitness = new Fitness()
      expect(fitness.biomes[BIOMES.TEMPERATE_FOREST]).toBe(0)
    })

    it('defaults tropical forest to 0', () => {
      const fitness = new Fitness()
      expect(fitness.biomes[BIOMES.TROPICAL_FOREST]).toBe(0)
    })

    it('defaults desert to 0', () => {
      const fitness = new Fitness()
      expect(fitness.biomes[BIOMES.DESERT]).toBe(0)
    })

    it('defaults savanna to 0', () => {
      const fitness = new Fitness()
      expect(fitness.biomes[BIOMES.SAVANNA]).toBe(0)
    })

    it('defaults temperate grassland to 0', () => {
      const fitness = new Fitness()
      expect(fitness.biomes[BIOMES.TEMPERATE_GRASSLAND]).toBe(0)
    })

    it('defaults mountains to 0', () => {
      const fitness = new Fitness()
      expect(fitness.biomes[BIOMES.MOUNTAINS]).toBe(0)
    })

    it('defaults polar regions to 0', () => {
      const fitness = new Fitness()
      expect(fitness.biomes[BIOMES.POLAR]).toBe(0)
    })

    it('defaults cave systems to 0', () => {
      const fitness = new Fitness()
      expect(fitness.biomes[BIOMES.CAVES]).toBe(0)
    })

    it('defaults the World Below to 0', () => {
      const fitness = new Fitness()
      expect(fitness.biomes[BIOMES.WORLD_BELOW]).toBe(0)
    })

    it('can set boreal forest', () => {
      const init: IFitness = { [BIOMES.BOREAL_FOREST]: 3 } as IFitness
      const fitness = new Fitness(init)
      expect(fitness.biomes[BIOMES.BOREAL_FOREST]).toBe(init[BIOMES.BOREAL_FOREST])
    })

    it('can set temperate forest', () => {
      const init: IFitness = { [BIOMES.TEMPERATE_FOREST]: 3 } as IFitness
      const fitness = new Fitness(init)
      expect(fitness.biomes[BIOMES.TEMPERATE_FOREST]).toBe(init[BIOMES.TEMPERATE_FOREST])
    })

    it('can set tropical forest', () => {
      const init: IFitness = { [BIOMES.TROPICAL_FOREST]: 3 } as IFitness
      const fitness = new Fitness(init)
      expect(fitness.biomes[BIOMES.TROPICAL_FOREST]).toBe(init[BIOMES.TROPICAL_FOREST])
    })

    it('can set desert', () => {
      const init: IFitness = { [BIOMES.DESERT]: 3 } as IFitness
      const fitness = new Fitness(init)
      expect(fitness.biomes[BIOMES.DESERT]).toBe(init[BIOMES.DESERT])
    })

    it('can set savannas', () => {
      const init: IFitness = { [BIOMES.SAVANNA]: 3 } as IFitness
      const fitness = new Fitness(init)
      expect(fitness.biomes[BIOMES.SAVANNA]).toBe(init[BIOMES.SAVANNA])
    })

    it('can set temperate grasslands', () => {
      const init: IFitness = { [BIOMES.TEMPERATE_GRASSLAND]: 3 } as IFitness
      const fitness = new Fitness(init)
      expect(fitness.biomes[BIOMES.TEMPERATE_GRASSLAND]).toBe(init[BIOMES.TEMPERATE_GRASSLAND])
    })

    it('can set mountains', () => {
      const init: IFitness = { [BIOMES.MOUNTAINS]: 3 } as IFitness
      const fitness = new Fitness(init)
      expect(fitness.biomes[BIOMES.MOUNTAINS]).toBe(init[BIOMES.MOUNTAINS])
    })

    it('can set polar regions', () => {
      const init: IFitness = { [BIOMES.POLAR]: 3 } as IFitness
      const fitness = new Fitness(init)
      expect(fitness.biomes[BIOMES.POLAR]).toBe(init[BIOMES.POLAR])
    })

    it('can set cave systems', () => {
      const init: IFitness = { [BIOMES.CAVES]: 3 } as IFitness
      const fitness = new Fitness(init)
      expect(fitness.biomes[BIOMES.CAVES]).toBe(init[BIOMES.CAVES])
    })

    it('can set the World Below', () => {
      const init: IFitness = { [BIOMES.WORLD_BELOW]: 3 } as IFitness
      const fitness = new Fitness(init)
      expect(fitness.biomes[BIOMES.WORLD_BELOW]).toBe(init[BIOMES.WORLD_BELOW])
    })
  })

  describe('Member methods', () => {
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
