import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { IWorld } from '../index.d.ts'
import Scroll from './Scroll.ts'

describe('Scroll', () => {
  const text = 'Test passes'
  const seals = 4
  const unseal = () => 2

  describe('constructor', () => {
    it('creates a Scroll instance', () => {
      const scroll = new Scroll()
      expect(scroll).toBeInstanceOf(Scroll)
    })

    it('defaults text to a null string', () => {
      const scroll = new Scroll()
      expect(scroll.text).toBe('')
    })

    it('defaults seals to 1', () => {
      const scroll = new Scroll()
      expect(scroll.seals).toBe(1)
    })

    it('defaults unseal to a function that always removes 1 seal', () => {
      const scroll = new Scroll()
      expect(scroll.fn).toBeInstanceOf(Function)
    })

    it('can take text', () => {
      const scroll = new Scroll(text)
      expect(scroll.text).toBe(text)
    })

    it('can take some number of seals', () => {
      const scroll = new Scroll(text, seals)
      expect(scroll.seals).toBe(seals)
    })

    it('can take an unsealing function', () => {
      const scroll = new Scroll(text, seals, unseal)
      expect(scroll.fn).toBe(unseal)
    })
  })

  describe('Member methods', () => {
    describe('unseal', () => {
      it('returns false when the scroll has seals remaining', () => {
        const scroll = new Scroll(text, 2)
        expect(scroll.unseal()).toBe(false)
      })

      it('returns true when the scroll has no seals remaining', () => {
        const scroll = new Scroll(text)
        expect(scroll.unseal()).toBe(true)
      })

      it('will not reduce the number of scrolls to less than 0', () => {
        const fn = () => 5
        const scroll = new Scroll(text, 1, fn)
        expect(scroll.unseal()).toBe(true)
        expect(scroll.seals).toBe(0)
      })

      it('can use context', () => {
        const context: IWorld = {
          habitability: 1,
          dragons: { interest: 0, fear: 0 },
          events: []
        }
        const fn = (context?: IWorld) => context?.events.length || 0
        const scroll = new Scroll(text, 5, fn)

        expect(scroll.unseal(context)).toBe(false)
        expect(scroll.seals).toBe(5)

        context.events.push('New event')
        expect(scroll.unseal(context)).toBe(false)
        expect(scroll.seals).toBe(4)

        context.events.push('Second event', 'Third event')
        expect(scroll.unseal(context)).toBe(false)
        expect(scroll.seals).toBe(1)

        context.events.push('Fourth event', 'Fifth event')
        expect(scroll.unseal(context)).toBe(true)
        expect(scroll.seals).toBe(0)
      })
    })

    describe('toObject', () => {
      it('returns an object', () => {
        const scroll = new Scroll(text, seals)
        const actual = scroll.toObject()
        expect(actual.text).toBe(text)
        expect(actual.seals).toBe(seals)
      })
    })

    describe('toString', () => {
      it('returns a string', () => {
        const scroll = new Scroll(text, seals)
        expect(scroll.toString()).toBe(`Scroll: ${text} [${seals}]`)
      })
    })
  })
})
