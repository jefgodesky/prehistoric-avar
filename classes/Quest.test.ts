import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { BIOMES } from '../enums.ts'
import { GS02 } from '../instances/regions/index.ts'
import { SampleQuest, SamplePopulation } from '../test-examples.ts'
import Population from './Population.ts'
import Simulation from './Simulation.ts'
import Region from './Region.ts'
import World from './World.ts'
import Quest from './Quest.ts'

describe('Quest', () => {
  let world: World
  
  beforeEach(() => {
    world = Simulation.instance().world
  })
  
  afterEach(() => {
    Simulation.reset()
  })
  
  describe('constructor', () => {
    it('creates a Quest instance', () => {
      const quest = new Quest(world)
      expect(quest).toBeInstanceOf(Quest)
    })

    it('defaults id to a random UUID', () => {
      const quest = new Quest(world)
      expect(quest.id).toBeDefined()
    })

    it('defaults description', () => {
      const quest = new Quest(world)
      expect(quest.description).toBe('Complete the quest')
    })

    it('defaults courage to 1 in 10', () => {
      const quest = new Quest(world)
      expect(quest.courage).toBe(0.1)
    })

    it('defaults skill to 1 in 10', () => {
      const quest = new Quest(world)
      expect(quest.skill).toBe(0.1)
    })

    it('defaults lethality to 1 in 3', () => {
      const quest = new Quest(world)
      expect(quest.lethality).toEqual(1/3)
    })

    it('defaults to not yet accomplished', () => {
      const quest = new Quest(world)
      expect(quest.accomplished).toBe(false)
    })

    it('defaults to an empty array of attempts', () => {
      const quest = new Quest(world)
      expect(quest.attempts).toHaveLength(0)
    })

    it('can take an id', () => {
      const quest = new Quest(world, SampleQuest)
      expect(quest.id).toBe(SampleQuest.id)
    })

    it('can take a description', () => {
      const quest = new Quest(world, SampleQuest)
      expect(quest.description).toBe(SampleQuest.description)
    })

    it('can take courage', () => {
      const quest = new Quest(world, SampleQuest)
      expect(quest.courage).toBe(SampleQuest.courage)
    })

    it('can take skill', () => {
      const quest = new Quest(world, SampleQuest)
      expect(quest.skill).toBe(SampleQuest.skill)
    })

    it('can take lethality', () => {
      const quest = new Quest(world, SampleQuest)
      expect(quest.lethality).toBe(SampleQuest.lethality)
    })

    it('can be accomplished', () => {
      const obj = Object.assign({}, SampleQuest, { accomplished: true })
      const quest = new Quest(world, obj)
      expect(quest.accomplished).toBe(true)
    })

    it('can have attempts', () => {
      const obj = Object.assign({}, SampleQuest, {
        attempts: [{ attempted: 100, abandoned: 90, killed: 9, success: true }]
      })
      const quest = new Quest(world, obj)
      expect(quest.attempts[0].success).toBe(true)
    })

    it('adds quest to the world', () => {
      const quest = new Quest(world)
      expect(world.quests.get(quest.id)).toBe(quest)
    })
  })

  describe('Member methods', () => {
    describe('run', () => {
      let region: Region
      let quest: Quest
      let p: Population
      const biome = BIOMES.TEMPERATE_GRASSLAND

      beforeEach(() => {
        region = new Region(GS02)
        quest = new Quest(world, SampleQuest)
        p = new Population(world, region.id, SamplePopulation)
      })

      it('runs the quest', () => {
        const report = quest.run(p, biome)
        expect(report.attempted).toBeDefined()
        expect(report.abandoned).toBeDefined()
        expect(report.killed).toBeDefined()
        expect(report.success).toBeDefined()
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const quest = new Quest(world, SampleQuest)
        expect(JSON.stringify(quest.toObject())).toBe(JSON.stringify(SampleQuest))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const quest = new Quest(world, SampleQuest)
        expect(quest.toString()).toBe(SampleQuest.description)
      })
    })
  })
})
