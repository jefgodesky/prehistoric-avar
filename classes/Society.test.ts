import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { BIOMES } from '../enums.ts'
import { SampleSociety } from '../test-examples.ts'
import Simulation from './Simulation.ts'
import World from './World.ts'
import createSociety from '../factories/society.ts'
import Society from './Society.ts'

describe('Society', () => {
  const region = 'GS03'
  let world: World
  
  beforeEach(() => {
    world = Simulation.instance().world
  })
  
  afterEach(() => {
    Simulation.reset()
  })

  describe('constructor', () => {
    it('creates a Society instance', () => {
      const society = new Society(world, region)
      expect(society).toBeInstanceOf(Society)
    })

    it('sets a default ID', () => {
      const society = new Society(world, region)
      expect(society.id).toBe(`${region}-001`)
    })

    it('sets a default fitness', () => {
      const society = new Society(world, region)
      expect(society.fitness.get(BIOMES.BOREAL_FOREST)).toBe(0)
    })

    it('defaults to null language', () => {
      const society = new Society(world, region)
      expect(society.language).toBeNull()
    })

    it('defaults to an empty set of markers', () => {
      const society = new Society(world, region)
      expect(society.markers).toHaveLength(0)
    })

    it('defaults to an empty set of scrolls', () => {
      const society = new Society(world, region)
      expect(society.scribe.scrolls).toHaveLength(0)
    })

    it('can set fitness', () => {
      const biome = BIOMES.BOREAL_FOREST
      const society = new Society(world, region, SampleSociety)
      expect(society.fitness.get(biome)).toBe(SampleSociety.fitness[biome])
    })

    it('can set markers', () => {
      const markers = ['Test']
      const data = Object.assign({}, SampleSociety, { markers })
      const society = new Society(world, region, data)
      expect(society.markers).toHaveLength(1)
      expect(society.markers[0]).toBe(markers[0])
    })

    it('can set scrolls', () => {
      const society = new Society(world, region, SampleSociety)
      expect(society.scribe.scrolls).toHaveLength(SampleSociety.scrolls.length)
    })

    it('adds society to the world', () => {
      const society = new Society(world, region)
      expect(world.societies.get(society.id)!).toBe(society)
    })
  })

  describe('Member methods', () => {
    describe('addLanguage', () => {
      it('adds the primordial language to the society', () => {
        const society = createSociety(region)
        society.addLanguage()
        const { languages } = Simulation.instance().world
        expect(society.language).toBe(`${society.region}-001`)
        expect(languages.get(society.language!)).toBeNull()
      })

      it('adds a language with an ancestor to the society', () => {
        const society = createSociety(region)
        const ancestor = 'GS02-001'
        society.addLanguage(ancestor)
        const { languages } = Simulation.instance().world
        expect(society.language).toBe(`${society.region}-001`)
        expect(languages.get(society.language!)).toBe(ancestor)
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const biome = BIOMES.BOREAL_FOREST
        const society = createSociety(region, SampleSociety)
        const actual = society.toObject()
        expect(actual.fitness[biome]).toBe(SampleSociety.fitness[biome])
        expect(actual.scrolls.length).toBe(SampleSociety.scrolls.length)
        expect(actual.scrolls[0].text).toBe(SampleSociety.scrolls[0].text)
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const society = createSociety(region)
        society.id = 'f-society'
        expect(society.toString()).toBe('Society: f-society')
      })
    })
  })
})
