import { describe, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import DragonQueen from '../../classes/immortals/DragonQueen.ts'
import Simulation from '../../classes/Simulation.ts'
import createDragonQueen from './dragon-queen.ts'

describe('createDragonQueen', () => {
  afterEach(() => {
    Simulation.reset()
    DragonQueen.reset()
  })

  it('creates the Dragon Queen', () => {
    const region = 'MS06'
    const { world } = Simulation.instance()
    const actual = createDragonQueen(region)
    expect(actual).toBe(DragonQueen.instance(world, region))
    expect(world.immortals.keys()).toContain(actual.id)
  })
})
