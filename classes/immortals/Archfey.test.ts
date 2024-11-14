import { describe, beforeEach, afterEach, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DISPOSITIONS } from '../../enums.ts'
import Simulation from '../../classes/Simulation.ts'
import World from '../World.ts'
import Archfey from './Archfey.ts'

describe('Archfey', () => {
  const region = 'GS03'
  let world: World

  beforeEach(() => {
    world = Simulation.instance().world
  })

  afterEach(() => {
    Simulation.reset()
  })

  describe('constructor', () => {
    it('creates an archfey', () => {
      const archfey = new Archfey(world, region)
      expect(archfey).toBeInstanceOf(Archfey)
      expect(archfey.region).toBe(region)
      expect(archfey.disposition).toBe(DISPOSITIONS.INDIFFERENT)
      expect(archfey.description).toBe('Archfey Sovereign of GS03')
      expect(archfey.impact).toBe(-250)
      expect(archfey.slayable).not.toBe(false)
      expect(world.regions.get(region)?.immortals).toContain(archfey.id)
    })
  })

  describe('Member methods', () => {
    describe('move', () => {
      it('does nothing', () => {
        const archfey = new Archfey(world, region)
        archfey.move()
        expect(archfey.region).toBe(region)
        expect(world.regions.get(region)?.immortals).toContain(archfey.id)
      })
    })
  })
})
