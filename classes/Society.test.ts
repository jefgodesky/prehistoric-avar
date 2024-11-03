import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { BIOMES } from '../enums.ts'
import { GS03 } from '../instances/regions/index.ts'
import { SampleSociety } from '../test-examples.ts'
import Region from './Region.ts'
import Simulation from './Simulation.ts'
import Society from './Society.ts'

describe('Society', () => {
  const sim = new Simulation()
  const region = new Region(sim, GS03)

  describe('constructor', () => {
    it('creates a Society instance', () => {
      const society = new Society(region)
      expect(society).toBeInstanceOf(Society)
    })

    it('sets a default fitness', () => {
      const society = new Society(region)
      expect(society.fitness.get(BIOMES.BOREAL_FOREST)).toBe(0)
    })

    it('defaults to null language', () => {
      const society = new Society(region)
      expect(society.language).toBeNull()
    })

    it('defaults to an empty set of markers', () => {
      const society = new Society(region)
      expect(society.markers).toHaveLength(0)
    })

    it('defaults to an empty set of scrolls', () => {
      const society = new Society(region)
      expect(society.scribe.scrolls).toHaveLength(0)
    })

    it('can set fitness', () => {
      const biome = BIOMES.BOREAL_FOREST
      const society = new Society(region, SampleSociety)
      expect(society.fitness.get(biome)).toBe(SampleSociety.fitness[biome])
    })

    it('can set language', () => {
      const society = new Society(region, SampleSociety)
      expect(society.language?.order).toBe(SampleSociety.language?.order)
    })

    it('can set markers', () => {
      const markers = ['Test']
      const data = Object.assign({}, SampleSociety, { markers })
      const society = new Society(region, data)
      expect(society.markers).toHaveLength(1)
      expect(society.markers[0]).toBe(markers[0])
    })

    it('can set scrolls', () => {
      const society = new Society(region, SampleSociety)
      expect(society.scribe.scrolls).toHaveLength(SampleSociety.scrolls.length)
    })
  })

  describe('Member methods', () => {
    describe('toObject', () => {
      it('exports an object', () => {
        const biome = BIOMES.BOREAL_FOREST
        const society = new Society(region, SampleSociety)
        const actual = society.toObject()
        expect(actual.fitness[biome]).toBe(SampleSociety.fitness[biome])
        expect(actual.language?.order).toBe(SampleSociety.language?.order)
        expect(actual.scrolls.length).toBe(SampleSociety.scrolls.length)
        expect(actual.scrolls[0].text).toBe(SampleSociety.scrolls[0].text)
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const society = new Society(region, SampleSociety)
        society.id = 'f-society'
        expect(society.toString()).toBe('Society: f-society')
      })
    })
  })
})
