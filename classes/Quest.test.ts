import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { BIOMES } from '../enums.ts'
import { IQuest } from '../index.d.ts'
import { GS02 } from '../instances/regions/index.ts'
import { SampleQuest, SamplePopulation } from '../test-examples.ts'
import Population from './Population.ts'
import Simulation from './Simulation.ts'
import Region from './Region.ts'
import Quest, { QUEST_EVENTS } from './Quest.ts'

describe('Quest', () => {
  let sim: Simulation
  
  beforeEach(() => { sim = new Simulation() })

  describe('constructor', () => {
    it('creates a Quest instance', () => {
      const quest = new Quest(sim)
      expect(quest).toBeInstanceOf(Quest)
    })

    it('defaults id to a random UUID', () => {
      const quest = new Quest(sim)
      expect(quest.id).toBeDefined()
    })

    it('defaults description', () => {
      const quest = new Quest(sim)
      expect(quest.description).toBe('Complete the quest')
    })

    it('defaults courage to 1 in 10', () => {
      const quest = new Quest(sim)
      expect(quest.courage).toBe(0.1)
    })

    it('defaults skill to 1 in 10', () => {
      const quest = new Quest(sim)
      expect(quest.skill).toBe(0.1)
    })

    it('defaults lethality to 1 in 3', () => {
      const quest = new Quest(sim)
      expect(quest.lethality).toEqual(1/3)
    })

    it('can take an id', () => {
      const quest = new Quest(sim, SampleQuest)
      expect(quest.id).toBe(SampleQuest.id)
    })

    it('can take a description', () => {
      const quest = new Quest(sim, SampleQuest)
      expect(quest.description).toBe(SampleQuest.description)
    })

    it('can take courage', () => {
      const quest = new Quest(sim, SampleQuest)
      expect(quest.courage).toBe(SampleQuest.courage)
    })

    it('can take skill', () => {
      const quest = new Quest(sim, SampleQuest)
      expect(quest.skill).toBe(SampleQuest.skill)
    })

    it('can take lethality', () => {
      const quest = new Quest(sim, SampleQuest)
      expect(quest.lethality).toBe(SampleQuest.lethality)
    })

    it('adds quest to the world', () => {
      const quest = new Quest(sim)
      expect(sim.world.quests.get(quest.id)).toBe(quest)
    })
  })

  describe('Member methods', () => {
    describe('call', () => {
      it('emits a call', async () => {
        let emitted: boolean | string = false
        sim.emitter.on(QUEST_EVENTS.CALL, ({ scope, quest }: { scope: string, quest: IQuest }) => {
          emitted = `${scope}: ${quest.id}`
        })
        const quest = new Quest(sim, {
          id: 'test-quest',
          description: 'A quest that you literally cannot fail',
          courage: 1,
          skill: 1,
          lethality: 0
        })

        await quest.call(SamplePopulation.id)
        expect(emitted).toEqual(`${SamplePopulation.id}: ${quest.id}`)
      })
    })

    describe('run', () => {
      let region: Region
      let quest: Quest
      let p: Population
      const biome = BIOMES.TEMPERATE_GRASSLAND

      beforeEach(() => {
        region = new Region(sim, GS02)
        quest = new Quest(sim, SampleQuest)
        p = new Population(region, SamplePopulation)
      })

      it('runs the quest', async () => {
        const report = await quest.run(p, biome)
        expect(report.quest.id).toBe(SampleQuest.id)
        expect(report.attempted).toBeDefined()
        expect(report.abandoned).toBeDefined()
        expect(report.killed).toBeDefined()
        expect(report.success).toBeDefined()
      })

      it('emits an event when the quest is accomplished', async () => {
        let emitted: boolean | string = false
        sim.emitter.on(QUEST_EVENTS.ACCOMPLISHED, (quest: IQuest) => {
          emitted = quest.id
        })
        const quest = new Quest(sim, {
          id: 'test-quest',
          description: 'A quest that you literally cannot fail',
          courage: 1,
          skill: 1,
          lethality: 0
        })

        const report = await quest.run(p, biome)
        expect(report.quest.id).toBe(quest.id)
        expect(emitted).toEqual(quest.id)
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const quest = new Quest(sim, SampleQuest)
        expect(JSON.stringify(quest.toObject())).toBe(JSON.stringify(SampleQuest))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const quest = new Quest(sim, SampleQuest)
        expect(quest.toString()).toBe(SampleQuest.description)
      })
    })
  })
})
