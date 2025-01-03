import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import DragonScore from './DragonScore.ts'

describe('DragonScore', () => {
  describe('constructor', () => {
    it('creates a DragonScore instance', () => {
      const score = new DragonScore()
      expect(score).toBeInstanceOf(DragonScore)
    })

    it('defaults value to 0', () => {
      const score = new DragonScore()
      expect(score.value).toBe(0)
    })

    it('can set a value', () => {
      const score = new DragonScore(5)
      expect(score.value).toBe(5)
    })
  })

  describe('Member methods', () => {
    describe('incr', () => {
      it('increments the value', () => {
        const score = new DragonScore(5)
        score.incr()
        expect(score.value).toBe(6)
      })

      it('returns the new value', () => {
        const score = new DragonScore(5)
        expect(score.incr()).toBe(6)
      })
    })

    describe('decr', () => {
      it('decrements the value', () => {
        const score = new DragonScore(5)
        score.decr()
        expect(score.value).toBe(4)
      })

      it('returns the new value', () => {
        const score = new DragonScore(5)
        expect(score.decr()).toBe(4)
      })

      it('will not decrement the value below zero', () => {
        const score = new DragonScore()
        expect(score.decr()).toBe(0)
        expect(score.value).toBe(0)
      })
    })

    describe('mod', () => {
      it('can increase the value', () => {
        const score = new DragonScore(5)
        score.mod(5)
        expect(score.value).toBe(10)
      })

      it('can decrease the value', () => {
        const score = new DragonScore(5)
        score.mod(-5)
        expect(score.value).toBe(0)
      })

      it('returns the new value', () => {
        const score = new DragonScore(5)
        expect(score.mod(1)).toBe(6)
      })

      it('will not decrement the value below zero', () => {
        const score = new DragonScore()
        expect(score.mod(-5)).toBe(0)
        expect(score.value).toBe(0)
      })
    })
  })
})
