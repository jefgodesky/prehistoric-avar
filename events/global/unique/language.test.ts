import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import History from '../../../classes/History.ts'
import Simulation from '../../../classes/Simulation.ts'
import World from '../../../classes/World.ts'
import createPopulation from '../../../factories/population.ts'
import language from './language.ts'

describe('language', () => {
  let history: History
  let world: World
  const homeRegion = 'GS03'

  const addHumans = () => {
    const p = createPopulation(homeRegion)
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
    language()
    expect(world.events).toHaveLength(0)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.LANG)
    expect(history.events).toHaveLength(1)
  })

  it('does not register an event 9 times in 10', () => {
    addHumans()
    language(false)
    expect(world.events).toHaveLength(1)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.LANG)
    expect(history.events).toHaveLength(1)
  })

  it('registers an event 1 time in 10', () => {
    addHumans()
    language(true)
    expect(world.events).toHaveLength(2)
    expect(world.events).toContain(EVENTS_GLOBAL_UNIQUE.LANG)
    expect(history.events).toHaveLength(2)
  })

  it('will not register an event twice', () => {
    addHumans()
    language(true)
    language(true)
    expect(world.events).toHaveLength(2)
    expect(world.events).toContain(EVENTS_GLOBAL_UNIQUE.LANG)
    expect(history.events).toHaveLength(2)
  })

  it('adds the first language', () => {
    addHumans()
    const region = world.regions.get(homeRegion)
    language(true)
    const society = world.societies.get(region?.society ?? '')
    const actual = society?.language
    expect(actual).toBe('GS03-001')
    expect(world.languages.get('GS03-001')).toBeNull()
  })

  it('interests dragons', () => {
    addHumans()
    language(true)
    expect(world.dragons.interest.value).toBe(1)
  })
})
