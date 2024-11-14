import { describe, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Archfey from '../../classes/immortals/Archfey.ts'
import Simulation from '../../classes/Simulation.ts'
import createArchfey from './archfey.ts'

describe('createArchfey', () => {
  afterEach(() => {
    Simulation.reset()
  })

  it('creates an archfey', () => {
    const { world } = Simulation.instance()
    const actual = createArchfey('MS06')
    expect(actual).toBeInstanceOf(Archfey)
    expect(world.immortals.keys()).toContain(actual.id)
  })
})
