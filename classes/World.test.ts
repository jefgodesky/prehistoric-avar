import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import World from './World.ts'

describe('World', () => {
  describe('constructor', () => {
    it('creates a World instance', () => {
      const world = new World()
      expect(world).toBeInstanceOf(World)
    })

    it('defaults habitability to 1', () => {
      const world = new World()
      expect(world.habitability).toBe(1)
    })

    it('defaults draconic interest to 0', () => {
      const world = new World()
      expect(world.dragons.interest).toBe(0)
    })

    it('defaults draconic fear to 0', () => {
      const world = new World()
      expect(world.dragons.fear).toBe(0)
    })

    it('defaults events to an empty list', () => {
      const world = new World()
      expect(world.events).toHaveLength(0)
    })
  })

  describe('incrDraconicInterest', () => {
    it('increases the level of draconic interest by 1', () => {
      const world = new World()
      world.incrDraconicInterest()
      expect(world.dragons.interest).toBe(1)
    })
  })

  describe('decrDraconicInterest', () => {
    it('decreases the level of draconic interest by 1', () => {
      const world = new World()
      world.dragons.interest = 5
      world.decrDraconicInterest()
      expect(world.dragons.interest).toBe(4)
    })

    it('will not decrease draconic interest below 0', () => {
      const world = new World()
      world.decrDraconicInterest()
      expect(world.dragons.interest).toBe(0)
    })
  })

  describe('incrDraconicFear', () => {
    it('increases the level of draconic fear by 1', () => {
      const world = new World()
      world.incrDraconicFear()
      expect(world.dragons.fear).toBe(1)
    })
  })

  describe('decrDraconicFear', () => {
    it('decreases the level of draconic fear by 1', () => {
      const world = new World()
      world.dragons.fear = 5
      world.decrDraconicFear()
      expect(world.dragons.fear).toBe(4)
    })

    it('will not decrease draconic fear below 0', () => {
      const world = new World()
      world.decrDraconicFear()
      expect(world.dragons.fear).toBe(0)
    })
  })
})