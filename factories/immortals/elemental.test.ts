import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DISPOSITIONS } from '../../enums.ts'
import Simulation from '../../classes/Simulation.ts'
import createElemental, { desiredElementalRegions } from './elemental.ts'

describe('desiredElementalRegions', () => {
  let sim: Simulation

  beforeEach(() => {
    sim = new Simulation()
  })

  it('lists regions for each kind of elemental', () => {
    const elements = ['fire', 'air', 'water', 'earth']
    for (const element of elements) {
      const actual = desiredElementalRegions(sim, element)
      expect(actual.length).toBeGreaterThan(0)
      expect(actual.length).toBeLessThanOrEqual(sim.world.regions.size())
    }
  })
})

describe('createElemental', () => {
  let sim: Simulation

  beforeEach(() => {
    sim = new Simulation()
  })

  it('can create a fire elemental', () => {
    const elemental = createElemental(sim, 'fire')
    expect(elemental.disposition).toBe(DISPOSITIONS.INDIFFERENT)
    expect(elemental.description).toBe('Powerful Fire Elemental')
    expect(elemental.impact).toBe(250)
    expect(elemental.slayable).not.toBe(false)
  })

  it('can create an air elemental', () => {
    const elemental = createElemental(sim, 'air')
    expect(elemental.disposition).toBe(DISPOSITIONS.INDIFFERENT)
    expect(elemental.description).toBe('Powerful Air Elemental')
    expect(elemental.impact).toBe(250)
    expect(elemental.slayable).not.toBe(false)
  })

  it('can create a water elemental', () => {
    const elemental = createElemental(sim, 'water')
    expect(elemental.disposition).toBe(DISPOSITIONS.INDIFFERENT)
    expect(elemental.description).toBe('Powerful Water Elemental')
    expect(elemental.impact).toBe(250)
    expect(elemental.slayable).not.toBe(false)
  })

  it('can create an earth elemental', () => {
    const elemental = createElemental(sim, 'earth')
    expect(elemental.disposition).toBe(DISPOSITIONS.INDIFFERENT)
    expect(elemental.description).toBe('Powerful Earth Elemental')
    expect(elemental.impact).toBe(250)
    expect(elemental.slayable).not.toBe(false)
  })

  it('can create an aether elemental', () => {
    const elemental = createElemental(sim, 'aether')
    expect(elemental.disposition).toBe(DISPOSITIONS.INDIFFERENT)
    expect(elemental.description).toBe('Powerful Aether Elemental')
    expect(elemental.impact).toBe(250)
    expect(elemental.slayable).not.toBe(false)
  })

  /*it('moves a terrestrial elemental', () => {
    const ids = sim.world.regions.values().map(region => region.id)
    const elemental = createElemental(sim, 'water')
    expect(ids).toContain(elemental.move(sim, region)?.id)
  })

  it('does not move an aether', () => {
    const elemental = createElemental(sim, 'aether')
    expect(elemental.move(sim, region)).toBeNull()
  })*/
})
