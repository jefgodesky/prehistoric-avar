import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { SPECIES_NAMES } from '../enums.ts'
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
      expect(world.dragons.interest.value).toBe(0)
    })

    it('defaults draconic fear to 0', () => {
      const world = new World()
      expect(world.dragons.fear.value).toBe(0)
    })

    it('defaults immortals to an empty directory', () => {
      const world = new World()
      expect(world.immortals.size()).toBe(0)
    })

    it('defaults languages to an empty directory', () => {
      const world = new World()
      expect(world.languages.size()).toBe(0)
    })

    it('defaults populations to an empty directory', () => {
      const world = new World()
      expect(world.populations.size()).toBe(0)
    })

    it('defaults quests to an empty directory', () => {
      const world = new World()
      expect(world.quests.size()).toBe(0)
    })

    it('defaults societies to an empty directory', () => {
      const world = new World()
      expect(world.societies.size()).toBe(0)
    })

    it('defaults events to an empty list', () => {
      const world = new World()
      expect(world.events).toHaveLength(0)
    })

    it('loads species', () => {
      const world = new World()
      for (const species of Object.values(SPECIES_NAMES)) {
        expect(world.species.keys()).toContain(species.toLowerCase())
      }
    })

    it('loads regions', () => {
      const world = new World()
      expect(world.regions.size()).toBe(189)
    })
  })

  describe('Member methods', () => {
    describe('reduceHabitability', () => {
      it('reduces habitability by a given percent', () => {
        const world = new World()
        world.habitability = 0.8
        world.reduceHabitability(0.5)
        expect(world.habitability).toBe(0.4)
      })
    })

    describe('restoreHabitability', () => {
      it('restores half of the habitability lost', () => {
        const world = new World()
        world.habitability = 0.8
        world.restoreHabitability()
        expect(world.habitability).toBe(0.9)
      })

      it('rounds 0.95 up to 1', () => {
        const world = new World()
        world.habitability = 0.9
        world.restoreHabitability()
        expect(world.habitability).toBe(1)
      })
    })

    describe('addEvent', () => {
      it('adds an event to the world', () => {
        const event = 'addEvent adds an event to the world'
        const world = new World()
        world.addEvent(event)
        expect(world.events).toEqual([event])
      })
    })

    describe('hasEvent', () => {
      const event = 'hasEvent test passes'

      it('returns false if the world does not have the event', () => {
        const world = new World()
        expect(world.hasEvent(event)).toBe(false)
      })

      it('returns true if the world does have the event', () => {
        const world = new World()
        world.events = [event]
        expect(world.hasEvent(event)).toBe(true)
      })
    })

    describe('toString', () => {
      it('returns a string', () => {
        const world = new World()
        expect(world.toString()).toEqual('World: 100% [0/0]')
      })

      it('rounds habitability to the nearest percent', () => {
        const world = new World()
        world.habitability = 0.31415
        world.dragons.interest.value = 5
        world.dragons.fear.value = 4
        expect(world.toString()).toEqual('World: 31% [5/4]')
      })
    })
  })
})
