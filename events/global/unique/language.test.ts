import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { EVENTS_GLOBAL_UNIQUE, LANG_MORPHOLOGY, LANG_ORDER } from '../../../enums.ts'
import Population from '../../../classes/Population.ts'
import Simulation from '../../../classes/Simulation.ts'
import language from './language.ts'

describe('language', () => {
  let sim: Simulation
  const homeRegion = 'GS03'

  const addHumans = (sim: Simulation) => {
    const home = sim.world.regions[homeRegion]
    const p = new Population(sim.emitter, home)
    p.species = sim.world.species.human
    home.introduce(p)
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.HUMANS)
  }

  beforeEach(() => {
    sim = new Simulation()
  })

  it('does not register an event if there are no humans', () => {
    language(sim)
    expect(sim.world.events).toHaveLength(0)
    expect(sim.world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.LANG)
    expect(sim.history.events).toHaveLength(1)
  })

  it('does not register an event 9 times in 10', () => {
    addHumans(sim)
    language(sim, false)
    expect(sim.world.events).toHaveLength(1)
    expect(sim.world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.LANG)
    expect(sim.history.events).toHaveLength(1)
  })

  it('registers an event 1 time in 10', () => {
    addHumans(sim)
    language(sim, true)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.world.events).toContain(EVENTS_GLOBAL_UNIQUE.LANG)
    expect(sim.history.events).toHaveLength(2)
  })

  it('will not register an event twice', () => {
    addHumans(sim)
    language(sim, true)
    language(sim, true)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.world.events).toContain(EVENTS_GLOBAL_UNIQUE.LANG)
    expect(sim.history.events).toHaveLength(2)
  })

  it('adds the first language', () => {
    addHumans(sim)
    const region = sim.world.regions[homeRegion]
    language(sim, true)
    expect(region.languages).toHaveLength(1)
    expect(region.languages[0].name).toBe('GS03-001')
    expect(region.languages[0].order).toBe(LANG_ORDER.SOV)
    expect(region.languages[0].morphology).toBe(LANG_MORPHOLOGY.AGGLUTINATIVE)
  })

  it('interests dragons', () => {
    addHumans(sim)
    language(sim, true)
    expect(sim.world.dragons.interest.value).toBe(1)
  })
})