import { describe, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Simulation from '../classes/Simulation.ts'
import Society from '../classes/Society.ts'
import createSociety from './society.ts'

describe('createSociety', () => {
  afterEach(() => {
    Simulation.reset()
  })

  it('creates a society', () => {
    const { world } = Simulation.instance()
    const actual = createSociety('GS03')
    expect(actual).toBeInstanceOf(Society)
    expect(world.societies.keys()).toContain(actual.id)
  })
})
