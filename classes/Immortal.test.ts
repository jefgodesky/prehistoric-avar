import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { DISPOSITIONS } from '../enums.ts'
import { DragonQueen } from '../test-data.ts'
import Immortal from './Immortal.ts'

describe('Immortal', () => {
  describe('constructor', () => {
    it('creates an Immortal instance', () => {
      const i = new Immortal()
      expect(i).toBeInstanceOf(Immortal)
    })

    it('defaults description to a null string', () => {
      const i = new Immortal()
      expect(i.description).toBe('')
    })

    it('defaults disposition to indifferent', () => {
      const i = new Immortal()
      expect(i.disposition).toBe(DISPOSITIONS.INDIFFERENT)
    })

    it('defaults impact to 0', () => {
      const i = new Immortal()
      expect(i.impact).toBe(0)
    })

    it('defaults relationships to an empty array', () => {
      const i = new Immortal()
      expect(i.relationships).toHaveLength(0)
    })

    it('defaults scrolls to an empty array', () => {
      const i = new Immortal()
      expect(i.scrolls).toHaveLength(0)
    })

    it('defaults slayable to false', () => {
      const i = new Immortal()
      expect(i.slayable).toBe(false)
    })

    it('can set description', () => {
      const i = new Immortal(DragonQueen)
      expect(i.description).toBe(DragonQueen.description)
    })

    it('can set disposition', () => {
      const i = new Immortal(DragonQueen)
      expect(i.disposition).toBe(DragonQueen.disposition)
    })

    it('can set impact', () => {
      const i = new Immortal(DragonQueen)
      expect(i.impact).toBe(DragonQueen.impact)
    })

    it('can set relationships', () => {
      const i = new Immortal(DragonQueen)
      expect(i.relationships).toHaveLength(DragonQueen.relationships.length)
    })

    it('can set scrolls', () => {
      const i = new Immortal(DragonQueen)
      expect(i.scrolls).toHaveLength(DragonQueen.scrolls.length)
    })

    it('can set slayable', () => {
      const i = new Immortal(DragonQueen)
      expect(i.slayable).toEqual(DragonQueen.slayable)
    })
  })

  describe('Member methods', () => {
    describe('toObject', () => {
      it('exports an object', () => {
        const i = new Immortal(DragonQueen)
        expect(JSON.stringify(i.toObject())).toBe(JSON.stringify(DragonQueen))
      })
    })

    describe('toString', () => {
      it('exports a string', () => {
        const i = new Immortal(DragonQueen)
        expect(i.toString()).toBe(`Immortal: ${DragonQueen.description}`)
      })
    })
  })
})
