import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import Simulation from '../../../classes/Simulation.ts'
import languageSun from './language-sun.ts'

describe('languageSun', () => {
  let sim: Simulation

  beforeEach(() => {
    sim = new Simulation()
  })

  it('does not register an event if language has not been invented', () => {
    languageSun(sim)
    expect(sim.world.events).toHaveLength(0)
    expect(sim.history.events).toHaveLength(1)
  })

  it('does not register an event most of the time', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageSun(sim, false)
    expect(sim.world.events).toHaveLength(1)
    expect(sim.history.events).toHaveLength(1)
  })

  it('registers an event sometimes', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageSun(sim, true)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.history.events).toHaveLength(2)
  })

  it('will not register an event twice', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageSun(sim, true)
    languageSun(sim, true)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.history.events).toHaveLength(2)
  })

  it('interests dragons', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageSun(sim, true)
    expect(sim.world.dragons.interest.value).toBe(1)
  })
})
