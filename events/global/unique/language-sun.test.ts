import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import History from '../../../classes/History.ts'
import Simulation from '../../../classes/Simulation.ts'
import World from '../../../classes/World.ts'
import languageSun from './language-sun.ts'

describe('languageSun', () => {
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
    languageSun()
    expect(world.events).toHaveLength(0)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.LANG_SUN)
    expect(history.events).toHaveLength(1)
  })

  it('does not register an event most of the time', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageSun(false)
    expect(world.events).toHaveLength(1)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.LANG_SUN)
    expect(history.events).toHaveLength(1)
  })

  it('registers an event sometimes', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageSun(true)
    expect(world.events).toHaveLength(2)
    expect(world.events).toContain(EVENTS_GLOBAL_UNIQUE.LANG_SUN)
    expect(history.events).toHaveLength(2)
  })

  it('will not register an event twice', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageSun(true)
    languageSun(true)
    expect(world.events).toHaveLength(2)
    expect(world.events).toContain(EVENTS_GLOBAL_UNIQUE.LANG_SUN)
    expect(history.events).toHaveLength(2)
  })

  it('interests dragons', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageSun(true)
    expect(world.dragons.interest.value).toBe(1)
  })
})
