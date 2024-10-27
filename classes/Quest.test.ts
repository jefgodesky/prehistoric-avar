import Emittery from 'emittery'
import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { IQuest } from '../index.d.ts'
import Quest, { QUEST_EVENTS } from './Quest.ts'
import { SampleQuest, SamplePopulation } from '../test-examples.ts'

describe('Quest', () => {
  const emitter = new Emittery()

  describe('constructor', () => {
    it('creates a Quest instance', () => {
      const quest = new Quest(emitter)
      expect(quest).toBeInstanceOf(Quest)
    })

    it('defaults id to a random UUID', () => {
      const quest = new Quest(emitter)
      expect(quest.id).toBeDefined()
    })

    it('defaults description', () => {
      const quest = new Quest(emitter)
      expect(quest.description).toBe('Complete the quest')
    })

    it('defaults courage to 1 in 10', () => {
      const quest = new Quest(emitter)
      expect(quest.courage).toBe(0.1)
    })

    it('defaults skill to 1 in 10', () => {
      const quest = new Quest(emitter)
      expect(quest.skill).toBe(0.1)
    })

    it('defaults lethality to 1 in 3', () => {
      const quest = new Quest(emitter)
      expect(quest.lethality).toEqual(1/3)
    })

    it('can take an id', () => {
      const quest = new Quest(emitter, SampleQuest)
      expect(quest.id).toBe(SampleQuest.id)
    })

    it('can take a description', () => {
      const quest = new Quest(emitter, SampleQuest)
      expect(quest.description).toBe(SampleQuest.description)
    })

    it('can take courage', () => {
      const quest = new Quest(emitter, SampleQuest)
      expect(quest.courage).toBe(SampleQuest.courage)
    })

    it('can take skill', () => {
      const quest = new Quest(emitter, SampleQuest)
      expect(quest.skill).toBe(SampleQuest.skill)
    })

    it('can take lethality', () => {
      const quest = new Quest(emitter, SampleQuest)
      expect(quest.lethality).toBe(SampleQuest.lethality)
    })
  })

  describe('Member methods', () => {
    describe('call', () => {
      it('emits a call', async () => {
        let emitted: boolean | string = false
        emitter.on(QUEST_EVENTS.CALL, ({ scope, quest }: { scope: string, quest: IQuest }) => {
          emitted = `${scope}: ${quest.id}`
        })
        const quest = new Quest(emitter, {
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
      it('runs the quest', async () => {
        const quest = new Quest(emitter, SampleQuest)
        const report = await quest.run(SamplePopulation)
        expect(report.quest.id).toBe(SampleQuest.id)
        expect(report.attempted).toBeDefined()
        expect(report.abandoned).toBeDefined()
        expect(report.killed).toBeDefined()
        expect(report.success).toBeDefined()
      })

      it('emits an event when the quest is accomplished', async () => {
        let emitted: boolean | string = false
        emitter.on(QUEST_EVENTS.ACCOMPLISHED, (quest: IQuest) => {
          emitted = quest.id
        })
        const quest = new Quest(emitter, {
          id: 'test-quest',
          description: 'A quest that you literally cannot fail',
          courage: 1,
          skill: 1,
          lethality: 0
        })

        const report = await quest.run(SamplePopulation)
        expect(report.quest.id).toBe(quest.id)
        expect(emitted).toEqual(quest.id)
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const quest = new Quest(emitter, SampleQuest)
        expect(JSON.stringify(quest.toObject())).toBe(JSON.stringify(SampleQuest))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const quest = new Quest(emitter, SampleQuest)
        expect(quest.toString()).toBe(SampleQuest.description)
      })
    })
  })
})
