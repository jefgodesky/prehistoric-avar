import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import Simulation from '../../../classes/Simulation.ts'
import languageElta from './language-elta.ts'

describe('languageElta', () => {
  let sim: Simulation

  beforeEach(() => {
    sim = new Simulation()
  })

  it('does not register an event if language has not been invented', () => {
    languageElta(sim)
    expect(sim.world.events).toHaveLength(0)
    expect(sim.world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.LANG_ELTA)
    expect(sim.history.events).toHaveLength(1)
  })

  it('does not register an event most of the time', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageElta(sim, false)
    expect(sim.world.events).toHaveLength(1)
    expect(sim.world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.LANG_ELTA)
    expect(sim.history.events).toHaveLength(1)
  })

  it('registers an event sometimes', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageElta(sim, true)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.world.events).toContain(EVENTS_GLOBAL_UNIQUE.LANG_ELTA)
    expect(sim.history.events).toHaveLength(2)
  })

  it('will not register an event twice', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageElta(sim, true)
    languageElta(sim, true)
    expect(sim.world.events).toContain(EVENTS_GLOBAL_UNIQUE.LANG_ELTA)
  })

  it('interests dragons', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    languageElta(sim, true)
    expect(sim.world.dragons.interest.value).toBe(1)
  })
})
