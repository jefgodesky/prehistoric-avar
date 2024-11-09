import { describe, beforeEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DISPOSITIONS } from '../enums.ts'
import { DragonQueen } from '../test-examples.ts'
import Quest from './Quest.ts'
import Simulation from './Simulation.ts'
import Immortal from './Immortal.ts'

describe('Immortal', () => {
  let sim: Simulation

  beforeEach(() => { sim = new Simulation() })

  describe('constructor', () => {
    it('creates an Immortal instance', () => {
      const i = new Immortal(sim)
      expect(i).toBeInstanceOf(Immortal)
    })

    it('defaults description to \'Immortal\'', () => {
      const i = new Immortal(sim)
      expect(i.description).toBe('Immortal')
    })

    it('defaults disposition to indifferent', () => {
      const i = new Immortal(sim)
      expect(i.disposition).toBe(DISPOSITIONS.INDIFFERENT)
    })

    it('defaults impact to 0', () => {
      const i = new Immortal(sim)
      expect(i.impact).toBe(0)
    })

    it('defaults relationships to an empty array', () => {
      const i = new Immortal(sim)
      expect(i.relationships).toHaveLength(0)
    })

    it('defaults scrolls to an empty array', () => {
      const i = new Immortal(sim)
      expect(i.scribe.scrolls).toHaveLength(0)
    })

    it('defaults slayable to false', () => {
      const i = new Immortal(sim)
      expect(i.slayable).toBe(false)
    })

    it('has a movement function', () => {
      const i = new Immortal(sim)
      expect(typeof i.move).toBe('function')
    })

    it('starts slain as false', () => {
      const i = new Immortal(sim)
      expect(i.slain).toBe(false)
    })

    it('can set description', () => {
      const i = new Immortal(sim, DragonQueen)
      expect(i.description).toBe(DragonQueen.description)
    })

    it('can set disposition', () => {
      const i = new Immortal(sim, DragonQueen)
      expect(i.disposition).toBe(DragonQueen.disposition)
    })

    it('can set impact', () => {
      const i = new Immortal(sim, DragonQueen)
      expect(i.impact).toBe(DragonQueen.impact)
    })

    it('can set relationships', () => {
      const i = new Immortal(sim, DragonQueen)
      expect(i.relationships).toHaveLength(DragonQueen.relationships.length)
    })

    it('can set scrolls', () => {
      const i = new Immortal(sim, DragonQueen)
      expect(i.scribe.scrolls).toHaveLength(DragonQueen.scrolls.length)
    })

    it('can set slayable', () => {
      const i = new Immortal(sim, DragonQueen)
      expect((i.slayable as Quest).toObject()).toEqual(DragonQueen.slayable)
    })

    it('adds immortal to the world', () => {
      const i = new Immortal(sim)
      expect(sim.world.immortals.get(i.id)).toBe(i)
    })
  })

  describe('Member methods', () => {
    describe('toObject', () => {
      it('exports an object', () => {
        const cpy = Object.assign({}, DragonQueen)
        const i = new Immortal(sim, DragonQueen)
        cpy.scrolls = i.scribe.toObject()
        expect(JSON.stringify(i.toObject())).toBe(JSON.stringify(cpy))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const i = new Immortal(sim, DragonQueen)
        expect(i.toString()).toBe(`Immortal: ${DragonQueen.description}`)
      })
    })
  })

  describe('Static methods', () => {
    describe('find', () => {
      let dq: Immortal

      beforeEach(() => {
        dq = new Immortal(sim, DragonQueen)
        sim.world.regions.get('MS06')!.immortals.push(dq)
      })

      it('returns null if not given a query', () => {
        expect(Immortal.find(sim)).toBeNull()
      })

      it('returns null if the immortal cannot be found', () => {
        expect(Immortal.find(sim, 'Immortal: The Moderate Republican')).toBeNull()
      })

      it('returns the immortal if it can be found', () => {
        expect(Immortal.find(sim, dq.toString())).toBe(dq)
      })

      it('can normalize the query', () => {
        expect(Immortal.find(sim, `IMMORTAL:${dq.description}`)).toBe(dq)
      })

      it('can handle the description alone', () => {
        expect(Immortal.find(sim, dq.description)).toBe(dq)
      })
    })
  })
})
