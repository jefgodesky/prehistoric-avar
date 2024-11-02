import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import Simulation from '../../../classes/Simulation.ts'
import languageTuan from './language-tuan.ts'

describe('languageTuan', () => {
  let sim: Simulation

  beforeEach(() => {
    sim = new Simulation()
  })

  it('does not register an event if language has not been invented', () => {
    languageTuan(sim)
    expect(sim.world.events).toHaveLength(0)
    expect(sim.history.events).toHaveLength(1)
  })

  it('does not register an event 2 times in 3', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageTuan(sim, false)
    expect(sim.world.events).toHaveLength(1)
    expect(sim.history.events).toHaveLength(1)
  })

  it('registers an event 1 time in 3', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageTuan(sim, true)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.history.events).toHaveLength(2)
  })

  it('will not register an event twice', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageTuan(sim, true)
    languageTuan(sim, true)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.history.events).toHaveLength(2)
  })

  it('interests dragons', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageTuan(sim, true)
    expect(sim.world.dragons.interest.value).toBe(1)
  })
})
