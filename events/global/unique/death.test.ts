import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import History from '../../../classes/History.ts'
import Simulation from '../../../classes/Simulation.ts'
import World from '../../../classes/World.ts'
import death from './death.ts'

describe('death', () => {
  let world: World
  let history: History

  beforeEach(() => {
    const sim = Simulation.instance()
    history = sim.history
    world = sim.world
  })

  afterEach(() => {
    Simulation.reset()
  })

  it('does not register an event if language has not been invented', () => {
    death()
    expect(world.events).toHaveLength(0)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.DEATH)
    expect(history.events).toHaveLength(1)
  })

  it('does not register an event 9 times in 10', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    death(false)
    expect(world.events).toHaveLength(1)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.DEATH)
    expect(history.events).toHaveLength(1)
  })

  it('registers an event 1 time in 10', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    death(true)
    expect(world.events).toHaveLength(2)
    expect(world.events).toContain(EVENTS_GLOBAL_UNIQUE.DEATH)
    expect(history.events).toHaveLength(2)
  })

  it('will not register an event twice', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    death(true)
    death(true)
    expect(world.events).toHaveLength(2)
    expect(world.events).toContain(EVENTS_GLOBAL_UNIQUE.DEATH)
    expect(history.events).toHaveLength(2)
  })

  it('increases draconic fear', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    death(true)
    expect(world.dragons.fear.value).toBe(5)
  })
})
