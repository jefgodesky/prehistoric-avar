import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import Simulation from '../../../classes/Simulation.ts'
import death from './death.ts'

describe('death', () => {
  let sim: Simulation

  beforeEach(() => {
    sim = new Simulation()
  })

  it('does not register an event if language has not been invented', () => {
    death(sim)
    expect(sim.world.events).toHaveLength(0)
    expect(sim.world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.DEATH)
    expect(sim.history.events).toHaveLength(1)
  })

  it('does not register an event 9 times in 10', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    death(sim, false)
    expect(sim.world.events).toHaveLength(1)
    expect(sim.world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.DEATH)
    expect(sim.history.events).toHaveLength(1)
  })

  it('registers an event 1 time in 10', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    death(sim, true)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.world.events).toContain(EVENTS_GLOBAL_UNIQUE.DEATH)
    expect(sim.history.events).toHaveLength(2)
  })

  it('will not register an event twice', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    death(sim, true)
    death(sim, true)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.world.events).toContain(EVENTS_GLOBAL_UNIQUE.DEATH)
    expect(sim.history.events).toHaveLength(2)
  })

  it('increases draconic fear', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    death(sim, true)
    expect(sim.world.dragons.fear.value).toBe(5)
  })
})
