import Emittery from 'emittery'
import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import type { IQuestReport } from '../index.d.ts'
import { DS01, GS02, FS32 } from '../instances/regions/index.ts'
import { DragonQueen, SamplePopulation } from '../test-examples.ts'
import { SPECIES_NAMES } from '../enums.ts'
import { QUEST_EVENTS } from './Quest.ts'
import Immortal from './Immortal.ts'
import Language from './Language.ts'
import Population from './Population.ts'
import Quest from './Quest.ts'
import Region from './Region.ts'

describe('Region', () => {
  const emitter = new Emittery()

  describe('constructor', () => {
    it('creates a Region instance', () => {
      const region = new Region(emitter)
      expect(region).toBeInstanceOf(Region)
    })

    it('defaults id to a null string', () => {
      const region = new Region(emitter)
      expect(region.id).toBe('')
    })

    it('defaults adjacent regions to an empty array', () => {
      const region = new Region(emitter)
      expect(region.adjacentRegions).toHaveLength(0)
    })

    it('defaults area to 0', () => {
      const region = new Region(emitter)
      expect(region.area).toBe(0)
    })

    it('defaults biome to null', () => {
      const region = new Region(emitter)
      expect(region.biome).toBe(null)
    })

    it('defaults carrying capacity to 0', () => {
      const region = new Region(emitter)
      expect(region.capacity).toBe(0)
    })

    it('defaults dragons to an empty array', () => {
      const region = new Region(emitter)
      expect(region.dragons).toHaveLength(0)
    })

    it('defaults features to an empty array', () => {
      const region = new Region(emitter)
      expect(region.features).toHaveLength(0)
    })

    it('defaults fey influence to 0', () => {
      const region = new Region(emitter)
      expect(region.feyInfluence).toBe(0)
    })

    it('defaults habitability to 1', () => {
      const region = new Region(emitter)
      expect(region.habitability).toBe(1)
    })

    it('defaults immortals to an empty array', () => {
      const region = new Region(emitter)
      expect(region.immortals).toHaveLength(0)
    })

    it('defaults languages to an empty array', () => {
      const region = new Region(emitter)
      expect(region.languages).toHaveLength(0)
    })

    it('defaults ogrism to 0', () => {
      const region = new Region(emitter)
      expect(region.ogrism).toBe(0)
    })

    it('defaults populations to an empty array', () => {
      const region = new Region(emitter)
      expect(region.populations).toHaveLength(0)
    })

    it('defaults markers to an empty array', () => {
      const region = new Region(emitter)
      expect(region.populations).toHaveLength(0)
    })

    it('has no species by default', () => {
      const region = new Region(emitter)
      expect(region.species).not.toBeDefined()
    })

    it('defaults tags to an empty array', () => {
      const region = new Region(emitter)
      expect(region.tags).toHaveLength(0)
    })

    it('can take id', () => {
      const region = new Region(emitter, GS02)
      expect(region.id).toBe(GS02.id)
    })

    it('can take an array of adjacent regions', () => {
      const region = new Region(emitter, GS02)
      expect(region.adjacentRegions).toHaveLength(GS02.adjacentRegions.length)
    })

    it('can take area', () => {
      const region = new Region(emitter, GS02)
      expect(region.area).toBe(GS02.area)
    })

    it('can take biome', () => {
      const region = new Region(emitter, GS02)
      expect(region.biome).toBe(GS02.biome)
    })

    it('can take carrying capacity', () => {
      const region = new Region(emitter, GS02)
      expect(region.capacity).toBe(GS02.capacity)
    })

    it('can take dragons', () => {
      const region = new Region(emitter, GS02)
      expect(region.dragons).toHaveLength(GS02.dragons.length)
    })

    it('can take features', () => {
      const region = new Region(emitter, DS01)
      expect(region.features).toHaveLength(DS01.features.length)
    })

    it('can take fey influence', () => {
      const region = new Region(emitter, GS02)
      expect(region.feyInfluence).toBe(GS02.feyInfluence)
    })

    it('can take habitability', () => {
      const habitability = 0.75
      const region = new Region(emitter, Object.assign({}, GS02, { habitability }))
      expect(region.habitability).toBe(habitability)
    })

    it('can take immortals', () => {
      const region = new Region(emitter, GS02)
      expect(region.immortals).toHaveLength(GS02.immortals.length)
    })

    it('can take languages', () => {
      const region = new Region(emitter, GS02)
      expect(region.languages).toHaveLength(GS02.languages.length)
    })

    it('can take ogrism', () => {
      const region = new Region(emitter, GS02)
      expect(region.ogrism).toBe(GS02.ogrism)
    })

    it('can take populations', () => {
      const region = new Region(emitter, GS02)
      expect(region.populations).toHaveLength(GS02.populations.length)
    })

    it('can take a species', () => {
      const region = new Region(emitter, FS32)
      expect(region.species).toBe(FS32.species)
    })

    it('can take tags', () => {
      const region = new Region(emitter, GS02)
      expect(region.tags).toHaveLength(GS02.tags.length)
    })
  })

  describe('Member methods', () => {
    describe('getCapacity', () => {
      it('calculates actual carrying capacity', () => {
        const region = new Region(emitter, DS01)
        region.habitability = 0.9
        const featureImpact = region.features
          .map(feature => feature.impact)
          .reduce((acc, curr) => acc + curr, 0)
        const worldHabitability = 0.92
        const expected = (DS01.capacity * worldHabitability * region.habitability) + featureImpact
        const capacity = region.getCapacity(worldHabitability)
        expect(capacity).toBe(expected)
      })
    })

    describe('introduce', () => {
      it('adds a new population', () => {
        const region = new Region(emitter, GS02)
        const p = new Population(emitter, region, SamplePopulation)
        region.introduce(p)
        expect(region.populations).toHaveLength(1)
      })

      it('gives the population an ID', () => {
        const region = new Region(emitter, GS02)
        const p = new Population(emitter, region, SamplePopulation)
        region.introduce(p)
        expect(p.id).toBe('GS02-HU001')
      })

      it('gives each population a unique ID', () => {
        const region = new Region(emitter, GS02)
        const p1 = new Population(emitter, region, SamplePopulation)
        const p2 = new Population(emitter, region, SamplePopulation)
        region.introduce(p1)
        p1.adjustSize(p1.size * -2)
        region.introduce(p2)
        expect(p1.id).toBe('GS02-HU001')
        expect(p2.id).toBe('GS02-HU002')
      })

      it('sets the population\'s new home', () => {
        const src = new Region(emitter, DS01)
        const dest = new Region(emitter, GS02)
        const p = new Population(emitter, src, SamplePopulation)
        dest.introduce(p)
        expect(p.home).toBe(dest)
      })
    })

    describe('isPopulated', () => {
      it('returns false if the region has no population', () => {
        const region = new Region(emitter, DS01)
        expect(region.isPopulated()).toBe(false)
      })

      it('returns false if all populations in the region are extinct', () => {
        const region = new Region(emitter, GS02)
        const p = new Population(emitter, region, SamplePopulation)
        region.populations.push(p)
        p.adjustSize(p.size * -2)
        expect(region.isPopulated()).toBe(false)
      })

      it('returns true if the region has 1 or more extant populations', () => {
        const region = new Region(emitter, GS02)
        region.populations.push(new Population(emitter, region, SamplePopulation))
        expect(region.isPopulated()).toBe(true)
      })
    })

    describe('hasPopulationCapableOfSpeech', () => {
      it('returns false if the region is unpopulated', () => {
        const region = new Region(emitter, DS01)
        expect(region.hasPopulationCapableOfSpeech()).toBe(false)
      })

      it('returns false if the region has a Wosan population', () => {
        const region = new Region(emitter, GS02)
        const wosan = Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.WOSAN })
        region.populations.push(new Population(emitter, region, wosan))
        expect(region.hasPopulationCapableOfSpeech()).toBe(false)
      })

      it('returns false if the speaking population is extinct', () => {
        const region = new Region(emitter, GS02)
        const p = new Population(emitter, region, SamplePopulation)
        region.populations.push(p)
        p.adjustSize(p.size * -2)
        expect(region.hasPopulationCapableOfSpeech()).toBe(false)
      })

      it('returns true if the region has a population that is not Wosan', () => {
        const region = new Region(emitter, GS02)
        region.populations.push(new Population(emitter, region, SamplePopulation))
        expect(region.hasPopulationCapableOfSpeech()).toBe(true)
      })
    })

    describe('hasSpeechCommunity', () => {
      it('returns false if the region is unpopulated', () => {
        const region = new Region(emitter, DS01)
        expect(region.hasSpeechCommunity()).toBe(false)
      })

      it('returns false if the region is populated by Wosan', () => {
        const region = new Region(emitter, GS02)
        const wosan = Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.WOSAN })
        region.languages.push(new Language())
        region.populations.push(new Population(emitter, region, wosan))
        expect(region.hasSpeechCommunity()).toBe(false)
      })

      it('returns false if the region is populated but has no language', () => {
        const region = new Region(emitter, GS02)
        region.populations.push(new Population(emitter, region, SamplePopulation))
        expect(region.hasSpeechCommunity()).toBe(false)
      })

      it('returns false if the speakers are extinct', () => {
        const region = new Region(emitter, GS02)
        const p = new Population(emitter, region, SamplePopulation)
        region.languages.push(new Language())
        region.populations.push(p)
        p.adjustSize(p.size * -2)
        expect(region.hasSpeechCommunity()).toBe(false)
      })

      it('returns true if the region has a language and people to speak it', () => {
        const region = new Region(emitter, GS02)
        region.languages.push(new Language())
        region.populations.push(new Population(emitter, region, SamplePopulation))
        expect(region.hasSpeechCommunity()).toBe(true)
      })
    })

    describe('reduceHabitability', () => {
      it('reduces habitability by a given percent', () => {
        const region = new Region(emitter, GS02)
        region.habitability = 0.8
        region.reduceHabitability(0.5)
        expect(region.habitability).toBe(0.4)
      })
    })

    describe('restoreHabitability', () => {
      it('restores half of the habitability lost', () => {
        const region = new Region(emitter, GS02)
        region.habitability = 0.8
        region.restoreHabitability()
        expect(region.habitability).toBe(0.9)
      })

      it('rounds 0.95 up to 1', () => {
        const region = new Region(emitter, GS02)
        region.habitability = 0.9
        region.restoreHabitability()
        expect(region.habitability).toBe(1)
      })
    })

    describe('addLanguage', () => {
      it('adds a language to the region', () => {
        const region = new Region(emitter, GS02)
        region.addLanguage(new Language(), 1)
        expect(region.languages).toHaveLength(1)
        expect(region.languages[0].name).toBe(`${GS02.id}-001`)
      })
    })

    describe('getCurrentLanguage', () => {
      it('returns undefined if the region has never had a language', () => {
        const region = new Region(emitter, GS02)
        const actual = region.getCurrentLanguage()
        expect(actual).not.toBeDefined()
      })

      it('returns the region\'s most recent language', () => {
        const region = new Region(emitter, GS02)
        const lang = new Language()
        region.languages.push(lang)
        const actual = region.getCurrentLanguage()
        expect(JSON.stringify(actual?.toString())).toBe(JSON.stringify(lang.toString()))
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const region = new Region(emitter, FS32)
        expect(region.toObject()).toEqual(FS32)
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const region = new Region(emitter, FS32)
        expect(region.toString()).toEqual(FS32.id)
      })
    })
  })

  describe('Event handling', () => {
    describe(QUEST_EVENTS.ACCOMPLISHED, () => {
      const event = QUEST_EVENTS.ACCOMPLISHED

      it('leaves unharmed immortals alone', async () => {
        const region = new Region(emitter, GS02)
        region.immortals.push(new Immortal(emitter, DragonQueen))
        const report: IQuestReport = {
          quest: (region.immortals[0].slayable as Quest).toObject(),
          attempted: 100,
          abandoned: 50,
          killed: 50,
          success: false
        }
        await emitter.emit(event, report)
        expect(region.immortals).toHaveLength(1)
      })

      it('slays', async () => {
        const region = new Region(emitter, GS02)
        const i = new Immortal(emitter, DragonQueen)
        region.immortals.push(i)
        const report: IQuestReport = {
          quest: (region.immortals[0].slayable as Quest).toObject(),
          attempted: 100,
          abandoned: 50,
          killed: 49,
          success: true
        }
        await emitter.emit(event, report)
        expect(i.slain).toBe(true)
        expect(region.immortals).toHaveLength(0)
      })
    })
  })
})
