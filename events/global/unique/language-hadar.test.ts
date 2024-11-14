import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { EVENTS_GLOBAL_UNIQUE } from '../../../enums.ts'
import History from '../../../classes/History.ts'
import Simulation from '../../../classes/Simulation.ts'
import World from '../../../classes/World.ts'
import languageHadar from './language-hadar.ts'

describe('languageHadar', () => {
  let history: History
  let world: World
  let millennium = 0

  beforeEach(() => {
    const sim = Simulation.instance()
    history = sim.history
    world = sim.world
    millennium = sim.millennium
  })
  
  afterEach(() => {
    Simulation.reset()
  })

  it('does not register an event if language has not been invented', () => {
    languageHadar()
    expect(world.events).toHaveLength(0)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.LANG_HADAR)
    expect(history.events).toHaveLength(1)
  })

  it('does not register an event if language was invented this millennium', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    history.add({ millennium: millennium, description: 'Language invented', tags: ['Language', 'Invention'] })
    languageHadar()
    expect(world.events).toHaveLength(1)
    expect(world.events).not.toContain(EVENTS_GLOBAL_UNIQUE.LANG_HADAR)
    expect(history.events).toHaveLength(2)
  })

  it('registers an event if language was invented in a previous millennium', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    history.add({ millennium: millennium, description: 'Language invented', tags: ['Language', 'Invention'] })
    Simulation.instance().millennium++
    languageHadar()
    expect(world.events).toHaveLength(2)
    expect(world.events).toContain(EVENTS_GLOBAL_UNIQUE.LANG_HADAR)
    expect(history.events).toHaveLength(3)
  })

  it('will not register an event twice', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    history.add({ millennium: millennium, description: 'Language invented', tags: ['Language', 'Invention'] })
    Simulation.instance().millennium++
    languageHadar()
    languageHadar()
    expect(world.events).toHaveLength(2)
    expect(world.events).toContain(EVENTS_GLOBAL_UNIQUE.LANG_HADAR)
    expect(history.events).toHaveLength(3)
  })

  it('interests dragons', () => {
    world.events.push(EVENTS_GLOBAL_UNIQUE.LANG)
    history.add({ millennium, description: 'Language invented', tags: ['Language', 'Invention'] })
    Simulation.instance().millennium++
    languageHadar()
    expect(world.dragons.interest.value).toBe(1)
  })
})
