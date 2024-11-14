import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Simulation from '../../../classes/Simulation.ts'
import World from '../../../classes/World.ts'
import uniqueEventCheck from './unique-event-check.ts'

describe('uniqueEventCheck', () => {
  let world: World
  const event: string = 'Test Event'
  const prerequisites: string[] = ['Prereq 1', 'Prereq 2']

  beforeEach(() => {
    world = Simulation.instance().world
  })

  afterEach(() => {
    Simulation.reset()
  })

  it('returns false if event is already registered', () => {
    world.events.push(event)
    expect(uniqueEventCheck(event, prerequisites)).toBe(false)
  })

  it('returns false if any prerequisites are missing', () => {
    world.events.push(prerequisites[0])
    expect(uniqueEventCheck(event, prerequisites)).toBe(false)
  })

  it('returns true if all prerequisites are fulfilled and event has not yet been registered', () => {
    world.events.push(...prerequisites)
    expect(uniqueEventCheck(event, prerequisites)).toBe(true)
  })
})
