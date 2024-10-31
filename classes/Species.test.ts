import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { BIOMES, LANG_ORDER, LANG_MORPHOLOGY, SPECIES_NAMES } from '../enums.ts'
import { ElfData, HumanData, WosanData } from '../test-examples.ts'
import Species from './Species.ts'

describe('Species', () => {
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
      expect(sp.languagePreferences).toEqual(null)
    })

    it('instantiates an empty fitness instance by default', () => {
      const sp = new Species()
      expect(sp.fitness.get(BIOMES.BOREAL_FOREST)).toEqual(0)
      expect(sp.fitness.max).toBe(3)
      expect(sp.fitness.min).toBe(-3)
    })

    it('can set a name', () => {
      const sp = new Species(WosanData)
      expect(sp.name).toEqual(WosanData.name)
    })

    it('can set an ancestor', () => {
      const sp = new Species(ElfData)
      expect(sp.ancestor).toEqual(ElfData.ancestor)
    })

    it('can set a generation value', () => {
      const sp = new Species(WosanData)
      expect(sp.generation).toEqual(WosanData.generation)
    })

    it('can set fitness', () => {
      const biome = BIOMES.BOREAL_FOREST
      const sp = new Species(WosanData)
      expect(sp.fitness.get(biome)).toEqual(WosanData.fitness[biome])
      expect(sp.fitness.max).toBe(3)
      expect(sp.fitness.min).toBe(-3)
    })

    it('uses languagePreferences to determine capacity for speech', () => {
      const sp = new Species(HumanData)
      expect(sp.languagePreferences).not.toEqual(null)
    })

    it('can set a preference for morphological types in language', () => {
      const sp = new Species(ElfData)
      expect(sp.languagePreferences?.typology).toHaveLength(1)
      expect(sp.languagePreferences?.typology).toContain(LANG_MORPHOLOGY.ANALYTIC)
    })

    it('can set a preference for word order', () => {
      const sp = new Species(ElfData)
      expect(sp.languagePreferences?.order).toHaveLength(2)
      expect(sp.languagePreferences?.order).toContain(LANG_ORDER.VOS)
      expect(sp.languagePreferences?.order).toContain(LANG_ORDER.VSO)
    })
  })

  describe('Member methods', () => {
    describe('getFitness', () => {
      it('returns the species fitness for a given biome', () => {
        const sp = new Species(WosanData)
        for (const biome of Object.values(BIOMES)) {
          expect(sp.getFitness(biome)).toEqual(WosanData.fitness[biome])
        }
      })
    })

    describe('canSpeak', () => {
      it('returns false if the species has null for languagePreferences', () => {
        const sp = new Species(WosanData)
        expect(sp.canSpeak()).toEqual(false)
      })

      it('returns false if the species has languagePreferences', () => {
        const sp = new Species(ElfData)
        expect(sp.canSpeak()).toEqual(true)
      })

      it('returns false if the species has languagePreferences, even with nothing specified', () => {
        const sp = new Species(HumanData)
        expect(sp.canSpeak()).toEqual(true)
      })
    })

    describe('getCode', () => {
      it('returns the species code', () => {
        const sp = new Species(HumanData)
        expect(sp.getCode()).toBe('HU')
      })
    })

    describe('toObject', () => {
      it('returns an object', () => {
        const sp = new Species(HumanData)
        const biome = BIOMES.BOREAL_FOREST
        const actual = sp.toObject()
        expect(actual.name).toEqual(sp.name)
        expect(actual.ancestor).toEqual(sp.ancestor)
        expect(actual.generation).toEqual(sp.generation)
        expect(actual.fitness[biome]).toEqual(sp.getFitness(biome))
        expect(JSON.stringify(actual.languagePreferences)).toEqual(JSON.stringify(sp.languagePreferences))
      })
    })

    describe('toString', () => {
      it('returns a string', () => {
        const sp = new Species(HumanData)
        expect(sp.toString()).toEqual(`Species: ${HumanData.name}`)
      })
    })
  })

  describe('Static methods', () => {
    describe('getCode', () => {
      it('returns a two-letter code for each species name', () => {
        expect(Species.getCode(SPECIES_NAMES.DWARF)).toBe('DW')
        expect(Species.getCode(SPECIES_NAMES.ELF)).toBe('EL')
        expect(Species.getCode(SPECIES_NAMES.GNOME)).toBe('GN')
        expect(Species.getCode(SPECIES_NAMES.HALFLING)).toBe('HA')
        expect(Species.getCode(SPECIES_NAMES.HUMAN)).toBe('HU')
        expect(Species.getCode(SPECIES_NAMES.ORC)).toBe('OR')
        expect(Species.getCode(SPECIES_NAMES.WOSAN)).toBe('WO')
      })
    })
  })
})
