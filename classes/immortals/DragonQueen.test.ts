import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import Simulation from '../../classes/Simulation.ts'
import World from '../World.ts'
import DragonQueen from './DragonQueen.ts'

describe('DragonQueen', () => {
  const region = 'MS06'
  let world: World

  beforeEach(() => {
    DragonQueen.reset()
    world = Simulation.instance().world
  })

  afterEach(() => {
    Simulation.reset()
  })

  describe('Member methods', () => {
    describe('move', () => {
      it('moves to a region with dragons', () => {
        const queen = DragonQueen.instance(world, region)
        queen.move()
        const origin = world.regions.get(region)
        const dest = world.regions.get(queen.region)
        expect(region === queen.region || !origin?.immortals.includes(queen.id)).toBe(true)
        expect(dest?.dragons.length).toBeGreaterThan(0)
        expect(dest?.immortals).toContain(queen.id)
      })
    })
  })
})
