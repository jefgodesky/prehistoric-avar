import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DISPOSITIONS, EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import type Region from '../../../classes/Region.ts'
import Simulation from '../../../classes/Simulation.ts'
import dragonQueen, { OGRISM_THRESHOLD } from './dragon-queen.ts'

describe('dragonQueen', () => {
  let sim: Simulation
  let region: Region

  beforeEach(() => {
    sim = new Simulation()
    region = sim.world.regions['MS06']
  })

  it('does not register an event if language has not appeared', () => {
    dragonQueen(sim)
    expect(sim.world.events).toHaveLength(0)
    expect(sim.world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.DRAGON_QUEEN)
    expect(sim.history.events).toHaveLength(1)
  })

  it(`does not register an event if there are no regions with less than ${OGRISM_THRESHOLD} ogrism`, () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    dragonQueen(sim)
    expect(sim.world.events).toHaveLength(1)
    expect(sim.world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.DRAGON_QUEEN)
    expect(sim.history.events).toHaveLength(1)
  })

  it('does not register an event most of the time', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    region.ogrism = OGRISM_THRESHOLD
    dragonQueen(sim, false)
    expect(sim.world.events).toHaveLength(1)
    expect(sim.world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.DRAGON_QUEEN)
    expect(sim.history.events).toHaveLength(1)
  })

  it('registers an event sometimes', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    region.ogrism = OGRISM_THRESHOLD
    dragonQueen(sim, true)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.world.events).toContain(EVENTS_GLOBAL_UNIQUE.DRAGON_QUEEN)
    expect(sim.history.events).toHaveLength(2)
  })

  it('will not register an event twice', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    region.ogrism = OGRISM_THRESHOLD
    dragonQueen(sim, true)
    dragonQueen(sim, true)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.world.events).toContain(EVENTS_GLOBAL_UNIQUE.DRAGON_QUEEN)
    expect(sim.history.events).toHaveLength(2)
  })

  it('creates the Dragon Queen', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    region.ogrism = OGRISM_THRESHOLD
    dragonQueen(sim, true)
    expect(region.immortals).toHaveLength(1)
    expect(region.immortals[0].disposition).toBe(DISPOSITIONS.HOSTILE)
    expect(region.immortals[0].description).toBe('The Dragon Queen')
    expect(region.immortals[0].impact).toBe(500)
    expect(region.immortals[0].slayable).toBe(false)
  })

  it('increases draconic fear', () => {
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    region.ogrism = OGRISM_THRESHOLD
    dragonQueen(sim, true)
    expect(sim.world.dragons.fear.value).toBe(5)
  })
})
