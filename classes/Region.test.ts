import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import type { IPopulation } from '../index.d.ts'
import { DS01, GS02, FS32 } from '../instances/regions/index.ts'
import { DragonQueen, SamplePopulation, SampleSociety } from '../test-examples.ts'
import {EVENTS_GLOBAL_UNIQUE, SPECIES_NAMES} from '../enums.ts'
import { QUEST_EVENTS } from './Quest.ts'
import Immortal from './Immortal.ts'
import Population from './Population.ts'
import Quest from './Quest.ts'
import Region from './Region.ts'
import Simulation from './Simulation.ts'
import { getSpeciationScrollText } from '../factories/scrolls/speciation.ts'

describe('Region', () => {
  let sim: Simulation

  const introducePopulation = (
    region: Region = new Region(sim, GS02),
    populationData: IPopulation = SamplePopulation
  ): { region: Region, population: Population } => {
    const population = new Population(region, populationData)
    region.introduce(population)
    return { region, population }
  }

  const addSpeechCommunity = (
    region: Region = new Region(sim, GS02),
    populationData: IPopulation = SamplePopulation
  ): {  region: Region, population: Population } => {
    const { population } = introducePopulation(region, populationData)
    sim.world.societies.get(region.society ?? '')?.addLanguage()
    return { region, population }
  }

  beforeEach(() => { sim = new Simulation() })

  describe('constructor', () => {
    it('creates a Region instance', () => {
      const region = new Region(sim)
      expect(region).toBeInstanceOf(Region)
    })

    it('defaults id to a null string', () => {
      const region = new Region(sim)
      expect(region.id).toBe('')
    })

    it('defaults adjacent regions to an empty array', () => {
      const region = new Region(sim)
      expect(region.adjacentRegions).toHaveLength(0)
    })

    it('defaults area to 0', () => {
      const region = new Region(sim)
      expect(region.area).toBe(0)
    })

    it('defaults biome to null', () => {
      const region = new Region(sim)
      expect(region.biome).toBe(null)
    })

    it('defaults carrying capacity to 0', () => {
      const region = new Region(sim)
      expect(region.capacity).toBe(0)
    })

    it('defaults dragons to an empty array', () => {
      const region = new Region(sim)
      expect(region.dragons).toHaveLength(0)
    })

    it('defaults features to an empty array', () => {
      const region = new Region(sim)
      expect(region.features).toHaveLength(0)
    })

    it('defaults fey influence to 0', () => {
      const region = new Region(sim)
      expect(region.feyInfluence).toBe(0)
    })

    it('defaults habitability to 1', () => {
      const region = new Region(sim)
      expect(region.habitability).toBe(1)
    })

    it('defaults immortals to an empty array', () => {
      const region = new Region(sim)
      expect(region.immortals).toHaveLength(0)
    })

    it('defaults society to null', () => {
      const region = new Region(sim)
      expect(region.society).toBeNull()
    })

    it('defaults ogrism to 0', () => {
      const region = new Region(sim)
      expect(region.ogrism).toBe(0)
    })

    it('defaults populations to an empty array', () => {
      const region = new Region(sim)
      expect(region.populations).toHaveLength(0)
    })

    it('defaults to null for society', () => {
      const region = new Region(sim)
      expect(region.society).toBeNull()
    })

    it('defaults markers to an empty array', () => {
      const region = new Region(sim)
      expect(region.populations).toHaveLength(0)
    })

    it('has no species by default', () => {
      const region = new Region(sim)
      expect(region.species).not.toBeDefined()
    })

    it('defaults tags to an empty array', () => {
      const region = new Region(sim)
      expect(region.tags).toHaveLength(0)
    })

    it('can take id', () => {
      const region = new Region(sim, GS02)
      expect(region.id).toBe(GS02.id)
    })

    it('can take an array of adjacent regions', () => {
      const region = new Region(sim, GS02)
      expect(region.adjacentRegions).toHaveLength(GS02.adjacentRegions.length)
    })

    it('can take area', () => {
      const region = new Region(sim, GS02)
      expect(region.area).toBe(GS02.area)
    })

    it('can take biome', () => {
      const region = new Region(sim, GS02)
      expect(region.biome).toBe(GS02.biome)
    })

    it('can take carrying capacity', () => {
      const region = new Region(sim, GS02)
      expect(region.capacity).toBe(GS02.capacity)
    })

    it('can take dragons', () => {
      const region = new Region(sim, GS02)
      expect(region.dragons).toHaveLength(GS02.dragons.length)
    })

    it('can take features', () => {
      const region = new Region(sim, DS01)
      expect(region.features).toHaveLength(DS01.features.length)
    })

    it('can take fey influence', () => {
      const region = new Region(sim, GS02)
      expect(region.feyInfluence).toBe(GS02.feyInfluence)
    })

    it('can take habitability', () => {
      const habitability = 0.75
      const region = new Region(sim, Object.assign({}, GS02, { habitability }))
      expect(region.habitability).toBe(habitability)
    })

    it('can take immortals', () => {
      const region = new Region(sim, GS02)
      expect(region.immortals).toHaveLength(GS02.immortals.length)
    })

    it('can take ogrism', () => {
      const region = new Region(sim, GS02)
      expect(region.ogrism).toBe(GS02.ogrism)
    })

    it('can take populations', () => {
      const region = new Region(sim, GS02)
      expect(region.populations).toHaveLength(GS02.populations.length)
    })

    it('can take a society', () => {
      const data = Object.assign({}, GS02, { society: SampleSociety })
      const region = new Region(sim, data)
      expect(region.society).not.toBeNull()
    })

    it('can take a species', () => {
      const region = new Region(sim, FS32)
      expect(region.species).toBe(FS32.species)
    })

    it('can take tags', () => {
      const region = new Region(sim, GS02)
      expect(region.tags).toHaveLength(GS02.tags.length)
    })
  })

  describe('Member methods', () => {
    describe('getCapacity', () => {
      it('calculates actual carrying capacity', () => {
        const region = new Region(sim, DS01)
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
        const { region } = introducePopulation()
        expect(region.populations).toHaveLength(1)
      })

      it('gives the population an ID', () => {
        const { population } = introducePopulation()
        expect(population.id).toBe('GS02-HU001')
      })

      it('creates a society', () => {
        const { region } = introducePopulation()
        expect(region.society).toBeDefined()
      })

      it('doesn\'t replace an existing society', () => {
        const { region } = introducePopulation()
        const before = region.society
        introducePopulation(region)
        expect(region.society).toBe(before)
      })

      it('gives each population a unique ID', () => {
        const { region, population: p1 } = introducePopulation()
        const p2 = new Population(region, SamplePopulation)
        p1.adjustSize(p1.size * -2)
        region.introduce(p2)
        expect(p1.id).toBe('GS02-HU001')
        expect(p2.id).toBe('GS02-HU002')
      })

      it('sets the population\'s new home', () => {
        const src = new Region(sim, DS01)
        const dest = new Region(sim, GS02)
        const p = new Population(src, SamplePopulation)
        dest.introduce(p)
        expect(p.home).toBe(dest)
      })

      it('has existing populations absorb new ones of the same species', () => {
        const src = new Region(sim, DS01)
        const dest = new Region(sim, GS02)
        const p1 = new Population(dest, SamplePopulation)
        const p2 = new Population(src, SamplePopulation)
        dest.introduce(p1)
        dest.introduce(p2)
        expect(dest.populations).toHaveLength(1)
        expect(dest.populations[0].size).toBe(SamplePopulation.size * 2)
      })
    })

    describe('isPopulated', () => {
      it('returns false if the region has no population', () => {
        const region = new Region(sim, DS01)
        expect(region.isPopulated()).toBe(false)
      })

      it('returns false if all populations in the region are extinct', () => {
        const { region, population } = introducePopulation()
        population.adjustSize(population.size * -2)
        expect(region.isPopulated()).toBe(false)
      })

      it('returns true if the region has 1 or more extant populations', () => {
        const { region } = introducePopulation()
        expect(region.isPopulated()).toBe(true)
      })
    })

    describe('hasPopulationCapableOfSpeech', () => {
      it('returns false if the region is unpopulated', () => {
        const region = new Region(sim, DS01)
        expect(region.hasPopulationCapableOfSpeech()).toBe(false)
      })

      it('returns false if the region has a Wosan population', () => {
        const wosan = Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.WOSAN })
        const { region } = introducePopulation(new Region(sim, GS02), wosan)
        expect(region.hasPopulationCapableOfSpeech()).toBe(false)
      })

      it('returns false if the speaking population is extinct', () => {
        const { region, population } = introducePopulation()
        population.adjustSize(population.size * -2)
        expect(region.hasPopulationCapableOfSpeech()).toBe(false)
      })

      it('returns true if the region has a population that is not Wosan', () => {
        const { region } = introducePopulation()
        expect(region.hasPopulationCapableOfSpeech()).toBe(true)
      })
    })

    describe('hasSpeechCommunity', () => {
      it('returns false if the region is unpopulated', () => {
        const region = new Region(sim, DS01)
        expect(region.hasSpeechCommunity()).toBe(false)
      })

      it('returns false if the region is populated by Wosan', () => {
        const wosan = Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.WOSAN })
        const { region } = introducePopulation(new Region(sim, GS02), wosan)
        expect(region.hasSpeechCommunity()).toBe(false)
      })

      it('returns false if the region is populated but has no language', () => {
        const { region } = introducePopulation()
        expect(region.hasSpeechCommunity()).toBe(false)
      })

      it('returns false if the speakers are extinct', () => {
        const { region, population } = addSpeechCommunity()
        population.adjustSize(population.size * -2)
        expect(region.hasSpeechCommunity()).toBe(false)
      })

      it('returns true if the region has a language and people to speak it', () => {
        const { region } = addSpeechCommunity()
        expect(region.hasSpeechCommunity()).toBe(true)
      })
    })

    describe('reduceHabitability', () => {
      it('reduces habitability by a given percent', () => {
        const region = new Region(sim, GS02)
        region.habitability = 0.8
        region.reduceHabitability(0.25)
        expect(region.habitability).toBeCloseTo(0.6)
      })
    })

    describe('restoreHabitability', () => {
      it('restores half of the habitability lost', () => {
        const region = new Region(sim, GS02)
        region.habitability = 0.8
        region.restoreHabitability()
        expect(region.habitability).toBe(0.9)
      })

      it('rounds 0.95 up to 1', () => {
        const region = new Region(sim, GS02)
        region.habitability = 0.9
        region.restoreHabitability()
        expect(region.habitability).toBe(1)
      })
    })

    describe('getAverageGeneration', () => {
      it('returns 0 if the region is unpopulated', () => {
        const region = new Region(sim, GS02)
        expect(region.getAverageGeneration()).toBe(0)
      })

      it('returns the population generation value if only one population', () => {
        const region = new Region(sim, GS02)
        region.introduce(new Population(region, SamplePopulation))
        expect(region.getAverageGeneration()).toBe(region.populations[0].species.generation)
      })

      it('returns the average of two populations', () => {
        const region = new Region(sim, GS02)
        const humans = Object.assign({}, SamplePopulation, { size: 4000 })
        const elves = Object.assign({}, SamplePopulation, { size: 2000, species: SPECIES_NAMES.ELF })
        region.introduce(new Population(region, humans))
        region.introduce(new Population(region, elves))
        const expected = Math.floor(((4000 * 40) + (2000 * 5)) / (4000 + 2000))
        expect(region.getAverageGeneration()).toBe(expected)
      })

      it('returns the average of three or more populations', () => {
        const region = new Region(sim, GS02)
        const humans = Object.assign({}, SamplePopulation, { size: 4000 })
        const elves = Object.assign({}, SamplePopulation, { size: 2000, species: SPECIES_NAMES.ELF })
        const dwarves = Object.assign({}, SamplePopulation, { size: 3000, species: SPECIES_NAMES.DWARF })
        region.introduce(new Population(region, humans))
        region.introduce(new Population(region, elves))
        region.introduce(new Population(region, dwarves))
        const expected = Math.floor(((4000 * 40) + (2000 * 5) + (3000 * 20)) / (4000 + 2000 + 3000))
        expect(region.getAverageGeneration()).toBe(expected)
      })
    })

    describe('speciate', () => {
      const scrollText = getSpeciationScrollText(FS32.species ?? SPECIES_NAMES.HALFLING)

      it('creates a speciation scroll for an appropriate ancestor population', () => {
        const region = new Region(sim, FS32)
        const { population: p } = introducePopulation(region)
        region.speciate()
        const scroll = p.scribe.scrolls.find(scroll => scroll.text === scrollText)
        expect(scroll).toBeDefined()
        expect(scroll?.seals).toBe(500)
      })

      it('won\'t create a speciation scroll for other populations', () => {
        const region = new Region(sim, FS32)
        const popData = Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.WOSAN })
        const p = new Population(region, popData)
        region.introduce(p)
        region.speciate()
        const scroll = p.scribe.scrolls.find(scroll => scroll.text === scrollText)
        expect(scroll).not.toBeDefined()
      })

      it('won\'t create a speciation scroll if the species already exists', () => {
        sim.world.events.push(EVENTS_GLOBAL_UNIQUE.HALFLINGS)
        const region = new Region(sim, FS32)
        const { population: p } = introducePopulation(region)
        region.speciate()
        const scrolls = p.scribe.scrolls.filter(scroll => scroll.text === scrollText)
        expect(scrolls).toHaveLength(1)
      })
    })

    describe('reduceOgrism', () => {
      it('reduces ogrism if the region has no speech community', () => {
        const { region } = introducePopulation()
        region.ogrism = 5
        region.reduceOgrism()
        expect(region.ogrism).toBe(4)
      })

      it('will never reduce ogrism below 0', () => {
        const region = new Region(sim, GS02)
        region.ogrism = 0
        region.reduceOgrism()
        expect(region.ogrism).toBe(0)
      })

      it('does nothing if the region has a speech community', () => {
        const { region } = addSpeechCommunity()
        region.ogrism = 5
        region.reduceOgrism()
        expect(region.ogrism).toBe(5)
      })
    })

    describe('adjustFeyInfluence', () => {
      it('reduces fey influence if the region has no speech community', () => {
        const { region } = introducePopulation()
        region.feyInfluence = 5
        region.adjustFeyInfluence()
        expect(region.feyInfluence).toBe(4)
      })

      it('increases fey influence if the region has a speech community', () => {
        const { region } = addSpeechCommunity()
        region.adjustFeyInfluence()
        expect(region.feyInfluence).toBe(1)
      })

      it('will never reduce fey influence below 0', () => {
        const { region } = introducePopulation()
        region.feyInfluence = 0
        region.adjustFeyInfluence()
        expect(region.feyInfluence).toBe(0)
      })

      it('will never increase fey influence beyond 8', () => {
        const { region } = addSpeechCommunity()
        region.feyInfluence = 8
        region.adjustFeyInfluence()
        expect(region.feyInfluence).toBe(8)
      })

      it('adds an archfey if fey influence reaches 8 and it doesn\'t have one', () => {
        const { region } = addSpeechCommunity()
        region.feyInfluence = 7
        region.adjustFeyInfluence()
        expect(region.immortals).toHaveLength(1)
        expect(region.immortals[0].description).toBe(`Archfey Sovereign of ${region.id}`)
      })

      it('won\'t add an archfey to a region that already has one', () => {
        const { region } = addSpeechCommunity()
        region.feyInfluence = 8
        region.adjustFeyInfluence()
        region.adjustFeyInfluence()
        expect(region.feyInfluence).toBe(8)
        expect(region.immortals).toHaveLength(1)
      })

      it('gets the dragons\' attention', () => {
        const { region } = addSpeechCommunity()
        region.feyInfluence = 8
        region.adjustFeyInfluence()
        expect(region.immortals).toHaveLength(1)
        expect(sim.world.dragons.interest.value).toBe(1)
      })

      it('won\'t get the dragons\' attention a second time', () => {
        const { region } = addSpeechCommunity()
        region.feyInfluence = 8
        region.adjustFeyInfluence()
        region.immortals[0].slain = true
        region.adjustFeyInfluence()
        expect(region.immortals).toHaveLength(2)
        expect(sim.world.dragons.interest.value).toBe(1)
      })
    })

    describe('generateId', () => {
      it('generates an ID based on the region ID and millennium', () => {
        const region = new Region(sim, DS01)
        expect(region.generateId()).toBe('DS01-001')
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const region = new Region(sim, FS32)
        expect(region.toObject()).toEqual(FS32)
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const region = new Region(sim, FS32)
        expect(region.toString()).toEqual(FS32.id)
      })
    })
  })

  describe('Event handling', () => {
    describe(QUEST_EVENTS.ACCOMPLISHED, () => {
      const event = QUEST_EVENTS.ACCOMPLISHED

      it('leaves unharmed immortals alone', async () => {
        const region = new Region(sim, GS02)
        region.immortals.push(new Immortal(sim, DragonQueen))
        const queen = sim.world.immortals.get(DragonQueen.description)
        await sim.emitter.emit(event, (queen?.slayable as Quest)?.id ?? 'FAIL')
        expect(region.immortals).toHaveLength(1)
      })

      it('slays', async () => {
        const region = new Region(sim, GS02)
        const i = new Immortal(sim, DragonQueen)
        region.immortals.push(i)
        const quest = sim.world.quests.get((i.slayable as Quest).id)!
        quest.accomplished = true
        quest.attempts.push({
          attempted: 100,
          abandoned: 50,
          killed: 49,
          success: true
        })
        await sim.emitter.emit(event, quest.id)
        expect(i.slain).toBe(true)
        expect(region.immortals).toHaveLength(0)
      })
    })
  })
})
