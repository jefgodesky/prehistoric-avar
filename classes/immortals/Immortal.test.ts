import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DragonQueen } from '../../test-examples.ts'
import Quest from '../Quest.ts'
import Simulation from '../Simulation.ts'
import World from '../World.ts'
import Immortal from './Immortal.ts'

describe('Immortal', () => {
  const region = 'MS06'
  let world: World
  
  beforeEach(() => {
    world = Simulation.instance().world
  })
  
  afterEach(() => {
    Simulation.reset()
  })

  describe('constructor', () => {
    it('creates an Immortal instance', () => {
      const i = new Immortal(world, region)
      expect(i).toBeInstanceOf(Immortal)
    })

    it('defaults description to \'Immortal\'', () => {
      const i = new Immortal(world, region)
      expect(i.description).toBe('Immortal')
    })

    it('defaults impact to 0', () => {
      const i = new Immortal(world, region)
      expect(i.impact).toBe(0)
    })

    it('sets the region where the immortal is found', () => {
      const i = new Immortal(world, region)
      expect(i.region).toBe(region)
    })

    it('defaults scrolls to an empty array', () => {
      const i = new Immortal(world, region)
      expect(i.scribe.scrolls).toHaveLength(0)
    })

    it('defaults slayable to false', () => {
      const i = new Immortal(world, region)
      expect(i.slayable).toBe(false)
    })

    it('starts slain as false', () => {
      const i = new Immortal(world, region)
      expect(i.slain).toBe(false)
    })

    it('can set description', () => {
      const i = new Immortal(world, region, DragonQueen)
      expect(i.description).toBe(DragonQueen.description)
    })

    it('can set impact', () => {
      const i = new Immortal(world, region, DragonQueen)
      expect(i.impact).toBe(DragonQueen.impact)
    })

    it('can set scrolls', () => {
      const i = new Immortal(world, region, DragonQueen)
      expect(i.scribe.scrolls).toHaveLength(DragonQueen.scrolls.length)
    })

    it('can set slayable', () => {
      const i = new Immortal(world, region, DragonQueen)
      expect((i.slayable as Quest).toObject()).toEqual(DragonQueen.slayable)
    })

    it('adds immortal to the world', () => {
      const i = new Immortal(world, region)
      expect(world.immortals.get(i.id)).toBe(i)
    })

    it('adds immortal to the region', () => {
      const { world } = Simulation.instance()
      const i = new Immortal(world, region)
      const r = world.regions.get(region)!
      expect(r.immortals).toContain(i.id)
    })
  })

  describe('Member methods', () => {
    describe('move', () => {
      it('does nothing', () => {
        const { world } = Simulation.instance()
        const i = new Immortal(world, region, DragonQueen)
        i.move()
        expect(i.region).toBe(region)
        expect(world.regions.get(region)?.immortals).toContain(i.id)
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const cpy = Object.assign({}, DragonQueen)
        const i = new Immortal(world, region, DragonQueen)
        cpy.scrolls = i.scribe.toObject()
        expect(JSON.stringify(i.toObject())).toBe(JSON.stringify(cpy))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const i = new Immortal(world, region, DragonQueen)
        expect(i.toString()).toBe(`Immortal: ${DragonQueen.description}`)
      })
    })
  })
})
