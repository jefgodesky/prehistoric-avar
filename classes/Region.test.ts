import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { sumOf } from '@std/collections'
import type { IPopulation, IRegionFeature } from '../index.d.ts'
import { DS01, GS02, FS32 } from '../instances/regions/index.ts'
import { SamplePopulation, SampleSociety } from '../test-examples.ts'
import { EVENTS_GLOBAL_UNIQUE, SPECIES_NAMES, TERRESTRIAL_ELEMENTS } from '../enums.ts'
import Population from './Population.ts'
import Simulation from './Simulation.ts'
import Species from './Species.ts'
import World from './World.ts'
import createArchfey from '../factories/immortals/archfey.ts'
import createElemental from '../factories/immortals/elemental.ts'
import createPopulation from '../factories/population.ts'
import { getSpeciationScrollText } from '../factories/scrolls/speciation.ts'
import Region from './Region.ts'

describe('Region', () => {
  let world: World

  beforeEach(() => {
    world = Simulation.instance().world
  })

  afterEach(() => {
    Simulation.reset()
  })

  const introducePopulation = (
    region: string = 'GS02',
    populationData: IPopulation = SamplePopulation
  ): { region: Region, population: Population } => {
    const r = world.regions.get(region)!
    const population = createPopulation(region, populationData)
    return { region: r, population }
  }

  const addSpeechCommunity = (
    region: string = 'GS02',
    populationData: IPopulation = SamplePopulation
  ): {  region: Region, population: Population } => {
    const r = world.regions.get(region)!
    const { population } = introducePopulation(region, populationData)
    world.societies.get(r.society ?? '')?.addLanguage()
    return { region: r, population }
  }

  describe('constructor', () => {
    it('creates a Region instance', () => {
      const region = new Region()
      expect(region).toBeInstanceOf(Region)
    })

    it('defaults id to a null string', () => {
      const region = new Region()
      expect(region.id).toBe('')
    })

    it('defaults adjacent regions to an empty array', () => {
      const region = new Region()
      expect(region.adjacentRegions).toHaveLength(0)
    })

    it('defaults area to 0', () => {
      const region = new Region()
      expect(region.area).toBe(0)
    })

    it('defaults biome to null', () => {
      const region = new Region()
      expect(region.biome).toBe(null)
    })

    it('defaults carrying capacity to 0', () => {
      const region = new Region()
      expect(region.capacity).toBe(0)
    })

    it('defaults dragons to an empty array', () => {
      const region = new Region()
      expect(region.dragons).toHaveLength(0)
    })

    it('defaults features to an empty array', () => {
      const region = new Region()
      expect(region.features).toHaveLength(0)
    })

    it('defaults fey influence to 0', () => {
      const region = new Region()
      expect(region.feyInfluence).toBe(0)
    })

    it('defaults habitability to 1', () => {
      const region = new Region()
      expect(region.habitability).toBe(1)
    })

    it('defaults immortals to an empty array', () => {
      const region = new Region()
      expect(region.immortals).toHaveLength(0)
    })

    it('defaults society to null', () => {
      const region = new Region()
      expect(region.society).toBeNull()
    })

    it('defaults ogrism to 0', () => {
      const region = new Region()
      expect(region.ogrism).toBe(0)
    })

    it('defaults populations to an empty array', () => {
      const region = new Region()
      expect(region.populations).toHaveLength(0)
    })

    it('defaults to null for society', () => {
      const region = new Region()
      expect(region.society).toBeNull()
    })

    it('defaults markers to an empty array', () => {
      const region = new Region()
      expect(region.populations).toHaveLength(0)
    })

    it('has no species by default', () => {
      const region = new Region()
      expect(region.species).not.toBeDefined()
    })

    it('defaults tags to an empty array', () => {
      const region = new Region()
      expect(region.tags).toHaveLength(0)
    })

    it('can take id', () => {
      const region = new Region(GS02)
      expect(region.id).toBe(GS02.id)
    })

    it('can take an array of adjacent regions', () => {
      const region = new Region(GS02)
      expect(region.adjacentRegions).toHaveLength(GS02.adjacentRegions.length)
    })

    it('can take area', () => {
      const region = new Region(GS02)
      expect(region.area).toBe(GS02.area)
    })

    it('can take biome', () => {
      const region = new Region(GS02)
      expect(region.biome).toBe(GS02.biome)
    })

    it('can take carrying capacity', () => {
      const region = new Region(GS02)
      expect(region.capacity).toBe(GS02.capacity)
    })

    it('can take dragons', () => {
      const region = new Region(GS02)
      expect(region.dragons).toHaveLength(GS02.dragons.length)
    })

    it('can take features', () => {
      const region = new Region(DS01)
      expect(region.features).toHaveLength(DS01.features.length)
    })

    it('can take fey influence', () => {
      const region = new Region(GS02)
      expect(region.feyInfluence).toBe(GS02.feyInfluence)
    })

    it('can take habitability', () => {
      const habitability = 0.75
      const region = new Region(Object.assign({}, GS02, { habitability }))
      expect(region.habitability).toBe(habitability)
    })

    it('can take immortals', () => {
      const region = new Region(GS02)
      expect(region.immortals).toHaveLength(GS02.immortals.length)
    })

    it('can take ogrism', () => {
      const region = new Region(GS02)
      expect(region.ogrism).toBe(GS02.ogrism)
    })

    it('can take populations', () => {
      const region = new Region(GS02)
      expect(region.populations).toHaveLength(GS02.populations.length)
    })

    it('can take a society', () => {
      const data = Object.assign({}, GS02, { society: SampleSociety })
      const region = new Region(data)
      expect(region.society).not.toBeNull()
    })

    it('can take a species', () => {
      const region = new Region(FS32)
      expect(region.species).toBe(FS32.species)
    })

    it('can take tags', () => {
      const region = new Region(GS02)
      expect(region.tags).toHaveLength(GS02.tags.length)
    })
  })

  describe('Member methods', () => {
    describe('getCapacity', () => {
      it('calculates actual carrying capacity', () => {
        const region = world.regions.get('MS06')!
        region.habitability = 0.9
        const featureImpact = sumOf(region.features, (feature: IRegionFeature) => feature.impact)
        const expected = (region.capacity * world.habitability * region.habitability) + featureImpact
        const capacity = region.getCapacity(world.habitability)
        expect(capacity).toBe(expected)
      })

      it('is increased by an archfey', () => {
        const region = world.regions.get('FS11')!
        const before = region.getCapacity(world.habitability)
        createArchfey(region.id)
        expect(region.getCapacity(world.habitability)).toBeGreaterThan(before)
      })

      it('is reduced by an elemental', () => {
        const region = world.regions.get('FS11')!
        const before = region.getCapacity(world.habitability)
        createElemental(region.id, TERRESTRIAL_ELEMENTS.FIRE)
        expect(region.getCapacity(world.habitability)).toBeLessThan(before)
      })
    })

    describe('getPopulations', () => {
      it('returns an empty array if the region is unpopulated', () => {
        const region = world.regions.get('DS01')!
        expect(region.getPopulations()).toHaveLength(0)
      })

      it('returns an array of the region\'s populations', () => {
        const region = world.regions.get('DS01')!
        createPopulation(region.id, SamplePopulation)
        expect(region.getPopulations()).toHaveLength(1)
      })
    })

    describe('getSociety', () => {
      it('returns null if the region has no society', () => {
        const region = world.regions.get('DS01')!
        expect(region.getSociety()).toBeNull()
      })

      it('returns the society if the region has one', () => {
        const { region } = addSpeechCommunity()
        expect(region.getSociety()).not.toBeNull()
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
        introducePopulation(region.id)
        expect(region.society).toBe(before)
      })

      it('gives each population a unique ID', () => {
        const { region, population: p1 } = introducePopulation()
        const p2 = createPopulation(region.id, SamplePopulation)
        p1.adjustSize(p1.size * -2)
        region.introduce(p2)
        expect(p1.id).toBe('GS02-HU001')
        expect(p2.id).toBe('GS02-HU002')
      })

      it('sets the population\'s new home', () => {
        const dest = world.regions.get('GS02')!
        const p = createPopulation('DS01', SamplePopulation)
        dest.introduce(p)
        expect(p.home).toBe(dest.id)
      })

      it('has existing populations absorb new ones of the same species', () => {
        const id = 'DS01'
        createPopulation(id, SamplePopulation)
        createPopulation(id, SamplePopulation)
        const region = world.regions.get(id)!
        expect(region.populations).toHaveLength(1)
        expect(world.populations.get(region.populations[0])?.size).toBe(SamplePopulation.size * 2)
      })
    })

    describe('isPopulated', () => {
      it('returns false if the region has no population', () => {
        const region = new Region(DS01)
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

    describe('getSpeciesPopulation', () => {
      it('returns false if the region has no such population', () => {
        const region = new Region(DS01)
        expect(region.getSpeciesPopulation(SPECIES_NAMES.HUMAN)).toBe(false)
      })

      it('returns false if all populations in the region are extinct', () => {
        const { region, population } = introducePopulation()
        population.adjustSize(population.size * -2)
        expect(region.getSpeciesPopulation(SPECIES_NAMES.HUMAN)).toBe(false)
      })

      it('returns false if no populations are of the given species', () => {
        const { region } = introducePopulation()
        expect(region.getSpeciesPopulation(SPECIES_NAMES.ORC)).toBe(false)
      })

      it('returns the population if the region has a population of the given species', () => {
        const { region } = introducePopulation()
        expect(region.getSpeciesPopulation(SPECIES_NAMES.HUMAN)).toBeInstanceOf(Population)
      })
    })

    describe('hasPopulationCapableOfSpeech', () => {
      it('returns false if the region is unpopulated', () => {
        const region = new Region(DS01)
        expect(region.hasPopulationCapableOfSpeech()).toBe(false)
      })

      it('returns false if the region has a Wosan population', () => {
        const wosan = Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.WOSAN })
        const { region } = introducePopulation('GS02', wosan)
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
        const region = new Region(DS01)
        expect(region.hasSpeechCommunity()).toBe(false)
      })

      it('returns false if the region is populated by Wosan', () => {
        const wosan = Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.WOSAN })
        const { region } = introducePopulation('GS02', wosan)
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
        const region = new Region(GS02)
        region.habitability = 0.8
        region.reduceHabitability(0.25)
        expect(region.habitability).toBeCloseTo(0.6)
      })
    })

    describe('restoreHabitability', () => {
      it('restores half of the habitability lost', () => {
        const region = new Region(GS02)
        region.habitability = 0.8
        region.restoreHabitability()
        expect(region.habitability).toBe(0.9)
      })

      it('rounds 0.95 up to 1', () => {
        const region = new Region(GS02)
        region.habitability = 0.9
        region.restoreHabitability()
        expect(region.habitability).toBe(1)
      })
    })

    describe('getAverageGeneration', () => {
      it('returns 0 if the region is unpopulated', () => {
        const region = new Region(GS02)
        expect(region.getAverageGeneration()).toBe(0)
      })

      it('returns the population generation value if only one population', () => {
        const p = createPopulation('GS02', SamplePopulation)
        const expected = world.populations.get(p.getHome().populations[0])?.getSpecies().generation!
        expect(p.getHome().getAverageGeneration()).toBe(expected)
      })

      it('returns the average of two populations', () => {
        const humans = Object.assign({}, SamplePopulation, { size: 4000 })
        const elves = Object.assign({}, SamplePopulation, { size: 2000, species: SPECIES_NAMES.ELF })
        const p = createPopulation('GS02', humans)
        createPopulation('GS02', elves)
        const expected = Math.floor(((4000 * 40) + (2000 * 5)) / (4000 + 2000))
        expect(p.getHome().getAverageGeneration()).toBe(expected)
      })

      it('returns the average of three or more populations', () => {
        const home = 'GS02'
        const humans = Object.assign({}, SamplePopulation, { size: 4000 })
        const elves = Object.assign({}, SamplePopulation, { size: 2000, species: SPECIES_NAMES.ELF })
        const dwarves = Object.assign({}, SamplePopulation, { size: 3000, species: SPECIES_NAMES.DWARF })
        const p = createPopulation(home, humans)
        createPopulation(home, elves)
        createPopulation(home, dwarves)
        const expected = Math.floor(((4000 * 40) + (2000 * 5) + (3000 * 20)) / (4000 + 2000 + 3000))
        expect(p.getHome().getAverageGeneration()).toBe(expected)
      })
    })

    describe('speciate', () => {
      const key = FS32.species ?? SPECIES_NAMES.HALFLING
      let species: Species
      let scrollText = ''

      beforeEach(() => {
        species = world.species.get(key.toLowerCase())!
        scrollText = getSpeciationScrollText(species)
      })

      it('creates a speciation scroll for an appropriate ancestor population', () => {
        const region = 'FS32'
        const { population: p } = introducePopulation(region)
        world.regions.get(region)!.speciate()
        const scroll = p.scribe.scrolls.find(scroll => scroll.text === scrollText)
        expect(scroll).toBeDefined()
        expect(scroll?.seals).toBe(500)
      })

      it('won\'t create a speciation scroll for other populations', () => {
        const popData = Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.WOSAN })
        const p = createPopulation('FS32', popData)
        p.getHome().speciate()
        const scroll = p.scribe.scrolls.find(scroll => scroll.text === scrollText)
        expect(scroll).not.toBeDefined()
      })

      it('won\'t create a speciation scroll if the species already exists', () => {
        world.events.push(EVENTS_GLOBAL_UNIQUE.HALFLINGS)
        const region = 'FS32'
        const { population: p } = introducePopulation(region)
        world.regions.get(region)!.speciate()
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
        const region = new Region(GS02)
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

    describe('increaseOgrism', () => {
      it('increases ogrism by 1', () => {
        const region = new Region(GS02)
        region.ogrism = 5
        region.increaseOgrism()
        expect(region.ogrism).toBe(6)
      })

      it('will never increase ogrism beyond 8', () => {
        const region = new Region(GS02)
        region.ogrism = 8
        region.increaseOgrism()
        expect(region.ogrism).toBe(8)
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
        expect(region.immortals[0]).toBe(`Archfey Sovereign of ${region.id}`)
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
        expect(world.dragons.interest.value).toBe(1)
      })

      it('won\'t get the dragons\' attention a second time', () => {
        const { region } = addSpeechCommunity()
        region.feyInfluence = 8
        region.adjustFeyInfluence()
        const archfey = world.immortals.get(region.immortals[0])!
        archfey.slain = true
        region.adjustFeyInfluence()
        expect(region.immortals).toHaveLength(2)
        expect(world.dragons.interest.value).toBe(1)
      })
    })

    describe('spreadLanguage', () => {
      it('does nothing if the region has no population', () => {
        const { world } = Simulation.instance()
        world.regions.get('GS03')!.spreadLanguage()
        expect(world.languages.size()).toBe(0)
      })

      it('does nothing if the region has no language', () => {
        const { region } = introducePopulation()
        region.spreadLanguage()
        expect(world.languages.size()).toBe(0)
      })

      it('does nothing if all of the neighbors are wosan', () => {
        const { region } = addSpeechCommunity()
        introducePopulation('GS03', Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.WOSAN }))
        region.spreadLanguage()
        expect(world.languages.size()).toBe(1)
      })

      it('spreads language to neighboring regions with potential speakers', () => {
        const { region } = addSpeechCommunity()
        introducePopulation('GS03')
        region.spreadLanguage()
        expect(world.languages.size()).toBe(2)
        expect(world.languages.get('GS03-001')).toBe('GS02-001')
      })
    })

    describe('spreadOgrism', () => {
      const id = 'GS02'

      it('does nothing if two regions have the same ogrism', () => {
        const region = world.regions.get(id)!
        const neighbor = world.regions.get(region.adjacentRegions[0])!
        region.ogrism = 0
        neighbor.ogrism = 0
        region.spreadOgrism()
        expect(region.ogrism).toBe(0)
        expect(neighbor.ogrism).toBe(0)
      })

      it('does nothing if neighbor has higher ogrism', () => {
        const region = world.regions.get(id)!
        const neighbor = world.regions.get(region.adjacentRegions[0])!
        region.ogrism = 0
        neighbor.ogrism = 3
        region.spreadOgrism()
        expect(region.ogrism).toBe(0)
        expect(neighbor.ogrism).toBe(3)
      })

      it('increases neighbor\'s ogrism if it is lower', () => {
        const region = world.regions.get(id)!
        const neighbor = world.regions.get(region.adjacentRegions[0])!
        region.ogrism = 3
        neighbor.ogrism = 0
        region.spreadOgrism()
        expect(region.ogrism).toBe(3)
        expect(neighbor.ogrism).toBe(1)
      })
    })

    describe('survive', () => {
      it('lets everyone grow if there\'s resources', () => {
        const { region, population: humans } = introducePopulation()
        const { population: elves } = introducePopulation(region.id, Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.ELF }))
        humans.size = 2000
        elves.size = 2000
        region.capacity = 100000
        const results = region.survive()
        expect(results).toHaveLength(2)
        expect(results[0].pressure).toBe(0)
        expect(results[1].pressure).toBe(0)
      })

      it('sorts things out when there\'s competition', () => {
        const { region, population: humans } = introducePopulation()
        const { population: elves } = introducePopulation(region.id, Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.ELF }))
        humans.size = 5000
        elves.size = 5000
        region.capacity = 3000
        const results = region.survive()
        expect(results).toHaveLength(2)
        expect(results[0].pressure).toBeGreaterThan(1999)
        expect(results[1].pressure).toBeGreaterThan(1999)
      })

      it('attaches report to each population', () => {
        const { region, population: humans } = introducePopulation()
        const { population: elves } = introducePopulation(region.id, Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.ELF }))
        region.survive()
        expect(humans.growth).not.toBeNull()
        expect(elves.growth).not.toBeNull()
      })
    })

    describe('createsOgre', () => {
      it('returns true or false based on current ogrism level', () => {
        const { regions } = Simulation.instance().world
        const region = regions.get('GS03')!
        expect([true, false]).toContain(region.createsOgre())
      })

      it('increases ogrism if an ogre is created', () => {
        const { regions } = Simulation.instance().world
        const region = regions.get('GS03')!
        const before = region.ogrism
        region.createsOgre(true)
        expect(region.ogrism).toBe(before + 1)
      })
    })

    describe('pickRandomHumanoid', () => {
      it('selects a humanoid randomly from the population', () => {
        const region = world.regions.get('GS03')!
        const humans = createPopulation(region.id, SamplePopulation)
        const elves = createPopulation(region.id, Object.assign({}, SamplePopulation, { species: SPECIES_NAMES.ELF }))
        const { species, population } = region.pickRandomHumanoid()
        expect([SPECIES_NAMES.HUMAN, SPECIES_NAMES.ELF]).toContain(species)
        expect([humans.id, elves.id]).toContain(population)
      })
    })

    describe('evaluate', () => {
      const baseline = 545776

      it('quantifies how appealing a region is for a population', () => {
        const region = world.regions.get('GS03')!
        const humans = createPopulation(region.id, SamplePopulation)
        expect(region.evaluate(humans)).toBe(baseline)
      })

      it('is less appealing when there is more competition', () => {
        const region = world.regions.get('GS03')!
        const humans = createPopulation(region.id, SamplePopulation)
        humans.adjustSize(1000)
        expect(region.evaluate(humans)).toBeLessThan(baseline)
      })

      it('is more appealing when there is less competition', () => {
        const region = world.regions.get('GS03')!
        const humans = createPopulation(region.id, SamplePopulation)
        humans.adjustSize(-1000)
        expect(region.evaluate(humans)).toBeGreaterThan(baseline)
      })

      it('is less appealing if there are more dragons', () => {
        const region = world.regions.get('GS03')!
        region.dragons = [...region.dragons, 'shit dragon']
        const humans = createPopulation(region.id, SamplePopulation)
        expect(region.evaluate(humans)).toBeLessThan(baseline)
      })
    })

    describe('generateSocietyId', () => {
      it('generates an ID based on the region ID and millennium', () => {
        const region = world.regions.get('DS01')!
        expect(region.generateSocietyId()).toBe('DS01-001')
      })
    })

    describe('generatePopulationId', () => {
      it('generates an ID based on the region ID and number of predecessors', () => {
        const region = world.regions.get('DS01')!
        createPopulation(region.id, SamplePopulation)
        expect(region.generatePopulationId(SamplePopulation.species)).toBe('DS01-HU002')
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const region = new Region(FS32)
        expect(region.toObject()).toEqual(FS32)
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const region = new Region(FS32)
        expect(region.toString()).toEqual(FS32.id)
      })
    })
  })
})
