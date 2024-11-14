import { describe, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Immortal from '../../classes/immortals/Immortal.ts'
import Simulation from '../../classes/Simulation.ts'
import createImmortal from './immortal.ts'

describe('createImmortal', () => {
  afterEach(() => {
    Simulation.reset()
  })

  it('creates an immortal', () => {
    const { world } = Simulation.instance()
    const actual = createImmortal('MS06')
    expect(actual).toBeInstanceOf(Immortal)
    expect(world.immortals.keys()).toContain(actual.id)
  })
})
