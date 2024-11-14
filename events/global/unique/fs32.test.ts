import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import History from '../../../classes/History.ts'
import Simulation from '../../../classes/Simulation.ts'
import World from '../../../classes/World.ts'
import createPopulation from '../../../factories/population.ts'
import fs32, { BIG_ENOUGH_POP, DEST_REGION_ID } from './fs32.ts'

describe('fs32', () => {
  let history: History
  let world: World
  const srcRegion = 'GS03'
  const destRegion = DEST_REGION_ID

  const addHumans = (num: number) => {
    const p = createPopulation(srcRegion)
    p.adjustSize(num)
    p.species = 'human'
    world.events.push(EVENTS_GLOBAL_UNIQUE.HUMANS)
  }

  beforeEach(() => {
    const sim = Simulation.instance()
    history = sim.history
    world = sim.world
  })

  afterEach(() => {
    Simulation.reset()
  })

  it('does not register an event if there are no humans', () => {
    fs32()
    expect(world.events).toHaveLength(0)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.FS32_MIGRATION)
    expect(history.events).toHaveLength(1)
  })

  it(`does not register an event if there is no human population with more than ${BIG_ENOUGH_POP} people`, () => {
    addHumans(Math.floor(BIG_ENOUGH_POP / 2))
    fs32()
    expect(world.events).toHaveLength(1)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.FS32_MIGRATION)
    expect(history.events).toHaveLength(1)
  })

  it('does not register an event 19 times in 20', () => {
    addHumans(BIG_ENOUGH_POP)
    fs32(false)
    expect(world.events).toHaveLength(1)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.FS32_MIGRATION)
    expect(history.events).toHaveLength(1)
  })

  it('registers an event 1 time in 20', () => {
    addHumans(BIG_ENOUGH_POP)
    fs32(true)
    expect(world.events).toHaveLength(2)
    expect(world.events).toContain(EVENTS_GLOBAL_UNIQUE.FS32_MIGRATION)
    expect(history.events).toHaveLength(2)
  })

  it('will not register an event twice', () => {
    addHumans(BIG_ENOUGH_POP)
    fs32(true)
    fs32(true)
    expect(world.events).toHaveLength(2)
    expect(world.events).toContain(EVENTS_GLOBAL_UNIQUE.FS32_MIGRATION)
    expect(history.events).toHaveLength(2)
  })

  it('moves humans from source region to FS32', () => {
    addHumans(BIG_ENOUGH_POP)
    const { regions } = world
    const src = regions.get(srcRegion)!
    const dest = regions.get(destRegion)!
    const p = world.populations.get(src.populations[0])!
    const before = p.size
    fs32(true)
    const transplants = world.populations.get(dest.populations[0])!
    expect(transplants).toBeDefined()
    expect(p.size).toBeLessThan(before)
    expect(transplants.size + p.size).toBe(before)
    expect(transplants.home).toBe(dest.id)
    expect(dest.populations).toHaveLength(1)
    expect(dest.populations[0]).toBe(transplants.id)
  })

  it('doesn\'t interest dragons if draconic interest is less than 50', () => {
    addHumans(BIG_ENOUGH_POP)
    fs32(true)
    expect(world.dragons.interest.value).toBe(0)
  })

  it('interests dragons if draconic interest is 50 or greater', () => {
    addHumans(BIG_ENOUGH_POP)
    world.dragons.interest.value = 50
    fs32(true)
    expect(world.dragons.interest.value).toBe(51)
  })
})
