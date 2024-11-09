import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { SPECIES_NAMES } from '../enums.ts'
import { DragonQueen } from '../test-examples.ts'
import Immortal from './Immortal.ts'
import Simulation from './Simulation.ts'
import World from './World.ts'

describe('World', () => {
  const sim = new Simulation()

  describe('constructor', () => {
    it('creates a World instance', () => {
      const world = new World(sim)
      expect(world).toBeInstanceOf(World)
    })

    it('defaults habitability to 1', () => {
      const world = new World(sim)
      expect(world.habitability).toBe(1)
    })

    it('defaults draconic interest to 0', () => {
      const world = new World(sim)
      expect(world.dragons.interest.value).toBe(0)
    })

    it('defaults draconic fear to 0', () => {
      const world = new World(sim)
      expect(world.dragons.fear.value).toBe(0)
    })

    it('defaults immortals to an empty dictionary', () => {
      const world = new World(sim)
      expect(world.immortals).toEqual({})
    })

    it('defaults populations to an empty dictionary', () => {
      const world = new World(sim)
      expect(world.populations).toEqual({})
    })

    it('defaults quests to an empty dictionary', () => {
      const world = new World(sim)
      expect(world.quests).toEqual({})
    })

    it('defaults events to an empty list', () => {
      const world = new World(sim)
      expect(world.events).toHaveLength(0)
    })

    it('loads species', () => {
      const world = new World(sim)
      for (const species of Object.values(SPECIES_NAMES)) {
        expect(Object.keys(world.species)).toContain(species.toLowerCase())
      }
    })

    it('loads regions', () => {
      const world = new World(sim)
      expect(Object.keys(world.regions)).toHaveLength(188)
    })
  })

  describe('Member methods', () => {
    describe('reduceHabitability', () => {
      it('reduces habitability by a given percent', () => {
        const world = new World(sim)
        world.habitability = 0.8
        world.reduceHabitability(0.5)
        expect(world.habitability).toBe(0.4)
      })
    })

    describe('restoreHabitability', () => {
      it('restores half of the habitability lost', () => {
        const world = new World(sim)
        world.habitability = 0.8
        world.restoreHabitability()
        expect(world.habitability).toBe(0.9)
      })

      it('rounds 0.95 up to 1', () => {
        const world = new World(sim)
        world.habitability = 0.9
        world.restoreHabitability()
        expect(world.habitability).toBe(1)
      })
    })

    describe('addEvent', () => {
      it('adds an event to the world', () => {
        const event = 'addEvent adds an event to the world'
        const world = new World(sim)
        world.addEvent(event)
        expect(world.events).toEqual([event])
      })
    })

    describe('hasEvent', () => {
      const event = 'hasEvent test passes'

      it('returns false if the world does not have the event', () => {
        const world = new World(sim)
        expect(world.hasEvent(event)).toBe(false)
      })

      it('returns true if the world does have the event', () => {
        const world = new World(sim)
        world.events = [event]
        expect(world.hasEvent(event)).toBe(true)
      })
    })

    describe('makeUnique', () => {
      const id = 'The Dragon Queen'

      it('returns the ID if it\'s unique', () => {
        const world = new World(sim)
        const actual = world.makeUnique(id, world.immortals)
        expect(actual).toBe(id)
      })

      it('returns a unique ID that starts with the given string', () => {
        const world = new World(sim)
        world.immortals[id] = new Immortal(sim, DragonQueen)
        const actual = world.makeUnique(id, world.immortals)
        expect(actual).not.toBe(id)
        expect(actual.startsWith(id)).toBe(true)
      })
    })

    describe('toString', () => {
      it('returns a string', () => {
        const world = new World(sim)
        expect(world.toString()).toEqual('World: 100% [0/0]')
      })

      it('rounds habitability to the nearest percent', () => {
        const world = new World(sim)
        world.habitability = 0.31415
        world.dragons.interest.value = 5
        world.dragons.fear.value = 4
        expect(world.toString()).toEqual('World: 31% [5/4]')
      })
    })
  })
})
