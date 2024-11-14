import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import type Region from '../../../classes/Region.ts'
import DragonQueen from '../../../classes/immortals/DragonQueen.ts'
import History from '../../../classes/History.ts'
import Simulation from '../../../classes/Simulation.ts'
import World from '../../../classes/World.ts'
import dragonQueen, { OGRISM_THRESHOLD } from './dragon-queen.ts'

describe('dragonQueen', () => {
  let history: History
  let region: Region
  let world: World

  beforeEach(() => {
    const sim = Simulation.instance()
    world = sim.world
    history = sim.history
    region = world.regions.get('MS06')!
  })

  afterEach(() => {
    Simulation.reset()
    DragonQueen.reset()
  })

  it('does not register an event if language has not appeared', () => {
    dragonQueen()
    expect(world.events).toHaveLength(0)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.DRAGON_QUEEN)
    expect(history.events).toHaveLength(1)
  })

  it(`does not register an event if there are no regions with less than ${OGRISM_THRESHOLD} ogrism`, () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    dragonQueen()
    expect(world.events).toHaveLength(1)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.DRAGON_QUEEN)
    expect(history.events).toHaveLength(1)
  })

  it('does not register an event most of the time', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    region.ogrism = OGRISM_THRESHOLD
    dragonQueen(false)
    expect(world.events).toHaveLength(1)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.DRAGON_QUEEN)
    expect(history.events).toHaveLength(1)
  })

  it('registers an event sometimes', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    region.ogrism = OGRISM_THRESHOLD
    dragonQueen(true)
    expect(world.events).toHaveLength(2)
    expect(world.events).toContain(EVENTS_GLOBAL_UNIQUE.DRAGON_QUEEN)
    expect(history.events).toHaveLength(2)
  })

  it('will not register an event twice', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    region.ogrism = OGRISM_THRESHOLD
    dragonQueen(true)
    dragonQueen(true)
    expect(world.events).toHaveLength(2)
    expect(world.events).toContain(EVENTS_GLOBAL_UNIQUE.DRAGON_QUEEN)
    expect(history.events).toHaveLength(2)
  })

  it('creates the Dragon Queen', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    region.ogrism = OGRISM_THRESHOLD
    dragonQueen(true)
    expect(region.immortals).toHaveLength(1)
  })

  it('increases draconic fear', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    region.ogrism = OGRISM_THRESHOLD
    dragonQueen(true)
    expect(world.dragons.fear.value).toBe(5)
  })
})
