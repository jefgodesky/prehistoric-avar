import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import Simulation from '../../../classes/Simulation.ts'
import languageHadar from './language-hadar.ts'

describe('language', () => {
  let sim: Simulation

  beforeEach(() => {
    sim = new Simulation()
  })

  it('does not register an event if language has not been invented', () => {
    languageHadar(sim)
    expect(sim.world.events).toHaveLength(0)
    expect(sim.world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.LANG_HADAR)
    expect(sim.history.events).toHaveLength(1)
  })

  it('does not register an event if language was invented this millennium', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    sim.history.add({ millennium: sim.millennium, description: 'Language invented', tags: ['Language', 'Invention'] })
    languageHadar(sim)
    expect(sim.world.events).toHaveLength(1)
    expect(sim.world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.LANG_HADAR)
    expect(sim.history.events).toHaveLength(2)
  })

  it('registers an event if language was invented in a previous millennium', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    sim.history.add({ millennium: sim.millennium, description: 'Language invented', tags: ['Language', 'Invention'] })
    sim.millennium++
    languageHadar(sim)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.world.events).toContain(EVENTS_GLOBAL_UNIQUE.LANG_HADAR)
    expect(sim.history.events).toHaveLength(3)
  })

  it('will not register an event twice', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    sim.history.add({ millennium: sim.millennium, description: 'Language invented', tags: ['Language', 'Invention'] })
    sim.millennium++
    languageHadar(sim)
    languageHadar(sim)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.world.events).toContain(EVENTS_GLOBAL_UNIQUE.LANG_HADAR)
    expect(sim.history.events).toHaveLength(3)
  })

  it('interests dragons', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    sim.history.add({ millennium: sim.millennium, description: 'Language invented', tags: ['Language', 'Invention'] })
    sim.millennium++
    languageHadar(sim)
    expect(sim.world.dragons.interest.value).toBe(1)
  })
})
