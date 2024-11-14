import { describe, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Population from '../classes/Population.ts'
import Simulation from '../classes/Simulation.ts'
import createPopulation from './population.ts'

describe('createPopulation', () => {
  afterEach(() => {
    Simulation.reset()
  })

  it('creates a population', () => {
    const { world } = Simulation.instance()
    const actual = createPopulation('GS03')
    expect(actual).toBeInstanceOf(Population)
    expect(world.populations.keys()).toContain(actual.id)
  })
})
