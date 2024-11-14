import { describe, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Quest from '../classes/Quest.ts'
import Simulation from '../classes/Simulation.ts'
import createQuest from './quest.ts'

describe('createQuest', () => {
  afterEach(() => {
    Simulation.reset()
  })

  it('creates a quest', () => {
    const { world } = Simulation.instance()
    const actual = createQuest()
    expect(actual).toBeInstanceOf(Quest)
    expect(world.quests.keys()).toContain(actual.id)
  })
})
