import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import Population from '../../../classes/Population.ts'
import Simulation from '../../../classes/Simulation.ts'
import fs32, { BIG_ENOUGH_POP, DEST_REGION_ID } from './fs32.ts'

describe('fs32', () => {
  let sim: Simulation
  const srcRegion = 'GS03'
  const destRegion = DEST_REGION_ID

  const addHumans = (sim: Simulation, num: number) => {
    const home = sim.world.regions[srcRegion]
    const p = new Population(sim.emitter, home)
    p.adjustSize(num)
    p.species = sim.world.species.human
    home.introduce(p)
    sim.world.events.push(EVENTS_GLOBAL_UNIQUE.HUMANS)
  }

  beforeEach(() => {
    sim = new Simulation()
  })

  it('does not register an event if there are no humans', () => {
    fs32(sim)
    expect(sim.world.events).toHaveLength(0)
    expect(sim.world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.FS32_MIGRATION)
    expect(sim.history.events).toHaveLength(1)
  })

  it(`does not register an event if there is no human population with more than ${BIG_ENOUGH_POP} people`, () => {
    addHumans(sim, Math.floor(BIG_ENOUGH_POP / 2))
    fs32(sim)
    expect(sim.world.events).toHaveLength(1)
    expect(sim.world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.FS32_MIGRATION)
    expect(sim.history.events).toHaveLength(1)
  })

  it('does not register an event 19 times in 20', () => {
    addHumans(sim, BIG_ENOUGH_POP)
    fs32(sim, false)
    expect(sim.world.events).toHaveLength(1)
    expect(sim.world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.FS32_MIGRATION)
    expect(sim.history.events).toHaveLength(1)
  })

  it('registers an event 1 time in 20', () => {
    addHumans(sim, BIG_ENOUGH_POP)
    fs32(sim, true)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.world.events).toContain(EVENTS_GLOBAL_UNIQUE.FS32_MIGRATION)
    expect(sim.history.events).toHaveLength(2)
  })

  it('will not register an event twice', () => {
    addHumans(sim, BIG_ENOUGH_POP)
    fs32(sim, true)
    fs32(sim, true)
    expect(sim.world.events).toHaveLength(2)
    expect(sim.world.events).toContain(EVENTS_GLOBAL_UNIQUE.FS32_MIGRATION)
    expect(sim.history.events).toHaveLength(2)
  })

  it('moves humans from source region to FS32', () => {
    addHumans(sim, BIG_ENOUGH_POP)
    const { regions } = sim.world
    const src = regions[srcRegion]
    const dest = regions[destRegion]
    const p = src.populations[0]
    const before = p.size
    fs32(sim, true)
    const transplants = dest.populations[0]
    expect(transplants).toBeDefined()
    expect(p.size).toBeLessThan(before)
    expect(transplants.size + p.size).toBe(before)
    expect(transplants.home).toBe(dest)
    expect(dest.populations).toHaveLength(1)
    expect(dest.populations[0]).toBe(transplants)
  })

  it('doesn\'t interest dragons if draconic interest is less than 50', () => {
    addHumans(sim, BIG_ENOUGH_POP)
    fs32(sim, true)
    expect(sim.world.dragons.interest.value).toBe(0)
  })

  it('interests dragons if draconic interest is 50 or greater', () => {
    addHumans(sim, BIG_ENOUGH_POP)
    sim.world.dragons.interest.value = 50
    fs32(sim, true)
    expect(sim.world.dragons.interest.value).toBe(51)
  })
})
