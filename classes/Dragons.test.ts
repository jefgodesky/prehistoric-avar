import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import type { IDragons } from '../index.d.ts'
import DragonScore from './DragonScore.ts'
import Dragons from './Dragons.ts'

describe('Dragons', () => {
  describe('constructor', () => {
    it('creates a Dragons instance', () => {
      const dragons = new Dragons()
      expect(dragons).toBeInstanceOf(Dragons)
    })

    it('defaults interest to 0', () => {
      const dragons = new Dragons()
      expect(dragons.interest.value).toBe(0)
    })

    it('defaults fear to 0', () => {
      const dragons = new Dragons()
      expect(dragons.fear.value).toBe(0)
    })

    it('can set interest from a number', () => {
      const dragons = new Dragons(5)
      expect(dragons.interest.value).toBe(5)
    })

    it('can set interest from an instance', () => {
      const interest = new DragonScore(5)
      const dragons = new Dragons(interest)
      expect(dragons.interest.value).toBe(5)
    })

    it('can set fear from a number', () => {
      const dragons = new Dragons(5, 4)
      expect(dragons.fear.value).toBe(4)
    })

    it('can set fear from an instance', () => {
      const fear = new DragonScore(4)
      const dragons = new Dragons(5, fear)
      expect(dragons.fear.value).toBe(4)
    })

    it('can set interest and fear from an IDragons object', () => {
      const obj: IDragons = { interest: 5, fear: 4 }
      const dragons = new Dragons(obj)
      expect(dragons.interest.value).toBe(5)
      expect(dragons.fear.value).toBe(4)
    })
  })

  describe('Member methods', () => {
    describe('sum', () => {
      it('returns the sum of interest and fear', () => {
        const dragons = new Dragons(5, 4)
        expect(dragons.sum()).toBe(9)
      })
    })

    describe('toObject', () => {
      it('returns an object', () => {
        const obj: IDragons = { interest: 5, fear: 4 }
        const dragons = new Dragons(obj)
        expect(JSON.stringify(dragons.toObject())).toBe(JSON.stringify(obj))
      })
    })

    describe('toString', () => {
      it('returns a string', () => {
        const dragons = new Dragons(5, 4)
        expect(dragons.toString()).toBe('5/4')
      })
    })
  })
})
