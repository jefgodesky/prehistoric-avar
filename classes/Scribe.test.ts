import { describe, it } from 'jsr:@std/testing/bdd'
import { expect } from 'jsr:@std/expect'
import { IScroll } from '../index.d.ts'
import Scroll from './Scroll.ts'
import Scribe from './Scribe.ts'

describe('Scribe', () => {
  describe('constructor', () => {
    it('creates a Scribe instance', () => {
      const d = new Scribe()
      expect(d).toBeInstanceOf(Scribe)
    })

    it('defaults to an empty array of scrolls', () => {
      const d = new Scribe()
      expect(d.scrolls).toHaveLength(0)
    })

    it('can take scrolls', () => {
      const scroll = new Scroll('Test scroll', 5)
      const d = new Scribe(scroll)
      expect(d.scrolls).toHaveLength(1)
    })

    it('can take scroll data', () => {
      const scroll: IScroll = { text: 'Test scroll', seals: 5 }
      const d = new Scribe(scroll)
      expect(d.scrolls).toHaveLength(1)
    })

    it('can take a mix of scroll instances and scroll data', () => {
      const data: IScroll = { text: 'Test scroll', seals: 5 }
      const instance = new Scroll('Test scroll', 5)
      const d = new Scribe(data, instance)
      expect(d.scrolls).toHaveLength(2)
    })
  })

  describe('Member methods', () => {
    describe('unseal', () => {
      it('creates the scroll if it does not yet exist', () => {
        const d = new Scribe()
        d.unseal('Test', 5, () => 1, () => {})
        expect(d.scrolls).toHaveLength(1)
        expect(d.scrolls[0].text).toBe('Test')
        expect(d.scrolls[0].seals).toBe(5)
      })

      it('unseals the scroll if it exist', () => {
        const text = 'Test'
        const scroll = new Scroll(text, 5)
        const d = new Scribe(scroll)
        d.unseal(text, 5, () => 1, () => {})
        expect(d.scrolls).toHaveLength(1)
        expect(d.scrolls[0].text).toBe(text)
        expect(d.scrolls[0].seals).toBe(4)
      })
    })

    describe('toObject', () => {
      it('exports an object', () => {
        const scroll: IScroll = { text: 'Test scroll', seals: 5 }
        const d = new Scribe(scroll)
        const cpy = Object.assign({ id: d.scrolls[0].id }, scroll)
        expect(JSON.stringify(d.toObject())).toBe(JSON.stringify([cpy]))
      })
    })
  })
})
