import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { BIOMES, LANG_ORDER, LANG_MORPHOLOGY } from '../enums.ts'
import type { ISpecies } from '../index.d.ts'
import Species from './Species.ts'

describe('Species', () => {
  const wosan: ISpecies = {
    name: 'Wosan',
    generation: 50,
    fitness: {
      [BIOMES.BOREAL_FOREST]: 0,
      [BIOMES.TEMPERATE_FOREST]: 1,
      [BIOMES.TROPICAL_FOREST]: 0,
      [BIOMES.DESERT]: -2,
      [BIOMES.SAVANNA]: 2,
      [BIOMES.TEMPERATE_GRASSLAND]: 1,
      [BIOMES.MOUNTAINS]: -2,
      [BIOMES.POLAR]: -3,
      [BIOMES.CAVES]: -3,
      [BIOMES.WORLD_BELOW]: -1
    }
  }

  const elf: ISpecies = {
    name: 'Elf',
    ancestor: 'Wosan',
    generation: 10,
    fitness: {
      [BIOMES.BOREAL_FOREST]: 3,
      [BIOMES.TEMPERATE_FOREST]: 3,
      [BIOMES.TROPICAL_FOREST]: 3,
      [BIOMES.DESERT]: -2,
      [BIOMES.SAVANNA]: 0,
      [BIOMES.TEMPERATE_GRASSLAND]: 0,
      [BIOMES.MOUNTAINS]: -1,
      [BIOMES.POLAR]: -3,
      [BIOMES.CAVES]: -3,
      [BIOMES.WORLD_BELOW]: 1
    },
    langPrefs: {
      typology: [LANG_MORPHOLOGY.ANALYTIC],
      order: [LANG_ORDER.VSO, LANG_ORDER.VOS]
    }
  }

  const human: ISpecies = {
    name: 'Human',
    ancestor: 'Wosan',
    generation: 40,
    fitness: {
      [BIOMES.BOREAL_FOREST]: 0,
      [BIOMES.TEMPERATE_FOREST]: 1,
      [BIOMES.TROPICAL_FOREST]: 0,
      [BIOMES.DESERT]: -1,
      [BIOMES.SAVANNA]: 2,
      [BIOMES.TEMPERATE_GRASSLAND]: 2,
      [BIOMES.MOUNTAINS]: -2,
      [BIOMES.POLAR]: -3,
      [BIOMES.CAVES]: -3,
      [BIOMES.WORLD_BELOW]: -1
    },
    langPrefs: {}
  }

  describe('constructor', () => {
    it('creates a Species instance', () => {
      const sp = new Species()
      expect(sp).toBeInstanceOf(Species)
    })

    it('sets null for name by default', () => {
      const sp = new Species()
      expect(sp.name).toEqual(null)
    })

    it('sets null for ancestor by default', () => {
      const sp = new Species()
      expect(sp.ancestor).toEqual(null)
    })

    it('sets null for generation by default', () => {
      const sp = new Species()
      expect(sp.generation).toEqual(null)
    })

    it('sets null for language preferences by default', () => {
      const sp = new Species()
      expect(sp.langPrefs).toEqual(null)
    })

    it('instantiates an empty fitness instance by default', () => {
      const sp = new Species()
      expect(sp.fitness.get(BIOMES.BOREAL_FOREST)).toEqual(0)
    })

    it('can set a name', () => {
      const sp = new Species(wosan)
      expect(sp.name).toEqual(wosan.name)
    })

    it('can set an ancestor', () => {
      const sp = new Species(elf)
      expect(sp.ancestor).toEqual(elf.ancestor)
    })

    it('can set a generation value', () => {
      const sp = new Species(wosan)
      expect(sp.generation).toEqual(wosan.generation)
    })

    it('can set fitness', () => {
      const biome = BIOMES.BOREAL_FOREST
      const sp = new Species(wosan)
      expect(sp.fitness.get(biome)).toEqual(wosan.fitness[biome])
    })

    it('uses langPrefs to determine capacity for speech', () => {
      const sp = new Species(human)
      expect(sp.langPrefs).not.toEqual(null)
    })

    it('can set a preference for morphological types in language', () => {
      const sp = new Species(elf)
      expect(sp.langPrefs?.typology).toHaveLength(1)
      expect(sp.langPrefs?.typology).toContain(LANG_MORPHOLOGY.ANALYTIC)
    })

    it('can set a preference for word order', () => {
      const sp = new Species(elf)
      expect(sp.langPrefs?.order).toHaveLength(2)
      expect(sp.langPrefs?.order).toContain(LANG_ORDER.VOS)
      expect(sp.langPrefs?.order).toContain(LANG_ORDER.VSO)
    })
  })

  describe('Member methods', () => {
    describe('getFitness', () => {
      it('returns the species fitness for a given biome', () => {
        const sp = new Species(wosan)
        for (const biome of Object.values(BIOMES)) {
          expect(sp.getFitness(biome)).toEqual(wosan.fitness[biome])
        }
      })
    })

    describe('canSpeak', () => {
      it('returns false if the species has null for langPrefs', () => {
        const sp = new Species(wosan)
        expect(sp.canSpeak()).toEqual(false)
      })

      it('returns false if the species has langPrefs', () => {
        const sp = new Species(elf)
        expect(sp.canSpeak()).toEqual(true)
      })

      it('returns false if the species has langPrefs, even with nothing specified', () => {
        const sp = new Species(human)
        expect(sp.canSpeak()).toEqual(true)
      })
    })
  })
})
