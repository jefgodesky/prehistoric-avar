import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import History from '../../../classes/History.ts'
import Simulation from '../../../classes/Simulation.ts'
import World from '../../../classes/World.ts'
import languageTuan from './language-tuan.ts'

describe('languageTuan', () => {
  let history: History
  let world: World

  beforeEach(() => {
    const sim = Simulation.instance()
    history = sim.history
    world = sim.world
  })

  afterEach(() => {
    Simulation.reset()
  })

  it('does not register an event if language has not been invented', () => {
    languageTuan()
    expect(world.events).toHaveLength(0)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.LANG_TUAN)
    expect(history.events).toHaveLength(1)
  })

  it('does not register an event 2 times in 3', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageTuan(false)
    expect(world.events).toHaveLength(1)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.LANG_TUAN)
    expect(history.events).toHaveLength(1)
  })

  it('registers an event 1 time in 3', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageTuan(true)
    expect(world.events).toHaveLength(2)
    expect(world.events).toContain(EVENTS_GLOBAL_UNIQUE.LANG_TUAN)
    expect(history.events).toHaveLength(2)
  })

  it('will not register an event twice', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageTuan(true)
    languageTuan(true)
    expect(world.events).toHaveLength(2)
    expect(world.events).toContain(EVENTS_GLOBAL_UNIQUE.LANG_TUAN)
    expect(history.events).toHaveLength(2)
  })

  it('interests dragons', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageTuan(true)
    expect(world.dragons.interest.value).toBe(1)
  })
})
