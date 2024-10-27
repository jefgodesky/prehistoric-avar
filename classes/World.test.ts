import Emittery from 'emittery'
import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { SPECIES_NAMES } from '../enums.ts'
import World from './World.ts'

describe('World', () => {
  const emitter = new Emittery()

  describe('constructor', () => {
    it('creates a World instance', () => {
      const world = new World(emitter)
      expect(world).toBeInstanceOf(World)
    })

    it('defaults habitability to 1', () => {
      const world = new World(emitter)
      expect(world.habitability).toBe(1)
    })

    it('defaults draconic interest to 0', () => {
      const world = new World(emitter)
      expect(world.dragons.interest).toBe(0)
    })

    it('defaults draconic fear to 0', () => {
      const world = new World(emitter)
      expect(world.dragons.fear).toBe(0)
    })

    it('defaults events to an empty list', () => {
      const world = new World(emitter)
      expect(world.events).toHaveLength(0)
    })

    it('loads species', () => {
      const world = new World(emitter)
      for (const species of Object.values(SPECIES_NAMES)) {
        expect(Object.keys(world.species)).toContain(species.toLowerCase())
      }
    })

    it('loads regions', () => {
      const world = new World(emitter)
      expect(Object.keys(world.regions)).toHaveLength(188)
    })
  })

  describe('Member methods', () => {
    describe('incrDraconicInterest', () => {
      it('increases the level of draconic interest by 1', () => {
        const world = new World(emitter)
        world.incrDraconicInterest()
        expect(world.dragons.interest).toBe(1)
      })
    })

    describe('decrDraconicInterest', () => {
      it('decreases the level of draconic interest by 1', () => {
        const world = new World(emitter)
        world.dragons.interest = 5
        world.decrDraconicInterest()
        expect(world.dragons.interest).toBe(4)
      })

      it('will not decrease draconic interest below 0', () => {
        const world = new World(emitter)
        world.decrDraconicInterest()
        expect(world.dragons.interest).toBe(0)
      })
    })

    describe('incrDraconicFear', () => {
      it('increases the level of draconic fear by 1', () => {
        const world = new World(emitter)
        world.incrDraconicFear()
        expect(world.dragons.fear).toBe(1)
      })
    })

    describe('decrDraconicFear', () => {
      it('decreases the level of draconic fear by 1', () => {
        const world = new World(emitter)
        world.dragons.fear = 5
        world.decrDraconicFear()
        expect(world.dragons.fear).toBe(4)
      })

      it('will not decrease draconic fear below 0', () => {
        const world = new World(emitter)
        world.decrDraconicFear()
        expect(world.dragons.fear).toBe(0)
      })
    })

    describe('reduceHabitability', () => {
      it('reduces habitability by a given percent', () => {
        const world = new World(emitter)
        world.habitability = 0.8
        world.reduceHabitability(0.5)
        expect(world.habitability).toBe(0.4)
      })
    })

    describe('restoreHabitability', () => {
      it('restores half of the habitability lost', () => {
        const world = new World(emitter)
        world.habitability = 0.8
        world.restoreHabitability()
        expect(world.habitability).toBe(0.9)
      })

      it('rounds 0.95 up to 1', () => {
        const world = new World(emitter)
        world.habitability = 0.9
        world.restoreHabitability()
        expect(world.habitability).toBe(1)
      })
    })

    describe('addEvent', () => {
      it('adds an event to the world', () => {
        const event = 'addEvent adds an event to the world'
        const world = new World(emitter)
        world.addEvent(event)
        expect(world.events).toEqual([event])
      })
    })

    describe('hasEvent', () => {
      const event = 'hasEvent test passes'

      it('returns false if the world does not have the event', () => {
        const world = new World(emitter)
        expect(world.hasEvent(event)).toBe(false)
      })

      it('returns true if the world does have the event', () => {
        const world = new World(emitter)
        world.events = [event]
        expect(world.hasEvent(event)).toBe(true)
      })
    })

    describe('toObject', () => {
      it('returns an object', () => {
        const world = new World(emitter)
        const obj = world.toObject()
        expect(obj.habitability).toEqual(world.habitability)
        expect(obj.dragons.interest).toEqual(world.dragons.interest)
        expect(obj.dragons.fear).toEqual(world.dragons.fear)
        expect(obj.events).toEqual(world.events)
        expect(Object.keys(obj.species)).toHaveLength(7)
        expect(Object.keys(obj.regions)).toHaveLength(188)
      })
    })

    describe('toString', () => {
      it('returns a string', () => {
        const world = new World(emitter)
        expect(world.toString()).toEqual('World: 100% [0/0]')
      })

      it('rounds habitability to the nearest percent', () => {
        const world = new World(emitter)
        world.habitability = 0.31415
        world.dragons.interest = 5
        world.dragons.fear = 4
        expect(world.toString()).toEqual('World: 31% [5/4]')
      })
    })
  })
})
