import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Simulation from '../../../classes/Simulation.ts'
import uniqueEventCheck from './unique-event-check.ts'

describe('uniqueEventCheck', () => {
  let sim: Simulation
  const event: string = 'Test Event'
  const prerequisites: string[] = ['Prereq 1', 'Prereq 2']

  beforeEach(() => {
    sim = new Simulation()
  })

  it('returns false if event is already registered', () => {
    sim.world.events.push(event)
    expect(uniqueEventCheck(sim, event, prerequisites)).toBe(false)
  })

  it('returns false if any prerequisites are missing', () => {
    sim.world.events.push(prerequisites[0])
    expect(uniqueEventCheck(sim, event, prerequisites)).toBe(false)
  })

  it('returns true if all prerequisites are fulfilled and event has not yet been registered', () => {
    sim.world.events.push(...prerequisites)
    expect(uniqueEventCheck(sim, event, prerequisites)).toBe(true)
  })
})
